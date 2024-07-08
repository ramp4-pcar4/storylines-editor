<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="!loadEditor">
            <div class="px-20 py-5">
                <div class="flex">
                    <div class="flex flex-1 text-2xl font-bold mb-5">
                        {{ editExisting ? $t('editor.editProduct') : $t('editor.createProduct') }}
                    </div>
                    <button class="editor-button" @click="swapLang()">
                        {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                </div>
                <div class="border py-5 w-5/6">
                    <div v-if="renaming" class="flex flex-row items-center">
                        <label class="editor-label"> {{ $t('editor.uuid.new') }}: </label>
                        <input
                            class="editor-input w-1/3 mt-0"
                            type="text"
                            @input="
                                error = false;
                                checkUuid(true);
                            "
                            v-model="changeUuid"
                            :class="{ 'input-error': error || !reqFields.uuid }"
                        />
                        <button
                            @click="renameProduct"
                            class="editor-button bg-black text-white hover:bg-gray-800"
                            :class="{ 'input-error': error }"
                            :disabled="changeUuid.length === 0 || checkingUuid || warning === 'rename'"
                        >
                            {{ $t('editor.rename') }}
                        </button>

                        <!-- If config is loading, display a small spinner. -->
                        <div class="inline-flex align-middle mb-1" v-if="checkingUuid">
                            <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                        </div>
                    </div>
                    <div v-else class="flex flex-row items-center">
                        <label class="editor-label">
                            <span class="text-red-500" v-if="'uuid' in reqFields">*</span>
                            {{ $t('editor.uuid') }}:
                        </label>
                        <div class="relative w-1/3 inline-block">
                            <input
                                class="editor-input w-full mt-0"
                                type="text"
                                @input="
                                    error = false;
                                    reqFields.uuid = true;
                                    checkUuid();
                                "
                                v-model="uuid"
                                @focus="showDropdown = true"
                                @blur="showDropdown = false"
                                @keydown.down.prevent="highlightNext"
                                @keydown.up.prevent="highlightPrevious"
                                @keydown.enter.prevent="selectHighlighted"
                                :class="{ 'input-error': error || !reqFields.uuid }"
                            />
                            <div
                                class="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60vh overflow-y-auto"
                                v-show="showDropdown"
                            >
                                <ul>
                                    <li
                                        v-for="(storyline, index) in getStorylines"
                                        :key="storyline.uuid"
                                        @mousedown.prevent="selectUuid(storyline.uuid)"
                                        :class="[
                                            'p-2 hover:bg-gray-100 cursor-pointer',
                                            storyline.isUserStoryline ? 'bg-gray-200' : '',
                                            { 'bg-gray-300': highlightedIndex === index }
                                        ]"
                                    >
                                        <div>
                                            {{ storyline.uuid }} - <b>{{ storyline.title }}</b>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button
                            @click="generateRemoteConfig"
                            class="editor-button bg-black text-white hover:bg-gray-800"
                            :class="{ 'input-error': error }"
                            v-if="editExisting"
                        >
                            {{ $t('editor.load') }}
                        </button>

                        <button
                            @click="fetchHistory"
                            class="bg-black editor-button text-white hover:bg-gray-800"
                            :class="{ 'input-error': error }"
                            v-if="editExisting"
                        >
                            {{ $t('editor.viewHistory') }}
                        </button>

                        <!-- If config is loading, display a small spinner. -->
                        <div class="inline-flex align-middle mb-1" v-if="loadStatus === 'loading'">
                            <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                        </div>

                        <div v-if="editExisting" class="ml-10">
                            <ul>
                                <li
                                    v-for="history in storylineHistory"
                                    :key="history.id"
                                    @click="selectHistory(history)"
                                    class="p-2 cursor-pointer"
                                    :class="{ 'bg-blue-200': selectedHistory && history.id === selectedHistory.id }"
                                >
                                    {{ formatDate(history.created) }}
                                </li>
                            </ul>
                            <button
                                :disabled="!selectedHistory || selectedHistory.storylineUUID !== uuid"
                                class="editor-button bg-black text-white hover:bg-gray-800"
                                @click="loadHistory()"
                            >
                                {{ $t('editor.loadPrevious') }}
                            </button>
                        </div>
                    </div>
                    <div>
                        <!-- Display a warning if there is one. -->
                        <span v-if="warning !== 'none'" class="text-yellow-500 rounded p-1">
                            <div class="editor-label"></div>
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
                            <span class="align-center inline-block select-none text-sm">{{
                                $t(`editor.warning.${warning}`)
                            }}</span
                            ><br />
                        </span>

                        <!-- Warning displayed if product is being renamed. -->
                        <span v-if="!renaming && renamed" class="text-yellow-500 rounded p-1">
                            <div class="editor-label"></div>
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
                            <span class="align-center inline-block select-none text-sm"
                                >{{
                                    $t('editor.changingUuid', {
                                        changeUuid: renamed
                                    })
                                }} </span
                            ><br />
                        </span>

                        <!-- Button to switch between loading and renaming product UUIDs. -->
                        <span v-if="editExisting && loadStatus == 'loaded'" class="p-1">
                            <div class="editor-label"></div>
                            <button
                                class="align-center inline-block select-none text-sm"
                                @click="
                                    renaming = !renaming;
                                    changeUuid = '';
                                    warning = warning == 'rename' ? 'none' : warning;
                                "
                            >
                                {{ renaming ? $t('editor.cancel') : $t('editor.changeUuid') }}
                            </button>
                        </span>
                    </div>
                </div>
                <br />
                <div class="mb-4">
                    <h3 class="editor-h3">{{ $t('editor.productDetails') }}</h3>
                    <p>
                        {{ $t('editor.metadata.instructions') }}
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
                <button v-if="editExisting" @click="saveMetadata(true)" class="editor-button">
                    {{ $t('editor.saveChanges') }}
                </button>
                <div class="ml-auto">
                    <router-link :to="{ name: 'home' }" target>
                        <button class="editor-button">{{ $t('editor.back') }}</button>
                    </router-link>
                    <button
                        @click="warning === 'none' ? continueToEditor() : $vfm.open(`confirm-uuid-overwrite`)"
                        class="editor-button bg-black text-white"
                    >
                        {{ $t('editor.next') }}
                    </button>
                    <confirmation-modal
                        :name="`confirm-uuid-overwrite`"
                        :message="
                            $t('editor.confirmOverwrite', {
                                uuid: uuid
                            })
                        "
                        @ok="continueToEditor()"
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
                @save-changes="generateConfig"
                @save-status="updateSaveStatus"
                @refresh-config="refreshConfig"
                ref="mainEditor"
            >
                <template v-slot:langModal="slotProps">
                    <button
                        class="editor-button"
                        @click.stop="slotProps.unsavedChanges ? $vfm.open(`change-lang`) : swapLang()"
                    >
                        {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                    </button>
                    <confirmation-modal
                        :name="`change-lang`"
                        :message="$t('editor.changeLang.modal')"
                        @ok="swapLang()"
                    />
                </template>

                <template v-slot:metadataModal>
                    <vue-final-modal
                        modalId="metadata-edit-modal"
                        content-class="flex flex-col max-h-full overflow-y-auto max-w-xl mx-4 p-4 bg-white border rounded-lg space-y-2"
                        class="flex justify-center items-center"
                    >
                        <h2 slot="header" class="text-lg font-bold">{{ $t('editor.editMetadata') }}</h2>
                        <metadata-content
                            :metadata="metadata"
                            @metadata-changed="updateMetadata"
                            @logo-changed="onFileChange"
                            @logo-source-changed="onLogoSourceInput"
                        ></metadata-content>
                        <div class="w-full flex justify-end">
                            <button
                                class="editor-button bg-black text-white hover:bg-gray-800"
                                @click="saveMetadata(false)"
                            >
                                Done
                            </button>
                        </div>
                    </vue-final-modal>
                </template>
            </editor>
        </template>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { RouteLocationNormalized } from 'vue-router';
import { AxiosResponse } from 'axios';
import { throttle } from 'throttle-debounce';
import {
    AudioPanel,
    BasePanel,
    ChartPanel,
    ConfigFileStructure,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    MetadataContent,
    PanelType,
    Slide,
    SlideshowPanel,
    SourceCounts,
    StoryRampConfig,
    TextPanel,
    VideoPanel
} from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { VueFinalModal } from 'vue-final-modal';
import { useUserStore } from '../stores/userStore';

const JSZip = require('jszip');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

import Message from 'vue-m-message';
import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';
import MetadataContentV from './helpers/metadata-content.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import EditorV from './editor.vue';

import cloneDeep from 'clone-deep';

interface RouteParams {
    uid: string;
    configLang: string;
    configs: {
        [key: string]: StoryRampConfig | undefined;
    };
    configFileStructure: ConfigFileStructure;
    metadata: MetadataContent;
    slides: Slide[];
    sourceCounts: SourceCounts;
    existing: boolean;
    unsavedChanges: boolean;
}

interface History {
    id: number;
    storylineUUID: string;
    created: string;
}

@Options({
    components: {
        Editor: EditorV,
        'confirmation-modal': ConfirmationModalV,
        'metadata-content': MetadataContentV,
        spinner: VueSpinnerOval,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV,
        'vue-final-modal': VueFinalModal
    }
})
export default class MetadataEditorV extends Vue {
    @Prop({ default: true }) editExisting!: boolean; // true if editing existing storylines product, false if new product

    configs: {
        [key: string]: StoryRampConfig | undefined;
    } = { en: undefined, fr: undefined };
    configFileStructure: ConfigFileStructure | undefined = undefined;
    loadExisting = false;
    reloadExisting = false;
    loadStatus = 'waiting';
    checkingUuid = false;
    loadEditor = false;
    error = false; // whether an error has occurred
    warning: 'none' | 'uuid' | 'rename' = 'none'; // used for duplicate uuid warning
    configLang = 'en';
    showDropdown = false;
    highlightedIndex = -1;

    storylineHistory: History[] = [];
    selectedHistory: History | null = null;

    // Saving properties.
    saving = false;
    unsavedChanges = false;

    apiUrl = process.env.VUE_APP_CURR_ENV !== '#{CURR_ENV}#' ? process.env.VUE_APP_API_URL : 'http://localhost:6040';

    // Form properties.
    uuid = '';
    baseUuid = ''; // to save the original UUID
    changeUuid = '';
    renaming = false;
    renamed = '';
    logoImage: undefined | File = undefined;
    metadata: MetadataContent = {
        title: '',
        introTitle: '',
        introSubtitle: '',
        logoPreview: '',
        logoName: '',
        logoAltText: '',
        contextLink: '',
        contextLabel: '',
        tocOrientation: '',
        dateModified: ''
    };
    // add more required metadata fields to here as needed
    reqFields: { uuid: boolean } = {
        uuid: true
    };
    slides: Slide[] = [];
    sourceCounts: SourceCounts = {};

    created(): void {
        this.loadExisting = this.editExisting;

        // Generate UUID for new product
        this.uuid = (this.$route.params.uid as string) ?? (this.loadExisting ? undefined : uuidv4());
        this.configLang = (this.$route.params.lang as string) || 'en';

        // Initialize Storylines config and the configuration structure.
        this.configs = { en: undefined, fr: undefined };
        this.configFileStructure = undefined;

        // set any metadata default values for creating new product
        if (!this.loadExisting) {
            // set current date as default
            const curDate = new Date();
            const year = curDate.getFullYear();
            const month = (curDate.getMonth() + 1).toString().padStart(2, '0');
            const day = curDate.getDate().toString().padStart(2, '0');
            this.metadata.dateModified = `${year}-${month}-${day}`;
            // set vertical as the default table of contents orientation
            this.metadata.tocOrientation = 'vertical';
        }

        // Find which view to render based on route
        if (this.$route.name === 'editor') {
            this.loadEditor = true;
            const props = this.$route.meta.data as RouteParams;

            // Properties already passed in props, load editor view (could use a refactor to clean up this workflow process)
            if (props && props.configs && props.configFileStructure) {
                this.configs = props.configs;
                this.configLang = props.configLang;
                this.configFileStructure = props.configFileStructure;
                this.metadata = props.metadata;
                this.slides = props.slides;
                this.sourceCounts = props.sourceCounts;
                this.loadExisting = props.existing;
                this.unsavedChanges = props.unsavedChanges;
                // Load product logo (if provided).
                const logo = this.configs[this.configLang]?.introSlide.logo?.src;
                const logoSrc = `assets/${this.configLang}/${this.metadata.logoName}`;

                if (logo) {
                    const logoFile = this.configFileStructure?.zip.file(logoSrc);
                    if (logoFile) {
                        logoFile.async('blob').then((img: Blob) => {
                            this.logoImage = new File([img], this.metadata.logoName);
                            this.metadata.logoPreview = URL.createObjectURL(img);
                            this.loadStatus = 'loaded';
                        });
                    } else {
                        // Fill in the field with this value whether it exists or not.
                        this.metadata.logoName = logo;

                        // If it doesn't exist, maybe it's a remote file?
                        fetch(logo).then((data: Response) => {
                            if (data.status !== 404) {
                                data.blob().then((blob: Blob) => {
                                    this.logoImage = new File([blob], this.metadata.logoName);
                                    this.metadata.logoPreview = logo;
                                    this.loadStatus = 'loaded';
                                });
                            }
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

        // Set the source of the product logo
        if (!this.metadata.logoName) {
            config.introSlide.logo.src = '';
        } else if (!this.metadata.logoName.includes('http')) {
            config.introSlide.logo.src = `${this.uuid}/assets/${this.configLang}/${this.logoImage?.name}`;
        } else {
            config.introSlide.logo.src = this.metadata.logoName;
        }
        config.slides = [];

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
        return {
            title: this.metadata.title,
            lang: this.configLang,
            introSlide: {
                logo: {
                    src: ''
                },
                title: this.metadata.introTitle,
                subtitle: this.metadata.introSubtitle
            },
            slides: [],
            contextLabel: this.metadata.contextLabel,
            contextLink: this.metadata.contextLink,
            tocOrientation: this.metadata.tocOrientation,
            dateModified: this.metadata.dateModified
        };
    }

    /**
     * Provided with a UID, retrieve the project contents from the file server.
     */
    generateRemoteConfig(): void {
        this.loadStatus = 'loading';

        // Reset fields
        this.baseUuid = this.uuid;
        this.renamed = '';
        this.changeUuid = '';

        // Attempt to fetch the project from the server.
        fetch(this.apiUrl + `/retrieve/${this.uuid}`)
            .then((res: Response) => {
                if (res.status === 404) {
                    // Product not found.
                    Message.error(`The requested UUID '${this.uuid ?? ''}' does not exist.`);
                    this.error = true;
                    this.loadStatus = 'waiting';
                    this.clearConfig();
                } else {
                    const configZip = new JSZip();
                    // Files retrieved. Convert them into a JSZip object.
                    res.blob().then((file: Blob) => {
                        configZip.loadAsync(file).then(() => {
                            this.configFileStructureHelper(configZip);
                        });
                    });
                }

                fetch(this.apiUrl + `/retrieveMessages`)
                    .then((res: any) => {
                        if (res.ok) return res.json();
                    })
                    .then((data) => {
                        axios
                            .post(process.env.VUE_APP_NET_API_URL + '/api/log/create', {
                                messages: data.messages
                            })
                            .catch((error: any) => console.log(error.response || error));
                    })
                    .catch((error: any) => console.log(error.response || error));
            })
            .catch(() => {
                Message.error(`Failed to load product, no response from server`);
                this.loadStatus = 'loaded';
            });
    }

    fetchHistory(): void {
        if (this.uuid === undefined) Message.error(`You must first enter a UUID`);

        if (process.env.VUE_APP_CURR_ENV !== '#{CURR_ENV}#') {
            axios
                .get(process.env.VUE_APP_NET_API_URL + `/api/version/fetch/${this.uuid}`)
                .then((response: any) => {
                    this.storylineHistory = response.data;
                })
                .catch((error: any) => console.log(error.response || error));
        }
    }

    selectHistory(selected: any): void {
        this.selectedHistory = selected;
    }

    formatDate(created: string): string {
        const date = new Date(created);
        const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/Toronto'
        };

        return new Intl.DateTimeFormat('en-US', options).format(estDate);
    }

    loadHistory(): void {
        if (this.selectedHistory && process.env.VUE_APP_CURR_ENV !== '#{CURR_ENV}#') {
            this.loadStatus = 'loading';

            axios
                .get(process.env.VUE_APP_NET_API_URL + `/api/version/load/${this.selectedHistory.id}`, {
                    responseType: 'blob'
                })
                .then((response: any) => {
                    const blob = response.data;

                    JSZip.loadAsync(blob)
                        .then((zip: any) => {
                            this.configFileStructureHelper(zip);
                        })
                        .catch((jsZipError: any) => {
                            console.error('Error processing ZIP file:', jsZipError);
                            Message.error('Failed to process ZIP file');
                        });
                })
                .catch((error: any) => {
                    if (error.response && error.response.status === 404) {
                        Message.error(`The requested version does not exist.`);
                        this.error = true;
                        this.loadStatus = 'waiting';
                        this.clearConfig();
                    } else {
                        console.error('Failed to load version:', error);
                        Message.error('Failed to load product, no response from server');
                    }
                    this.loadStatus = 'loaded';
                });
        }
    }

    async renameProduct(): Promise<void> {
        if (!this.configFileStructure) {
            return;
        }

        // Fetch the two existing configuration files.
        const enFile = this.configFileStructure?.zip.file(`${this.uuid}_en.json`);
        const frFile = this.configFileStructure?.zip.file(`${this.uuid}_fr.json`);

        if (enFile && frFile) {
            // Remove the files from the ZIP folder.
            this.configFileStructure?.zip.remove(enFile.name);
            this.configFileStructure?.zip.remove(frFile.name);

            // Fetch the contents of the two files, and perform a find/replace on the UUID for each source.
            const englishConfig = await enFile?.async('string').then((res: string) => JSON.parse(res));
            const frenchConfig = await frFile?.async('string').then((res: string) => JSON.parse(res));
            [englishConfig, frenchConfig].forEach((config) => this.renameSources(config));

            // Convert the configs back into a string and re-add them to the ZIP with the new UUID.
            this.configFileStructure?.zip.file(`${this.changeUuid}_en.json`, JSON.stringify(englishConfig, null, 4));
            this.configFileStructure?.zip.file(`${this.changeUuid}_fr.json`, JSON.stringify(frenchConfig, null, 4));

            this.uuid = this.changeUuid;

            // Reset source counts and re-generate the config file structure.
            this.sourceCounts = {};
            this.configFileStructureHelper(this.configFileStructure.zip);
        }

        this.renaming = false;
        this.renamed = this.uuid;
    }

    // Given a Storylines config, replace instances of the current UUID with a new UUID.
    renameSources(config: StoryRampConfig): void {
        const _renameHelper = (panel: any): any => {
            switch (panel.type) {
                case PanelType.Dynamic:
                    (panel as DynamicPanel).children.forEach((child) => {
                        _renameHelper(child.panel);
                    });
                    break;
                case PanelType.Slideshow:
                    (panel as SlideshowPanel).items.forEach((child) => {
                        _renameHelper(child);
                    });
                    break;
                default:
                    // Base case. This is a panel that doesn't have any children (i.e., not dynamic, slideshow).
                    // Rename the source.
                    if (panel.src) {
                        panel.src = panel.src.replace(`${this.uuid}/`, `${this.changeUuid}/`);
                    }
                    if (panel.config && typeof panel.config === 'string') {
                        panel.config = panel.config.replace(`${this.uuid}/`, `${this.changeUuid}/`);
                    }
            }
        };

        if (config?.introSlide.logo?.src) {
            config.introSlide.logo.src = config.introSlide.logo.src.replace(
                `${this.uuid}/assets/`,
                `${this.changeUuid}/assets/`
            );
        }

        config.slides.forEach((slide) => {
            slide.panel.forEach((panel) => {
                _renameHelper(panel);
            });
        });
    }

    findSources(configs: { [key: string]: StoryRampConfig | undefined }): void {
        ['en', 'fr'].forEach((lang) => {
            if (configs[lang]?.introSlide.logo?.src) {
                this.incrementSourceCount((configs[lang] as StoryRampConfig).introSlide.logo.src);
            }

            configs[lang]?.slides.forEach((slide) => {
                slide.panel.forEach((panel) => {
                    this.panelSourceHelper(panel);
                });
            });
        });
    }

    panelSourceHelper(panel: BasePanel): void {
        switch (panel.type) {
            case PanelType.Dynamic:
                (panel as DynamicPanel).children.forEach((subPanel: DynamicChildItem) => {
                    this.panelSourceHelper(subPanel.panel);
                });
                break;
            case PanelType.Slideshow:
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
            case PanelType.Audio:
                this.incrementSourceCount((panel as AudioPanel).src);
                break;
            case PanelType.Map:
                this.incrementSourceCount((panel as MapPanel).config);
                break;
            case PanelType.Text:
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
    configFileStructureHelper(configZip: typeof JSZip, uploadLogo?: File | undefined): void {
        const assetsFolder = configZip.folder('assets');
        const chartsFolder = configZip.folder('charts');
        const rampConfigFolder = configZip.folder('ramp-config');

        this.configFileStructure = {
            uuid: this.uuid,
            zip: configZip,
            configs: this.configs as unknown as { [key: string]: StoryRampConfig },
            assets: {
                en: assetsFolder.folder('en'),
                fr: assetsFolder.folder('fr')
            },
            charts: {
                en: chartsFolder.folder('en'),
                fr: chartsFolder.folder('fr')
            },
            rampConfig: rampConfigFolder
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
            const enFile = this.configFileStructure?.zip.file(`${this.uuid}_en.json`);
            const frFile = this.configFileStructure?.zip.file(`${this.uuid}_fr.json`);
            await enFile?.async('string').then((res: string) => {
                this.configs['en'] = JSON.parse(res);
            });
            await frFile?.async('string').then((res: string) => {
                this.configs['fr'] = JSON.parse(res);
            });
        } catch {
            Message.error(`The requested product '${this.uuid ?? ''}' is malformed.`);
            this.loadStatus = 'waiting';
            this.clearConfig();
            return;
        }

        if (this.loadExisting && !this.renamed) {
            this.loadStatus = 'waiting';
            Message.success('Successfully loaded storyline!');
        } else {
            this.loadStatus = 'loaded';
        }

        // Load in project data.
        if (this.configs[this.configLang]) {
            this.useConfig(this.configs[this.configLang] as StoryRampConfig);
            this.findSources(this.configs);
            // Update router path
            if (this.reloadExisting) {
                this.loadEditor = true;
                this.generateConfig();
                this.updateEditorPath();
            } else if (!this.loadExisting) {
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
        this.metadata.tocOrientation = config.tocOrientation;
        this.metadata.dateModified = config.dateModified;

        this.slides = config.slides;

        const logo = config.introSlide.logo?.src;
        if (logo) {
            // Set the alt text for the logo.
            this.metadata.logoAltText = config.introSlide.logo?.altText ? config.introSlide.logo.altText : '';

            // Fetch the logo from the folder (if it exists).
            const logoSrc = `${logo.substring(logo.indexOf('/') + 1)}`;
            const logoName = `${logo.split('/')[logo.split('/').length - 1]}`;
            const logoFile = this.configFileStructure?.zip.file(logoSrc);

            if (logoFile) {
                logoFile.async('blob').then((img: Blob) => {
                    this.logoImage = new File([img], logoName);
                    this.metadata.logoPreview = URL.createObjectURL(img);
                    this.metadata.logoName = logoName;
                    this.loadStatus = 'loaded';
                });
            } else {
                // Fill in the field with this value whether it exists or not.
                this.metadata.logoName = logo;

                // If it doesn't exist, maybe it's a remote file?
                fetch(logo).then((data: Response) => {
                    if (data.status !== 404) {
                        data.blob().then((blob: Blob) => {
                            this.logoImage = new File([blob], logoName);
                            this.metadata.logoPreview = logo;
                            this.loadStatus = 'loaded';
                        });
                    }
                });
            }
        }
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, then generates and submits the product file to the server.
     */
    generateConfig(): ConfigFileStructure {
        this.saving = true;

        // Update the configuration file.
        const fileName = `${this.uuid}_${this.configLang}.json`;
        const formattedConfigFile = JSON.stringify(this.configs[this.configLang], null, 4);

        this.configFileStructure?.zip.file(fileName, formattedConfigFile);

        // Upload the ZIP file.
        this.configFileStructure?.zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
            const formData = new FormData();
            formData.append('data', content, `${this.uuid}.zip`);
            const headers = { 'Content-Type': 'multipart/form-data' };
            Message.warning('Please wait. This may take several minutes.');

            axios
                .post(this.apiUrl + '/upload', formData, { headers })
                .then((res: AxiosResponse) => {
                    const responseData = res.data;
                    responseData.files; // binary representation of the file
                    responseData.status; // HTTP status
                    this.unsavedChanges = false;
                    this.loadExisting = true; // if editExisting was false, we can now set it to true

                    if (process.env.VUE_APP_CURR_ENV !== '#{CURR_ENV}#') {
                        if (responseData.new) {
                            axios
                                .post(process.env.VUE_APP_NET_API_URL + '/api/user/register', {
                                    uuid: this.uuid,
                                    title: this.metadata.title ?? ''
                                })
                                .then((response: any) => {
                                    const userStore = useUserStore();
                                    userStore.fetchUserProfile();
                                    console.log(response);

                                    formData.append('uuid', this.uuid);
                                    axios
                                        .post(process.env.VUE_APP_NET_API_URL + '/api/version/commit', formData)
                                        .then((response: any) => {
                                            Message.success('Successfully saved changes!');
                                        })
                                        .catch((error: any) => console.log(error.response || error))
                                        .finally(() => {
                                            // padding to prevent save button from being clicked rapidly
                                            setTimeout(() => {
                                                this.saving = false;
                                            }, 500);
                                        });
                                })
                                .catch((error: any) => console.log(error.response || error));
                        } else {
                            formData.append('uuid', this.uuid);
                            axios
                                .post(process.env.VUE_APP_NET_API_URL + '/api/version/commit', formData)
                                .then((response: any) => {
                                    Message.success('Successfully saved changes!');
                                })
                                .catch((error: any) => console.log(error.response || error))
                                .finally(() => {
                                    // padding to prevent save button from being clicked rapidly
                                    setTimeout(() => {
                                        this.saving = false;
                                    }, 500);
                                });
                        }

                        fetch(this.apiUrl + `/retrieveMessages`)
                            .then((res: any) => {
                                if (res.ok) return res.json();
                            })
                            .then((data) => {
                                axios
                                    .post(process.env.VUE_APP_NET_API_URL + '/api/log/create', {
                                        messages: data.messages
                                    })
                                    .catch((error: any) => console.log(error.response || error));
                            })
                            .catch((error: any) => console.log(error.response || error));
                    } else {
                        // padding to prevent save button from being clicked rapidly
                        setTimeout(() => {
                            this.saving = false;
                        }, 500);
                    }
                })
                .catch(() => {
                    Message.error('Failed to save changes.');
                });
        });

        return this.configFileStructure as ConfigFileStructure;
    }

    updateMetadata(
        key:
            | 'title'
            | 'introTitle'
            | 'introSubtitle'
            | 'contextLink'
            | 'contextLabel'
            | 'tocOrientation'
            | 'dateModified',
        value: string
    ): void {
        this.metadata[key] = value;
        this.unsavedChanges = true;
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
            config.tocOrientation = this.metadata.tocOrientation;
            config.dateModified = this.metadata.dateModified;

            // If the logo section is missing, create it here before overwriting values.
            if (config.introSlide.logo === undefined) {
                config.introSlide.logo = { src: '', altText: '' };
            }

            config.introSlide.logo.altText = this.metadata.logoAltText;

            // If the logo doesn't include HTTP, assume it's a local file.
            if (!this.metadata.logoName) {
                config.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                config.introSlide.logo.src = `${this.uuid}/assets/${this.configLang}/${this.logoImage?.name}`;
                this.configFileStructure?.assets[this.configLang].file(
                    this.logoImage?.name as string,
                    this.logoImage as File
                );
            } else {
                config.introSlide.logo.src = this.metadata.logoName;
            }

            if (publish) {
                this.generateConfig();
            }

            const userStore = useUserStore();
            userStore.fetchUserProfile();
        }
        this.$vfm.close('metadata-edit-modal');
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
            logoName: '',
            logoAltText: '',
            tocOrientation: ''
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
            (this.$refs.mainEditor as EditorV).updateSlides(this.slides);
            (this.$refs.mainEditor as EditorV).selectSlide(-1);
        }
    }

    checkUuid = throttle(300, (rename?: boolean): void => {
        if (rename) this.checkingUuid = true;

        if (!this.loadExisting || rename) {
            // If renaming, show the loading spinner while we check whether the UUID is taken.
            fetch(this.apiUrl + `/retrieve/${rename ? this.changeUuid : this.uuid}`).then((res: Response) => {
                if (res.status !== 404) {
                    this.warning = rename ? 'rename' : 'uuid';
                }

                if (rename) this.checkingUuid = false;

                fetch(this.apiUrl + `/retrieveMessages`)
                    .then((res: any) => {
                        if (res.ok) return res.json();
                    })
                    .then((data) => {
                        axios
                            .post(process.env.VUE_APP_NET_API_URL + '/api/log/create', {
                                messages: data.messages
                            })
                            .catch((error: any) => console.log(error.response || error));
                    })
                    .catch((error: any) => console.log(error.response || error));
            });
        }
        this.warning = 'none';
        this.highlightedIndex = -1;
    });

    /**
     * React to param changes in URL.
     */
    beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized, next: () => void): void {
        this.uuid = to.params.uid as string;
        this.$i18n.locale = to.params.lang as string;

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
                Message.success('Successfully loaded logo image.');
            } else {
                this.metadata.logoPreview = 'error';
                Message.error('Failed to load logo image.');
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
            this.$router.beforeEach((to: RouteLocationNormalized) => {
                if (to.name === 'editor') {
                    to.meta.data = {
                        configLang: this.configLang,
                        configs: this.configs,
                        configFileStructure: this.configFileStructure,
                        sourceCounts: this.sourceCounts,
                        metadata: this.metadata,
                        slides: this.slides,
                        existing: this.editExisting,
                        unsavedChanges: this.unsavedChanges
                    };
                }
            });

            this.$router.push({ name: 'editor', params: { uid: this.uuid } });
        }
    }

    checkRequiredFields(): boolean {
        // check if all required metadata fields are non-empty
        this.reqFields.uuid = !!this.uuid;
        if (Object.values(this.reqFields).some((field: boolean) => !field)) {
            Message.error(`Please fill out the required fields before proceeding.`);
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
        if (this.loadExisting) {
            if (this.configs[this.configLang] !== undefined && this.uuid === this.configFileStructure?.uuid) {
                this.loadEditor = true;
                this.saveMetadata(false);
                this.updateEditorPath();
            } else {
                Message.error('No config exists for storylines product.');
            }
        } else if (!this.uuid) {
            Message.error('Missing required field: UUID');
            this.error = true;
        } else {
            this.generateNewConfig();
        }
    }

    /**
     * Update the unsaved changes value to the payload.
     */
    updateSaveStatus(payload: boolean): void {
        this.unsavedChanges = payload;
    }

    refreshConfig(): void {
        // Re-fetch the product from the server.
        if (this.loadExisting) {
            this.reloadExisting = true;
            this.loadExisting = false;
            this.generateRemoteConfig();
        } else {
            this.reloadExisting = false;
            this.generateNewConfig();
        }
    }

    beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: (cont?: boolean) => void): void {
        const curEditor = this.$route.name === 'editor';
        const confirmationMessage = 'Leave the page? Changes made may not be saved.';
        if (this.unsavedChanges && curEditor && !window.confirm(confirmationMessage)) {
            next(false);
        } else {
            next();
        }
    }

    highlightNext() {
        if (this.highlightedIndex < this.getStorylines.length - 1) {
            this.highlightedIndex++;
            this.scrollIntoView();
        }
    }

    highlightPrevious() {
        if (this.highlightedIndex > 0) {
            this.highlightedIndex--;
            this.scrollIntoView();
        }
    }

    selectHighlighted() {
        if (this.highlightedIndex !== -1) {
            const selectedStoryline = this.getStorylines[this.highlightedIndex];
            this.selectUuid(selectedStoryline.uuid);
        }
    }

    scrollIntoView() {
        this.$nextTick(() => {
            const container = this.$el.querySelector('.overflow-y-auto');
            const activeItem = container.querySelector('li.bg-gray-300');
            if (activeItem) container.scrollTop = activeItem.offsetTop - container.offsetTop;
        });
    }

    get getStorylines() {
        const userStore = useUserStore();
        const userStorylines = userStore.userProfile.storylines?.map((s) => ({ ...s, isUserStoryline: true })) || [];
        const allStorylines =
            userStore.userProfile.allStorylines?.filter((s) => !userStorylines.some((u) => u.uuid === s.uuid)) || [];
        let combined = [...userStorylines, ...allStorylines];

        if (this.uuid) {
            combined = combined.filter(
                (storyline) =>
                    storyline.uuid.toLowerCase().includes(this.uuid.toLowerCase()) ||
                    (storyline.title && storyline.title.toLowerCase().includes(this.uuid.toLowerCase()))
            );
        }

        return combined;
    }

    selectUuid(uuid: string): void {
        this.uuid = uuid;
        this.showDropdown = false;
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.storyramp-app,
.vfm {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: $font-list;
        line-height: 1.5;
        border-bottom: 0px;
    }

    .editor-container {
        margin: 0 auto;
    }

    .vfm__content {
        max-width: 80%;
    }

    .vfm__content label {
        width: 10vw;
        text-align: right;
        margin-right: 15px;
        display: inline-block;
    }

    .editor-container h3 {
        font-size: larger;
    }

    .vfm__content input {
        padding: 5px 10px;
        margin-top: 5px;
        border: 1px solid black;
        display: inline;
    }

    .editor-container .input-error {
        border: 1px solid red;
    }

    .vfm__content button {
        padding: 5px 12px;
        margin: 0px 10px;
        font-weight: 600;
        transition-duration: 0.2s;
    }

    .vfm__content button:hover:enabled {
        background-color: #dbdbdb;
        color: black;
    }

    .vfm__content button:disabled {
        border: 1px solid gray;
        color: gray;
        cursor: not-allowed;
    }

    .image-preview {
        max-width: 150px;
        max-height: 150px;
        display: inline;
    }
}
</style>
