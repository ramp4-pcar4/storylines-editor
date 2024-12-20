<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="!loadEditor">
            <div>
                <!-- Main section: Page header -->
                <header
                    class="flex flex-col md:flex-row justify-between border-b-2 border-black px-7 md:px-20 pt-10 pb-5 mb-5"
                >
                    <!-- Page title -->
                    <div class="flex flex-1 my-2 mx-0 text-2xl md:text-3xl font-bold">
                        {{ editExisting ? $t('editor.loadProduct') : $t('editor.createProduct') }}
                    </div>
                    <!-- Header links -->
                    <div
                        class="flex flex-row md:flex-col gap-3 items-center md:items-stretch justify-between md:justify-around text-right"
                    >
                        <!-- ENG/FR page toggle -->
                        <router-link
                            v-if="
                                !currentRoute.includes('index-ca-en.html') && !currentRoute.includes('index-ca-fr.html')
                            "
                            :to="{
                                name: editExisting ? 'metadataExisting' : 'metadataNew',
                                params: { lang: currLang === 'en' ? 'fr' : 'en' }
                            }"
                            class="sub-link"
                        >
                            <a>
                                {{ currLang === 'en' ? 'Français' : 'English' }}
                            </a>
                        </router-link>
                        <!-- ENG/FR config toggle -->
                        <a class="sub-link" @click="swapLang()" tabindex="0">
                            {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                        </a>
                    </div>
                </header>
                <!-- Main section: Page body content -->
                <section class="px-7 md:px-20 py-5">
                    <!-- Body heading and instructions -->

                    <h1 v-if="editExisting" class="text-2xl font-semibold">
                        {{ $t('editor.editMetadata.editExistingHeader') }}
                    </h1>

                    <p v-if="editExisting" class="text-md mb-10">
                        {{ $t('editor.metadata.uuidInstructions') }}
                    </p>

                    <!-- Body section: UUID input and rename -->
                    <section>
                        <label for="uuid-input" class="font-bold mb-0"
                            >{{ $t('editor.uuid') }}
                            <span class="text-red-600 font-normal">{{ $t('editor.uuid.required') }}</span></label
                        >
                        <!-- Button to switch between loading and renaming product UUIDs. -->
                        <span v-if="editExisting && loadStatus === 'loaded'" class="p-1">
                            <button
                                class="ml-10 sub-link inline-block select-none text-sm"
                                @click="
                                    renaming = !renaming;
                                    changeUuid = '';
                                    warning = warning === 'rename' ? 'none' : warning;
                                "
                            >
                                {{ renaming ? $t('editor.cancel') : $t('editor.changeUuid') }}
                            </button>
                        </span>

                        <p v-if="!editExisting" class="font-normal">
                            {{ $t('editor.metadata.newUuidInstructions') }}
                        </p>

                        <!-- Subsection: UUID inputs -->
                        <div class="pb-5 pt-1">
                            <!-- UUID rename inputs -->
                            <!-- Shows up after you load a UUID and click the 'rename uuid' button (not exact text) -->
                            <div v-if="renaming" class="flex flex-row items-center w-full md:w-3/4">
                                <label for="rename-input" class="mr-6 ml-3"> {{ $t('editor.uuid.new') }}: </label>
                                <input
                                    id="rename-input"
                                    class="editor-input mt-0 flex-2"
                                    type="search"
                                    @input="
                                        error = false;
                                        checkUuid(true);
                                    "
                                    v-model="changeUuid"
                                    @keyup.enter="!error && warning === 'none' && renameProduct()"
                                    :class="{
                                        'input-error': warning === 'rename' || error || !reqFields.uuid
                                    }"
                                    v-tippy="{
                                        content: $t('editor.editMetadata.input.tooltip'),
                                        trigger: 'focusin',
                                        placement: 'top-end',
                                        touch: false
                                    }"
                                />
                                <button
                                    @click="renameProduct"
                                    class="editor-button editor-forms-button bg-black text-white ml-3 mr-0"
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
                            <!-- UUID entry (default) -->
                            <!-- Loads a new UUID -->
                            <div v-else class="flex flex-row items-center">
                                <div class="flex flex-row items-center w-full">
                                    <div class="relative w-full md:w-3/5 inline-block">
                                        <!-- Note: 'search'-type inputs will delete their inputted data if you press ESC. -->
                                        <input
                                            id="uuid-input"
                                            class="editor-input w-full mt-0"
                                            :disabled="loadStatus === 'loading'"
                                            type="search"
                                            @input="
                                                error = false;
                                                reqFields.uuid = true;
                                                checkUuid();
                                            "
                                            v-model.trim="uuid"
                                            v-on:keyup.enter="
                                                () => {
                                                    generateRemoteConfig()
                                                        .then(fetchHistory)
                                                        .catch(() => {}); // Prevent grousing in console
                                                }
                                            "
                                            @focus="showDropdown = true"
                                            @blur="showDropdown = false"
                                            @keydown.down.prevent="highlightNext"
                                            @keydown.up.prevent="highlightPrevious"
                                            @keydown.enter.prevent="selectHighlighted"
                                            :class="{
                                                'input-error': error || !reqFields.uuid,
                                                'input-success': loadStatus === 'loaded',
                                                'input-warning': warning !== 'none' || (!renaming && renamed)
                                            }"
                                            v-tippy="{
                                                content: $t('editor.editMetadata.input.tooltip'),
                                                trigger: 'focusin',
                                                placement: 'top-end',
                                                touch: false
                                            }"
                                        />
                                        <!-- Previous storylines (?) dropdown -->
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
                                                        {{ storyline.uuid }} - <b>{{ getTitle(storyline) }}</b>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- Load UUID button -->
                                    <!-- Load storyline with the given UUID, if it exists on the server, and also
                                         any history associated with the product that can be found -->
                                    <button
                                        @click="
                                            () => {
                                                generateRemoteConfig().then(fetchHistory);
                                            }
                                        "
                                        class="editor-button editor-forms-button bg-black text-white ml-3 mr-0"
                                        :class="{ 'input-error': error }"
                                        :disabled="loadStatus === 'loading'"
                                        v-if="editExisting"
                                    >
                                        {{ $t('editor.load') }}
                                    </button>
                                </div>
                            </div>
                            <!-- Subsection: Loading icon -->
                            <!-- Shows up after the load UUID button is pressed.
                                 Displays a large spinner to indicate that config is loading.
                                 Also provides a button to cancel the loading, if desired. -->
                            <section class="flex flex-col gap-5 mt-10" v-if="loadStatus === 'loading'">
                                <!-- Loading text -->
                                <p>
                                    {{ $t('editor.editMetadata.loading') }}
                                </p>
                                <!-- Spinner -->
                                <div class="align-middle mb-1">
                                    <spinner size="65px" thickness="20" color="#009cd1" class="mx-2 my-auto"></spinner>
                                </div>
                                <!-- Cancel load button -->
                                <div class="flex">
                                    <a class="sub-link text-left" @click="controller.abort">{{
                                        $t('editor.editMetadata.load.cancel')
                                    }}</a>
                                </div>
                            </section>

                            <div>
                                <!-- Display a warning if there is one. -->
                                <span
                                    v-if="warning !== 'none'"
                                    class="flex flex-row items-center text-accent-dark-orange rounded p-1"
                                >
                                    <span
                                        class="align-middle inline-block mr-1 fill-current"
                                        :class="{ 'sm:ml-28': warning === 'rename' }"
                                    >
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
                                    <div>
                                        <span class="inline-block select-none text-sm">{{
                                            $t(`editor.warning.${warning}`)
                                        }}</span>
                                    </div>
                                    <br />
                                </span>

                                <!-- Warning displayed if product is being renamed. -->
                                <span
                                    v-if="!renaming && renamed"
                                    class="flex flex-row items-center text-accent-dark-orange rounded p-1"
                                >
                                    <!-- <div class="editor-label"></div> -->
                                    <span class="align-middle inline-block mr-1 fill-current">
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
                                    <div>
                                        <span class="inline-block select-none text-sm"
                                            >{{
                                                $t('editor.changingUuid', {
                                                    changeUuid: renamed
                                                })
                                            }}
                                        </span>
                                    </div>
                                    <br />
                                </span>
                            </div>
                        </div>
                    </section>

                    <br />

                    <!-- Body section: Main page contents. -->
                    <!--Shows up either: once a UUID is entered and the storyline is loaded (existing), or immediately (new)-->
                    <section v-if="!editExisting || loadStatus === 'loaded'">
                        <!-- Subsection: Version history (existing only) -->
                        <section v-if="editExisting" class="pb-10">
                            <!-- Header -->
                            <h1 class="text-2xl font-semibold">
                                {{ $t('editor.editMetadata.versionHistory.header') }}
                            </h1>
                            <!-- Text indicating the amount of history results found -->
                            <p>
                                {{
                                    storylineHistory.length === 0
                                        ? $t('editor.editMetadata.versionHistory.noResults')
                                        : $t('editor.editMetadata.versionHistory.resultsFound')
                                }}
                            </p>
                            <!-- History results, if there are any -->
                            <div class="flex flex-col gap-5 pt-5" v-if="storylineHistory.length !== 0">
                                <div class="flex">
                                    <button
                                        class="editor-button editor-forms-button m-0 border border-black"
                                        @click="() => (showHistory = !showHistory)"
                                    >
                                        {{
                                            showHistory
                                                ? $t('editor.editMetadata.versionHistory.buttonHide')
                                                : $t('editor.editMetadata.versionHistory.buttonShow')
                                        }}
                                    </button>
                                </div>

                                <!-- Version history table -->
                                <table v-show="showHistory" class="shadow-lg bg-white w-full md:w-3/4 lg:w-1/2">
                                    <colgroup>
                                        <col class="w-3/5" />
                                        <col span="1" />
                                    </colgroup>
                                    <tr>
                                        <td
                                            style="background-color: #e7e7e7"
                                            class="font-bold border-b border-solid border-black"
                                        >
                                            <div class="m-2 mr-0 ml-3">
                                                {{ $t('editor.editMetadata.versionHistory.saveDate') }}
                                            </div>
                                        </td>
                                        <td
                                            style="background-color: #e7e7e7"
                                            class="font-bold border-b border-solid border-black"
                                        >
                                            <div class="ml-0">
                                                {{ $t('editor.editMetadata.versionHistory.actions') }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for="(historyItem, idx) in storylineHistory" :key="idx">
                                        <td
                                            style="background-color: #f9f9f9"
                                            class="border-b border-solid pl-4"
                                            :class="
                                                idx === storylineHistory.length - 1 ? 'border-black' : 'border-gray-200'
                                            "
                                        >
                                            {{ formatDate(historyItem.created) }}
                                        </td>
                                        <td
                                            style="background-color: #f9f9f9"
                                            class="border-b border-solid py-3 pr-3"
                                            :class="
                                                idx === storylineHistory.length - 1 ? 'border-black' : 'border-gray-200'
                                            "
                                        >
                                            <button
                                                class="editor-button editor-forms-button m-0 border border-black"
                                                @click="
                                                    () => {
                                                        selectHistory(historyItem);
                                                        loadHistory();
                                                    }
                                                "
                                            >
                                                <span>{{ $t('editor.editMetadata.versionHistory.load') }}</span>
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </section>
                        <!-- Subsection: Metadata details form -->
                        <section>
                            <!-- Headings (pre-form) -->
                            <section class="mb-4 flex gap-2 items-start md:items-center flex-col md:flex-row">
                                <!-- Heading/subheading text -->
                                <div class="flex-1">
                                    <h1 class="text-2xl font-semibold">{{ $t('editor.productDetails') }}</h1>
                                    <p>
                                        {{
                                            editExisting
                                                ? $t('editor.metadata.instructions.existing')
                                                : $t('editor.metadata.instructions.new')
                                        }}
                                    </p>
                                </div>
                                <!-- Preview project button (existing only) -->
                                <button
                                    v-if="editExisting"
                                    @click="preview"
                                    class="editor-button editor-forms-button m-0 border border-black"
                                >
                                    {{ $t('editor.editMetadata.previewProject') }}
                                </button>
                            </section>
                            <!-- Metadata form -->
                            <div class="px-4 md:px-8 py-5 border rounded-md">
                                <!-- Edit form button (existing only) -->
                                <!-- Form defaults to view-only for existing projects, can edit only if this button pressed -->
                                <button
                                    v-if="!editingMetadata"
                                    @click="editingMetadata = !editingMetadata"
                                    class="editor-button editor-forms-button md:float-right flex items-center gap-2 text-md ml-0 mb-3 font-semibold px-3 py-2 border border-gray-300"
                                >
                                    <svg
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        width="16"
                                        height="16"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="mx-1"
                                    >
                                        <path
                                            d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                                            fill-rule="nonzero"
                                        />
                                    </svg>
                                    <p class="text-left">{{ $t('editor.editMetadata') }}</p>
                                </button>
                                <div class="overflow-visible">
                                    <!-- The form -->
                                    <!-- If editingMetadata === false, form is read-only; if true, it can be edited -->
                                    <!-- New projects can only be in edit mode; existing projects can be in both -->
                                    <metadata-content
                                        :metadata="metadata"
                                        :editing="editingMetadata"
                                        @metadata-changed="updateMetadata"
                                        @logo-changed="onFileChange"
                                        @logo-source-changed="onLogoSourceInput"
                                    ></metadata-content>
                                    <!-- Save/discard changes buttons (existing only) -->
                                    <div v-if="editingMetadata && editExisting" class="flex gap-3 mt-2">
                                        <!-- Save changes -->
                                        <!-- Saves to remote copy on server -->
                                        <!-- NOTE: Changes are saved to local copy automatically as you fill the form. To delete these changes, press the discard button -->
                                        <button
                                            @click="saveMetadata(true)"
                                            class="editor-button editor-forms-button leading-snug ml-0 bg-black border border-black text-white hover:bg-gray-800"
                                        >
                                            {{ $t('editor.saveChanges') }}
                                        </button>
                                        <!-- Discard changes -->
                                        <!-- Reverts to state before you enabled edit mode -->
                                        <button
                                            @click="discardMetadataUpdates()"
                                            class="editor-button editor-forms-button leading-snug"
                                        >
                                            {{ $t('editor.discardChanges') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>
            </div>

            <!-- Main section: page back/continue buttons -->
            <div class="flex px-7 md:px-20 py-5 mt-8" :disabled="loadStatus === 'loading'">
                <!-- Back button -->
                <!-- Moves you to the dashboard again -->
                <router-link :to="{ name: 'home' }" target tabindex="-1">
                    <button class="editor-button editor-forms-button m-0 border border-black" tabindex="0">
                        {{ $t('editor.back') }}
                    </button>
                </router-link>
                <!-- Continue button -->
                <!-- Moves you to the editor -->
                <div class="ml-auto">
                    <button
                        :disabled="loadStatus === 'loading'"
                        @click="warning === 'none' ? continueToEditor() : $vfm.open(`confirm-uuid-overwrite`)"
                        class="editor-button editor-forms-button m-0 bg-black text-white"
                        :class="{ hidden: editExisting && loadStatus !== 'loaded' }"
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

        <!-- The editor -->
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
                @save-changes="onSave"
                @save-status="updateSaveStatus"
                @refresh-config="refreshConfig"
                ref="mainEditor"
            >
                <!-- Metadata editing modal inside the editor -->
                <!-- Click Done or outside the modal to save changes LOCALLY. -->
                <template v-slot:metadataModal>
                    <vue-final-modal
                        @click="saveMetadata(false)"
                        modalId="metadata-edit-modal"
                        content-class="max-h-full overflow-y-auto max-w-xl mx-4 p-7 bg-white border rounded-lg"
                        class="flex justify-center items-center"
                    >
                        <div @click.stop class="flex flex-col space-y-2">
                            <h2 slot="header" class="text-2xl font-bold">{{ $t('editor.editMetadata') }}</h2>
                            <!-- ENG/FR config toggle -->
                            <div class="mb-3">
                                <button
                                    class="editor-button editor-forms-button border border-gray-300"
                                    @click="swapLang()"
                                    tabindex="0"
                                >
                                    {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                                </button>
                            </div>
                            <metadata-content
                                :metadata="metadata"
                                @metadata-changed="updateMetadata"
                                @logo-changed="onFileChange"
                                @logo-source-changed="onLogoSourceInput"
                            ></metadata-content>
                            <div class="w-full flex justify-end">
                                <button
                                    class="editor-button editor-forms-button bg-black text-white hover:bg-gray-800"
                                    @click="saveMetadata(false)"
                                >
                                    {{ $t('editor.done') }}
                                </button>
                            </div>
                        </div>
                    </vue-final-modal>
                </template>
            </editor>
        </template>
    </div>
</template>

<script lang="ts">
import ActionModal from '@/components/helpers/action-modal.vue';
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
    MultiLanguageSlide,
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

import JSZip from 'jszip';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
    hash: string;
    storylineUUID: string;
    created: string;
}

@Options({
    components: {
        ActionModal,
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

    currentRoute = window.location.href;

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
    currLang = 'en'; // page language
    showDropdown = false;
    highlightedIndex = -1;

    storylineHistory: History[] = [];
    selectedHistory: History | null = null;
    showHistory = false;

    // Saving properties.
    saving = false;
    unsavedChanges = false;

    controller = new AbortController();

    apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';

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
        returnTop: true,
        dateModified: ''
    };
    editingMetadata = false;
    temporaryMetadataCopy: MetadataContent = {
        // A copy to save changes before edit, so they can be reverted
        title: '',
        introTitle: '',
        introSubtitle: '',
        logoPreview: '',
        logoName: '',
        logoAltText: '',
        contextLink: '',
        contextLabel: '',
        tocOrientation: '',
        returnTop: true,
        dateModified: ''
    };
    defaultBlankSlide: Slide = {
        title: '',
        panel: [
            {
                type: 'text',
                title: '',
                content: ''
            } as TextPanel,
            {
                type: 'text',
                title: '',
                content: ''
            } as TextPanel
        ]
    };
    // add more required metadata fields to here as needed
    reqFields: { uuid: boolean } = {
        uuid: true
    };
    slides: MultiLanguageSlide[] = [];

    sourceCounts: SourceCounts = {};

    mounted(): void {
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.editingMetadata = !this.editExisting;
    }

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
            this.metadata.returnTop = true;
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
                // this.slides = props.slides;
                this.sourceCounts = props.sourceCounts;
                this.loadExisting = props.existing;
                this.unsavedChanges = props.unsavedChanges;
                // Load product logo (if provided).
                const logo = this.configs[this.configLang]?.introSlide.logo?.src;
                const logoSrc = `assets/${this.configLang}/${this.metadata.logoName}`;

                this.loadSlides(props.configs);

                if (logo) {
                    const logoFile = this.configFileStructure?.zip.file(logoSrc);
                    const logoType = logoSrc.split('.').at(-1);
                    if (logoFile) {
                        if (logoType !== 'svg') {
                            logoFile.async('blob').then((img: Blob) => {
                                this.logoImage = new File([img], this.metadata.logoName);
                                this.metadata.logoPreview = URL.createObjectURL(img);
                                this.loadStatus = 'loaded';
                            });
                        } else {
                            logoFile.async('text').then((img) => {
                                const logoImageFile = new File([img], this.metadata.logoName, {
                                    type: 'image/svg+xml'
                                });
                                this.logoImage = logoImageFile;
                                this.metadata.logoPreview = URL.createObjectURL(logoImageFile);
                                this.loadStatus = 'loaded';
                            });
                        }
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
     * Open current editor config as a new Storylines product in new tab.
     * Note: Preview button on metadata editor will only show when editing an existing product, not cwhen creating a new one
     * This is a design decision, can change if we decide that people would want to preview new products for some reason
     */
    preview(): void {
        // save current metadata final changes before previewing product
        this.saveMetadata(false);

        setTimeout(() => {
            const routeData = this.$router.resolve({
                name: 'preview',
                params: { lang: this.configLang, uid: this.uuid }
            });
            const previewTab = window.open(routeData.href, '_blank');
            (previewTab as Window).props = {
                configs: this.configs,
                configFileStructure: this.configFileStructure
            };
        }, 5);
    }

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
            returnTop: this.metadata.returnTop,
            dateModified: this.metadata.dateModified
        };
    }

    /**
     * Provided with a UID and version, retrieve the project contents from the file server.
     */
    loadVersion(version: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.uuid === undefined || this.uuid === '') {
                Message.error(this.$t('editor.warning.mustEnterUuid'));
                this.loadStatus = 'waiting';
                reject();
                return;
            }
            // Create a new AbortController for each fetch attempt
            // as they get 'used up' after each successful abort() call
            this.controller = new AbortController();

            this.loadStatus = 'loading';
            const user = useUserStore().userProfile.userName || 'Guest';
            fetch(this.apiUrl + `/retrieve/${this.uuid}/${version}`, {
                headers: { user },
                signal: this.controller.signal
            })
                .then((res: Response) => {
                    if (res.status === 404) {
                        // Version not found.
                        if (version === 'latest') {
                            Message.error(this.$t('editor.warning.uuidNotFound', { uuid: this.uuid }));
                        } else {
                            Message.error(this.$t('editor.editMetadata.message.error.noRequestedVersion'));
                        }
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

                    // TODO: Should this run only on product fetch or also on version fetch?
                    // Right now we run for both.
                    fetch(this.apiUrl + `/retrieveMessages`)
                        .then((res: any) => {
                            if (res.ok) return res.json();
                        })
                        .then((data) => {
                            if (import.meta.env.VITE_APP_CURR_ENV) {
                                axios
                                    .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                        messages: data.messages
                                    })
                                    .catch((error: any) => console.log(error.response || error));
                            }
                        })
                        .catch((error: any) => console.log(error.response || error));
                    resolve();
                })
                .catch((err) => {
                    if (err.name === 'AbortError' || err instanceof PointerEvent) {
                        Message.info(this.$t('editor.editMetadata.retrievalAborted'));
                    } else {
                        Message.error(this.$t('editor.warning.retrievalFailed'));
                    }
                    this.loadStatus = 'waiting';
                    reject();
                });
        });
    }

    /**
     * Provided with a UID, retrieve the project contents from the file server.
     */
    generateRemoteConfig(): Promise<void> {
        this.loadStatus = 'loading';

        // Reset fields
        this.baseUuid = this.uuid;
        this.renamed = '';
        this.changeUuid = '';

        // Attempt to fetch the project from the server.
        return new Promise((resolve, reject) => {
            this.loadVersion('latest').then(resolve).catch(reject);
        });
    }

    fetchHistory(): void {
        // Note: This part probably doesn't need an manual abort() trigger to kill on load cancel,
        // as the history should be much smaller and quicker to fetch than the config

        if (this.uuid === undefined || this.uuid === '') {
            return;
        }
        this.loadStatus = 'loading';
        const user = useUserStore().userProfile.userName || 'Guest';
        fetch(this.apiUrl + `/history/${this.uuid}`, { headers: { user } }).then((res: Response) => {
            if (res.status === 404) {
                // Product not found.
                this.loadStatus = 'waiting';
            } else {
                res.json().then((json) => {
                    this.storylineHistory = json;
                    this.loadStatus = 'loaded';
                });
            }
        });
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
        if (this.selectedHistory) {
            this.loadVersion(this.selectedHistory.hash);
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
            axios
                .post(process.env.VUE_APP_NET_API_URL + '/api/version/update', {
                    uuid: this.uuid,
                    changeUuid: this.changeUuid
                })
                .then(async (response: any) => {
                    // Remove the files from the ZIP folder.
                    this.configFileStructure?.zip.remove(enFile.name);
                    this.configFileStructure?.zip.remove(frFile.name);

                    // Fetch the contents of the two files, and perform a find/replace on the UUID for each source.
                    const englishConfig = await enFile?.async('string').then((res: string) => JSON.parse(res));
                    const frenchConfig = await frFile?.async('string').then((res: string) => JSON.parse(res));
                    [englishConfig, frenchConfig].forEach((config) => this.renameSources(config));

                    // Convert the configs back into a string and re-add them to the ZIP with the new UUID.
                    this.configFileStructure?.zip.file(
                        `${this.changeUuid}_en.json`,
                        JSON.stringify(englishConfig, null, 4)
                    );
                    this.configFileStructure?.zip.file(
                        `${this.changeUuid}_fr.json`,
                        JSON.stringify(frenchConfig, null, 4)
                    );

                    this.uuid = this.changeUuid;

                    // Reset source counts and re-generate the config file structure.
                    this.sourceCounts = {};

                    if (this.configFileStructure?.zip) this.configFileStructureHelper(this.configFileStructure.zip);
                });
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
                en: (assetsFolder as JSZip).folder('en') as JSZip,
                fr: (assetsFolder as JSZip).folder('fr') as JSZip
            },
            charts: {
                en: (chartsFolder as JSZip).folder('en') as JSZip,
                fr: (chartsFolder as JSZip).folder('fr') as JSZip
            },
            rampConfig: rampConfigFolder as JSZip
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
            Message.error(this.$t('editor.editMetadata.message.error.malformedProduct', this.uuid ?? ''));
            this.loadStatus = 'waiting';
            this.clearConfig();
            return;
        }

        if (this.loadExisting && !this.renamed) {
            this.loadStatus = 'waiting';
            Message.success(this.$t('editor.editMetadata.message.successfulLoad'));
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
                this.unsavedChanges = false;
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
        this.metadata.returnTop = config.returnTop ?? true;
        this.metadata.dateModified = config.dateModified;

        this.loadSlides(this.configs);

        const logo = config.introSlide.logo?.src;
        if (logo) {
            // Set the alt text for the logo.
            this.metadata.logoAltText = config.introSlide.logo?.altText ? config.introSlide.logo.altText : '';
            this.metadata.logoName = logo.split('/').at(-1);

            // Fetch the logo from the folder (if it exists).
            const logoSrc = `${logo.substring(logo.indexOf('/') + 1)}`;
            const logoName = `${logo.split('/')[logo.split('/').length - 1]}`;
            const logoFile = this.configFileStructure?.zip.file(logoSrc);
            const logoType = logoSrc.split('.').at(-1);
            if (logoFile) {
                if (logoType !== 'svg') {
                    logoFile.async('blob').then((img: Blob) => {
                        this.logoImage = new File([img], this.metadata.logoName);
                        this.metadata.logoPreview = URL.createObjectURL(img);
                        this.loadStatus = 'loaded';
                    });
                } else {
                    logoFile.async('text').then((img) => {
                        const logoImageFile = new File([img], this.metadata.logoName, {
                            type: 'image/svg+xml'
                        });
                        this.logoImage = logoImageFile;
                        this.metadata.logoPreview = URL.createObjectURL(logoImageFile);
                        this.loadStatus = 'loaded';
                    });
                }
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
        } else {
            // If there's no logo, mark the product as loaded and remove any existing logos
            this.metadata.logoName = '';
            this.metadata.logoPreview = '';
            this.loadStatus = 'loaded';
        }

        // Load the temp copy of the metadata
        this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
    }

    /**
     * Conducts various checks before saving.
     */
    onSave(): void {
        // Currently allowing undefined configs & handling them elsewhere
        // If that changes in the future, can detect for undefined configs and warn user here
        this.generateConfig();
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, then generates and submits the product file to the server.
     */
    generateConfig(): ConfigFileStructure {
        this.saving = true;

        // Update the configuration files, for both languages.
        const engFileName = `${this.uuid}_en.json`;
        const frFileName = `${this.uuid}_fr.json`;

        // Replace undefined slides with empty objects
        this.configs.en!.slides = this.configs.en!.slides.map((slide) => {
            return slide ?? {};
        });
        this.configs.fr!.slides = this.configs.fr!.slides.map((slide) => {
            return slide ?? {};
        });
        this.loadSlides(this.configs);

        const engFormattedConfigFile = JSON.stringify(this.configs.en, null, 4);
        const frFormattedConfigFile = JSON.stringify(this.configs.fr, null, 4);

        this.configFileStructure?.zip.file(engFileName, engFormattedConfigFile);
        this.configFileStructure?.zip.file(frFileName, frFormattedConfigFile);

        // Upload the ZIP file.
        this.configFileStructure?.zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
            const formData = new FormData();
            formData.append('data', content, `${this.uuid}.zip`);
            const userStore = useUserStore();
            const headers = { 'Content-Type': 'multipart/form-data', user: userStore.userProfile.userName || 'Guest' };
            Message.warning(this.$t('editor.editMetadata.message.wait'));

            axios
                .post(this.apiUrl + '/upload', formData, { headers })
                .then((res: AxiosResponse) => {
                    const responseData = res.data;
                    responseData.files; // binary representation of the file
                    responseData.status; // HTTP status
                    const commitHash = responseData.commitHash; // commit hash of the git commit
                    this.unsavedChanges = false;
                    this.loadExisting = true; // if editExisting was false, we can now set it to true

                    if (import.meta.env.VITE_APP_CURR_ENV) {
                        if (responseData.new) {
                            axios
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
                                    axios
                                        .post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit', formData)
                                        .then((response: any) => {
                                            Message.success(this.$t('editor.editMetadata.message.successfulSave'));
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
                            formData.append('titleEn', this.configs['en']?.title ?? '');
                            formData.append('titleFr', this.configs['fr']?.title ?? '');
                            formData.append('commitHash', commitHash);
                            formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                            axios
                                .post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit', formData)
                                .then((response: any) => {
                                    Message.success(this.$t('editor.editMetadata.message.successfulSave'));
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
                                    .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                        messages: data.messages
                                    })
                                    .catch((error: any) => console.log(error.response || error));
                            })
                            .catch((error: any) => console.log(error.response || error));
                    } else {
                        Message.success(this.$t('editor.editMetadata.message.successfulSave'));
                        // padding to prevent save button from being clicked rapidly
                        setTimeout(() => {
                            this.saving = false;
                        }, 500);
                    }
                })
                .catch(() => {
                    Message.error(this.$t('editor.editMetadata.message.error.failedSave'));
                });
        });

        return this.configFileStructure as ConfigFileStructure;
    }

    updateMetadata<K extends keyof MetadataContent>(key: K, value: MetadataContent[K]): void {
        this.metadata[key] = value;
        this.unsavedChanges = true;
    }

    discardMetadataUpdates(): void {
        this.metadata = JSON.parse(JSON.stringify(this.temporaryMetadataCopy));
        this.editingMetadata = false;
        this.unsavedChanges = false; // TODO: Does this cause false negatives? (maybe not if we don't have discarding for vfm)
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
            config.returnTop = this.metadata.returnTop;
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
                this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
                this.editingMetadata = false;
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
            tocOrientation: '',
            returnTop: true
        };
        this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
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
            const user = useUserStore().userProfile.userName || 'Guest';
            // If renaming, show the loading spinner while we check whether the UUID is taken.
            fetch(this.apiUrl + `/retrieve/${rename ? this.changeUuid : this.uuid}/latest`, { headers: { user } }).then(
                (res: Response) => {
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
                                .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                    messages: data.messages
                                })
                                .catch((error: any) => console.log(error.response || error));
                        })
                        .catch((error: any) => console.log(error.response || error));
                }
            );
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
                Message.success(this.$t('editor.editMetadata.message.logoSuccessfulLoad'));
            } else {
                this.metadata.logoPreview = 'error';
                Message.error(this.$t('editor.editMetadata.message.error.logoFailedLoad'));
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
            Message.error(this.$t('editor.editMetadata.message.error.requiredFieldsNotFilled'));
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
                Message.error(this.$t('editor.editMetadata.message.error.noConfig'));
            }
        } else if (!this.uuid) {
            Message.error(this.$t('editor.warning.mustEnterUuid'));
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

    highlightNext(): void {
        if (this.highlightedIndex < this.getStorylines.length - 1) {
            this.highlightedIndex++;
            this.scrollIntoView();
        }
    }

    highlightPrevious(): void {
        if (this.highlightedIndex > 0) {
            this.highlightedIndex--;
            this.scrollIntoView();
        }
    }

    selectHighlighted(): void {
        if (this.highlightedIndex !== -1) {
            const selectedStoryline = this.getStorylines[this.highlightedIndex];
            this.selectUuid(selectedStoryline.uuid);
        }
    }

    scrollIntoView(): void {
        this.$nextTick(() => {
            const container = this.$el.querySelector('.overflow-y-auto');
            const activeItem = container.querySelector('li.bg-gray-300');
            if (activeItem) container.scrollTop = activeItem.offsetTop - container.offsetTop;
        });
    }

    get getStorylines() {
        const userStore = useUserStore();
        const userStorylines = userStore.userProfile?.storylines?.map((s) => ({ ...s, isUserStoryline: true })) || [];
        const allStorylines =
            userStore.userProfile?.allStorylines?.filter((s) => !userStorylines.some((u) => u.uuid === s.uuid)) || [];
        let combined = [...userStorylines, ...allStorylines];

        if (this.uuid) {
            combined = combined.filter(
                (storyline) =>
                    storyline.uuid.toLowerCase().includes(this.uuid.toLowerCase()) ||
                    (storyline.titleEN && storyline.titleEN.toLowerCase().includes(this.uuid.toLowerCase())) ||
                    (storyline.titleFR && storyline.titleFR.toLowerCase().includes(this.uuid.toLowerCase()))
            );
        }

        return combined;
    }

    getTitle(storyline: { titleEN: string; titleFR: string }): string {
        return this.configLang === 'en' ? storyline.titleEN : storyline.titleFR;
    }

    selectUuid(uuid: string): void {
        this.uuid = uuid;
        this.showDropdown = false;
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', system-ui, ui-sans-serif, Tahoma, Geneva, Verdana, sans-serif;

.storyramp-app,
.vfm {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: $font-list;
        line-height: 1.3;
        border-bottom: 0px;
    }

    .editor-container {
        margin: 0 auto;
    }

    .vfm__content {
        max-width: 80%;
        min-width: 70%;
        max-height: 90%;
        padding: 20px;
    }

    .vfm__content label {
        display: block;
    }

    .editor-container h3 {
        font-size: x-large;
    }

    .editor-container .input-error {
        border: 1px solid red;
        outline-color: red;
    }

    .vfm__content button {
        border-radius: 3px;
        padding: 5px 12px;
        font-weight: 600;
        transition-duration: 0.2s;
    }

    .vfm__content button:focus {
        transition-duration: 0.075s;
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

    .sub-link {
        color: blue;
        margin: 0;
        padding: 0;
        text-decoration: underline;
        cursor: pointer;
        font-weight: normal;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        user-select: none;
    }

    .sub-link:hover {
        color: rgb(87, 176, 253);
    }

    .sub-link:active {
        color: rgb(87, 211, 253);
    }

    .input-success {
        border-color: rgb(0, 189, 0);
        outline-color: rgb(0, 189, 0);
    }

    .input-warning {
        border-color: #eab308;
        outline-color: #eab308;
    }
}
</style>
