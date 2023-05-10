<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="!loadEditor">
            <div class="px-20 py-5">
                <div class="flex">
                    <div class="flex text-2xl font-bold mb-5">
                        {{ editExisting ? $t('editor.editProduct') : $t('editor.createProduct') }}
                    </div>
                    <button @click="swapLang()">
                        {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                </div>

                <div class="border py-5 w-5/6">
                    <label
                        ><span class="text-red-500" v-if="'uuid' in reqFields">*</span> {{ $t('editor.uuid') }}:</label
                    >
                    <input
                        type="text"
                        @input="
                            error = false;
                            reqFields.uuid = true;
                            checkUuid();
                        "
                        v-model="uuid"
                        class="w-1/3"
                        :class="error || !reqFields.uuid ? 'input-error' : ''"
                    />
                    <span v-if="warning" class="text-yellow-500 rounded p-1 ml-2">
                        <span class="align-middle inline-block mr-1 pb-1 fill-current">
                            <svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                                    fill-rule="nonzero"
                                />
                            </svg>
                        </span>
                        <span class="align-center inline-block select-none"
                            >UUID already exists. Saving this will overwrite existing product.</span
                        >
                    </span>
                    <button
                        @click="generateRemoteConfig"
                        class="bg-black text-white hover:bg-gray-800"
                        :class="error ? 'input-error' : ''"
                        v-if="editExisting"
                    >
                        {{ $t('editor.load') }}
                    </button>

                    <!-- If config is loading, display a small spinner. -->
                    <div class="inline-flex align-middle mb-1" v-if="loadStatus === 'loading'">
                        <spinner
                            size="24px"
                            background="#00D2D3"
                            color="#009cd1"
                            stroke="2px"
                            class="mx-2 my-auto"
                        ></spinner>
                    </div>
                </div>

                <br />

                <div class="mb-4">
                    <h3>Storylines product details</h3>
                    <p>
                        Fill in metadata details about your new Storyline. Use the “Preview” button to see what your
                        slides will look like.
                    </p>
                </div>

                <metadata-content
                    :metadata="metadata"
                    @metadata-changed="updateMetadata"
                    @logo-changed="onFileChange"
                    @logo-source-changed="onLogoSourceInput"
                ></metadata-content>
            </div>

            <div class="flex mt-8">
                <button v-if="editExisting" @click="saveMetadata(true)" class="pl-8">
                    {{ $t('editor.saveChanges') }}
                </button>
                <div class="ml-auto">
                    <router-link :to="{ name: 'home' }" target>
                        <button>{{ $t('editor.back') }}</button>
                    </router-link>
                    <button
                        @click="!warning ? continueToEditor() : $modals.show(`confirm-uuid-overwrite`)"
                        class="bg-black text-white px-8"
                    >
                        {{ $t('editor.next') }}
                    </button>
                    <confirmation-modal
                        :name="`confirm-uuid-overwrite`"
                        :message="$t(`Are you sure you want to overwrite product '${uuid}'?`)"
                        @Ok="continueToEditor()"
                    />
                </div>
            </div>
        </template>

        <template v-if="loadEditor && loadStatus === 'loaded'">
            <editor
                :configs="configs"
                :configFileStructure="configFileStructure"
                :sourceCounts="sourceCounts"
                :metadata="metadata"
                :slides="slides"
                :configLang="configLang"
                :saving="saving"
                :unsavedChanges="unsavedChanges"
                :editExisting="editExisting"
                @save-changes="generateConfig"
                @save-status="updateSaveStatus"
                @refresh-config="refreshConfig"
                ref="mainEditor"
            >
                <template v-slot:langModal="slotProps">
                    <button @click.stop="slotProps.unsavedChanges ? $modals.show(`change-lang`) : swapLang()">
                        {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                    <confirmation-modal
                        :name="`change-lang`"
                        :message="$t('editor.changeLang.modal')"
                        @Ok="swapLang()"
                    />
                </template>

                <template v-slot:metadataModal>
                    <vue-modal name="metadata-edit-modal" :outer-close="false" :hide-close-btn="true" size="xlg">
                        <h2 slot="header" class="text-lg font-bold">Edit Project Metadata</h2>
                        <metadata-content
                            :metadata="metadata"
                            @metadata-changed="updateMetadata"
                            @logo-changed="onFileChange"
                            @logo-source-changed="onLogoSourceInput"
                        ></metadata-content>
                        <div class="w-full flex justify-end">
                            <button class="bg-black text-white hover:bg-gray-800" @click="saveMetadata(false)">
                                Done
                            </button>
                        </div>
                    </vue-modal>
                </template>
            </editor>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import {
    AudioPanel,
    BasePanel,
    ChartConfig,
    ChartPanel,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    Slide,
    SlideshowPanel,
    StoryRampConfig
} from '@/definitions';

const JSZip = require('jszip');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';
import MetadataContentV from './helpers/metadata-content.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import EditorV from './editor.vue';

import cloneDeep from 'clone-deep';

@Component({
    components: {
        Editor: EditorV,
        'confirmation-modal': ConfirmationModalV,
        'metadata-content': MetadataContentV,
        spinner: Circle2,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV
    }
})
export default class MetadataEditorV extends Vue {
    @Prop({ default: true }) editExisting!: boolean; // true if editing existing storylines product, false if new product

    configs: {
        [key: string]: StoryRampConfig | undefined;
    } = { en: undefined, fr: undefined };
    configFileStructure: any = undefined;
    loadStatus = 'waiting';
    loadEditor = false;
    error = false; // whether an error has occurred
    warning = false; // used for duplicate uuid warning
    configLang = 'en';

    // Saving properties.
    saving = false;
    unsavedChanges = false;

    // Form properties.
    uuid = '';
    logoImage: undefined | File = undefined;
    $modals: any;
    metadata = {
        title: '',
        introTitle: '',
        introSubtitle: '',
        logoPreview: '',
        logoName: '',
        contextLink: '',
        contextLabel: '',
        dateModified: ''
    };
    // add more required metadata fields to here as needed
    reqFields: { uuid: boolean } = {
        uuid: true
    };
    slides: Slide[] = [];
    sourceCounts: any = {};

    created(): void {
        // Generate UUID for new product
        this.uuid = this.$route.params.uid ?? (this.editExisting ? undefined : uuidv4());
        this.configLang = this.$route.params.configLang ? this.$route.params.configLang : 'en';

        // Initialize Storylines config and the configuration structure.
        this.configs = { en: undefined, fr: undefined };
        this.configFileStructure = undefined;

        // set any metadata default values for creating new product
        if (!this.editExisting) {
            // set current date as default
            const curDate = new Date();
            const year = curDate.getFullYear();
            const month = (curDate.getMonth() + 1).toString().padStart(2, '0');
            const day = curDate.getDate().toString().padStart(2, '0');
            this.metadata.dateModified = `${year}-${month}-${day}`;
        }

        // Find which view to render based on route
        if (this.$route.name === 'editor') {
            this.loadEditor = true;

            // Properties already passed in props, load editor view (could use a refactor to clean up this workflow process)
            if (this.$route.params.configs && this.$route.params.configFileStructure) {
                this.configs = this.$route.params.configs as any;
                this.configFileStructure = this.$route.params.configFileStructure;
                this.metadata = this.$route.params.metadata as any;
                this.slides = this.$route.params.slides as any;
                this.sourceCounts = this.$route.params.sourceCounts;

                // Load product logo (if provided).
                const logo = this.configs[this.configLang]!.introSlide.logo.src;
                const logoSrc = `assets/${this.configLang}/${this.metadata.logoName}`;

                if (logo) {
                    if (this.configFileStructure.zip.file(logoSrc)) {
                        this.configFileStructure.zip
                            .file(logoSrc)
                            .async('blob')
                            .then((img: any) => {
                                this.logoImage = new File([img], this.metadata.logoName);
                                this.metadata.logoPreview = URL.createObjectURL(img);
                                this.loadStatus = 'loaded';
                            });
                    } else {
                        // Fill in the field with this value whether it exists or not.
                        this.metadata.logoName = logo;

                        // If it doesn't exist, maybe it's a remote file?
                        fetch(logo).then((data: any) => {
                            if (data.status !== 404) {
                                this.logoImage = new File([data], this.metadata.logoName);
                                this.metadata.logoPreview = logo;
                            }
                            this.loadStatus = 'loaded';
                        });
                    }
                } else {
                    // No logo to load.
                    this.loadStatus = 'loaded';
                }

                return;
            }
        }

        // If a product UUID is provided, fetch the contents from the server.
        if (this.$route.params.uid) {
            this.generateRemoteConfig();
        }
    }

    /**
     * Generates a new product file for brand new products.
     */
    generateNewConfig(): void {
        const configZip = new JSZip();

        // Generate a new configuration file and populate required fields.
        this.configs[this.configLang] = this.configHelper();
        const config = this.configs[this.configLang] as StoryRampConfig;

        config.title = this.metadata.title;
        config.introSlide.title = this.metadata.introTitle;
        config.introSlide.subtitle = this.metadata.introSubtitle;
        config.slides = [];

        // Set the source of the product logo
        if (!this.metadata.logoName) {
            config.introSlide.logo.src = '';
        } else if (!this.metadata.logoName.includes('http')) {
            config.introSlide.logo.src = `${this.uuid}/assets/${this.configLang}/${this.logoImage?.name}`;
        } else {
            config.introSlide.logo.src = this.metadata.logoName;
        }

        const otherLang = this.configLang === 'en' ? 'fr' : 'en';
        this.configs[otherLang] = cloneDeep(config);
        (this.configs[otherLang] as StoryRampConfig).lang = otherLang;
        const formattedOtherLangConfig = JSON.stringify(this.configs[otherLang], null, 4);

        // Add the newly generated Storylines configuration file to the ZIP file.
        const fileName = `${this.uuid}_${this.configLang}.json`;
        const formattedConfigFile = JSON.stringify(config, null, 4);

        configZip.file(fileName, formattedConfigFile);
        configZip.file(`${this.uuid}_${otherLang}.json`, formattedOtherLangConfig);

        // Generate the file structure, defer uploading the image until the structure is created.
        this.configFileStructureHelper(configZip, this.logoImage);
    }

    configHelper(): StoryRampConfig {
        // TODO: require user to input these fields instead of defaulting (speeds up testing purposes for now)
        return {
            title: 'Test Config',
            lang: 'en',
            introSlide: {
                logo: {
                    src: ''
                },
                title: '',
                subtitle: ''
            },
            slides: [],
            contextLabel: this.metadata.contextLabel,
            contextLink: this.metadata.contextLink,
            dateModified: this.metadata.dateModified
        };
    }

    /**
     * Provided with a UID, retrieve the project contents from the file server.
     */
    generateRemoteConfig(): void {
        this.loadStatus = 'loading';

        // Attempt to fetch the project from the server.
        fetch(`http://localhost:6040/retrieve/${this.uuid}`)
            .then((res: any) => {
                if (res.status === 404) {
                    // Product not found.
                    this.$message.error(`The requested UUID '${this.uuid ?? ''}' does not exist.`);
                    this.error = true;
                    this.loadStatus = 'waiting';
                    this.clearConfig();
                } else {
                    const configZip = new JSZip();
                    // Files retrieved. Convert them into a JSZip object.
                    res.blob().then((file: any) => {
                        configZip.loadAsync(file).then(() => {
                            this.configFileStructureHelper(configZip);
                        });
                    });
                }
            })
            .catch(() => {
                this.$message.error(`Failed to load product, no response from server`);
                this.loadStatus = 'loaded';
            });
    }

    findSources(configs: { [key: string]: StoryRampConfig | undefined }): void {
        ['en', 'fr'].forEach((lang) => {
            this.incrementSourceCount((configs[lang] as StoryRampConfig).introSlide.logo.src);
            (configs[lang] as StoryRampConfig).slides.forEach((slide) => {
                slide.panel.forEach((panel) => {
                    this.panelSourceHelper(panel);
                });
            });
        });
    }

    panelSourceHelper(panel: BasePanel): void {
        switch (panel.type) {
            case 'dynamic':
                (panel as DynamicPanel).children.forEach((subPanel: DynamicChildItem) => {
                    this.panelSourceHelper(subPanel.panel);
                });
                break;
            case 'slideshow':
                (panel as SlideshowPanel).images.forEach((image: ImagePanel) => {
                    this.incrementSourceCount(image.src);
                });
                break;
            case 'chart':
                (panel as ChartPanel).charts.forEach((chart: ChartConfig) => {
                    this.incrementSourceCount(chart.src);
                });
                break;
            case 'image':
            case 'video':
            case 'audio':
                this.incrementSourceCount((panel as AudioPanel).src);
                break;
            case 'map':
                this.incrementSourceCount((panel as MapPanel).config);
                break;
            default:
                break;
        }
    }

    incrementSourceCount(src: string): void {
        if (this.sourceCounts[src]) {
            this.sourceCounts[src] += 1;
        } else {
            this.sourceCounts[src] = 1;
        }
    }

    /**
     * Generates or loads a ZIP file and creates required project folders if needed.
     * Returns an object that makes it easy to access any specific folder.
     */
    configFileStructureHelper(configZip: any, uploadLogo?: File | undefined): void {
        const assetsFolder = configZip.folder('assets');
        const chartsFolder = configZip.folder('charts');
        const rampConfigFolder = configZip.folder('ramp-config');

        this.configFileStructure = {
            uuid: this.uuid,
            zip: configZip,
            configs: this.configs,
            assets: {
                en: assetsFolder.folder('en'),
                fr: assetsFolder.folder('fr')
            },
            charts: {
                en: chartsFolder.folder('en'),
                fr: chartsFolder.folder('fr')
            },
            rampConfig: {
                en: rampConfigFolder.folder('en'),
                fr: rampConfigFolder.folder('fr')
            }
        };

        // If uploadLogo is set, upload the logo to the directory.
        if (uploadLogo !== undefined) {
            this.configFileStructure.assets[this.configLang].file(uploadLogo?.name, uploadLogo);
        }

        this.loadConfig();
    }

    /**
     * Loads a configuration file from the product folder, and sets application data
     * as needed.
     */
    async loadConfig(config?: StoryRampConfig): Promise<void> {
        if (config) {
            this.useConfig(config);
            return;
        }

        try {
            await this.configFileStructure.zip
                .file(`${this.uuid}_en.json`)
                .async('string')
                .then((res: any) => {
                    this.configs['en'] = JSON.parse(res);
                });
            await this.configFileStructure.zip
                .file(`${this.uuid}_fr.json`)
                .async('string')
                .then((res: any) => {
                    this.configs['fr'] = JSON.parse(res);
                });
        } catch {
            this.$message.error(`The requested product '${this.uuid ?? ''}' is malformed.`);
            this.loadStatus = 'waiting';
            this.clearConfig();
            return;
        }

        if (this.editExisting) {
            this.loadStatus = 'waiting';
            this.$message.success('Successfully loaded storyline!');
        } else {
            this.loadStatus = 'loaded';
        }

        // Load in project data.
        if (this.configs[this.configLang]) {
            this.useConfig(this.configs[this.configLang] as StoryRampConfig);
            this.findSources(this.configs);

            // Update router path
            if (!this.editExisting) {
                this.loadEditor = true;
                this.updateEditorPath();
            }
        }
    }

    useConfig(config: StoryRampConfig): void {
        this.metadata.title = config.title;
        this.metadata.introTitle = config.introSlide.title;
        this.metadata.introSubtitle = config.introSlide.subtitle;
        this.metadata.contextLink = config.contextLink;
        this.metadata.contextLabel = config.contextLabel;
        this.metadata.dateModified = config.dateModified;

        // Conversion for individual image panels to slideshow for gallery display
        this.slides = config.slides;
        this.slides.forEach((slide: Slide) => {
            if (slide.panel.length === 2 && slide.panel[1].type === 'image') {
                const newSlide = {
                    type: 'slideshow',
                    images: [slide.panel[1]]
                };
                Vue.set(slide.panel, 1, newSlide);
            }
        });

        const logo = config.introSlide.logo.src;
        // Fetch the logo from the folder (if it exists).
        const logoSrc = `${logo.substring(logo.indexOf('/') + 1)}`;
        const logoName = `${logo.split('/')[logo.split('/').length - 1]}`;
        if (this.configFileStructure.zip.file(logoSrc)) {
            this.configFileStructure.zip
                .file(logoSrc)
                .async('blob')
                .then((img: any) => {
                    this.logoImage = new File([img], logoName);
                    this.metadata.logoPreview = URL.createObjectURL(img);
                    this.metadata.logoName = logoName;
                    this.loadStatus = 'loaded';
                });
        } else {
            // Fill in the field with this value whether it exists or not.
            this.metadata.logoName = logo;

            // If it doesn't exist, maybe it's a remote file?
            fetch(logo).then((data: any) => {
                if (data.status !== 404) {
                    this.logoImage = new File([data], logoName);
                    this.metadata.logoPreview = logo;
                }
                this.loadStatus = 'loaded';
            });
        }
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, then generates and submits the product file to the server.
     */
    generateConfig(): StoryRampConfig {
        this.saving = true;

        // Update the configuration file.
        const fileName = `${this.uuid}_${this.configLang}.json`;
        const formattedConfigFile = JSON.stringify(this.configs[this.configLang], null, 4);

        this.configFileStructure.zip.file(fileName, formattedConfigFile);

        // Upload the ZIP file.
        this.configFileStructure.zip.generateAsync({ type: 'blob' }).then((content: any) => {
            const formData = new FormData();
            formData.append('data', content, `${this.uuid}.zip`);
            const headers = { 'Content-Type': 'multipart/form-data' };

            axios
                .post('http://localhost:6040/upload', formData, { headers })
                .then((res: any) => {
                    res.data.files; // binary representation of the file
                    res.status; // HTTP status
                    this.unsavedChanges = false;
                    this.editExisting = true; // if editExisting was false, we can now set it to true
                    this.$message.success('Successfully saved changes!');
                })
                .catch(() => {
                    this.$message.error('Failed to save changes.');
                })
                .finally(() => {
                    // padding to prevent save button from being clicked rapidly
                    setTimeout(() => {
                        this.saving = false;
                    }, 500);
                });
        });

        return this.configFileStructure;
    }

    updateMetadata(
        key: 'title' | 'introTitle' | 'introSubtitle' | 'contextLink' | 'contextLabel' | 'dateModified',
        value: string
    ): void {
        this.metadata[key] = value;
    }

    /**
     * Called when `Save Changes` is pressed on metadata page. Save metadata content fields
     * to config file. If `publish` is set to true, publish to server as well.
     */
    saveMetadata(publish = false): void {
        // update metadata content to existing config only if it has been successfully loaded
        const config = this.configs[this.configLang];
        if (config !== undefined) {
            config.title = this.metadata.title;
            config.introSlide.title = this.metadata.introTitle;
            config.introSlide.subtitle = this.metadata.introSubtitle;
            config.contextLink = this.metadata.contextLink;
            config.contextLabel = this.metadata.contextLabel;
            config.dateModified = this.metadata.dateModified;

            // If the logo doesn't include HTTP, assume it's a local file.
            if (!this.metadata.logoName) {
                config.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                config.introSlide.logo.src = `${this.uuid}/assets/${this.configLang}/${this.logoImage?.name}`;
                this.configFileStructure.assets[this.configLang].file(this.logoImage?.name, this.logoImage);
            } else {
                config.introSlide.logo.src = this.metadata.logoName;
            }

            if (publish) {
                this.generateConfig();
            }
        }
        if (this.$modals.isActive('metadata-edit-modal')) {
            this.$modals.hide('metadata-edit-modal');
        }
    }

    /**
     * Called when loading a nonexistant or invalid UUID. Clears all previously populated
     * metadata fields, configs, and slide content.
     */
    clearConfig(): void {
        this.metadata = {
            title: '',
            introTitle: '',
            introSubtitle: '',
            contextLink: '',
            contextLabel: '',
            dateModified: '',
            logoPreview: '',
            logoName: ''
        };
        this.configs = { en: undefined, fr: undefined };
        this.slides = [];
    }

    /**
     * Language toggle.
     */
    swapLang(): void {
        this.configLang = this.configLang === 'en' ? 'fr' : 'en';
        if (!this.configs[this.configLang]) {
            return;
        }
        this.loadConfig(this.configs[this.configLang]);
        if (this.loadEditor) {
            (this.$refs.mainEditor as any).selectSlide(-1);
        }
    }

    checkUuid(): void {
        if (!this.editExisting) {
            fetch(`http://localhost:6040/retrieve/${this.uuid}`).then((res: any) => {
                if (res.status !== 404) {
                    this.warning = true;
                }
            });
        }
        this.warning = false;
    }

    /**
     * React to param changes in URL.
     */
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        this.uuid = to.params.uid;
        this.$i18n.locale = to.params.lang;

        next();
    }

    onLogoSourceInput(e: InputEvent): void {
        const isImgUrl = (url: string) => {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
                img.onerror = () => resolve(false);
                img.onload = () => resolve(true);
            });
        };

        this.metadata.logoName = (e.target as HTMLInputElement).value;

        isImgUrl(this.metadata.logoName).then((res) => {
            if (res) {
                this.metadata.logoPreview = this.metadata.logoName;
                this.$message.success('Successfully loaded logo image.');
            } else {
                this.metadata.logoPreview = 'error';
                this.$message.error('Failed to load logo image.');
            }
        });
    }

    onFileChange(e: Event): void {
        // Retrieve the uploaded file.
        const uploadedFile = ((e.target as HTMLInputElement).files as ArrayLike<File>)[0];
        this.logoImage = uploadedFile;

        // Generate an image preview.
        this.metadata.logoPreview = URL.createObjectURL(uploadedFile);
        this.metadata.logoName = uploadedFile.name;
    }

    updateEditorPath(): void {
        if (this.$route.name !== 'editor') {
            const props = {
                uid: this.uuid,
                configLang: this.configLang,
                configs: this.configs as any,
                configFileStructure: this.configFileStructure,
                sourceCounts: this.sourceCounts,
                metadata: this.metadata as any,
                slides: this.slides as any,
                editExisting: this.editExisting as any
            };
            this.$router.push({ name: 'editor', params: props });
        }
    }

    checkRequiredFields(): boolean {
        // check if all required metadata fields are non-empty
        this.reqFields.uuid = !!this.uuid;
        if (Object.values(this.reqFields).some((field: boolean) => !field)) {
            this.$message.error(`Please fill out the required fields before proceeding.`);
            return false;
        }
        return true;
    }

    /**
     * Called when 'next' button is pressed on metadata page to continue to main editor.
     */
    continueToEditor(): void {
        if (!this.checkRequiredFields()) {
            return;
        }

        if (this.editExisting) {
            if (this.configs[this.configLang] !== undefined && this.uuid === this.configFileStructure.uuid) {
                this.loadEditor = true;
                this.updateEditorPath();
            } else {
                this.$message.error('No config exists for storylines product.');
            }
        } else if (!this.uuid) {
            this.$message.error('Missing required field: UUID');
            this.error = true;
        } else {
            this.generateNewConfig();
        }
    }

    /**
     * Update the unsaved changes value to the payload.
     */
    updateSaveStatus(payload: boolean) {
        this.unsavedChanges = payload;
    }

    refreshConfig() {
        // Re-fetch the product from the server.
        if (this.editExisting) {
            this.loadEditor = false;
            this.loadStatus = 'loading';
            this.generateRemoteConfig();
        } else {
            this.generateNewConfig();
            setTimeout(() => {
                this.$router.push({
                    name: 'metadata',
                    params: {
                        configLang: this.configLang,
                        editExisting: false as any
                    }
                });
            }, 100);
        }
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.storyramp-app {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.5;
        border-bottom: 0px;
    }

    .editor-container {
        margin: 0 auto;
    }

    .editor-container label {
        width: 10vw;
        text-align: right;
        margin-right: 15px;
        display: inline-block;
    }

    .editor-container h3 {
        font-size: larger;
    }

    .editor-container input {
        padding: 5px 10px;
        margin-top: 5px;
        border: 1px solid black;
        display: inline;
    }

    .editor-container .input-error {
        border: 1px solid red;
    }

    .editor-container button {
        padding: 5px 12px;
        margin: 0px 10px;
        font-weight: 600;
        transition-duration: 0.2s;
    }

    .editor-container button:hover:enabled {
        background-color: #dbdbdb;
        color: black;
    }

    .editor-container button:disabled {
        border: 1px solid gray;
        color: gray;
        cursor: not-allowed;
    }

    .editor-toc button {
        background-color: #f3f4f6;
        color: black;
        border: none;
        transition-duration: 0.2s;
        padding: 0.25 0.25em !important;
    }

    .image-preview {
        max-width: 150px;
        max-height: 150px;
        display: inline;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>
