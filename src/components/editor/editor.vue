<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="(loadStatus === 'waiting') | 'error'">
            <div class="flex">
                <div class="flex text-2xl font-bold mb-5">
                    {{ config ? $t('editor.editProduct') : $t('editor.createProduct') }}
                </div>
                <button v-if="config" @click="swapLang">
                    {{ lang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                </button>
            </div>

            <label>{{ $t('editor.uuid') }}:</label>
            <input type="text" @input="uidError = false" v-model="uuid" :class="uidError ? 'input-error' : ''" />
            <button v-on:click="generateRemoteConfig" :class="uidError ? 'input-error' : ''">
                {{ $t('editor.load') }}
            </button>
            <span v-if="uidError">The requested UID "{{ uuid }}" does not exist.</span>

            <br />

            <label>{{ $t('editor.title') }}:</label> <input type="text" v-model="title" /> <br />
            <label>{{ $t('editor.logo') }}:</label> <input type="text" v-model="logo" />
            <button v-on:click="generateRemoteConfig">{{ $t('editor.browse') }}</button>
            <br />
            <label>{{ $t('editor.contextLink') }}:</label> <input type="text" v-model="contextLink" /> <br />
            <label>{{ $t('editor.contextLabel') }}:</label> <input type="text" v-model="contextLabel" /> <br />
            <label>{{ $t('editor.dateModified') }}:</label> <input type="date" v-model="dateModified" /> <br /><br />

            <button v-on:click="generateNewConfig">TESTING CONFIG</button>
        </template>

        <!-- If config is loading, display a small spinner. -->
        <div v-if="loadStatus === 'loading'" class="inline m-3">
            <spinner size="20px" background="#00D2D3" color="#009cd1" stroke="2px" class="inline-block"></spinner>
        </div>

        <template v-if="loadStatus === 'loaded'">
            <div class="flex">
                <span>{{ config.title }}</span
                ><span class="ml-auto"></span><button>Preview</button
                ><button @click="generateConfig">Save Changes</button>
            </div>
            <div class="flex">
                <div class="w-60 flex-shrink-0">
                    <button>Edit Project Metadata</button>
                    <slide-toc
                        :slides="slides"
                        :slideIndex="slideIndex"
                        @slide-change="selectSlide"
                        @slides-updated="updateSlides"
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
                ></slide-editor>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { StoryRampConfig, Slide } from '@/definitions';
import { saveAs } from 'file-saver';

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
    config: StoryRampConfig | undefined = undefined;
    configFileStructure: any = undefined;
    loadStatus = 'waiting';
    uidError = false; // true if the user requested to load a UID that does not exist.
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
    slideIndex = -1;

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
                this.uidError = true;
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
    loadConfig() {
        const configPath = `${this.uuid}_${this.lang}.json`;

        this.configFileStructure.config
            .file(configPath)
            .async('string')
            .then((res: any) => {
                this.config = JSON.parse(res);
                this.loadStatus = 'loaded';

                // Load in project data.
                if (this.config) {
                    this.title = this.config.title;
                    this.logo = this.config.introSlide.logo.src;
                    this.contextLink = this.config.contextLink;
                    this.contextLabel = this.config.contextLabel;
                    this.dateModified = this.config.dateModified;

                    this.slides = this.config.slides;
                    // conversion for individual image panels (see proposal on PR to clean up this process with small refactor)
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
        }, 5);

        if (index !== -1 && this.slides[index].panel[0].type === 'dynamic') {
            (this.$refs.slide as any).panelIndex = 0;
        }
    }

    updateSlides(slides: any[]): void {
        this.slides = slides;
        this.slideIndex = this.slides.indexOf(this.currentSlide);
    }

    swapLang(): void {
        this.lang = this.lang === 'en' ? 'fr' : 'en';
        this.generateRemoteConfig();
    }

    // react to param changes in URL
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

    .editor-container button:disabled {
        border: 1px solid gray;
        color: gray;
        cursor: not-allowed;
    }
}
</style>