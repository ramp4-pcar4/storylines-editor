<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="loadStatus === 'waiting' || loadStatus === 'loading'">
            <div class="px-20 py-5">
                <div class="flex">
                    <div class="flex text-2xl font-bold mb-5">
                        {{ editExisting ? $t('editor.editProduct') : $t('editor.createProduct') }}
                    </div>
                    <button @click="swapLang">
                        {{ lang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                </div>

                <div class="border py-5 w-5/6">
                    <label>{{ $t('editor.uuid') }}:</label>
                    <input
                        type="text"
                        @input="error = false"
                        v-model="uuid"
                        class="w-1/3"
                        :class="error ? 'input-error' : ''"
                    />
                    <button
                        @click="generateRemoteConfig"
                        class="bg-black text-white hover:bg-gray-800"
                        :class="error ? 'input-error' : ''"
                        v-if="editExisting"
                    >
                        {{ $t('editor.load') }}
                    </button>

                    <!-- If config is loading, display a small spinner. -->
                    <div class="inline-flex" v-if="loadStatus === 'loading'">
                        <spinner
                            size="20px"
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

                <metadata-editor
                    :metadata="metadata"
                    @metadata-changed="updateMetadata"
                    @logo-changed="onFileChange"
                    @logo-source-changed="onLogoSourceInput"
                ></metadata-editor>
            </div>

            <div class="flex mt-8">
                <button @click="saveMetadata" class="pl-8">{{ $t('editor.saveChanges') }}</button>
                <div class="ml-auto">
                    <router-link :to="{ name: 'home' }" target>
                        <button>{{ $t('editor.back') }}</button>
                    </router-link>
                    <button @click="continueToEditor" class="bg-black text-white px-8">
                        {{ $t('editor.next') }}
                    </button>
                </div>
            </div>
        </template>

        <template v-if="loadStatus === 'loaded'">
            <div class="sticky top-0 z-50 flex items-center border-b border-black bg-gray-200 py-2 px-2">
                <span class="mx-1">
                    <router-link :to="{ name: 'home' }" class="mt-1 flex justify-center h-full w-full" target>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.001" viewBox="0 0 18 18.001">
                            <path
                                id="logout-Icon-SVG-098767893"
                                d="M5.808,13.782v1.406A2.816,2.816,0,0,0,8.621,18h7.067A2.816,2.816,0,0,0,18.5,15.188V2.813A2.816,2.816,0,0,0,15.687,0H8.621A2.816,2.816,0,0,0,5.808,2.813V4.219a.7.7,0,0,0,1.406,0V2.813A1.408,1.408,0,0,1,8.621,1.406h7.067a1.408,1.408,0,0,1,1.406,1.406V15.188a1.408,1.408,0,0,1-1.406,1.406H8.621a1.408,1.408,0,0,1-1.406-1.406V13.782a.7.7,0,0,0-1.406,0ZM1.014,7.793,2.589,6.218a.7.7,0,0,1,.994.994l-1.12,1.12h8.443a.7.7,0,1,1,0,1.406H2.463l1.12,1.12a.7.7,0,1,1-.994.994L1.014,10.279A1.76,1.76,0,0,1,1.014,7.793Zm0,0"
                                transform="translate(-0.5)"
                            />
                        </svg>
                        <tippy delay="200" placement="right">{{ $t('editor.returnToLanding') }}</tippy>
                    </router-link>
                </span>
                <div class="ml-3 flex flex-col">
                    <span class="font-semibold text-lg">{{ metadata.title }}</span>
                    <span :class="metadata.title ? 'text-xs' : ''">UUID: {{ uuid }}</span>
                </div>
                <span class="ml-auto"></span>
                <transition name="fade">
                    <span v-if="unsavedChanges" class="border-2 border-red-700 text-red-700 rounded p-1 mr-2">
                        <span class="align-middle inline-block mr-1 pb-1 fill-current"
                            ><svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                class="fill-red-600"
                                width="18"
                                height="18"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                                    fill-rule="nonzero"
                                />
                            </svg>
                        </span>
                        <span class="align-center inline-block select-none">Unsaved Changes</span>
                    </span>
                </transition>
                <button @click.stop="unsavedChanges ? $modals.show(`change-lang`) : swapLang()">
                    {{ lang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                </button>
                <confirmation-modal :name="`change-lang`" :message="$t('editor.changeLang.modal')" @Ok="swapLang()" />
                <router-link
                    :to="{
                        name: 'preview',
                        params: { conf: configs[lang], configFileStructure: configFileStructure }
                    }"
                >
                    <button @click="preview" class="bg-white border border-black hover:bg-gray-100">
                        {{ $t('editor.preview') }}
                    </button>
                </router-link>
                <button @click="generateConfig" class="bg-black text-white hover:bg-gray-900" :disabled="saving">
                    <span class="inline-block">{{
                        saving ? $t('editor.savingChanges') : $t('editor.saveChanges')
                    }}</span>
                    <span v-if="saving" class="align-middle inline-block px-1"
                        ><spinner
                            size="16px"
                            background="#6B7280"
                            color="#FFFFFF"
                            stroke="2px"
                            class="ml-1 mb-1"
                        ></spinner>
                    </span>
                </button>
                <router-link
                    :to="{
                        path: `editor-preview/${uuid}`
                    }"
                    target="_blank"
                >
                    <button class="bg-white border border-black hover:bg-gray-100">View Saved Product</button>
                </router-link>
            </div>
            <div class="flex">
                <div class="w-80 flex-shrink-0 border-r border-black editor-toc">
                    <div class="flex items-center justify-center border-b p-2">
                        <button @click.stop="$modals.show('metadata-edit-modal')">
                            <span class="align-middle inline-block px-1"
                                ><svg
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                    width="16"
                                    height="16"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                                        fill-rule="nonzero"
                                    />
                                </svg>
                            </span>
                            <span class="align-middle inline-block">Edit Project Metadata</span>
                        </button>
                    </div>
                    <slide-toc
                        :slides="slides"
                        :currentSlide="currentSlide"
                        :slideIndex="slideIndex"
                        @slide-change="selectSlide"
                        @slides-updated="updateSlides"
                        :configFileStructure="configFileStructure"
                        :lang="lang"
                        :sourceCounts="sourceCounts"
                    ></slide-toc>
                </div>
                <slide-editor
                    ref="slide"
                    :configFileStructure="configFileStructure"
                    :currentSlide="currentSlide"
                    :lang="lang"
                    :slideIndex="slideIndex"
                    :isLast="slideIndex === slides.length - 1"
                    :uid="uuid"
                    @slide-change="selectSlide"
                    @slide-edit="onSlidesEdited"
                    :sourceCounts="sourceCounts"
                ></slide-editor>
            </div>
        </template>
        <vue-modal name="metadata-edit-modal" :outer-close="false" :hide-close-btn="true" size="xlg">
            <h2 slot="header" class="text-lg font-bold">Edit Project Metadata</h2>
            <metadata-editor
                :metadata="metadata"
                @metadata-changed="updateMetadata"
                @logo-changed="onFileChange"
                @logo-source-changed="onLogoSourceInput"
            ></metadata-editor>
            <div class="w-full flex justify-end">
                <button class="bg-black text-white hover:bg-gray-800" @click="saveMetadata">Done</button>
            </div>
        </vue-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { StoryRampConfig, Slide } from '@/definitions';

const JSZip = require('jszip');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';
import MetadataEditorV from './metadata-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Component({
    components: {
        'confirmation-modal': ConfirmationModalV,
        'metadata-editor': MetadataEditorV,
        spinner: Circle2,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV
    }
})
export default class EditorV extends Vue {
    @Prop({ default: true }) editExisting!: boolean; // true if editing existing storylines product, false if new product

    configs: {
        [key: string]: StoryRampConfig | undefined;
    } = { en: undefined, fr: undefined };
    configFileStructure: any = undefined;
    loadStatus = 'waiting';
    error = false; // whether an error has occurred
    lang = 'en';
    unsavedChanges = false;
    saving = false;

    // Form properties.
    uuid = '';
    logoImage: undefined | File = undefined;
    slides: Slide[] = [];
    currentSlide: any = '';
    slideIndex = -1;
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
    sourceCounts: any = {};

    @Watch('slides', { deep: true })
    onSlidesEdited(): void {
        this.unsavedChanges = true;
    }

    @Watch('metadata', { deep: true })
    onMetadataEdited(): void {
        this.unsavedChanges = true;
    }

    created(): void {
        window.addEventListener('beforeunload', this.beforeWindowUnload);

        // Generate UUID for new product
        this.uuid = this.$route.params.uid ?? (this.editExisting ? undefined : uuidv4());
        this.lang = this.$route.params.lang ? this.$route.params.lang : 'en';

        // Initialize Storylines config and the configuration structure.
        this.configs = { en: undefined, fr: undefined };
        this.configFileStructure = undefined;

        // If a product UUID is provided, fetch the contents from the server.
        if (this.$route.params.uid) {
            this.generateRemoteConfig();
        }
    }

    beforeDestroy(): void {
        window.removeEventListener('beforeunload', this.beforeWindowUnload);
    }

    /**
     * Generates a new product file for brand new products.
     */
    generateNewConfig(): void {
        const configZip = new JSZip();

        // Generate a new configuration file and populate required fields.
        this.configs[this.lang] = this.configHelper();
        this.configs[this.lang]!.title = this.metadata.title;
        this.configs[this.lang]!.introSlide.title = this.metadata.introTitle;
        this.configs[this.lang]!.introSlide.subtitle = this.metadata.introSubtitle;
        this.configs[this.lang]!.slides = this.slides;

        // Set the source of the product logo
        if (!this.metadata.logoName) {
            this.configs[this.lang]!.introSlide.logo.src = '';
        } else if (!this.metadata.logoName.includes('http')) {
            this.configs[this.lang]!.introSlide.logo.src = `${this.uuid}/assets/${this.lang}/${this.logoImage?.name}`;
        } else {
            this.configs[this.lang]!.introSlide.logo.src = this.metadata.logoName;
        }

        const otherLang = this.lang === 'en' ? 'fr' : 'en';

        this.configs[otherLang] = this.configs[this.lang];
        this.configs[otherLang]!.lang = otherLang;

        // Add the newly generated Storylines configuration file to the ZIP file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(this.configs[this.lang], null, 4);
        const formattedOtherLangConfig = JSON.stringify(this.configs[otherLang], null, 4);

        configZip.file(fileName, formattedConfigFile);
        configZip.file(`${this.uuid}_${otherLang}.json`, formattedOtherLangConfig);

        // Generate the file structure, defer uploading the image until the structure is created.
        this.configFileStructureHelper(configZip, this.logoImage);

        this.unsavedChanges = false;
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
        fetch(`http://localhost:6040/retrieve/${this.uuid}`).then((res: any) => {
            if (res.status === 404) {
                // Product not found.
                this.$message.error(`The requested UUID ${this.uuid ?? ''} does not exist.`);
                this.error = true;
                this.loadStatus = 'waiting';
            } else {
                const configZip = new JSZip();
                // Files retrieved. Convert them into a JSZip object.
                res.blob().then((file: any) => {
                    configZip.loadAsync(file).then(() => {
                        this.configFileStructureHelper(configZip);
                        this.$message.success('Successfully loaded storyline!');
                    });
                });
            }
        });
    }

    findSources(configs: { [key: string]: StoryRampConfig | undefined }): void {
        ['en', 'fr'].forEach((lang) => {
            this.incrementSourceCount(configs[lang]!.introSlide.logo.src);
            configs[lang]!.slides.forEach((slide) => {
                slide.panel.forEach((panel) => {
                    this.panelSourceHelper(panel);
                });
            });
        });
    }

    panelSourceHelper(panel: any): void {
        switch (panel.type) {
            case 'dynamic':
                panel.children.forEach((subPanel: any) => {
                    this.panelSourceHelper(subPanel.panel);
                });
                break;
            case 'slideshow':
                panel.images.forEach((image: any) => {
                    this.incrementSourceCount(image.src);
                });
                break;
            case 'chart':
                panel.charts.forEach((chart: any) => {
                    this.incrementSourceCount(chart.src);
                });
                break;
            case 'image':
            case 'video':
            case 'audio':
                this.incrementSourceCount(panel.src);
                break;
            case 'map':
                this.incrementSourceCount(panel.config);
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
            this.configFileStructure.assets[this.lang].file(uploadLogo?.name, uploadLogo);
        }

        this.loadConfig();
    }

    /**
     * Loads a configuration file from the product folder, and sets application data
     * as needed.
     */
    async loadConfig(config?: StoryRampConfig): Promise<void> {
        const configPath = `${this.uuid}_${this.lang}.json`;

        if (config) {
            this.useConfig(config);
            return;
        }

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

        this.editExisting ? (this.loadStatus = 'waiting') : (this.loadStatus = 'loaded');

        // Load in project data.
        if (this.configs[this.lang]) {
            this.useConfig(this.configs[this.lang]!);

            this.findSources(this.configs);
        }
    }

    useConfig(config: StoryRampConfig) {
        this.metadata.title = config.title;
        this.metadata.introTitle = config.introSlide.title;
        this.metadata.introSubtitle = config.introSlide.subtitle;
        this.metadata.contextLink = config.contextLink;
        this.metadata.contextLabel = config.contextLabel;
        this.metadata.dateModified = config.dateModified;
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
                });
        } else {
            // If it doesn't exist, maybe it's a remote file?
            fetch(logo).then((data: any) => {
                if (data.status !== 404) {
                    this.logoImage = new File([data], logoName);
                    this.metadata.logoPreview = logo;
                }
            });

            // Fill in the field with this value whether it exists or not.
            this.metadata.logoName = logo;
        }

        this.slides = config.slides;
        // conversion for individual image panels to slideshow for gallery display
        this.slides.forEach((slide: Slide) => {
            if (slide.panel.length === 2 && slide.panel[1].type === 'image') {
                const newSlide = {
                    type: 'slideshow',
                    images: [slide.panel[1]]
                };
                Vue.set(slide.panel, 1, newSlide);
            }
        });
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, then generates and submits the product file to the server.
     */
    generateConfig(): StoryRampConfig {
        this.saving = true;
        // save current slide final changes before generating config file
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as any).saveChanges();
        }

        // Update the configuration file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(this.configs[this.lang], null, 4);

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
     * to config file. TODO: decide whether to upload file to server (e.g. call generateConfig).
     */
    saveMetadata(): void {
        // update metadata content to existing config only if it has been successfully loaded
        if (this.configs[this.lang] !== undefined) {
            this.configs[this.lang]!.title = this.metadata.title;
            this.configs[this.lang]!.introSlide.title = this.metadata.introTitle;
            this.configs[this.lang]!.introSlide.subtitle = this.metadata.introSubtitle;
            this.configs[this.lang]!.contextLink = this.metadata.contextLink;
            this.configs[this.lang]!.contextLabel = this.metadata.contextLabel;
            this.configs[this.lang]!.dateModified = this.metadata.dateModified;

            // If the logo doesn't include HTTP, assume it's a local file.
            if (!this.metadata.logoName) {
                this.configs[this.lang]!.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                this.configs[
                    this.lang
                ]!.introSlide.logo.src = `${this.uuid}/assets/${this.lang}/${this.logoImage?.name}`;
                this.configFileStructure.assets[this.lang].file(this.logoImage?.name, this.logoImage);
            } else {
                this.configs[this.lang]!.introSlide.logo.src = this.metadata.logoName;
            }
        }
        if (this.$modals.isActive('metadata-edit-modal')) {
            this.$modals.hide('metadata-edit-modal');
        }
    }

    /**
     * Change current slide to selected slide.
     */
    selectSlide(index: number): void {
        // save changes to current slide before changing slides
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as any).saveChanges();
        }

        // Quickly swap to loading page, and then swap to new slide. Allows Vue to re-draw page correctly.
        this.currentSlide = {
            panel: [{ type: 'loading-page' }, { type: 'loading-page' }]
        };

        setTimeout(() => {
            this.currentSlide = index === -1 ? '' : this.slides[index];
            this.slideIndex = index;
            (this.$refs.slide as any).panelIndex = 0;
        }, 5);
    }

    /**
     * Updates slides after adding, removing, or reordering.
     */
    updateSlides(slides: Slide[]): void {
        this.slides = slides;
        this.slideIndex = this.slides.indexOf(this.currentSlide);
    }

    /**
     * Called when 'next' button is pressed on metadata page to continue to main editor.
     */
    continueToEditor(): void {
        if (this.editExisting) {
            this.configs[this.lang] !== undefined
                ? (this.loadStatus = 'loaded')
                : this.$message.error('No config exists for storylines product.');
            this.unsavedChanges = false;
        } else {
            // TODO: check for non-empty required metadata fields
            this.generateNewConfig();
        }
    }

    /**
     * Language toggle.
     */
    swapLang(): void {
        this.lang = this.lang === 'en' ? 'fr' : 'en';
        this.loadConfig();
        this.selectSlide(-1);
    }

    /**
     * Open current editor config as a new Storylines product in new tab.
     */
    preview(): void {
        // save current slide final changes before previewing product
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as any).saveChanges();
        }
    }

    /**
     * React to param changes in URL.
     */
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        this.lang = to.params.lang;
        this.uuid = to.params.uid;
        this.$i18n.locale = this.lang;

        if (this.uuid) {
            this.generateRemoteConfig();
        }
        next();
    }

    onLogoSourceInput(e: InputEvent) {
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
        const uploadedFile = ((e.target as HTMLInputElement).files as any)[0];
        this.logoImage = uploadedFile;

        // Generate an image preview.
        this.metadata.logoPreview = URL.createObjectURL(uploadedFile);
        this.metadata.logoName = uploadedFile.name;
    }

    beforeWindowUnload(e: any): void {
        // show popup if when leaving page with unsaved changes
        if (this.unsavedChanges && !window.confirm()) {
            e.preventDefault();
            e.returnValue = '';
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
