import { ConfigFileStructure, MetadataContent, MultiLanguageSlide, SourceCounts, StoryRampConfig } from '@/definitions';
import { defineStore } from 'pinia';
import JSZip from 'jszip';

import Message from 'vue-m-message';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import axios from 'axios';
import { AxiosResponse } from 'axios';

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
import { useUserStore } from './userStore';
import { useLockStore } from './lockStore';
import { useEditorStore } from './editorStore';

import router from '../router';
import { vfm } from '../plugins/vfm/index';
import cloneDeep from 'clone-deep';

interface ProductState {
    configFileStructure: ConfigFileStructure;
    configs: { [key: string]: StoryRampConfig | undefined };
    slides: MultiLanguageSlide[];
    sourceCounts: SourceCounts;
    debounceTimer: ReturnType<typeof setTimeout> | null;
    i18n: any;
    metadata: MetadataContent;
    temporaryMetadataCopy: MetadataContent;
    uuid: string;
    user: string;
    i18n: any;
    logoImage: undefined | File;
    introBgImage: undefined | File;
    apiUrl: string;
    latestSchemaVersion: string;
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        configFileStructure: {} as ConfigFileStructure,
        configs: { en: undefined, fr: undefined },
        slides: [] as MultiLanguageSlide[],
        sourceCounts: {},
        metadata: {
            title: '',
            introTitle: '',
            introSubtitle: '',
            logoPreview: '',
            logoName: '',
            logoAltText: '',
            introBgName: '',
            introBgPreview: '',
            titleColour: '#1f2937',
            subtitleColour: '#6b7280',
            buttonColour: '#00d2d3',
            contextLink: '',
            contextLabel: '',
            tocOrientation: '',
            returnTop: true,
            sameConfig: true,
            dateModified: '',
            schemaVersion: ''
        } as MetadataContent,
        temporaryMetadataCopy: {
            // A copy to save changes before edit, so they can be reverted
            title: '',
            introTitle: '',
            introSubtitle: '',
            logoPreview: '',
            logoName: '',
            logoAltText: '',
            introBgName: '',
            introBgPreview: '',
            titleColour: '',
            subtitleColour: '',
            buttonColour: '',
            contextLink: '',
            contextLabel: '',
            tocOrientation: '',
            returnTop: true,
            sameConfig: true,
            dateModified: '',
            schemaVersion: ''
        } as MetadataContent,
        i18n: useI18n(),
        uuid: '',
        user: computed(() => useUserStore().userProfile.userName || 'Guest'),
        logoImage: undefined as undefined | File,
        introBgImage: undefined as undefined | File,
        apiUrl: import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040',
        latestSchemaVersion: ''
    }),
    getters: {
        folders: (state: ProductState) => {
            return {
                assets: state.configFileStructure?.assets,
                charts: state.configFileStructure?.charts,
                rampConfig: state.configFileStructure?.rampConfig
            };
        }
    },
    actions: {
        /**
         * Called when loading a nonexistant or invalid UUID. Clears all previously populated
         * metadata fields, configs, and slide content.
         */
        clearConfig(): void {
            this.metadata = {
                title: '',
                introTitle: '',
                introSubtitle: '',
                titleColour: '#1f2937',
                subtitleColour: '#6b7280',
                buttonColour: '#00d2d3',
                contextLink: '',
                contextLabel: '',
                dateModified: '',
                logoPreview: '',
                logoName: '',
                logoAltText: '',
                tocOrientation: '',
                returnTop: true,
                sameConfig: true
            };
            this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
            this.configs = { en: undefined, fr: undefined };
            this.slides = [];
        },

        /**
         * Used to clear product data after exiting the editor
         */
        clearData(): void {
            const editorStore = useEditorStore();
            this.clearConfig();
            this.configFileStructure = {} as ConfigFileStructure;
            this.sourceCounts = {};
            this.uuid = '';
            this.logoImage = undefined as undefined | File;
            this.introBgImage = undefined as undefined | File;
            editorStore.clearData();
        },

        processAsset(assetPath: string | undefined, name: string): Promise<any> {
            if (!assetPath) return Promise.resolve();

            // Load asset (if provided).
            return new Promise((resolve, reject) => {
                const assetSrc = assetPath.split('/').slice(1).join('/'); // Omit product UUID
                const assetFile = this.configFileStructure.zip.file(assetSrc);
                const assetType = assetSrc.split('.').at(-1);

                if (assetFile) {
                    if (assetType !== 'svg') {
                        assetFile
                            .async('blob')
                            .then((img: Blob) => {
                                resolve({
                                    file: new File([img], name),
                                    preview: URL.createObjectURL(img),
                                    external: false // indicates that this asset lives in the ZIP folder
                                });
                            })
                            .catch(reject);
                    } else {
                        assetFile
                            .async('text')
                            .then((img) => {
                                const assetImageFile = new File([img], name, {
                                    type: 'image/svg+xml'
                                });
                                resolve({
                                    file: assetImageFile,
                                    preview: URL.createObjectURL(assetImageFile),
                                    external: false
                                });
                            })
                            .catch(reject);
                    }
                } else {
                    // If it doesn't exist, maybe it's a remote file?
                    fetch(assetPath)
                        .then((data: Response) => {
                            if (data.status !== 404) {
                                data.blob().then((blob: Blob) => {
                                    resolve({
                                        file: new File([blob], name),
                                        preview: assetPath,
                                        external: true // indicates that this is an external asset
                                    });
                                });
                            } else {
                                resolve(); // resolve on 404 error, so that productStore.loadStatus gets set to loaded
                            }
                        })
                        .catch(reject);
                }
            });
        },

        configHelper(): StoryRampConfig {
            const editorStore = useEditorStore();
            return {
                title: this.metadata.title,
                schemaVersion: '',
                lang: editorStore.configLang,
                introSlide: {
                    logo: {
                        src: ''
                    },
                    backgroundImage: '',
                    title: this.metadata.introTitle,
                    subtitle: this.metadata.introSubtitle,
                    titleColour: this.metadata.titleColour,
                    subtitleColour: this.metadata.subtitleColour,
                    buttonColour: this.metadata.buttonColour
                },
                slides: [],
                contextLabel: this.metadata.contextLabel,
                contextLink: this.metadata.contextLink,
                tocOrientation: this.metadata.tocOrientation,
                returnTop: this.metadata.returnTop,
                sameConfig: this.metadata.sameConfig,
                dateModified: this.metadata.dateModified
            };
        },

        useConfig(config: StoryRampConfig): void {
            return new Promise((resolve, reject) => {
                const editorStore = useEditorStore();
                this.metadata.title = config.title;
                this.metadata.introTitle = config.introSlide.title;
                this.metadata.introSubtitle = config.introSlide.subtitle;
                this.metadata.titleColour = config.introSlide.titleColour ?? '#1f2937';
                this.metadata.subtitleColour = config.introSlide.subtitleColour ?? '#6b7280';
                this.metadata.buttonColour = config.introSlide.buttonColour ?? '#00d2d3';
                this.metadata.contextLink = config.contextLink;
                this.metadata.contextLabel = config.contextLabel;
                this.metadata.tocOrientation = config.tocOrientation;
                this.metadata.returnTop = config.returnTop ?? true;
                this.metadata.sameConfig = config.sameConfig ?? true;
                this.metadata.dateModified = config.dateModified;
                this.metadata.schemaVersion = config.schemaVersion;

                // TODO: check schema version in the config, and if it doesn't match the current version in the schema (stored in
                // this.latestSchemaVersion), the product's local repo should be re-initialized

                this.loadSlides(this.configs);

                // Load product logo and the introduction slide background image (if provided).
                const logoAsset = config.introSlide.logo?.src;
                const introBgAsset = config.introSlide.backgroundImage;
                const logoName = logoAsset ? logoAsset.split('/')[logoAsset.split('/').length - 1] : '';
                const introBgName = introBgAsset ? introBgAsset.split('/')[introBgAsset.split('/').length - 1] : '';
                // Load in the data from the logo and intro slide background image. If one of these assets is missing, the promise will resolve with undefined.
                Promise.all([
                    this.processAsset(logoAsset, logoName).then((logoData) => {
                        if (logoData) {
                            this.metadata.logoAltText = config.introSlide.logo?.altText
                                ? config.introSlide.logo.altText
                                : '';
                            this.logoImage = logoData.file;
                            this.metadata.logoPreview = logoData.preview;
                            this.metadata.logoName = logoName;
                        } else {
                            // If there's no logo, mark the product as loaded and remove any existing logos
                            this.metadata.logoName = '';
                            this.metadata.logoPreview = '';
                        }
                    }),

                    this.processAsset(introBgAsset, introBgName).then((introBgData) => {
                        if (introBgData) {
                            this.introBgImage = introBgData.file;
                            this.metadata.introBgPreview = introBgData.preview;
                            this.metadata.introBgName = introBgName;
                        } else {
                            this.metadata.introBgName = '';
                            this.metadata.introBgPreview = '';
                        }
                    })
                ])
                    .then(() => {
                        // Once assets are loaded, set status to loaded.
                        editorStore.loadStatus = 'loaded';
                        // Load the temp copy of the metadata
                        this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
                        resolve();
                    })
                    .catch(reject);
            });
        },

        /**
         * Loads the slide variable with both EN and FR language configs.
         * @param configs The config object with separate EN and FR StoryRamp configs.
         */
        loadSlides(configs: { [p: string]: StoryRampConfig | undefined }): void {
            const engSlides =
                configs.en?.slides.map((engSlide) => {
                    return {
                        // "Undefined" slides will be the undefined type while inside Storylines Editor, and {} on save/in file.
                        en: engSlide && Object.keys(engSlide).length ? (engSlide as Slide) : undefined
                    };
                }) ?? [];
            const frSlides =
                configs.fr?.slides.map((frSlide) => {
                    return {
                        // "Undefined" slides will be the undefined type while inside Storylines Editor, and {} on save/in file.
                        fr: frSlide && Object.keys(frSlide).length ? (frSlide as Slide) : undefined
                    };
                }) ?? [];

            const maxLength = frSlides.length > engSlides.length ? frSlides.length : engSlides.length;
            this.slides = Array.from({ length: maxLength }, (_, index) =>
                Object.assign({}, engSlides?.[index] || { en: undefined }, frSlides?.[index] || { fr: undefined })
            );
            // this.configs.en.slides = this.slides.map((slide) => slide.en);
            // this.configs.fr.slides = this.slides.map((slide) => slide.fr);
        },

        /**
         * Loads a configuration file from the product folder, and sets application data
         * as needed.
         * @param config the configuration object to load.
         */
        async loadConfig(config?: StoryRampConfig): Promise<void> {
            const editorStore = useEditorStore();
            const stateStore = useStateStore();

            if (config) {
                await this.useConfig(config);
                return;
            }

            // Fix various problems inside the config before load
            // Add more as they're discovered
            const fixConfigProblems = (config: StoryRampConfig) => {
                config.slides.forEach((slide) => {
                    // If the slide has an undefined value for includeInToc, it's treated as true (as the schema wishes)
                    // This change prevents state management detection issues (undefined != true when compared)
                    slide.includeInToc = slide.includeInToc === undefined ? true : slide.includeInToc;
                });

                return config;
            };

            try {
                const stateSave = { en: {}, fr: {} };

                const enFile = this.configFileStructure.zip.file(`${this.uuid}_en.json`);
                const frFile = this.configFileStructure.zip.file(`${this.uuid}_fr.json`);
                await enFile?.async('string').then((res: string) => {
                    const config = fixConfigProblems(JSON.parse(res));
                    this.configs['en'] = config;
                    stateSave.en = JSON.parse(JSON.stringify(config));

                    // Check if config contains a link to the default stylesheet, and if so add it in (only if it doesn't
                    // already contain it)
                    // TODO: Fix (current implementation breaks state management)
                    // if (!this.configs['en'].stylesheets) {
                    //     this.configs['en'].stylesheets = [`${this.uuid}/styles/main.css`];
                    // } else if (!this.configs['en'].stylesheets.includes(`${this.uuid}/styles/main.css`)) {
                    //     this.configs['en'].stylesheets.push([`${this.uuid}/styles/main.css`]);
                    // }
                });
                await frFile?.async('string').then((res: string) => {
                    const config = fixConfigProblems(JSON.parse(res));
                    this.configs['fr'] = config;
                    stateSave.fr = JSON.parse(JSON.stringify(this.configs['fr']));

                    // Check if config contains a link to the default stylesheet, and if so add it in (only if it doesn't
                    // already contain it)
                    // TODO: Fix (current implementation breaks state management)
                    // if (!this.configs['fr'].stylesheets) {
                    //     this.configs['fr'].stylesheets = [`${this.uuid}/styles/main.css`];
                    // } else if (!this.configs['fr'].stylesheets.includes(`${this.uuid}/styles/main.css`)) {
                    //     this.configs['fr'].stylesheets.push([`${this.uuid}/styles/main.css`]);
                    // }
                });
                stateStore.save(stateSave as Save);
            } catch {
                Message.error(this.i18n.t('editor.editMetadata.message.error.malformedProduct', this.uuid ?? ''));
                this.loadStatus = 'waiting';
                this.clearConfig();
                return;
            }

            this.loadStatus = 'loaded';

            // Load in project data.
            const configLang = editorStore.configLang;
            if (this.configs[configLang]) {
                await this.useConfig(this.configs[configLang] as StoryRampConfig);
                this.findSources(); // increments source counts for all panels

                // Update router path
                if (editorStore.reloadExisting) {
                    this.loadEditor = true;
                    stateStore.isChanged = false;
                    router.push({ name: 'editor', params: { uid: this.uuid } });
                } else if (!editorStore.loadExisting) {
                    this.loadEditor = true;
                    router.push({ name: 'editor', params: { uid: this.uuid } });
                }
            }
        },

        /**
         * Provided with a UID and version, retrieve the project contents from the file server.
         */
        loadVersion(version: string): Promise<void> {
            return new Promise((resolve, reject) => {
                const lockStore = useLockStore();
                const editorStore = useEditorStore();

                if (this.uuid === undefined || this.uuid === '') {
                    Message.error(this.i18n.t('editor.warning.mustEnterUuid'));
                    editorStore.loadStatus = 'waiting';
                    reject();
                    return;
                }
                // Create a new AbortController for each fetch attempt
                // as they get 'used up' after each successful abort() call
                editorStore.controller = new AbortController();
                editorStore.loadStatus = 'loading';
                const secret = lockStore.secret;
                fetch(this.apiUrl + `/retrieve/${this.uuid}/${version}`, {
                    headers: { user: this.user, secret: secret },
                    signal: editorStore.controller.signal
                })
                    .then((res: Response) => {
                        if (res.status === 404) {
                            // Version not found.
                            if (version === 'latest') {
                                Message.error(
                                    this.i18n.t('editor.warning.uuidNotFound', { uuid: this.productStore.uuid })
                                );
                            } else {
                                Message.error(this.i18n.t('editor.editMetadata.message.error.noRequestedVersion'));
                            }
                            editorStore.error = true;
                            editorStore.warning = 'uuidNotFound';
                            editorStore.loadStatus = 'waiting';
                            this.clearConfig();
                            // Product was not found, unlock the UUID
                            lockStore.unlockStoryline();
                            reject();
                        } else {
                            const configZip = new JSZip();
                            // Files retrieved. Convert them into a JSZip object.
                            res.blob()
                                .then((file: Blob) => {
                                    configZip
                                        .loadAsync(file)
                                        .then(() => {
                                            this.configFileStructureHelper(configZip).then(() => {
                                                // Extend the session on load
                                                editorStore.extendSession();
                                                editorStore.error = false;
                                                editorStore.warning = 'none';
                                                editorStore.loadStatus = 'loaded';
                                                this.retreiveMessages(); // TODO: Should this run only on product fetch or also on version fetch?
                                                resolve();
                                            });
                                        })
                                        // Need to ensure we fail gracefully
                                        .catch((error) => {
                                            Message.error(this.i18n.t('editor.warning.serverError'));
                                            console.log(error.response || error);
                                            editorStore.error = true;
                                            editorStore.loadStatus = 'waiting';
                                            lockStore.unlockStoryline();
                                            reject();
                                        });
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        if (err.name === 'AbortError' || err instanceof PointerEvent) {
                            Message.info(this.i18n.t('editor.editMetadata.retrievalAborted'));
                        } else {
                            Message.error(this.i18n.t('editor.warning.retrievalFailed'));
                        }
                        editorStore.loadStatus = 'waiting';
                        // Unlock the UUID if loading failed
                        lockStore.unlockStoryline();
                        reject();
                    });
            });
        },

        createMainStyles(configZip: typeof JSZip): Promise<void> {
            return new Promise((resolve, reject) => {
                const existingStyles = configZip.folder('styles').file('main.css');

                if (existingStyles) {
                    // need to ensure the classes in this css file are not the same as the default ones...
                    existingStyles
                        .async('text')
                        .then((res) => {
                            let styles = '';
                            if (!res.includes('centerPanel')) {
                                styles += `.centerPanel {\n\ttext-align: center;\n}\n\n`;
                            }
                            if (!res.includes('centerSlideLeft')) {
                                styles += `.centerSlideLeft {\n\ttext-align: left;\n}\n\n`;
                            }
                            if (!res.includes('centerSlideRight')) {
                                styles += `.centerSlideRight {\n\ttext-align: right;\n}\n\n`;
                            }
                            if (!res.includes('centerSlideFull')) {
                                styles += `.centerSlideFull {\n\ttext-align: center;\n}\n\n`;
                            }
                            styles += res;
                            configZip.folder('styles').file('main.css', styles);
                            resolve();
                        })
                        .catch(reject);
                } else {
                    const styles = `.centerPanel {\n\ttext-align: center;\n}\n\n.centerSlideLeft {\n\ttext-align: left;\n}\n
.centerSlideRight {\n\ttext-align: right;\n}\n\n.centerSlideFull {\n\ttext-align: center;\n}\n\n`;
                    configZip.folder('styles').file('main.css', styles);
                    resolve();
                }
            });
        },

        /**
         * Generates or loads a ZIP file and creates required project folders if needed.
         * Returns an object that makes it easy to access any specific folder.
         */
        async configFileStructureHelper(
            configZip: typeof JSZip,
            uuidCheck: boolean = true,
            uploadFiles?: Array<File | undefined>
        ): Promise<void> {
            return new Promise((resolve, reject) => {
                const editorStore = useEditorStore();

                const assetsFolder = configZip.folder('assets');
                const chartsFolder = configZip.folder('charts');
                const rampConfigFolder = configZip.folder('ramp-config');
                const styles = configZip.folder('styles');
                this.createMainStyles(configZip)
                    .then(() => {
                        this.configFileStructure = {
                            uuid: this.uuid,
                            zip: configZip,
                            configs: this.configs as { [key: string]: StoryRampConfig },
                            assets: {
                                en: (assetsFolder as JSZip).folder('en') as JSZip,
                                fr: (assetsFolder as JSZip).folder('fr') as JSZip,
                                shared: (assetsFolder as JSZip).folder('shared') as JSZip
                            },
                            charts: {
                                en: (chartsFolder as JSZip).folder('en') as JSZip,
                                fr: (chartsFolder as JSZip).folder('fr') as JSZip
                            },
                            rampConfig: rampConfigFolder as JSZip,
                            styles: styles as JSZip
                        };

                        // Upload each file in the `uploadFiles` array to the shared ZIP folder (due to cloning of configs in
                        // generateNewConfig()). This is typically (and currently only) used for the product logo and the introduction
                        // slide background image.
                        if (uploadFiles !== undefined) {
                            uploadFiles.forEach((file) => {
                                if (file) {
                                    this.configFileStructure.assets['shared'].file(file?.name, file);
                                }
                            });
                        }
                        if (uuidCheck) return editorStore.correctUuid();
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },

        onSaveFinish(): void {
            const editorStore = useEditorStore();
            const lockStore = useLockStore();

            // Padding to prevent save button from being clicked rapidly
            setTimeout(() => {
                editorStore.editorSaving = false;
                // Extend the session on save if this is not the final save (after the session has expired).
                // Otherwise redirect to the home page.
                if (editorStore.sessionExpired) {
                    this.clearData();
                    router.push({ name: 'homeExpired' });
                } else {
                    editorStore.extendSession(true);
                    lockStore.broadcast?.postMessage({ action: 'saved' });
                }

                // This may be necessary to allow for changes to be properly detected after saving.
                // Without it, even attempted changes (e.g. keypress in an input field) are no longer detected, and the potential change handlers
                // aren't even run.
                // There's likely a better solution, please add if you find it.
                // Update: this call redefines `config` and `slides`, which removes the pointer `currentSlide` had within
                // `slides`
                //this.loadConfig();
            }, 500);
        },

        /**
         * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
         * with the new changes, and if `publish` is set to true, generates and submits the product file to the server.
         */
        generateConfig(publish = true): Promsie<ConfigFileStructure> {
            const editorStore = useEditorStore();
            const lockStore = useLockStore();
            const stateStore = useStateStore();

            lockStore.broadcast?.postMessage({ action: 'saving' });
            editorStore.editorSaving = true;

            // Clear any session timeouts, don't want the app to exit while saving, duh
            clearTimeout(lockStore.confirmationTimeout);
            clearTimeout(lockStore.endTimeout);

            // Prevent session from extending on activity while save is in progress
            document.onmousemove = () => undefined;
            document.onkeydown = () => undefined;

            // Update the configuration files, for both languages.
            const engFileName = `${this.uuid}_en.json`;
            const frFileName = `${this.uuid}_fr.json`;

            // Replace undefined slides with empty objects
            if (this.configs.en) {
                this.configs.en.slides = this.configs.en.slides.map((slide) => {
                    return slide ?? {};
                });
            }

            if (this.configs.fr) {
                this.configs.fr.slides = this.configs.fr.slides.map((slide) => {
                    return slide ?? {};
                });
            }

            this.loadSlides(this.configs);

            // TODO: Should we make stateStore save on every generateConfig activation, or just on pubish = true??
            stateStore.save({ en: this.configs.en, fr: this.configs.fr });

            const engFormattedConfigFile = JSON.stringify(this.configs.en, null, 4);
            const frFormattedConfigFile = JSON.stringify(this.configs.fr, null, 4);

            this.configFileStructure.zip.file(engFileName, engFormattedConfigFile);
            this.configFileStructure.zip.file(frFileName, frFormattedConfigFile);

            return new Promise((resolve, reject) => {
                // Upload the ZIP file.
                if (publish) {
                    this.configFileStructure?.zip
                        .generateAsync({ type: 'blob' })
                        .then((content: Blob) => {
                            const formData = new FormData();
                            formData.append('data', content, `${this.uuid}.zip`);
                            const headers = {
                                'Content-Type': 'multipart/form-data',
                                user: this.user,
                                secret: lockStore.secret
                            };
                            Message.warning(this.i18n.t('editor.editMetadata.message.wait'));

                            return this.uploadProductData(formData, headers);
                        })
                        .then(() => {
                            editorStore.loadExisting = true; // newly created product that was saved now exists
                            resolve(this.configFileStructure as ConfigFileStructure);
                        });
                } else {
                    editorStore.handleSessionTimeout();
                    lockStore.broadcast?.postMessage({ action: 'saved' });
                    editorStore.editorSaving = false;
                    resolve(this.configFileStructure as ConfigFileStructure);
                }
            });
        },

        /**
         * Helper for generateConfig(). Calls the /upload endpoing to upload the product to the server
         */
        uploadProductData(formData, headers): Promsie<void> {
            const editorStore = useEditorStore();
            const lockStore = useLockStore();

            return axios
                .post(this.apiUrl + `/upload/${this.uuid}`, formData, { headers })
                .then((res: AxiosResponse) => {
                    const responseData = res.data;
                    responseData.files; // binary representation of the file
                    responseData.status; // HTTP status
                    const commitHash = responseData.commitHash; // commit hash of the git commit
                    editorStore.loadExisting = true; // if editExisting was false, we can now set it to true

                    if (import.meta.env.VITE_APP_CURR_ENV) {
                        if (responseData.new) {
                            this.registerUser(formData, commitHash);
                        } else {
                            this.retreiveMessages(formData, commitHash).finally(() => {
                                // Record version in the .NET API only if a commit actually occurred in the git repo
                                if (responseData.committed) {
                                    formData.append('uuid', this.uuid);
                                    formData.append('titleEn', this.configs['en']?.title ?? '');
                                    formData.append('titleFr', this.configs['fr']?.title ?? '');
                                    formData.append('commitHash', commitHash);
                                    formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                                    return axios
                                        .post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit', formData)
                                        .then((response: any) => {
                                            Message.success(this.i18n.t('editor.editMetadata.message.successfulSave'));
                                        })
                                        .catch((error: any) => console.log(error.response || error))
                                        .finally(() => {
                                            this.onSaveFinish();
                                        });
                                } else {
                                    Message.warning(this.i18n.t('editor.editMetadata.message.noSave'));
                                    this.onSaveFinish();
                                }
                            });
                        }
                    } else {
                        if (responseData.committed) {
                            Message.success(this.i18n.t('editor.editMetadata.message.successfulSave'));
                        } else {
                            Message.warning(this.i18n.t('editor.editMetadata.message.noSave'));
                        }
                        this.onSaveFinish();
                    }
                })
                .catch(() => {
                    Message.error(this.i18n.t('editor.editMetadata.message.error.failedSave'));
                    editorStore.handleSessionTimeout();
                    lockStore.broadcast?.postMessage({ action: 'saved' });
                });
        },

        /**
         * Helper for uploadProductData(). Used to register the user in the SQL server db
         */
        registerUser(formData, commitHash): Promise<void> {
            return axios
                .post(import.meta.env.VITE_APP_NET_API_URL + '/api/user/register', {
                    uuid: this.uuid,
                    titleEn: this.configs['en']?.title ?? '',
                    titleFr: this.configs['fr']?.title ?? ''
                })
                .then((response: any) => {
                    const userStore = useUserStore();
                    userStore.fetchUserProfile();
                    formData.append('uuid', this.uuid);
                    formData.append('titleEn', this.configs['en']?.title ?? '');
                    formData.append('titleFr', this.configs['fr']?.title ?? '');
                    formData.append('commitHash', commitHash);
                    formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                    return axios
                        .post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit', formData)
                        .then((response: any) => {
                            Message.success(this.i18n.t('editor.editMetadata.message.successfulSave'));
                        })
                        .catch((error: any) => console.log(error.response || error))
                        .finally(() => {
                            this.onSaveFinish();
                        });
                })
                .catch((error: any) => console.log(error.response || error));
        },

        /**
         * Helper that retrieves and logs messages
         */
        retreiveMessages(): Promise<void> {
            return fetch(this.apiUrl + `/retrieveMessages`)
                .then((res: any) => {
                    if (res.ok) return res.json();
                })
                .then((data) => {
                    if (import.meta.env.VITE_APP_CURR_ENV) {
                        return axios
                            .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                messages: data.messages
                            })
                            .catch((error: any) => console.log(error.response || error));
                    }
                })
                .catch((error: any) => console.log(error.response || error));
        },

        /**
         * Conducts various checks before saving.
         */
        onSave(): Promise<void> {
            // Currently allowing undefined configs & handling them elsewhere
            // If that changes in the future, can detect for undefined configs and warn user here
            return this.generateConfig();
        },
        /**
         * Provided with a UID, retrieve the project contents from the file server.
         */
        generateRemoteConfig(): Promise<void> {
            const editorStore = useEditorStore();
            const lockStore = useLockStore();
            // Reset fields
            editorStore.changeUuid = '';

            // Attempt to fetch the project from the server.
            return new Promise((resolve, reject) => {
                // Clear any lingering timeouts, don't want to exit while stuff is loading.
                clearTimeout(lockStore.confirmationTimeout);
                clearTimeout(lockStore.endTimeout);

                // Before loading the product, we need to try and get its "lock".
                // If successful i.e. the product is free to use, we load the product.
                // If not i.e. another user is using it right now, we show an error message.
                lockStore
                    .lockStoryline(this.uuid)
                    .then(() => {
                        lockStore.broadcast.onmessage = (e) => {
                            // session was extended from the preview tab, need to handle in editor tab
                            const msg = e.data;
                            if (msg.action === 'extend') {
                                vfm.close('confirm-extend-session-editor');
                                editorStore.extendSession(msg.showPopup);
                            }
                        };
                        editorStore.loadStatus = 'loading';
                        editorStore.error = false;

                        // Reset fields
                        editorStore.changeUuid = '';

                        // Attempt to fetch the project from the server.
                        this.loadVersion('latest').then(resolve).catch(reject);
                    })
                    .catch(() => {
                        editorStore.error = true;
                        editorStore.loadStatus = 'waiting';
                        this.clearConfig();
                        Message.error(this.i18n.t('editor.editMetadata.message.error.unauthorized'));
                        // If someone was loading the main editor tab directly and another user is accessing the
                        // product, redirect them to the home page.
                        if (router.currentRoute.value.name === 'editor') {
                            setTimeout(() => {
                                router.push({ name: 'home' });
                            }, 2000);
                        }
                    });
            });
        },
        /**
         * Called when `Save Changes` or `Next` (for existing products only) is pressed on metadata page, as well as when
         * `Done` is pressed in the metadata editor within editor-main. Save metadata content fields to config file. If
         * `publish` is set to true, publish to server as well.
         */
        async saveMetadata(publish = false, swapLang = false): Promise<void> {
            const editorStore = useEditorStore();
            // update metadata content to existing config only if it has been successfully loaded
            const config = this.configs[editorStore.configLang];
            if (config !== undefined) {
                config.title = this.metadata.title;
                config.introSlide.title = this.metadata.introTitle;
                config.introSlide.subtitle = this.metadata.introSubtitle;
                config.introSlide.titleColour = this.metadata.titleColour;
                config.introSlide.subtitleColour = this.metadata.subtitleColour;
                config.introSlide.buttonColour = this.metadata.buttonColour;
                config.contextLink = this.metadata.contextLink;
                config.contextLabel = this.metadata.contextLabel;
                config.tocOrientation = this.metadata.tocOrientation;
                config.returnTop = this.metadata.returnTop;
                config.sameConfig = this.metadata.sameConfig;
                config.dateModified = this.metadata.dateModified;

                // Changing TOC orientation and return-to-top navigation for one language also changes for other language.
                // Changes only if the 'Same across configurations' toggle is true.
                const otherLang = editorStore.oppositeLang;
                const otherConfig = this.configs[otherLang];
                if (otherConfig) {
                    otherConfig.sameConfig = this.metadata.sameConfig;

                    if (this.metadata.sameConfig) {
                        otherConfig.tocOrientation = this.metadata.tocOrientation;
                        otherConfig.returnTop = this.metadata.returnTop;
                    }
                }

                // If the logo section is missing, create it here before overwriting values.
                if (config.introSlide.logo === undefined) {
                    config.introSlide.logo = { src: '', altText: '' };
                }

                config.introSlide.logo.altText = this.metadata.logoAltText;

                // If the logo doesn't include HTTP, assume it's a local file.
                if (!this.metadata.logoName) {
                    config.introSlide.logo.src = '';
                } else if (!this.metadata.logoName.includes('http')) {
                    await this.uploadAsset(this.logoImage as File, config, 'logo');
                } else {
                    config.introSlide.logo.src = this.metadata.logoName;
                }

                // If the introduction slide's background image doesn't include HTTP, assume it's a local file.
                if (!this.metadata.introBgName) {
                    config.introSlide.backgroundImage = '';
                } else if (!this.metadata.introBgName.includes('http')) {
                    await this.uploadAsset(this.introBgImage as File, config, 'backgroundImage');
                } else {
                    config.introSlide.backgroundImage = this.metadata.introBgName;
                }

                if (publish) {
                    this.generateConfig();
                    this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
                    editorStore.editingMetadata = false;
                }

                if (!swapLang) {
                    const userStore = useUserStore();
                    userStore.fetchUserProfile();
                }

                editorStore.updateSaveStatus(true, 'Save metadata');
            }
            if (!swapLang) {
                editorStore.configLang = (router.currentRoute.value.params.lang as string) || 'en';
                vfm.close('metadata-edit-modal');
            }
        },
        updateMetadata<K extends keyof MetadataContent>(key: K, value: MetadataContent[K]): void {
            const editorStore = useEditorStore();
            this.metadata[key] = value;
            editorStore.updateSaveStatus(true, 'Update metadata');
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
        },

        // Decrements the source count for the provided source. If the count is 0, the source is removed.
        decrementSourceCount(src: string | undefined | 'Logo' | 'Background'): void {
            const editorStore = useEditorStore();
            if (src === 'Logo') {
                src = this.configs[editorStore.configLang]?.introSlide.logo.src;
            }

            if (src === 'Background') {
                src = this.configs[editorStore.configLang]?.introSlide.backgroundImage;
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

                this.configs[lang]?.slides?.forEach((slide) => {
                    if (Object.keys(slide).length !== 0) {
                        (slide as Slide).panel?.forEach((panel) => {
                            this.panelSourceHelper(panel);
                        });
                    }
                });
            });
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
                    // eslint-disable-next-line no-fallthrough
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
         * Generates a new product file for brand new products.
         */
        generateNewConfig(): Promise<void> {
            console.log(' ');
            console.log('generateNewConfig()');
            const editorStore = useEditorStore();

            const configLang = editorStore.configLang;
            const configZip = new JSZip();
            // Generate a new configuration file and populate required fields.
            this.configs[configLang] = this.configHelper();
            const config = this.configs[configLang] as StoryRampConfig;
            config.introSlide.logo.altText = this.metadata.logoAltText ?? '';
            config.schemaVersion = this.latestSchemaVersion;

            // Set the source of the product logo
            if (!this.metadata.logoName) {
                config.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                config.introSlide.logo.src = `${this.uuid}/assets/shared/${this.logoImage?.name}`;
            } else {
                config.introSlide.logo.src = this.metadata.logoName;
            }

            // Set the source of the introduction slide background image
            if (!this.metadata.introBgName) {
                config.introSlide.backgroundImage = '';
            } else if (!this.metadata.introBgName.includes('http')) {
                config.introSlide.backgroundImage = `${this.uuid}/assets/shared/${this.introBgImage?.name}`;
            } else {
                config.introSlide.backgroundImage = this.metadata.introBgName;
            }

            config.slides = [];

            const otherLang = editorStore.oppositeLang;
            this.configs[otherLang] = cloneDeep(config);
            (this.configs[otherLang] as StoryRampConfig).lang = otherLang;
            const formattedOtherLangConfig = JSON.stringify(this.configs[otherLang], null, 4);

            // Add the newly generated Storylines configuration file to the ZIP file.
            const fileName = `${this.uuid}_${configLang}.json`;
            const formattedConfigFile = JSON.stringify(config, null, 4);

            configZip.file(fileName, formattedConfigFile);
            configZip.file(`${this.uuid}_${otherLang}.json`, formattedOtherLangConfig);

            // Generate the file structure, defer uploading the image until the structure is created.
            return this.configFileStructureHelper(configZip, [this.logoImage, this.introBgImage]);
        },

        /**
         * Generates a new product file for brand new products.
         * @param uuidCheck Passed to configFileStructureHelper to control UUID validation behavior.
         */
        generateNewConfig(uuidCheck: boolean = true): Promise<void> {
            const editorStore = useEditorStore();
            const configLang = editorStore.configLang;
            const configZip = new JSZip();

            // Generate a new configuration file and populate required fields.
            this.configs[configLang] = this.configHelper();
            const config = this.configs[configLang] as StoryRampConfig;
            config.introSlide.logo.altText = this.metadata.logoAltText ?? '';
            config.schemaVersion = this.latestSchemaVersion;

            // Set the source of the product logo
            if (!this.metadata.logoName) {
                config.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                config.introSlide.logo.src = `${this.uuid}/assets/shared/${this.logoImage?.name}`;
            } else {
                config.introSlide.logo.src = this.metadata.logoName;
            }

            // Set the source of the introduction slide background image
            if (!this.metadata.introBgName) {
                config.introSlide.backgroundImage = '';
            } else if (!this.metadata.introBgName.includes('http')) {
                config.introSlide.backgroundImage = `${this.uuid}/assets/shared/${this.introBgImage?.name}`;
            } else {
                config.introSlide.backgroundImage = this.metadata.introBgName;
            }

            config.slides = [];

            const otherLang = editorStore.oppositeLang;
            const baseConfig = (this.configs[otherLang] = cloneDeep(config));
            Object.assign(baseConfig, {
                title: '',
                lang: editorStore.oppositeLang,
                contextLink: '',
                contextLabel: '',
                introSlide: {
                    title: '',
                    subtitle: '',
                    logo: { src: '', altText: '' },
                    backgroundImage: ''
                }
            });
            const otherConfig = this.configs[otherLang] as StoryRampConfig;
            const formattedOtherLangConfig = JSON.stringify(otherConfig, null, 4);

            // Add the newly generated Storylines configuration file to the ZIP file.
            const formattedConfigFile = JSON.stringify(config, null, 4);

            configZip.file(`${this.uuid}_${configLang}.json`, formattedConfigFile);
            configZip.file(`${this.uuid}_${otherLang}.json`, formattedOtherLangConfig);

            // Generate the file structure, defer uploading the image until the structure is created.
            return this.configFileStructureHelper(configZip, uuidCheck, [this.logoImage, this.introBgImage]);
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
            file: File,
            disableSourceUpdate = false
        ): Promise<{
            inSharedAsset: boolean;
            newAssetName: string;
            uploadSource: string;
            oppositeSourceCount: number;
        }> {
            const editorStore = useEditorStore();
            const oppositeLang = editorStore.oppositeLang;

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
                const currAssetPaths = await Promise.all(this.filesInAssetFolder(file, editorStore.configLang, false));
                // Should contain either 0 or 1 promise.
                // Need to use await here
                for (const currAssetPath of currAssetPaths) {
                    // If asset w/ same name but different contents is in curr lang asset folder, set name in curr lang
                    // asset folder to a unique name, to avoid overwriting an existing file.
                    if (currAssetPath === 'N/A') {
                        let i = 2;
                        while (this.configFileStructure.assets[editorStore.configLang].file(newAssetName)) {
                            // If the updated name is the same as a file that already exists in the current langs asset folder,
                            // we must compare that file with the uploaded file, since they wouldnt have been compared
                            // on the first run due to having different names
                            if (i > 2) {
                                const filesEqual = await this.compareFiles(
                                    file,
                                    this.configFileStructure.assets[editorStore.configLang].file(newAssetName),
                                    newAssetName
                                );
                                if (filesEqual) break;
                            }
                            newAssetName = `${file.name.split('.').at(0)}(${i}).${file.name.split('.').at(-1)}`;
                            i++;
                        }
                    }
                }
                uploadSource = `${this.configFileStructure.uuid}/assets/${editorStore.configLang}/${newAssetName}`;
                this.configFileStructure.assets[editorStore.configLang].file(newAssetName, file);
            }

            // Notify user of the change in the name of their uploaded asset, to avoid any confusion
            if (file.name !== newAssetName) {
                Message.info(
                    this.i18n.t('editor.slides.assetNameChange', { oldName: file.name, newName: newAssetName })
                );
            }

            if (!disableSourceUpdate) {
                if (this.sourceCounts[uploadSource]) {
                    this.sourceCounts[uploadSource] += 1 + oppositeSourceCount;
                } else {
                    this.sourceCounts[uploadSource] = 1 + oppositeSourceCount;
                }
            }

            return { inSharedAsset, newAssetName, uploadSource, oppositeSourceCount };
        },

        /**
         * Updates the source of an asset from the opposite lang's assets folder to the shared assets folder
         *
         * @param oppositeAssetPath Path of the asset within the opposite langs asset folder that has been moved
         * @param sharedAssetName Path of the asset within the shared asset folder
         * @param oppositeLang Language from which the asset was removed
         */
        updateToSharedAsset(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string): void {
            const editorStore = useEditorStore();
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

            // Need to check logo seperately
            if (oppositeConfig.introSlide.backgroundImage === oppositeAssetPath) {
                oppositeConfig.introSlide.backgroundImage = sharedAssetPath;
            }

            oppositeConfig?.slides.forEach((slide) => {
                slide.panel.forEach((panel) => {
                    this.panelHelper(panel, updateAssetSrc, oppositeAssetPath, sharedAssetPath);
                });
            });

            editorStore.updateSaveStatus(true);
        },

        /**
         * Helper used to upload a new asset for the current langs config. Only needed when uploading a new asset to an
         * existing config (not when creating a new product). Here, an asset can either be a logo or a background image
         *
         * @param asset The asset being uploaded
         * @param config The config within which the asset was uploaded
         * @param type The type of asset being uploaded (either a logo or background image)
         */
        async uploadAsset(asset: File, config: StoryRampConfig, type: 'logo' | 'backgroundImage'): Promise<void> {
            const { inSharedAsset, newAssetName, uploadSource, oppositeSourceCount } = await this.addUploadedFile(
                asset,
                true
            );

            // Check if the asset src is the same as before. If it's not, then we increment the source count of the new
            // asset source. We also decrement source count of previous asset, as it has now been replaced
            if (type === 'backgroundImage') {
                if (config.introSlide.backgroundImage !== uploadSource) {
                    this.incrementSourceCount(uploadSource);
                    this.decrementSourceCount(config.introSlide.backgroundImage);
                    this.sourceCounts[uploadSource] += oppositeSourceCount;
                    config.introSlide.backgroundImage = uploadSource;
                }
            } else {
                if (config.introSlide.logo.src !== uploadSource) {
                    this.incrementSourceCount(uploadSource);
                    this.decrementSourceCount(config.introSlide.logo.src);
                    this.sourceCounts[uploadSource] += oppositeSourceCount;
                    config.introSlide.logo.src = uploadSource;
                }
            }
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
