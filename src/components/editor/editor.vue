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

            <label>{{ $t('editor.uuid') }}:</label> <input type="text" v-model="uuid" />
            <button v-on:click="fetchConfig">{{ $t('editor.load') }}</button>
            <br />

            <label>{{ $t('editor.title') }}:</label> <input type="text" v-model="title" /> <br />
            <label>{{ $t('editor.logo') }}:</label> <input type="text" v-model="logo" />
            <button v-on:click="fetchConfig">{{ $t('editor.browse') }}</button>
            <br />
            <label>{{ $t('editor.contextLink') }}:</label> <input type="text" v-model="contextLink" /> <br />
            <label>{{ $t('editor.contextLabel') }}:</label> <input type="text" v-model="contextLabel" /> <br />
            <label>{{ $t('editor.dateModified') }}:</label> <input type="date" v-model="dateModified" /> <br /><br />

            <button v-on:click="newConfig">TESTING CONFIG</button>
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
                    <slide-toc :slides="slides" @slide-change="selectSlide"></slide-toc>
                </div>
                <slide-editor
                    :configFileStructure="configFileStructure"
                    :currentSlide="currentSlide"
                    :lang="lang"
                ></slide-editor>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { StoryRampConfig } from '@/definitions';
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

        this.config = undefined;
        this.configFileStructure = this.configFileStructureHelper();

        if (this.uuid) {
            this.fetchConfig();
        }
    }

    selectSlide(index: number): void {
        // Quickly swap to loading page, and then swap to new slide. Allows Vue to re-draw page correctly.
        this.currentSlide = {
            panel: [{ type: 'loading-page' }, { type: 'loading-page' }]
        };

        setTimeout(() => {
            this.currentSlide = this.slides[index];
            this.slideIndex = index;
        }, 5);
    }

    newConfig(): void {
        this.config = this.configHelper();

        this.title = this.config.title;
        this.slides = this.config.slides;
        this.logo = this.config.introSlide.logo.src;
        this.contextLink = this.config.contextLink;
        this.contextLabel = this.config.contextLabel;
        this.dateModified = this.config.dateModified;

        this.loadStatus = 'loaded';
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

    fetchConfig(): void {
        this.loadStatus = 'loading';

        fetch(`${this.uuid}/${this.uuid}_${this.lang}.json`)
            .then((res) => {
                res.json().then((config: StoryRampConfig) => {
                    this.config = config;
                    this.loadStatus = 'loaded';

                    // Load in form values from the config file.
                    if (this.config) {
                        this.title = this.config.title;
                        this.slides = this.config.slides;
                        this.logo = this.config.introSlide.logo.src;
                        this.contextLink = this.config.contextLink;
                        this.contextLabel = this.config.contextLabel;
                        this.dateModified = this.config.dateModified;
                    }
                });
            })
            .catch((err) => {
                if (err.code === 'MODULE_NOT_FOUND') {
                    console.error(`There exists no config given by the URL params: ${err}`);
                    this.loadStatus = 'error';
                } else {
                    // Some unknown error, possibly a build error that could indicate an error in the
                    // configuration file.
                    this.loadStatus = 'error';

                    // Print out the error stack.
                    console.error(err.stack);
                }
            });
    }

    swapLang(): void {
        this.lang = this.lang === 'en' ? 'fr' : 'en';
        this.fetchConfig();
    }

    /**
     * Generates a new ZIP file and creates required project folders.
     * Returns an object that makes it easy to access any specific folder.
     */
    configFileStructureHelper() {
        // Create a new ZIP file with our configuration structure.
        this.configFileStructure = new JSZip();

        const assetsFolder = this.configFileStructure.folder('assets');
        const chartsFolder = this.configFileStructure.folder('charts');
        const rampConfigFolder = this.configFileStructure.folder('ramp-config');

        return {
            uuid: this.uuid,
            config: this.configFileStructure,
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
    }

    generateConfig(): StoryRampConfig {
        const configFile = {
            title: this.title,
            lang: this.lang,
            introSlide: {
                logo: {
                    src: this.logo
                },
                title: this.title
            },
            slides: this.slides,
            contextLabel: this.contextLabel,
            contextLink: this.contextLink,
            dateModified: this.dateModified
        };

        // Add the Storylines configuration file to the ZIP file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(configFile, null, 4);

        this.configFileStructure.config.file(fileName, formattedConfigFile);

        // Generate the ZIP file.
        this.configFileStructure.config.generateAsync({ type: 'blob' }).then((content: any) => {
            // Upload the ZIP file.
            const formData = new FormData();
            formData.append('data', content, `${this.uuid}.zip`);
            const headers = { 'Content-Type': 'multipart/form-data' };

            // axios.post('http://localhost:6040/upload', formData, { headers }).then((res: any) => {
            //     res.data.files; // binary representation of the file
            //     res.status; // HTTP status
            // });

            // Temporarily: download the ZIP file to browser instead of uploading to server.
            saveAs(content, `${this.uuid}.zip`);
        });

        return this.configFileStructure;
    }

    // react to param changes in URL
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        this.lang = to.params.lang;
        this.uuid = to.params.uid;
        this.$i18n.locale = this.lang;

        if (this.uuid) {
            this.fetchConfig();
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

    .editor-container button {
        padding: 5px 10px;
        margin: 2px;
        border: 1px solid black;
    }
}
</style>
