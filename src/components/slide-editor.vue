<template>
    <div id="slideEditor" class="p-5">
        <div v-if="!!currentSlide">
            <div class="flex">
                <div class="flex flex-col w-full">
                    <div class="flex justify-between flex-wrap gap-3 gap-y-1 items-center">
                        <h2 class="text-2xl font-bold">
                            {{ $t('editor.slides.currentLangLabel', { lang: langTranslate, num: slideIndex + 1 }) }}
                        </h2>

                        <div class="flex items-stretch">
                            <button
                                :aria-label="$t('editor.swapConfigs')"
                                @click.stop="
                                    selectSlide(slideIndex, (lang === 'en' ? 'fr' : 'en') as SupportedLanguages)
                                "
                                :disabled="!otherLangSlide"
                                style="margin-right: 0.5rem"
                                class="standard-button gray-border-button"
                                v-tippy="{
                                    delay: '200',
                                    placement: 'bottom',
                                    content: $t('editor.swapConfigs'),
                                    animateFill: true,
                                    touch: ['hold', 500]
                                }"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M5.825 16L7.7 17.875q.275.275.275.688t-.275.712q-.3.3-.712.3t-.713-.3L2.7 15.7q-.15-.15-.213-.325T2.426 15t.063-.375t.212-.325l3.6-3.6q.3-.3.7-.287t.7.312q.275.3.288.7t-.288.7L5.825 14H12q.425 0 .713.288T13 15t-.288.713T12 16zm12.35-6H12q-.425 0-.712-.288T11 9t.288-.712T12 8h6.175L16.3 6.125q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L21.3 8.3q.15.15.212.325t.063.375t-.063.375t-.212.325l-3.6 3.6q-.3.3-.7.288t-.7-.313q-.275-.3-.288-.7t.288-.7z"
                                    />
                                </svg>
                            </button>
                            <button
                                @click.stop="selectSlide(slideIndex - 1, lang as SupportedLanguages)"
                                :disabled="slideIndex === 0"
                                class="standard-button gray-border-button"
                                style="
                                    gap: 0.25rem;
                                    border-top-left-radius: 0.25rem;
                                    border-bottom-left-radius: 0.25rem;
                                    border-top-right-radius: 0px;
                                    border-bottom-right-radius: 0px;
                                    border-right-width: 0;
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="m11 8.8l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275L13 8.8V17q0 .425-.288.713T12 18t-.712-.288T11 17z"
                                    />
                                </svg>
                                {{ $t('editor.slides.previousSlide') }}
                            </button>
                            <span
                                class="border-l"
                                style="border-color: rgba(209, 213, 219, 1); margin: 0; padding: 0; line-height: 0"
                            >
                            </span>
                            <button
                                @click.stop="selectSlide(slideIndex + 1, lang as SupportedLanguages)"
                                :disabled="isLast"
                                class="standard-button gray-border-button gap-1"
                                style="
                                    gap: 0.25rem;
                                    border-left-width: 0;
                                    border-top-left-radius: 0px;
                                    border-bottom-left-radius: 0px;
                                    border-top-right-radius: 0.25rem;
                                    border-bottom-right-radius: 0.25rem;
                                "
                            >
                                <svg
                                    class="transform rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m11 8.8l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275L13 8.8V17q0 .425-.288.713T12 18t-.712-.288T11 17z"
                                    />
                                </svg>
                                {{ $t('editor.slides.nextSlide') }}
                            </button>
                        </div>
                    </div>
                    <!-- Slide title -->
                    <label style="margin-left: 0" class="standard-label mt-4" for="slideTitle">{{
                        $t('editor.slides.slideTitle')
                    }}</label>
                    <div class="flex">
                        <input
                            type="text"
                            id="slideTitle"
                            v-model="currentSlide.title"
                            :placeholder="$t('editor.slides.addSlideTitle')"
                            class="standard-input w-full lg:w-2/3"
                        />
                        <span class="ml-auto"></span>
                    </div>
                    <!-- Whole-slide options -->
                    <div class="flex flex-col lg:flex-row mt-3 gap-y-3 gap-x-7 flex-wrap">
                        <!-- Center slide content -->
                        <div class="flex flex-row" :class="{ 'items-center': !currentRoute.includes('index-ca') }">
                            <input
                                type="checkbox"
                                id="centerSlide"
                                class="rounded-none cursor-pointer w-4 h-4"
                                v-model="centerSlide"
                                :disabled="centerPanel"
                                @change.stop="toggleCenterSlide()"
                            />
                            <label class="ml-0" for="centerSlide">
                                <span class="font-semibold">{{ $t('editor.slides.centerSlide') }}</span>
                            </label>
                        </div>

                        <!-- Include slide in ToC -->
                        <div class="flex flex-row" :class="{ 'items-center': !currentRoute.includes('index-ca') }">
                            <input
                                type="checkbox"
                                id="inToc"
                                class="rounded-none cursor-pointer w-4 h-4"
                                v-model="includeInToc"
                                @change.stop="toggleIncludeInToc()"
                            />
                            <label class="ml-0" for="inToc">
                                <span class="font-semibold"> {{ $t('editor.slides.includeInToc') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <!-- Panel select -->
            <div
                class="flex gap-3 border-b pl-2"
                style="border-color: rgba(209, 213, 219, 1)"
                v-if="currentSlide.panel.length === 2"
            >
                <!-- Left panel -->
                <button
                    @click="
                        () => {
                            panelIndex = 0;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="standard-button panel-select-button"
                    :style="[
                        panelIndex == 0 && !advancedEditorView
                            ? 'border-color: rgba(209, 213, 219, 1)'
                            : 'border-color: white'
                    ]"
                >
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="flex flex-col pl-3 items-start">
                        <p class="text-left">{{ $t('editor.slides.leftPanel') }}</p>
                        <p class="text-xs leading-none text-gray-500">
                            {{
                                $t(
                                    `editor.slide.panel.type.${
                                        currentSlide.panel[0]?.type !== 'loading-page'
                                            ? currentSlide.panel[0]?.type
                                            : 'unknown'
                                    }`
                                )
                            }}
                        </p>
                    </div>
                </button>
                <!-- Right panel -->
                <button
                    @click="
                        () => {
                            panelIndex = 1;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="standard-button panel-select-button"
                    :style="[
                        panelIndex == 1 && !advancedEditorView
                            ? 'border-color: rgba(209, 213, 219, 1)'
                            : 'border-color: white'
                    ]"
                >
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="flex flex-col pl-3 items-start">
                        <p class="text-left">{{ $t('editor.slides.rightPanel') }}</p>
                        <p class="text-xs leading-none text-gray-500">
                            {{
                                $t(
                                    `editor.slide.panel.type.${
                                        currentSlide.panel[1]?.type !== 'loading-page'
                                            ? currentSlide.panel[1]?.type
                                            : 'unknown'
                                    }`
                                )
                            }}
                        </p>
                    </div>
                </button>
                <!-- Advanced editor -->
                <button
                    @click="
                        () => {
                            panelIndex = 0;
                            advancedEditorView = true;
                            saveChanges();
                        }
                    "
                    class="standard-button panel-select-button"
                    :style="[advancedEditorView ? 'border-color: rgba(209, 213, 219, 1)' : 'border-color: white']"
                >
                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.advanced') }}</span>
                </button>
            </div>
            <div v-else class="border-b space-x-3 pl-2 flex" style="border-color: rgba(209, 213, 219, 1)">
                <!-- Fullscreen (Loner panel) -->
                <button
                    @click="
                        () => {
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="standard-button panel-select-button"
                    :style="[!advancedEditorView ? 'border-color: rgba(209, 213, 219, 1)' : 'border-color: white']"
                >
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="align-middle inline-block">
                        <svg
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            width="15"
                            height="15"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                    <div class="flex flex-col pl-3 items-start">
                        <p class="text-left">{{ $t('editor.slides.fullscreenPanel') }}</p>
                        <p class="text-xs leading-none text-gray-500">
                            {{
                                $t(
                                    `editor.slide.panel.type.${
                                        currentSlide.panel[0]?.type !== 'loading-page'
                                            ? currentSlide.panel[0]?.type
                                            : 'unknown'
                                    }`
                                )
                            }}
                        </p>
                    </div>
                </button>
                <!-- Advanced editor -->
                <button
                    @click="
                        () => {
                            advancedEditorView = true;
                            saveChanges();
                        }
                    "
                    class="standard-button panel-select-button"
                    :style="[advancedEditorView ? 'border-color: rgba(209, 213, 219, 1)' : 'border-color: white']"
                >
                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.advanced') }}</span>
                </button>
            </div>
            <div>
                <div class="flex items-center justify-between mt-4 flex-wrap">
                    <span class="font-bold text-2xl">{{ $t('editor.slides.content') }}</span>
                    <div v-if="!advancedEditorView" class="flex flex-col mr-3">
                        <label
                            style="margin-left: 0"
                            class="standard-label text-left text-md font-semibold"
                            for="contentTypeSelect"
                            >{{ $t('editor.slides.contentType') }}</label
                        >
                        <select
                            id="contentTypeSelect"
                            style="width: 12rem"
                            class="standard-select"
                            ref="typeSelector"
                            @input="
                                newType = ($event.target as HTMLInputElement).value;
                                if (
                                    panelModified(currentSlide.panel[panelIndex]) ||
                                    // Changing to dynamic deletes content of both panels. Therefore, warn if ANY panel has changes.
                                    (newType === 'dynamic' && currentSlide.panel.some((panel) => panelModified(panel)))
                                ) {
                                    $vfm.open(`change-slide-${slideIndex}`);
                                } else {
                                    changePanelType(determineEditorType(currentSlide.panel[panelIndex]), newType);
                                    toggleCenterPanel();
                                    toggleCenterSlide();
                                }
                            "
                            :value="determineEditorType(currentSlide.panel[panelIndex])"
                        >
                            <option
                                v-for="thing in Object.keys(editors).filter((editor) => editor !== 'loading')"
                                :key="thing"
                                :value="thing"
                            >
                                {{ $t(`editor.slide.panel.type.${thing}`) }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Panel options -->
                <div v-if="!advancedEditorView" class="flex flex-col lg:flex-row mt-3 gap-y-3 gap-x-7 flex-wrap">
                    <!-- Make the current panel the full slide -->
                    <div
                        class="flex flex-row"
                        :class="{ 'items-center': !currentRoute.includes('index-ca') }"
                        v-if="determineEditorType(currentSlide.panel[0]) !== 'dynamic'"
                    >
                        <input
                            type="checkbox"
                            id="fullSlide"
                            class="rounded-none cursor-pointer w-4 h-4"
                            v-model="onePanelOnly"
                            :disabled="onePanelOnly && determineEditorType(currentSlide.panel[0]) === 'dynamic'"
                            @change.stop="
                                () => {
                                    // if statement doesn't work properly (?), so had to use ternary
                                    // sorry if you have to read this
                                    currentSlide.panel.length > 1 && panelModified(currentSlide.panel[0])
                                        ? $vfm.open(`one-panel-only-${slideIndex}`)
                                        : currentSlide.panel.length === 1
                                        ? $vfm.open(`one-to-two-panels-${slideIndex}`)
                                        : toggleOnePanelOnly();
                                }
                            "
                        />
                        <label class="ml-0" for="fullSlide">
                            <span class="font-semibold ml-0">{{ $t('editor.slides.makeFull') }}</span>
                        </label>
                    </div>

                    <!-- Center panel content -->
                    <div class="flex flex-row" :class="{ 'items-center': !currentRoute.includes('index-ca') }">
                        <input
                            type="checkbox"
                            id="centerPanel"
                            class="rounded-none cursor-pointer w-4 h-4"
                            v-model="centerPanel"
                            :disabled="centerSlide"
                            @change.stop="toggleCenterPanel()"
                        />
                        <label class="ml-0" for="centerPanel">
                            <span class="font-semibold">{{ $t('editor.slides.centerPanel') }}</span>
                        </label>
                    </div>
                </div>
                <custom-editor
                    ref="editor"
                    :config="currentSlide"
                    @slide-edit="$emit('slide-edit')"
                    @config-edited="(slideConfig: Slide, save?: boolean = false) => {
                        $emit('custom-slide-updated', slideConfig, save, lang)
                    }"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                    v-if="advancedEditorView"
                ></custom-editor>
                <component
                    ref="editor"
                    :is="editors[determineEditorType(currentSlide.panel[panelIndex])]"
                    :key="panelIndex + determineEditorType(currentSlide.panel[panelIndex])"
                    :panel="currentSlide.panel[panelIndex]"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                    :uid="uid"
                    :sourceCounts="sourceCounts"
                    :centerSlide="centerSlide"
                    :dynamicSelected="dynamicSelected"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                    @slide-edit="$emit('slide-edit')"
                    v-else
                ></component>
            </div>
        </div>
        <div v-else class="flex h-fit mt-4 justify-center text-gray-600 text-xl">
            <span>{{ $t('editor.slides.select') }}</span>
        </div>
        <action-modal
            :name="`change-slide-${slideIndex}`"
            :title="
                $t('editor.slides.changePanelType.title', {
                    type: $t(`editor.slide.panel.type.${newType.toLowerCase() || 'unknown'}`)
                })
            "
            :message="$t('editor.slides.changePanelType.message')"
            @ok="
                determineEditorType(currentSlide.panel[panelIndex]) === 'map' &&
                (currentSlide.panel[panelIndex] as MapPanel).shared
                    ? $emit('slide-change-shared-map', { index: panelIndex, lang: langTranslate })
                    : '';

                changePanelType(determineEditorType(currentSlide.panel[panelIndex]), newType);
                toggleCenterPanel();
                toggleCenterSlide();
            "
            @Cancel="cancelTypeChange"
        />
        <action-modal
            :name="`one-panel-only-${slideIndex}`"
            :title="$t('editor.slides.changeToOnePanel.title')"
            :message="$t('editor.slides.changeToOnePanel.message')"
            @ok="toggleOnePanelOnly()"
            @Cancel="onePanelOnly = !onePanelOnly"
        />
        <multi-option-modal
            :name="`one-to-two-panels-${slideIndex}`"
            :title="$t('editor.slides.addBlankPanel.title')"
            :message="$t('editor.slides.addBlankPanel.message')"
            :options="[
                { label: $t('editor.slides.addBlankPanel.left'), action: () => toggleOnePanelOnly('left') },
                { label: $t('editor.slides.addBlankPanel.right'), action: () => toggleOnePanelOnly('right') }
            ]"
            @cancel="onePanelOnly = !onePanelOnly"
            :cancelAllowed="true"
        />
    </div>
</template>

<script lang="ts">
import ActionModal from '@/components/helpers/action-modal.vue';
import MultiOptionModal from '@/components/helpers/multi-option-modal.vue';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';
import {
    BasePanel,
    BaseStartingConfig,
    ChartPanel,
    ConfigFileStructure,
    DefaultConfigs,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    PanelType,
    Slide,
    SlideshowChartPanel,
    SlideshowImagePanel,
    SlideshowPanel,
    SourceCounts,
    StoryRampConfig,
    SupportedLanguages,
    TextPanel,
    VideoPanel
} from '@/definitions';

import ChartEditorV from './chart-editor.vue';
import CustomEditorV from './helpers/custom-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import VideoEditorV from './video-editor.vue';
import SlideshowEditorV from './slideshow-editor.vue';
import LoadingPageV from './helpers/loading-page.vue';
import DynamicEditorV from './dynamic-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import { toRaw } from 'vue';

@Options({
    components: {
        MultiOptionModal,
        ActionModal,
        'chart-editor': ChartEditorV,
        'custom-editor': CustomEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'video-editor': VideoEditorV,
        'slideshow-editor': SlideshowEditorV,
        'loading-page': LoadingPageV,
        'dynamic-editor': DynamicEditorV,
        'confirmation-modal': ConfirmationModalV
    }
})
export default class SlideEditorV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    @Prop() currentSlide!: Slide;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() uid!: string;
    @Prop() slideIndex!: number;
    @Prop() isLast!: boolean;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() otherLangSlide!: Slide;

    panelIndex = 0;
    advancedEditorView = false;
    newType = '';
    onePanelOnly = false;
    centerSlide = false;
    centerPanel = false;
    includeInToc = true;
    dynamicSelected = false;

    currentRoute = window.location.href;

    langTranslate = '';

    editors: Record<string, string> = {
        text: 'text-editor',
        image: 'image-editor',
        slideshow: 'slideshow-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        video: 'video-editor',
        loading: 'loading-page',
        dynamic: 'dynamic-editor'
    };

    mounted() {
        this.langTranslate = this.$t(`editor.lang.${this.lang}`);
    }

    @Watch('currentSlide', { deep: true })
    onSlideChange(): void {
        this.onePanelOnly = this.currentSlide?.panel.length === 1;
        this.langTranslate = this.$t(`editor.lang.${this.lang}`);
        this.centerPanel = this.currentSlide.panel[0]?.cssClasses?.includes('centerPanel') ?? false;
        this.centerSlide =
            (this.onePanelOnly
                ? this.determineEditorType(this.currentSlide.panel[0]) === 'dynamic'
                    ? this.currentSlide.panel[0]?.cssClasses?.includes('centerSlideRight')
                    : this.currentSlide.panel[0]?.cssClasses?.includes('centerSlideFull')
                : this.currentSlide.panel[0]?.cssClasses?.includes('centerSlideRight') &&
                  this.currentSlide.panel[1]?.cssClasses?.includes('centerSlideLeft')) ?? false;
        this.includeInToc = this.currentSlide.includeInToc ?? true;
    }

    /**
     * Determines whether a given panel has been modified from the default configuration of its type.
     *
     * @param {BasePanel} panel The panel to analyze.
     * @returns {boolean} Whether panel has been modified.
     */
    panelModified(panel: BasePanel): boolean {
        this.saveChanges(); // Used to capture unsaved changes before comparing with the corresponding default config
        const prevType = this.currentSlide.panel[this.panelIndex].type;

        let startingConfig = {
            ...JSON.parse(JSON.stringify(BaseStartingConfig)),
            dynamic: {
                type: PanelType.Dynamic,
                title:
                    this.currentSlide.panel[0] && prevType === 'text'
                        ? (this.currentSlide.panel[0] as TextPanel).title
                        : '',
                titleTag: '',
                content:
                    this.currentSlide.panel[0] && prevType === 'text'
                        ? (this.currentSlide.panel[0] as TextPanel).content
                        : '',
                children: []
            },
            map: {
                type: PanelType.Map,
                config: `${this.configFileStructure.uuid}/ramp-config/${
                    this.configFileStructure.uuid
                }-map-${this.getNumberOfMaps()}.json`,
                title: '',
                scrollguard: false
            }
        };

        const oldStartingConfig = startingConfig[panel.type as keyof DefaultConfigs];
        let newConfig = Object.assign({}, toRaw(panel));
        newConfig.customStyles = newConfig.customStyles || undefined;
        return JSON.stringify(oldStartingConfig) !== JSON.stringify(newConfig);
    }

    changePanelType(prevType: string, newType: string): void {
        let startingConfig = {
            ...JSON.parse(JSON.stringify(BaseStartingConfig)),
            dynamic: {
                type: PanelType.Dynamic,
                title:
                    this.currentSlide.panel[0] && prevType === 'text'
                        ? (this.currentSlide.panel[0] as TextPanel).title
                        : '',
                titleTag: '',
                content:
                    this.currentSlide.panel[0] && prevType === 'text'
                        ? (this.currentSlide.panel[0] as TextPanel).content
                        : '',
                children: []
            }
        };

        // When switching to a dynamic panel, remove the secondary panel.
        if (newType === 'dynamic') {
            // Remove source content of both panels
            this.currentSlide.panel.forEach((panel: BasePanel) => this.removeSourceCounts(panel));
            this.panelIndex = 0;
            this.currentSlide['panel'] = [startingConfig[newType as keyof DefaultConfigs]];
            this.dynamicSelected = true;
        } else {
            // Remove source content of panel having its type swapped
            this.removeSourceCounts(this.currentSlide.panel[this.panelIndex]);

            // Switching panel type when dynamic panels are not involved.
            this.currentSlide.panel[this.panelIndex] = startingConfig[newType as keyof DefaultConfigs];
        }
    }

    removeSourceCounts(panel: BasePanel): void {
        // The provided panel is being removed. Update source counts accordingly.
        switch (panel.type) {
            case 'map': {
                const mapPanel = panel as MapPanel;
                this.sourceCounts[mapPanel.config] -= 1;
                if (this.sourceCounts[mapPanel.config] === 0) {
                    this.configFileStructure.zip.remove(
                        `${mapPanel.config.substring(mapPanel.config.indexOf('/') + 1)}`
                    );
                }
                break;
            }

            case 'image': {
                const imagePanel = panel as ImagePanel;
                this.sourceCounts[imagePanel.src] -= 1;
                if (this.sourceCounts[imagePanel.src] === 0) {
                    this.configFileStructure.zip.remove(`${imagePanel.src.substring(imagePanel.src.indexOf('/') + 1)}`);
                }

                break;
            }

            case 'chart': {
                const chartPanel = panel as ChartPanel;
                this.sourceCounts[chartPanel.src] -= 1;
                if (this.sourceCounts[chartPanel.src] === 0) {
                    this.configFileStructure.zip.remove(`${chartPanel.src.substring(chartPanel.src.indexOf('/') + 1)}`);
                }

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
                    this.sourceCounts[videoPanel.src] -= 1;
                    if (this.sourceCounts[videoPanel.src] === 0) {
                        this.configFileStructure.zip.remove(
                            `${videoPanel.src.substring(videoPanel.src.indexOf('/') + 1)}`
                        );
                    }
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
    }

    saveChanges(): void {
        if (
            this.$refs.editor != null &&
            typeof (this.$refs.editor as ImageEditorV | ChartEditorV | VideoEditorV | CustomEditorV).saveChanges ===
                'function'
        ) {
            (this.$refs.editor as ImageEditorV | ChartEditorV | VideoEditorV | CustomEditorV).saveChanges();
        }
    }

    selectSlide(index: number, lang?: SupportedLanguages): void {
        this.$emit('slide-change', index, lang);
    }

    cancelTypeChange(): void {
        (this.$refs.typeSelector as HTMLSelectElement).value = this.determineEditorType(
            this.currentSlide.panel[this.panelIndex]
        );
    }

    determineEditorType(panel: BasePanel): string {
        // Determine whether the slideshow consists of only charts. If so, display the chart editor.
        if (panel.type === 'slideshowChart') return PanelType.Chart;

        // Determine whether the slideshow consists of only images. If so, display the image editor.
        if (panel.type === 'slideshowImage') return PanelType.Image;

        if (panel.type !== PanelType.Slideshow) return panel.type;

        // Otherwise display the slideshow editor.
        return PanelType.Slideshow;
    }

    toggleOnePanelOnly(addToWhichSide?: 'left' | 'right'): void {
        this.saveChanges();

        if (this.onePanelOnly) {
            this.currentSlide['panel'] = [this.currentSlide.panel[this.panelIndex]];
            this.panelIndex = 0;
        } else {
            this.currentSlide['panel'] = [
                ...(addToWhichSide === 'right' ? [Object.assign({}, this.currentSlide.panel[0])] : []),
                Object.assign(
                    {},
                    {
                        type: PanelType.Text,
                        title: '',
                        content: ''
                    }
                ),
                ...(addToWhichSide === 'left' ? [Object.assign({}, this.currentSlide.panel[0])] : [])
            ];
            this.panelIndex = addToWhichSide === 'left' ? 0 : 1;
        }
        if (this.centerPanel) {
            this.toggleCenterPanel();
        }
        if (this.centerSlide) {
            this.toggleCenterSlide();
        }
    }

    toggleCenterSlide(): void {
        if (this.determineEditorType(this.currentSlide.panel[this.panelIndex]) === 'dynamic') {
            if (this.centerSlide) {
                this.currentSlide.panel[0].cssClasses = 'centerSlideRight';
            } else {
                this.currentSlide.panel[0].cssClasses = (this.currentSlide.panel[0].cssClasses || '').replace(
                    'centerSlideRight',
                    ''
                );
            }
        } else if (this.onePanelOnly || this.currentSlide.panel.length === 1) {
            if (this.centerSlide) {
                this.currentSlide.panel[0].cssClasses = 'centerSlideFull';
            } else {
                this.currentSlide.panel[0].cssClasses = (this.currentSlide.panel[0].cssClasses || '').replace(
                    'centerSlideRight',
                    ''
                );
                this.currentSlide.panel[0].cssClasses = (this.currentSlide.panel[0].cssClasses || '').replace(
                    'centerSlideLeft',
                    ''
                );
                this.currentSlide.panel[0].cssClasses = (this.currentSlide.panel[0].cssClasses || '').replace(
                    'centerSlideFull',
                    ''
                );
            }
        } else {
            if (this.centerSlide) {
                this.currentSlide.panel[0].cssClasses = 'centerSlideRight';
                this.currentSlide.panel[1].cssClasses = 'centerSlideLeft';
            } else {
                this.currentSlide.panel[0].cssClasses = (this.currentSlide.panel[0].cssClasses || '').replace(
                    'centerSlideRight',
                    ''
                );
                this.currentSlide.panel[1].cssClasses = (this.currentSlide.panel[1].cssClasses || '').replace(
                    'centerSlideLeft',
                    ''
                );
            }
        }
    }

    toggleCenterPanel(): void {
        if (this.centerPanel) {
            for (const p in this.currentSlide.panel) {
                this.currentSlide.panel[p].cssClasses = 'centerPanel';
            }
        } else {
            for (const p in this.currentSlide.panel) {
                this.currentSlide.panel[p].cssClasses = (this.currentSlide.panel[p].cssClasses || '').replace(
                    'centerPanel',
                    ''
                );
            }
        }
    }

    getNumberOfMaps(): number {
        let n = 0;
        this.configFileStructure.rampConfig.forEach((f) => {
            n += 1;
        });
        return n;
    }

    toggleIncludeInToc(): void {
        this.currentSlide.includeInToc = this.includeInToc;
    }
}
</script>

<style lang="scss" scoped>
.panel-select-button {
    gap: 0;
    box-shadow: none;
    border-top-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-left-radius: 0.25rem; /* 4px */
    border-top-right-radius: 0.25rem; /* 4px */
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}

label {
    text-align: left !important;
    margin-left: 0.5rem;
}

input[type='checkbox']:checked {
    accent-color: black;
    color: white;
}

select {
    border: 1px solid #a1a1a1;
    background: white;
    padding: 0.25rem 0.5rem;
}

.table-of-contents-slide button {
    padding: 0;
    border: none;
}
</style>
