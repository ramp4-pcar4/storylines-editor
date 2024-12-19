<template>
    <div class="editor-container">
        <!-- Background overlay for when the mobile sidebar drawer is open -->
        <!-- Should prevent stuff in the background from being scrolled or interacted with. Click it to close the sidebar -->
        <div id="overlay" class="overlay" @click="closeSidebar"></div>
        <!-- Header bar -->
        <div
            class="editor-header md:sticky flex md:gap-3 items-center border-b border-black bg-gray-200 py-2 px-2 z-10 flex-wrap"
        >
            <div class="flex flex-col gap-2 mx-0.5">
                <!-- Back to landing page button -->
                <router-link
                    :to="{ name: 'home' }"
                    class="flex justify-center h-full w-full"
                    v-tippy="{
                        delay: '200',
                        placement: 'right',
                        content: $t('editor.returnToLanding'),
                        animateFill: true
                    }"
                    target
                    :aria-label="$t('editor.returnToLanding')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.001" viewBox="0 0 18 18.001">
                        <path
                            id="logout-Icon-SVG-098767893"
                            d="M5.808,13.782v1.406A2.816,2.816,0,0,0,8.621,18h7.067A2.816,2.816,0,0,0,18.5,15.188V2.813A2.816,2.816,0,0,0,15.687,0H8.621A2.816,2.816,0,0,0,5.808,2.813V4.219a.7.7,0,0,0,1.406,0V2.813A1.408,1.408,0,0,1,8.621,1.406h7.067a1.408,1.408,0,0,1,1.406,1.406V15.188a1.408,1.408,0,0,1-1.406,1.406H8.621a1.408,1.408,0,0,1-1.406-1.406V13.782a.7.7,0,0,0-1.406,0ZM1.014,7.793,2.589,6.218a.7.7,0,0,1,.994.994l-1.12,1.12h8.443a.7.7,0,1,1,0,1.406H2.463l1.12,1.12a.7.7,0,1,1-.994.994L1.014,10.279A1.76,1.76,0,0,1,1.014,7.793Zm0,0"
                            transform="translate(-0.5)"
                        />
                    </svg>
                </router-link>
                <!-- Open mobile sidebar hamburger button -->
                <!-- Only shows up on small viewport widths -->
                <button
                    @click="openSidebar"
                    class="editor-button toc-popup-button bg-transparent border-none md:hidden"
                >
                    <svg
                        class="m-2"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0 0 122.88 95.95"
                        style="enable-background: new 0 0 122.88 95.95"
                        xml:space="preserve"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    >
                        <g>
                            <path
                                class="st0"
                                d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"
                            />
                        </g>
                    </svg>
                </button>
            </div>

            <div class="flex flex-1 flex-col gap-0.5 md:flex-row justify-between">
                <!-- Storylines project title and UUID -->
                <div class="flex flex-col">
                    <span class="font-semibold text-lg">{{ metadata.title }}</span>
                    <span :class="metadata.title ? 'text-xs' : ''">UUID: {{ uuid }}</span>
                </div>
                <span class="ml-auto"></span>
                <div class="flex items-center flex-wrap gap-1">
                    <!-- Reset changes button -->
                    <button
                        v-if="unsavedChanges"
                        @click="$vfm.open(`reload-config`)"
                        class="editor-button border-2 border-red-700 text-red-700 rounded p-1 m-0"
                        v-tippy="{
                            delay: '200',
                            placement: 'bottom',
                            content: $t('editor.resetChanges'),
                            animateFill: true
                        }"
                    >
                        <svg
                            class="inline"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18px"
                            height="18px"
                        >
                            <path
                                d="M 2 2 L 4.9394531 4.9394531 C 3.1262684 6.7482143 2 9.2427079 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 L 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 9.7940092 4.9004767 7.7972757 6.3496094 6.3496094 L 9 9 L 9 2 L 2 2 z"
                            />
                        </svg>
                        <span class="font-normal ml-1">{{ $t('editor.resetChanges') }}</span>
                    </button>
                    <!-- Unsaved changes indicator -->
                    <transition name="fade">
                        <span v-if="unsavedChanges" class="border-2 border-red-700 text-red-700 rounded p-1">
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
                            <span class="align-center inline-block select-none">{{ $t('editor.unsavedChanges') }}</span>
                        </span>
                    </transition>
                    <slot name="langModal" v-bind="{ unsavedChanges: unsavedChanges }"></slot>
                    <!-- Preview dropdown -->
                    <div class="dropdown editor-button">
                        <!-- The "Preview" button - hover over it to show the options -->
                        <button class="dropbtn flex gap-2 items-center cursor-default">
                            <p>{{ $t('editor.preview') }}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 122.88 66.91"
                                style="enable-background: new 0 0 122.88 66.91"
                                xml:space="preserve"
                                height="12"
                                width="12"
                                class="fill-current transform rotate-180"
                            >
                                <g>
                                    <path
                                        d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                    />
                                </g>
                            </svg>
                        </button>
                        <!-- The two preview language config options: English and French -->
                        <div class="dropdown-content">
                            <!-- English config button -->
                            <button @click.stop="preview('en')" class="border-b border-gray-400">
                                {{ $t('editor.lang.en') }}
                            </button>
                            <!-- French config button -->
                            <button @click.stop="preview('fr')">{{ $t('editor.lang.fr') }}</button>
                        </div>
                    </div>
                    <!-- Save changes button -->
                    <button
                        @click="saveChanges"
                        class="editor-button m-0 bg-black text-white hover:bg-gray-900"
                        :disabled="saving"
                    >
                        <span class="inline-block">{{
                            saving ? $t('editor.savingChanges') : $t('editor.saveChanges')
                        }}</span>
                        <span v-if="saving" class="align-middle inline-block px-1">
                            <spinner size="16px" color="#009cd1" class="ml-1 mb-1"></spinner>
                        </span>
                    </button>
                    <!-- Help button -->
                    <button
                        @click="$vfm.open(`help-panel`)"
                        class="bg-white border border-black rounded-full w-9 h-9 hover:bg-gray-100"
                        v-tippy="{
                            delay: '200',
                            placement: 'top',
                            content: $t('help.title'),
                            animateFill: true
                        }"
                    >
                        <span class="bottom-0 question-mark-button"> ? </span>
                    </button>

                    <!-- Export button -->
                    <button
                        @click="exportProduct"
                        class="bg-white border border-black rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                        v-tippy="{
                            delay: '200',
                            placement: 'top',
                            content: $t('editor.export'),
                            animateFill: true
                        }"
                        :aria-label="$t('editor.export')"
                    >
                        <span class="bottom-0 question-mark-button">
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#000000"
                                stroke-width="0.336"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke="#CCCCCC"
                                    stroke-width="0.288"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                                        fill="#000"
                                    ></path>
                                    <path
                                        d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                                        fill="#000"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Body content -->
        <div class="flex">
            <!-- Left side -->

            <!-- Sidebar, desktop version -->
            <div id="sidebar-desktop" class="w-80 flex-shrink-0 border-r border-black editor-toc hidden md:block">
                <div class="flex items-center justify-center border-b p-2">
                    <!-- Edit metadata button -->
                    <!-- Opens the edit metadata modal -->
                    <button class="toc-popup-button border-gray-400" @click.stop="$vfm.open('metadata-edit-modal')">
                        <span class="align-middle inline-block pr-1"
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
                        <span class="align-middle inline-block">{{ $t('editor.editMetadata') }}</span>
                    </button>
                </div>
                <!-- ToC -->
                <slide-toc
                    :slides="slides"
                    :currentSlide="currentSlide"
                    :slideIndex="slideIndex"
                    @slide-change="selectSlide"
                    @slides-updated="updateSlides"
                    :configFileStructure="configFileStructure"
                    :lang="configLang"
                    :sourceCounts="sourceCounts"
                ></slide-toc>
            </div>
            <!-- Sidebar, mobile version -->
            <div id="sidebar-mobile" class="w-0 flex-shrink-0 border-r border-black editor-toc md:hidden">
                <div class="flex items-center justify-between border-b p-2">
                    <!-- Edit metadata button -->
                    <!-- Opens the edit metadata modal -->
                    <button class="toc-popup-button" @click.stop="$vfm.open('metadata-edit-modal')">
                        <span class="align-middle inline-block pr-1"
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
                        <span class="align-middle inline-block">{{ $t('editor.editMetadata') }}</span>
                    </button>
                    <!-- Close ToC sidebar button -->
                    <button class="editor-button toc-popup-button p-3 bg-transparent" @click="closeSidebar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            viewBox="0 0 122.88 122.88"
                            style="enable-background: new 0 0 122.88 122.88"
                            xml:space="preserve"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        >
                            <g>
                                <path
                                    class="st0"
                                    d="M1.63,97.99l36.55-36.55L1.63,24.89c-2.17-2.17-2.17-5.73,0-7.9L16.99,1.63c2.17-2.17,5.73-2.17,7.9,0 l36.55,36.55L97.99,1.63c2.17-2.17,5.73-2.17,7.9,0l15.36,15.36c2.17,2.17,2.17,5.73,0,7.9L84.7,61.44l36.55,36.55 c2.17,2.17,2.17,5.73,0,7.9l-15.36,15.36c-2.17,2.17-5.73,2.17-7.9,0L61.44,84.7l-36.55,36.55c-2.17,2.17-5.73,2.17-7.9,0 L1.63,105.89C-0.54,103.72-0.54,100.16,1.63,97.99L1.63,97.99z"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
                <!-- Mobile ToC -->
                <!-- Bigger buttons, more visual dividers, more colors -->
                <slide-toc
                    :slides="slides"
                    :currentSlide="currentSlide"
                    :slideIndex="slideIndex"
                    @slide-change="selectSlide"
                    @slides-updated="updateSlides"
                    :configFileStructure="configFileStructure"
                    :lang="configLang"
                    :sourceCounts="sourceCounts"
                    :closeSidebar="closeSidebar"
                    :isMobileSidebar="true"
                ></slide-toc>
            </div>
            <!-- Right side -->
            <div class="editor-area flex flex-col space-between w-full overflow-y-auto">
                <!-- Slide editor -->
                <slide-editor
                    class="flex-1 w-full overflow-y-auto"
                    ref="slide"
                    :configFileStructure="configFileStructure"
                    :currentSlide="currentSlide"
                    :lang="slides.find((slide) => slide.fr === currentSlide) ? 'fr' : 'en'"
                    :slideIndex="slideIndex"
                    :isLast="slideIndex === slides.length - 1"
                    :uid="uuid"
                    @slide-change="selectSlide"
                    @slide-edit="onSlidesEdited"
                    @custom-slide-updated="updateCustomSlide"
                    :sourceCounts="sourceCounts"
                ></slide-editor>
                <!-- Give feedback button -->
                <div class="footer text-right pr-5 editor-button h-fit">
                    <a
                        :href="`mailto:applicationsdecartographieweb-webmappingapplications@ec.gc.ca?subject=${$t(
                            'editor.feedback.subject'
                        )}`"
                    >
                        {{ $t('editor.feedback') }}
                    </a>
                </div>
            </div>
        </div>

        <!-- Edit metadata modal -->
        <slot name="metadataModal"></slot>
        <!-- Help modal -->
        <help-panel :helpSections="helpSections" :originalTextArray="originalTextArray"></help-panel>
        <!-- Reload config confirmation modal -->
        <confirmation-modal
            :name="`reload-config`"
            :message="$t('editor.refreshChanges.modal')"
            @ok="$emit('refresh-config')"
        />
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';
import {
    ConfigFileStructure,
    HelpSection,
    MetadataContent,
    Slide,
    MultiLanguageSlide,
    SourceCounts,
    StoryRampConfig,
    TextPanel
} from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import axios from 'axios';
import { marked } from 'marked';

import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';
import MetadataContentV from './helpers/metadata-content.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import HelpPanelV from './help-panel.vue';
import HelpSectionV from './helpers/help-section.vue';

@Options({
    components: {
        'metadata-content': MetadataContentV,
        'confirmation-modal': ConfirmationModalV,
        spinner: VueSpinnerOval,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV,
        'help-panel': HelpPanelV,
        'help-section': HelpSectionV
    }
})
export default class EditorV extends Vue {
    @Prop() configs!: {
        [key: string]: StoryRampConfig | undefined;
    };
    @Prop() configFileStructure!: ConfigFileStructure | undefined;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() metadata!: MetadataContent;

    @Prop() slides!: MultiLanguageSlide[];
    @Prop() configLang!: string;
    @Prop() saving!: boolean;
    @Prop() unsavedChanges!: boolean;

    // Form properties.
    uuid = '';
    logoImage: undefined | File = undefined;
    loadSlides: undefined | MultiLanguageSlide[] = undefined;
    currentSlide: Slide | string = '';
    slideIndex = -1;
    helpSections: HelpSection[] = [];
    helpMd = '';
    originalTextArray: string[] = [];

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

    @Watch('slides', { deep: true })
    onSlidesEdited(): void {
        this.$emit('save-status', true);
    }

    @Watch('metadata', { deep: true })
    onMetadataEdited(): void {
        this.$emit('save-status', true);
    }

    created(): void {
        this.loadSlides = this.slides;
        this.uuid = this.$route.params.uid as string;

        window.addEventListener('beforeunload', this.beforeWindowUnload);

        this.fetchMarkdown();
    }

    mounted(): void {
        // from https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/
        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('z-40', e.intersectionRatio < 1), {
            threshold: [1]
        });

        observer.observe(document.querySelector('.editor-header') as Element);
    }

    beforeDestroy(): void {
        window.removeEventListener('beforeunload', this.beforeWindowUnload);
    }

    /**
     * Opens the mobile sidebar drawer.
     */
    openSidebar(): void {
        document.getElementById('sidebar-mobile')!.style.width = '20rem';
        document.getElementById('overlay')!.style.display = 'block'; // Show the overlay
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    }

    /**
     * Closes the mobile sidebar drawer.
     */
    closeSidebar(): void {
        document.getElementById('sidebar-mobile')!.style.width = '0px';
        document.getElementById('overlay')!.style.display = 'none'; // Hide the overlay
        document.body.style.overflow = ''; // Re-enable background scrolling
    }

    /**
     * Change current slide to selected slide.
     */
    selectSlide(index: number, lang?: string): void {
        // save changes to current slide before changing slides
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        // Quickly swap to loading page, and then swap to new slide. Allows Vue to re-draw page correctly.
        this.currentSlide = {
            title: '',
            panel: [{ type: 'loading-page' }, { type: 'loading-page' }]
        };

        setTimeout(() => {
            if (index === -1 || !this.loadSlides) {
                this.currentSlide = '';
            } else {
                const selectedLang = (lang ?? this.configLang) as keyof MultiLanguageSlide;
                const selectedSlide = this.loadSlides[index][selectedLang];
                this.currentSlide = selectedSlide ?? '';
            }

            this.slideIndex = index;
            (this.$refs.slide as SlideEditorV).panelIndex = 0;
            (this.$refs.slide as SlideEditorV).advancedEditorView = false;
            window.scrollTo(0, 0);
        }, 5);
    }

    /**
     * Update slide for a custom config made through advanced editor.
     */
    updateCustomSlide(slideConfig: Slide, save?: boolean, lang?: string): void {
        this.currentSlide = slideConfig;
        this.slides[this.slideIndex][(lang ?? this.configLang) as keyof MultiLanguageSlide] = slideConfig;

        this.configs[(lang ?? this.configLang) as keyof MultiLanguageSlide]!.slides[this.slideIndex] = slideConfig;

        // save changes emitted from advanced editor
        if (save) {
            this.$emit('save-changes');
        }
    }

    /**
     * Updates slides after adding, removing, or reordering.
     */
    updateSlides(slides: MultiLanguageSlide[]): void {
        this.loadSlides = slides;
        this.slideIndex = this.loadSlides.findIndex(
            (bothSlides) =>
                (this.currentSlide as Slide) === bothSlides['en'] || (this.currentSlide as Slide) === bothSlides['fr']
        );
        this.configs.en!.slides = this.slides.map((slides) => slides.en!);
        this.configs.fr!.slides = this.slides.map((slides) => slides.fr!);
    }

    /**
     * Fetch markdown content for help panel.
     */
    fetchMarkdown(): void {
        const helpPath = process.env.NODE_ENV === 'development' ? `../../help/` : `./help/`;
        const helpFile = `respect-help-${this.$route.params.lang}.md`;

        axios.get(`${helpPath}${helpFile}`).then((r) => {
            const reg = /^#\s(.*)\n{2}(?:.+|\n(?!\n{2,}))*/gm;
            const renderer = new marked.Renderer();
            renderer.image = (href: string, title: string, text: string) => {
                if (href.indexOf('http') === -1) {
                    href = helpPath + 'images/' + href;
                }
                return `<img src="${href}" alt="${text}">`;
            };
            this.helpMd = r.data.replace(new RegExp(String.fromCharCode(13), 'g'), '');
            let section;
            while ((section = reg.exec(this.helpMd))) {
                const info_results = marked(section[0].split('\n').splice(2).join('\n'), { renderer }) as string;
                this.helpSections.push({
                    header: section[1],
                    info: info_results,
                    drawn: true,
                    expanded: false
                });
                //copy of the original text to refer to after highlighting
                this.originalTextArray.push(info_results);
            }
        });
    }

    exportProduct(): void {
        if (this.$refs.slide != null && this.currentSlide !== '') {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        this.$emit('export-product');
    }

    /**
     * Open current editor config as a new Storylines product in new tab.
     * @param language The config language to preview (either 'en' or 'fr')
     */
    preview(language: string): void {
        // save current slide final changes before previewing product
        if (this.$refs.slide != null && this.currentSlide !== '') {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        const previewConfigs = this.configs;
        // Replace undefined slides with empty slides, just like in final save
        previewConfigs.en!.slides = previewConfigs.en!.slides.map((slide) => {
            return slide ?? JSON.parse(JSON.stringify(this.defaultBlankSlide));
        });
        previewConfigs.fr!.slides = previewConfigs.fr!.slides.map((slide) => {
            return slide ?? JSON.parse(JSON.stringify(this.defaultBlankSlide));
        });

        setTimeout(() => {
            const routeData = this.$router.resolve({
                name: 'preview',
                params: { lang: language, uid: this.uuid }
            });
            const previewTab = window.open(routeData.href, '_blank');
            (previewTab as Window).props = {
                configs: previewConfigs,
                configFileStructure: this.configFileStructure
            };
        }, 5);
    }

    saveChanges(): void {
        // save current slide final changes before generating config file
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        // emit save changes event
        this.$emit('save-changes');
    }

    beforeWindowUnload(e: BeforeUnloadEvent): void {
        // show popup if when leaving page with unsaved changes
        if (this.unsavedChanges && !window.confirm()) {
            e.preventDefault();
        }
    }
}

// More accurate page height for mobile
// Counts the URL bar for mobile browsers (e.g. iOS Safari) so the content doesn't vertically overshoot
// and get covered by the URL bar when it's opened

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
</script>

<style lang="scss">
.editor-container {
    margin: 0 auto;
}

.editor-label {
    width: 10vw;
    text-align: right;
    margin-right: 15px;
    display: inline-block;
}

.editor-h3 {
    font-size: larger;
}

.editor-input {
    padding: 10px 10px;
    margin-top: 5px;
    border: 1px solid black;
    display: inline;
    border-radius: 5px;
}

.editor-container .input-error {
    border: 1px solid red;
    outline-color: red;
}

.editor-button {
    padding: 5px 12px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.editor-forms-button {
    padding: 11px 15px;
    border-radius: 5px;
}

.editor-button:hover:enabled {
    background-color: #dbdbdb;
    color: black;
}

.editor-button:focus {
    outline: 2px solid royalblue;
    outline-offset: 2px;
    transition-duration: 0.075s;
}

.editor-button:disabled {
    border: 1px solid gray;
    color: gray;
    cursor: not-allowed;
}

.editor-toc-button {
    background-color: #f3f4f6;
    color: black;
    border: none;
    transition-duration: 0.2s;
    padding: 0.25 0.25em !important;
}

.editor-header {
    top: -1px;
    padding-top: 9px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.question-mark-button {
    font-size: 20px;
    line-height: 1.4rem;
    font-weight: 500;
}

.toc-popup-button {
    border: 1px solid rgb(135, 135, 135);
    background-color: rgb(243, 243, 243);
    border-radius: 3px;
    padding: 3px 12px;
}
.toc-popup-button:hover {
    background-color: rgb(234, 234, 234);
}
.toc-popup-button:active {
    background-color: rgb(221, 221, 221);
}

// Independent scrollable editor area only on desktop, so that header isn't fixed on mobile
// (takes up too much space)
@media only screen and (min-width: 768px) {
    .editor-area {
        overflow-y: auto;
        height: calc(100vh - 63px);
        height: calc(calc(var(--vh, 1vh) * 100) - 63px);
    }
}

/*
 * Preview language selection dropdown styling
 * Base (pre-styling) code graciously provided by
 * https://www.w3schools.com/howto/howto_css_dropdown.asp
 */

/* Dropdown Button */
.dropbtn {
    background-color: white;
    color: black;
    padding: 5px 14px;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid black;
    transition: background-color 0.2s;
}

/* Main dropdown icon - required for positioning */
.dropdown {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
}

/* The dropdown box with the links */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border: 1px solid lightgray;
}

/* Links inside the dropdown */
.dropdown-content button {
    color: black;
    padding: 7px 10px;
    text-decoration: none;
    display: block;
    text-align: center;
    font-weight: 500;
    width: 100%;
}

/* Change color of dropdown links on hover */
.dropdown-content button:hover {
    background-color: #e6e5e5;
}

/* Show the dropdown menu on hover or focus */
.dropdown:hover .dropdown-content,
.dropdown:focus-within .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
    background-color: #dbdbdb;
}

#sidebar-mobile {
    z-index: 21; // should be on top
    height: 100%;
    width: 0; /* Initial width is 0 to be hidden */
    max-width: 100%;
    position: fixed; /* Sidebar is fixed, hovering over content */
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s; /* Smooth transition when opening/closing */
    background-color: white;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Translucent black */
    z-index: 20; /* Ensure it appears just under the sidebar */
    display: none; /* Initially hidden */
}
</style>
