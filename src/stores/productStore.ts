import { ConfigFileStructure, SourceCounts, StoryRampConfig } from '@/definitions';
import { defineStore } from 'pinia';
import JSZip from 'jszip';

import Message from 'vue-m-message';

import type {
    BasePanel,
    ChartPanel,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    Slide,
    SlideshowPanel,
    TextPanel,
    VideoPanel
} from '@/definitions';
import { PanelType } from '@/definitions';
import { useStateStore } from './stateStore';

interface ProductState {
    configFileStructure: ConfigFileStructure;
    configs: { [key: string]: StoryRampConfig | undefined };
    configLang: string;
    sourceCounts: SourceCounts;
    debounceTimer: ReturnType<typeof setTimeout> | null;
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        configFileStructure: {} as ConfigFileStructure,
        configs: { en: undefined, fr: undefined },
        configLang: 'en',
        sourceCounts: {},

        // Debounce timer used for updateSaveStatus only.
        // IMPORTANT: Avoid using stateStore's handlePotentialChange() directly, this timer may cause issues with change detection and saving to the configs variable.
        // Instead, ALWAYS call either updateSaveStatus() (if in metadata-editor) or emit the 'save-status' event instead!
        debounceTimer: null
    }),

    getters: {
        /**
         * If a language is provided, use that. Otherwise use the current configuration language.
         */
        oppositeLang: (state) => {
            return state.configLang === 'en' ? 'fr' : 'en';
        },
        folders: (state: ProductState) => {
            return {
                assets: state.configFileStructure?.assets,
                charts: state.configFileStructure?.charts,
                rampConfig: state.configFileStructure?.rampConfig
            };
        }
    },

    actions: {
        changeLang(lang: string): void {
            this.configLang = lang;
        },

        /**
         * Update the unsaved changes value to the payload.
         * Debounced to prevent being called too often.
         */
        updateSaveStatus(payload: boolean | undefined, origin?: string): void {
            const stateStore = useStateStore();

            if (this.debounceTimer) clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                stateStore.handlePotentialChange(
                    {
                        en: JSON.parse(JSON.stringify(this.configs.en)),
                        fr: JSON.parse(JSON.stringify(this.configs.fr))
                    },
                    origin
                );
            }, 300);
        },

        /**
         * =====================
         * SOURCE COUNT METHODS
         * =====================
         */

        // Return true if the source exists in sourceCounts and its count is greater than 0.
        sourceExists(src: string): boolean {
            return this.sourceCounts[src] !== undefined && this.sourceCounts[src] > 0;
        },

        // Incremements the source count for the provided source. If it doesn't exist, the source is also added to the object.
        incrementSourceCount(src: string): void {
            this.sourceCounts[src] ? (this.sourceCounts[src] += 1) : (this.sourceCounts[src] = 1);
            console.log(`productStore -> incrementSourceCount()`, this.sourceCounts, src);
        },

        // Decrements the source count for the provided source. If the count is 0, the source is removed.
        decrementSourceCount(src: string | undefined | 'Logo' | 'Background'): void {
            if (src === 'Logo') {
                src = this.configs[this.configLang]?.introSlide.logo.src;
            }

            if (src === 'Background') {
                src = this.configs[this.configLang]?.introSlide.backgroundImage;
            }

            if (src) {
                if (this.sourceCounts[src]) {
                    this.sourceCounts[src] -= 1;
                }
                if (this.sourceCounts[src] <= 0) {
                    const relativePath = src.split('/').slice(1).join('/');
                    this.configFileStructure?.zip.remove(relativePath);
                }
            }
            console.log(`productStore -> decrementSourceCount()`, this.sourceCounts);
        },

        // Recursively calls `decrementSourceCount` on a panel. Will ensure correct source counts for panels with children.
        removeSourceCounts(panel: BasePanel): void {
            // The provided panel is being removed. Update source counts accordingly.
            switch (panel.type) {
                case 'map': {
                    const mapPanel = panel as MapPanel;
                    this.decrementSourceCount(mapPanel.config);
                    break;
                }

                case 'image': {
                    const imagePanel = panel as ImagePanel;
                    this.decrementSourceCount(imagePanel.src);
                    break;
                }

                case 'chart': {
                    const chartPanel = panel as ChartPanel;
                    this.decrementSourceCount(chartPanel.src);
                    break;
                }

                case 'slideshow':
                case 'slideshowImage':
                case 'slideshowChart': {
                    const slideshowPanel = panel as SlideshowPanel;
                    slideshowPanel.items.forEach((item: TextPanel | ImagePanel | MapPanel | ChartPanel) => {
                        this.removeSourceCounts(item);
                    });
                    break;
                }

                case 'video': {
                    const videoPanel = panel as VideoPanel;
                    if (videoPanel.videoType === 'local') {
                        this.decrementSourceCount(videoPanel.src);
                    }
                    break;
                }

                case 'dynamic': {
                    const dynamicPanel = panel as DynamicPanel;
                    dynamicPanel.children.forEach((subPanel: DynamicChildItem) => {
                        this.removeSourceCounts(subPanel.panel);
                    });
                    break;
                }

                case 'text': {
                    break;
                }
            }
        },

        // Recursively calls `incrementSourceCount` on a panel. Will ensure correct source counts for panels with children.
        // TODO: this is basically the same as the function above. We should re-visit these functions and maybe combine them in the future.
        panelSourceHelper(panel: BasePanel): void {
            switch (panel.type) {
                case PanelType.Dynamic:
                    (panel as DynamicPanel).children.forEach((subPanel: DynamicChildItem) => {
                        this.panelSourceHelper(subPanel.panel);
                    });
                    break;
                case PanelType.Slideshow:
                case PanelType.SlideshowImage:
                case PanelType.SlideshowChart:
                    (panel as SlideshowPanel).items.forEach((item: ChartPanel | TextPanel | ImagePanel | MapPanel) => {
                        this.panelSourceHelper(item);
                    });
                    break;
                case PanelType.Chart:
                    this.incrementSourceCount((panel as ChartPanel).src);
                    break;
                case PanelType.Image:
                    this.incrementSourceCount((panel as ImagePanel).src);
                    break;
                case PanelType.Video:
                    if ((panel as VideoPanel).videoType === 'local') {
                        this.incrementSourceCount((panel as VideoPanel).src);
                    }
                    break;
                case PanelType.Map:
                    this.incrementSourceCount((panel as MapPanel).config);
                    break;
                case PanelType.Text:
                    break;
                default:
                    break;
            }
        },

        // Calculates the sourceCounts for all assets used within a product.
        findSources(): void {
            this.sourceCounts = {}; // reset source counts first.
            ['en', 'fr'].forEach((lang) => {
                if (this.configs[lang]?.introSlide.logo?.src) {
                    this.incrementSourceCount((this.configs[lang] as StoryRampConfig).introSlide.logo.src);
                }

                if (this.configs[lang]?.introSlide.backgroundImage) {
                    this.incrementSourceCount((this.configs[lang] as StoryRampConfig).introSlide.backgroundImage);
                }

                this.configs[lang]?.slides.forEach((slide) => {
                    if (Object.keys(slide).length !== 0) {
                        (slide as Slide).panel.forEach((panel) => {
                            this.panelSourceHelper(panel);
                        });
                    }
                });
            });
            console.log(`productStore.ts -> findSources():`, this.sourceCounts);
        },
        // Given a Storylines config, replace instances of the current UUID with a new UUID.
        renameSources(config: StoryRampConfig, prevUuid: string, changeUuid: string): void {
            const _renameHelper = (panel: any): any => {
                switch (panel.type) {
                    case PanelType.Dynamic:
                        (panel as DynamicPanel).children.forEach((child) => {
                            _renameHelper(child.panel);
                        });
                        break;
                    case PanelType.Slideshow:
                    case PanelType.SlideshowImage:
                    case PanelType.SlideshowChart:
                        (panel as SlideshowPanel).items.forEach((child) => {
                            _renameHelper(child);
                        });
                        break;
                    case PanelType.Map:
                        if (panel.config && typeof panel.config === 'string') {
                            // Update the path to the RAMP config in the product config file.
                            panel.config = panel.config.replace(`/${prevUuid}-map-`, `/${changeUuid}-map-`);
                        }
                    // Intentionally no break here so that the folder can also be renamed in the default block.
                    default:
                        // Base case. This is a panel that doesn't have any children (i.e., not dynamic, slideshow).
                        // Rename the source.
                        if (panel.src) {
                            panel.src = panel.src.replace(`${prevUuid}/`, `${changeUuid}/`);
                        }
                        if (panel.config && typeof panel.config === 'string') {
                            panel.config = panel.config.replace(`${prevUuid}/`, `${changeUuid}/`);
                        }
                }
            };

            // Rename logo and introduction slide background image, if applicable.
            if (config?.introSlide.logo?.src) {
                config.introSlide.logo.src = config.introSlide.logo.src.replace(
                    `${prevUuid}/assets/`,
                    `${changeUuid}/assets/`
                );
            }

            if (config?.introSlide.backgroundImage) {
                config.introSlide.backgroundImage = config.introSlide.backgroundImage.replace(
                    `${prevUuid}/assets/`,
                    `${changeUuid}/assets/`
                );
            }

            config.slides.forEach((slide) => {
                if (Object.keys(slide).length !== 0) {
                    if ((slide as Slide).backgroundImage) {
                        (slide as Slide).backgroundImage = (slide as Slide).backgroundImage.replace(
                            `${prevUuid}/assets/`,
                            `${changeUuid}/assets/`
                        );
                    }

                    (slide as Slide).panel.forEach((panel) => {
                        _renameHelper(panel);
                    });
                }
            });
        },

        /**
         * =====================
         * SHARED ASSET METHODS
         * =====================
         */
        // Converts a file into a promise that resolves to an ArrayBuffer containing the files data
        readBinaryData(file: File): Promise<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                const fileReader: FileReader = new FileReader();
                fileReader.onload = () => {
                    resolve(fileReader.result as ArrayBuffer);
                };
                fileReader.onerror = () => {
                    reject(new Error('Could not load file reader'));
                };
                fileReader.readAsArrayBuffer(file);
            });
        },

        // Converts a file into a promise that resolves to its hash, as an array of 8-bit integers
        obtainHashData(file: File): Promise<Uint8Array> {
            return this.readBinaryData(file)
                .then((res) => {
                    res = new Uint8Array(res);
                    return window.crypto.subtle.digest('SHA-256', res);
                })
                .then((res) => {
                    res = new Uint8Array(res);
                    return res;
                });
        },

        /**
         * Compares the hashes of two files
         * @param file File that was uploaded
         * @param compressedBinary Compressed binary file from configFileStructure
         * @param compressedName The name of the compressed binary file
         */
        async compareFiles(file: File, compressedBinary: JSZip.JSZipObject, compressedName: string): Promise<boolean> {
            const fileHash = await this.obtainHashData(file);
            const compressedType = compressedName.split('.').at(-1);

            return compressedBinary
                .async(compressedType !== 'svg' ? 'blob' : 'text')
                .then((assetFile) => {
                    if (compressedType === 'svg') {
                        assetFile = new File([assetFile], compressedName, {
                            type: 'image/svg+xml'
                        });
                    }
                    return this.obtainHashData(assetFile as File);
                })
                .then((hash) => {
                    return hash.join() === fileHash.join();
                });
        },

        /**
         * Helper used to find all instances of the specified file in the specified asset folder
         * @param file File that was uploaded
         * @param folder The asset folder withinn which we should be searching
         * @param checkNested Flag that indicates whether we should consider assets with nested subfolders
         */
        filesInAssetFolder(file: File, folder: string, checkNested = true): Array<Promise<string>> {
            // Here, if a file in the specified folder has the same name and hash as the file uploaded, then we consider the
            // two to be the same. Otherwise, we consider them to be different. We even consider if the asset is within a
            // subfolder of the specified folder, so long as the name and hash of the file is the same. There may be more than one
            // instance of the specified asset in the specified folder, albeit in seperate subfolders, hence why we collect
            // an array of duplicate asset promises
            const sharedAssetPromises = [];
            this.configFileStructure.assets[folder].forEach((relativePath, compressedBinary) => {
                const assetName = checkNested ? relativePath.split('/').at(-1) : relativePath;

                // Only compare the hashes of two files when they have the exact same name
                if (assetName === file.name) {
                    sharedAssetPromises.push(
                        this.compareFiles(file, compressedBinary, assetName).then((fileSame) =>
                            fileSame ? relativePath : 'N/A'
                        )
                    );
                }
            });

            return sharedAssetPromises;
        },

        // Helper for onFileChange and dropImages. Maps a File object to an ImageFile object
        async addUploadedFile(
            file: File
        ): Promise<{ inSharedAsset: boolean; newAssetName: string; uploadSource: string }> {
            const oppositeLang = this.oppositeLang;

            const sharedAssetPaths = await Promise.all(this.filesInAssetFolder(file, 'shared', false));
            let inSharedAsset = false;
            let oppositeSourceCount = 0;
            let newAssetName = file.name;
            let uploadSource = `${this.configFileStructure.uuid}/assets/shared/${file.name}`;

            // Should contain either 0 or 1 promise.
            sharedAssetPaths.forEach((sharedAssetPath) => {
                inSharedAsset = sharedAssetPath !== 'N/A';
            });

            // If the asset is already in the shared asset folder, we do not need to do anything. We can assume that it
            // does not exist in the opposite lang's asset folder (i.e. we assume shared asset system is working correctly)
            if (!inSharedAsset) {
                const oppositeAssetPaths = await Promise.all(this.filesInAssetFolder(file, oppositeLang));
                // If the current promise contains 'N/A', then the current path refers to an asset in the opposite asset
                // folder that has the same name, but different contents, as the asset uploaded. In this case we do
                // nothing, as this asset is not a valid duplicate.
                for (const oppositeAssetPath of oppositeAssetPaths) {
                    if (oppositeAssetPath !== 'N/A') {
                        const oppositeFileSource = `${this.configFileStructure.uuid}/assets/${oppositeLang}/${oppositeAssetPath}`;
                        oppositeSourceCount += this.sourceCounts[oppositeFileSource] ?? 0;
                        this.sourceCounts[oppositeFileSource] = 0;
                        this.configFileStructure.assets[oppositeLang].remove(oppositeAssetPath);

                        // Add asset to shared folder if asset is yet to be moved to the shared folder. If an asset with the
                        // same name, but different content, is already in the shared folder, we must give the asset we are
                        // uploading a unique name. Otherwise the existing asset will be overwritten
                        if (!inSharedAsset) {
                            let i = 2;
                            while (this.configFileStructure.assets['shared'].file(newAssetName)) {
                                // If the updated name is the same as a file that already exists in the shared asset folder,
                                // we must compare that file with the uploaded file, since they wouldnt have been compared
                                // on the first run due to having different names (Such an asset COULD also be in the shared
                                // or opposite lang asset folder, since a new name is now being used. However we shouldn't
                                // execute this entire method again just for an edge case like a name change, so we can
                                // leave this as is for now)
                                if (i > 2) {
                                    const filesEqual = await this.compareFiles(
                                        file,
                                        this.configFileStructure.assets['shared'].file(newAssetName),
                                        newAssetName
                                    );
                                    if (filesEqual) break;
                                }
                                newAssetName = `${file.name.split('.').at(0)}(${i}).${file.name.split('.').at(-1)}`;
                                i++;
                            }
                            uploadSource = `${this.configFileStructure.uuid}/assets/shared/${newAssetName}`;
                            this.configFileStructure.assets['shared'].file(newAssetName, file);
                            inSharedAsset = true;
                        }
                        this.updateToSharedAsset(oppositeFileSource, uploadSource, oppositeLang); // must be done for each duplicate asset
                    }
                }
            }

            // If the asset uploaded is in the shared asset folder, then no need to upload to the current langs assets folder
            if (!inSharedAsset) {
                const currAssetPaths = await Promise.all(this.filesInAssetFolder(file, this.configLang, false));
                // Should contain either 0 or 1 promise.
                // Need to use await here
                for (const currAssetPath of currAssetPaths) {
                    // If asset w/ same name but different contents is in curr lang asset folder, set name in curr lang
                    // asset folder to a unique name, to avoid overwriting an existing file.
                    if (currAssetPath === 'N/A') {
                        let i = 2;
                        while (this.configFileStructure.assets[this.configLang].file(newAssetName)) {
                            // If the updated name is the same as a file that already exists in the current langs asset folder,
                            // we must compare that file with the uploaded file, since they wouldnt have been compared
                            // on the first run due to having different names
                            if (i > 2) {
                                const filesEqual = await this.compareFiles(
                                    file,
                                    this.configFileStructure.assets[this.configLang].file(newAssetName),
                                    newAssetName
                                );
                                if (filesEqual) break;
                            }
                            newAssetName = `${file.name.split('.').at(0)}(${i}).${file.name.split('.').at(-1)}`;
                            i++;
                        }
                    }
                }
                uploadSource = `${this.configFileStructure.uuid}/assets/${this.configLang}/${newAssetName}`;
                this.configFileStructure.assets[this.configLang].file(newAssetName, file);
            }

            // Notify user of the change in the name of their uploaded asset, to avoid any confusion
            if (file.name !== newAssetName) {
                Message.info(this.$t('editor.slides.assetNameChange', { oldName: file.name, newName: newAssetName }));
            }

            if (this.sourceCounts[uploadSource]) {
                this.sourceCounts[uploadSource] += 1 + oppositeSourceCount;
            } else {
                this.sourceCounts[uploadSource] = 1 + oppositeSourceCount;
            }

            return { inSharedAsset, newAssetName, uploadSource };
        },

        /**
         * Updates the source of an asset from the opposite lang's assets folder to the shared assets folder
         *
         * @param oppositeAssetPath Path of the asset within the opposite langs asset folder that has been moved
         * @param sharedAssetName Path of the asset within the shared asset folder
         * @param oppositeLang Language from which the asset was removed
         */
        updateToSharedAsset(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string): void {
            const oppositeConfig = this.configs[oppositeLang];

            const updateAssetSrc = (
                panel: ImagePanel | VideoPanel,
                oppositeAssetPath: string,
                sharedAssetPath: string
            ) => {
                if (panel.src) {
                    if (panel.src === oppositeAssetPath) {
                        panel.src = sharedAssetPath;
                    }
                }
            };

            // Need to check logo seperately
            if (oppositeConfig.introSlide.logo.src === oppositeAssetPath) {
                oppositeConfig.introSlide.logo.src = sharedAssetPath;
            }

            oppositeConfig?.slides.forEach((slide) => {
                slide.panel.forEach((panel) => {
                    this.panelHelper(panel, updateAssetSrc, oppositeAssetPath, sharedAssetPath);
                });
            });

            this.updateSaveStatus(true);
        },
        /**
         * Executes a callback for each ImagePanel/VideoPanel within the provided BasePanel
         *
         * @param panel The panel which we are processing
         * @param callback The callback function that is called on each ImagePanel/VideoPanel in the provided BasePanel
         * @param callbackArgs The additional argument(s) for the callback function (can be empty)
         */
        panelHelper(
            panel: BasePanel,
            callback: (panel: ImagePanel | VideoPanel, ...args) => void,
            ...callbackArgs
        ): void {
            switch (panel.type) {
                case 'slideshowImage':
                case 'slideshow':
                    panel.items.forEach((item) => this.panelHelper(item, callback, ...callbackArgs));
                    break;
                case 'dynamic':
                    panel.children.forEach((child) => this.panelHelper(child.panel, callback, ...callbackArgs));
                    break;
                case 'image':
                case 'chart':
                case 'video':
                case 'map':
                    callback(panel, ...callbackArgs);
            }
        }
    }
});
