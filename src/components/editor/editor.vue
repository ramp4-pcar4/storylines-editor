<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="loadStatus === 'waiting' || loadStatus === 'loading'">
            <div class="px-20 py-5">
                <div class="flex">
                    <div class="flex text-2xl font-bold mb-5">
                        {{ editExisting ? $t('editor.editProduct') : $t('editor.createProduct') }}
                    </div>
                    <button v-if="config" @click="swapLang">
                        {{ lang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                </div>

                <div class="border py-5 w-5/6">
                    <label>{{ $t('editor.uuid') }}:</label>
                    <input
                        type="text"
                        @input="errorMessage = ''"
                        v-model="uuid"
                        class="w-1/3"
                        :class="errorMessage ? 'input-error' : ''"
                    />
                    <button
                        @click="generateRemoteConfig"
                        class="bg-gray-500 text-white hover:bg-gray-600"
                        :class="errorMessage ? 'input-error' : ''"
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
                    <div class="inline-flex">
                        <span v-if="errorMessage" class="mx-2 m-auto">{{ errorMessage }}</span>
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

                <label class="mb-5">{{ $t('editor.title') }}:</label>
                <input type="text" v-model="title" class="w-1/3" /> <br />

                <!-- only display an image preview if one is provided.-->
                <div v-if="!!logoPreview">
                    <label>{{ $t('editor.logoPreview') }}:</label>
                    <img :src="logoPreview" v-if="!!logoPreview && logoPreview != 'error'" class="image-preview" />
                    <p v-if="logoPreview == 'error'" class="image-preview">
                        An error occurred when trying to load image.
                    </p>
                </div>

                <label class="mb-5 inline">{{ $t('editor.logo') }}:</label>
                <input type="text" @change="onLogoSourceInput" :value="logoName" class="w-1/4" />
                <button v-on:click="openFileSelector" class="bg-black text-white hover:bg-gray-800">
                    {{ $t('editor.browse') }}
                </button>

                <!-- hide the actual file input -->
                <input type="file" @change="onFileChange" id="logoUpload" class="w-1/4" style="display: none" />

                <br />
                <label>{{ $t('editor.contextLink') }}:</label>
                <input type="text" v-model="contextLink" class="w-2/3" />
                <br />
                <label class="mb-5"></label>
                <p class="inline-block">
                    <i>
                        Context link shows up at the bottom of the page to provide additional resources for interested
                        users
                    </i>
                </p>
                <br />
                <label>{{ $t('editor.contextLabel') }}:</label>
                <input type="text" v-model="contextLabel" class="w-2/3" />
                <br />
                <label class="mb-5"></label>
                <p class="inline-block">
                    <i> Context label shows up before the context link to explain what the link is for </i>
                </p>
                <br />
                <label class="mb-5">{{ $t('editor.dateModified') }}:</label>
                <input type="date" v-model="dateModified" /> <br /><br />
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
            <div class="flex border-b border-black bg-gray-200 py-2 px-2">
                <span class="m-1 font-semibold text-lg">{{ config.title }}</span>
                <span class="ml-auto"></span>
                <button class="bg-white border border-black hover:bg-gray-100">Preview</button>
                <button @click="generateConfig" class="bg-black text-white hover:bg-gray-900">Save Changes</button>
            </div>
            <div class="flex">
                <div class="w-80 flex-shrink-0 border-r border-black editor-toc">
                    <div class="flex items-center justify-center border-b p-2">
                        <button>
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
    logoImage: undefined | File = undefined;
    logoPreview = ''; // for display purposes only
    logoName = '';
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

        // Set the source of the product logo
        if (!this.logoName.includes('http')) {
            this.config.introSlide.logo.src = `${this.uuid}/assets/${this.lang}/${this.logoImage?.name}`;
        } else {
            this.config.introSlide.logo.src = this.logoName;
        }

        // Add the newly generated Storylines configuration file to the ZIP file.
        const fileName = `${this.uuid}_${this.lang}.json`;
        const formattedConfigFile = JSON.stringify(this.config, null, 4);

        configZip.file(fileName, formattedConfigFile);

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
    configFileStructureHelper(configZip: any, uploadLogo?: File | undefined): any {
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

                    // Fetch the logo from the folder (if it exists).
                    const logoSrc = `${this.logo.substring(this.logo.indexOf('/') + 1)}`;
                    const logoName = `${this.logo.split('/')[this.logo.split('/').length - 1]}`;

                    if (this.configFileStructure.config.file(logoSrc)) {
                        this.configFileStructure.config
                            .file(logoSrc)
                            .async('blob')
                            .then((img: any) => {
                                this.logoImage = new File([img], logoName);
                                this.logoPreview = URL.createObjectURL(img);
                                this.logoName = logoName;
                            });
                    } else {
                        // If it doesn't exist, maybe it's a remote file?
                        fetch(this.logo).then((data: any) => {
                            if (data.status !== 404) {
                                this.logoImage = new File([data], logoName);
                                this.logoPreview = this.logo;
                            }
                        });

                        // Fill in the field with this value whether it exists or not.
                        this.logoName = this.logo;
                    }

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
            this.config.contextLink = this.contextLink;
            this.config.contextLabel = this.contextLabel;
            this.config.dateModified = this.dateModified;

            // If the logo doesn't include HTTP, assume it's a local file.
            if (!this.logoName.includes('http')) {
                this.config.introSlide.logo.src = `${this.uuid}/assets/${this.lang}/${this.logoImage?.name}`;
                this.configFileStructure.assets[this.lang].file(this.logoImage?.name, this.logoImage);
            } else {
                this.config.introSlide.logo.src = this.logoName;
            }
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
        }, 5);

        if (index !== -1 && this.slides[index].panel[0].type === 'dynamic') {
            (this.$refs.slide as any).panelIndex = 0;
        }
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

    openFileSelector(): void {
        document.getElementById('logoUpload')?.click();
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
        this.logoName = this.logo = (e.target as HTMLInputElement).value;

        fetch(this.logo)
            .then((data: any) => {
                if (data.status !== 404) {
                    this.logoPreview = this.logo;
                } else {
                    // If the image doesn't exist, display nothing.
                    this.logoPreview = 'error';
                }
            })
            .catch((err: any) => {
                // If an error occurs (maybe CORS), then display nothing.
                this.logoPreview = 'error';
            });
    }

    onFileChange(e: Event): void {
        // Retrieve the uploaded file.
        const uploadedFile = ((e.target as HTMLInputElement).files as any)[0];
        this.logoImage = uploadedFile;

        // Generate an image preview.
        this.logoPreview = URL.createObjectURL(uploadedFile);
        this.logoName = uploadedFile.name;
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
        width: 8vw;
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
        border: none !important;
        transition-duration: 0.2s;
        padding: 0.25 0.25em !important;
    }

    .image-preview {
        max-width: 150px;
        max-height: 150px;
        display: inline;
    }
}
</style>
