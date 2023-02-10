<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="loadStatus === 'waiting' || loadStatus === 'loading'">
            <div class="flex">
                <div class="flex text-2xl font-bold mb-5">
                    {{ editExisting ? $t('editor.editProduct') : $t('editor.createProduct') }}
                </div>
                <button v-if="config" @click="swapLang">
                    {{ lang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                </button>
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.uuid') }}:</label>
                </div>
                <input
                    type="text"
                    @input="errorMessage = ''"
                    v-model="uuid"
                    :class="errorMessage ? 'input-error' : ''"
                />
                <button @click="generateRemoteConfig" :class="errorMessage ? 'input-error' : ''" v-if="editExisting">
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
                <div class="inline-flex">
                    <span v-if="errorMessage" class="mx-2 m-auto">{{ errorMessage }}</span>
                </div>
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.title') }}:</label>
                </div>
                <input type="text" v-model="title" />
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.logo') }}:</label>
                </div>
                <input type="text" v-model="logo" />
                <button @click="generateRemoteConfig">{{ $t('editor.browse') }}</button>
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.contextLink') }}:</label>
                </div>
                <input type="text" v-model="contextLink" />
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.contextLabel') }}:</label>
                </div>
                <input type="text" v-model="contextLabel" />
            </div>

            <div class="flex">
                <div class="inline-flex">
                    <label class="m-auto">{{ $t('editor.dateModified') }}:</label>
                </div>
                <input type="date" v-model="dateModified" />
            </div>

            <div class="flex mt-8">
                <button @click="saveMetadata" class="pl-8">Save Changes</button>
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
            <div class="flex">
                <span>{{ config.title }}</span>
                <span class="ml-auto"></span>
                <button>Preview</button>
                <button @click="generateConfig">Save Changes</button>
            </div>
            <div class="flex">
                <div class="w-60 flex-shrink-0">
                    <button>Edit Project Metadata</button>
                    <slide-toc :slides="slides" @slide-change="selectSlide"></slide-toc>
                </div>
                <slide-editor
                    ref="slide"
                    :configFileStructure="configFileStructure"
                    :currentSlide="currentSlide"
                    :lang="lang"
                    :uid="uuid"
                ></slide-editor>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { StoryRampConfig, Slide } from '@/definitions';

const JSZip = require('jszip');
const axios = require('axios').default;

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';

@Component({
    components: {
        spinner: Circle2,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV
    }
})
export default class EditorV extends Vue {
    @Prop({ default: true }) editExisting!: boolean; // true if editing existing storylines product, false if new product

    config: StoryRampConfig | undefined = undefined;
    configFileStructure: any = undefined;
    loadStatus = 'waiting';
    errorMessage = ''; // error message if the user requested to load a UID that does not exist or tried to load editor without UID.
    lang = 'en';

    // Form properties.
    uuid = '';
    title = '';
    logo = '';
    contextLink = '';
    contextLabel = '';
    dateModified = '';
    slides: any[] = [];
    currentSlide: any = '';
    slideIndex: number | undefined = undefined;

    created(): void {
        this.uuid = this.$route.params.uid ?? undefined;
        this.lang = this.$route.params.lang ? this.$route.params.lang : 'en';

        // Initialize Storylines config and the configuration structure.
        this.config = undefined;
        this.configFileStructure = undefined;

        // If a product UUID is provided, fetch the contents from the server.
        if (this.uuid) {
            this.generateRemoteConfig();
        }
    }

    /**
     * Generates a new product file for brand new products.
     */
    generateNewConfig(): void {
        const configZip = new JSZip();

        // Generate a new configuration file and populate required fields.
        this.config = this.configHelper();
        this.config.title = this.title;
        this.config.slides = this.slides;
        this.config.introSlide.logo.src = this.logo;

        // Add the newly generated Storylines configuration file to the ZIP file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(this.config, null, 4);

        configZip.file(fileName, formattedConfigFile);

        // Generate the file structure.
        this.configFileStructureHelper(configZip);
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
                title: 'Test Config Intro Slide'
            },
            slides: [],
            contextLabel: this.contextLabel,
            contextLink: this.contextLink,
            dateModified: this.dateModified
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
                this.errorMessage = `The requested UID ${this.uuid} does not exist.`;
                this.loadStatus = 'waiting';
            } else {
                const configZip = new JSZip();
                // Files retrieved. Convert them into a JSZip object.
                res.blob().then((file: any) => {
                    configZip.loadAsync(file).then(() => {
                        this.configFileStructureHelper(configZip);
                    });
                });
            }
        });
    }

    /**
     * Generates or loads a ZIP file and creates required project folders if needed.
     * Returns an object that makes it easy to access any specific folder.
     */
    configFileStructureHelper(configZip: any): any {
        const assetsFolder = configZip.folder('assets');
        const chartsFolder = configZip.folder('charts');
        const rampConfigFolder = configZip.folder('ramp-config');

        this.configFileStructure = {
            uuid: this.uuid,
            config: configZip,
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

        this.loadConfig();
    }

    /**
     * Loads a configuration file from the product folder, and sets application data
     * as needed.
     */
    loadConfig(): void {
        const configPath = `${this.uuid}_${this.lang}.json`;

        this.configFileStructure.config
            .file(configPath)
            .async('string')
            .then((res: any) => {
                this.config = JSON.parse(res);
                this.editExisting ? (this.loadStatus = 'waiting') : (this.loadStatus = 'loaded');

                // Load in project data.
                if (this.config) {
                    this.title = this.config.title;
                    this.logo = this.config.introSlide.logo.src;
                    this.contextLink = this.config.contextLink;
                    this.contextLabel = this.config.contextLabel;
                    this.dateModified = this.config.dateModified;

                    this.slides = this.config.slides;
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
            });
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, then generates and submits the product file to the server.
     */
    generateConfig(): StoryRampConfig {
        // save current slide final changes before generating config file
        (this.$refs.slide as any).saveChanges();

        // Update the configuration file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(this.config, null, 4);

        this.configFileStructure.config.file(fileName, formattedConfigFile);

        // Upload the ZIP file.
        this.configFileStructure.config.generateAsync({ type: 'blob' }).then((content: any) => {
            const formData = new FormData();
            formData.append('data', content, `${this.uuid}.zip`);
            const headers = { 'Content-Type': 'multipart/form-data' };

            axios.post('http://localhost:6040/upload', formData, { headers }).then((res: any) => {
                res.data.files; // binary representation of the file
                res.status; // HTTP status
            });
        });

        return this.configFileStructure;
    }

    /**
     * Called when `Save Changes` is pressed on metadata page. Save metadata content fields
     * to config file. TODO: decide whether to upload file to server (e.g. call generateConfig).
     */
    saveMetadata(): void {
        // update metadata content to existing config only if it has been successfully loaded
        if (this.config !== undefined) {
            this.config.title = this.title;
            // TODO: rebase logo feature when merged #74
            this.config.contextLink = this.contextLink;
            this.config.contextLabel = this.contextLabel;
            this.config.dateModified = this.dateModified;
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
            this.currentSlide = this.slides[index];
            this.slideIndex = index;
        }, 5);

        if (this.slides[index].panel[0].type === 'dynamic') {
            (this.$refs.slide as any).panelIndex = 0;
        }
    }

    /**
     * Called when 'next' button is pressed on metadata page to continue to main editor.
     */
    continueToEditor(): void {
        if (this.editExisting) {
            this.config !== undefined
                ? (this.loadStatus = 'loaded')
                : (this.errorMessage = 'No config loaded for existing Storylines product!');
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
        this.generateRemoteConfig();
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

    .editor-container input {
        padding: 5px 10px;
        margin: 2px;
        border: 1px solid black;
        width: 20vw;
    }

    .editor-container .input-error {
        border: 1px solid red;
    }

    .editor-container button {
        padding: 5px 10px;
        margin: 2px;
        border: 1px solid black;
    }
}
</style>
