<template>
    <div id="slideEditor" class="p-5">
        <div v-if="!!(editorStore.currentSlide as Slide) && editorStore.selectedSlideIndex !== -1">
            <div class="flex">
                <div class="flex flex-col w-full">
                    <div class="flex justify-between flex-wrap gap-3 gap-y-1 items-center">
                        <h2 class="text-2xl font-bold">
                            {{
                                $t('editor.slides.currentLangLabel', {
                                    lang: langTranslate,
                                    num: editorStore.selectedSlideIndex + 1
                                })
                            }}
                        </h2>

                        <div class="flex items-stretch">
                            <button
                                :aria-label="$t('editor.swapConfigs')"
                                @click.stop="
                                    selectSlide(
                                        editorStore.selectedSlideIndex,
                                        (editorStore.selectedSlideLang === 'en' ? 'fr' : 'en') as SupportedLanguages
                                    )
                                "
                                :disabled="!otherLangSlide"
                                style="margin-right: 0.5rem"
                                class="respected-standard-button respected-gray-border-button"
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
                                @click.stop="
                                    selectSlide(
                                        editorStore.selectedSlideIndex - 1,
                                        editorStore.selectedSlideLang as SupportedLanguages
                                    )
                                "
                                :disabled="editorStore.selectedSlideIndex === 0"
                                class="respected-standard-button respected-gray-border-button"
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
                                @click.stop="
                                    selectSlide(
                                        editorStore.selectedSlideIndex + 1,
                                        editorStore.selectedSlideLang as SupportedLanguages
                                    )
                                "
                                :disabled="isLast"
                                class="respected-standard-button respected-gray-border-button gap-1"
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
                    <label style="margin-left: 0" class="respected-standard-label mt-4" for="slideTitle">{{
                        $t('editor.slides.slideTitle')
                    }}</label>
                    <div class="flex">
                        <input
                            type="text"
                            id="slideTitle"
                            v-model="(editorStore.currentSlide as Slide).title"
                            :placeholder="$t('editor.slides.addSlideTitle')"
                            class="respected-standard-input w-full lg:w-2/3"
                        />
                        <span class="ml-auto"></span>
                    </div>
                    <!-- Whole-slide options -->
                    <div class="respected-standard-options-area mt-3">
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
                v-if="currentSlide.panel?.length === 2"
            >
                <!-- Left panel -->
                <button
                    @click="
                        () => {
                            panelIndex = 0;
                            editorStore.selectedPanelIndex = 0;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="respected-standard-button panel-select-button"
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
                                        (editorStore.currentSlide as Slide).panel[0]?.type !== 'loading-page'
                                            ? (editorStore.currentSlide as Slide).panel[0]?.type
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
                            editorStore.selectedPanelIndex = 1;
                            panelIndex = 1;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="respected-standard-button panel-select-button"
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
                                        (editorStore.currentSlide as Slide).panel[1]?.type !== 'loading-page'
                                            ? (editorStore.currentSlide as Slide).panel[1]?.type
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
                    class="respected-standard-button panel-select-button"
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
                            editorStore.selectedPanelIndex = 0;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="respected-standard-button panel-select-button"
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
                                        (editorStore.currentSlide as Slide).panel[0]?.type !== 'loading-page'
                                            ? (editorStore.currentSlide as Slide).panel[0]?.type
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
                    class="respected-standard-button panel-select-button"
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
                            class="respected-standard-label text-left text-md font-semibold"
                            for="contentTypeSelect"
                            >{{ $t('editor.slides.contentType') }}</label
                        >
                        <select
                            id="contentTypeSelect"
                            style="width: 12rem"
                            class="respected-standard-select"
                            ref="typeSelector"
                            @input="
                                newType = ($event.target as HTMLInputElement).value;
                                if (
                                    panelModified((editorStore.currentSlide as Slide).panel[panelIndex]) ||
                                    // Changing to dynamic deletes content of both panels. Therefore, warn if ANY panel has changes.
                                    (newType === 'dynamic' &&
                                        (editorStore.currentSlide as Slide).panel.some((panel) => panelModified(panel)))
                                ) {
                                    $vfm.open(`change-slide-${editorStore.selectedSlideIndex}`);
                                } else {
                                    changePanelType(
                                        determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex]),
                                        newType
                                    );
                                    toggleCenterPanel();
                                    toggleCenterSlide();
                                }
                            "
                            :value="determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex])"
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
                <div v-if="!advancedEditorView" class="respected-standard-options-area mt-3">
                    <!-- Make the current panel the full slide -->
                    <div
                        class="flex flex-row"
                        :class="{ 'items-center': !currentRoute.includes('index-ca') }"
                        v-if="determineEditorType((editorStore.currentSlide as Slide).panel[0]) !== 'dynamic'"
                    >
                        <input
                            type="checkbox"
                            id="fullSlide"
                            class="rounded-none cursor-pointer w-4 h-4"
                            v-model="onePanelOnly"
                            :disabled="
                                onePanelOnly &&
                                determineEditorType((editorStore.currentSlide as Slide).panel[0]) === 'dynamic'
                            "
                            @change.stop="
                                () => {
                                    // if statement doesn't work properly (?), so had to use ternary
                                    // sorry if you have to read this
                                    (editorStore.currentSlide as Slide).panel.length > 1 &&
                                    panelModified((editorStore.currentSlide as Slide).panel[0])
                                        ? $vfm.open(`one-panel-only-${editorStore.selectedSlideIndex}`)
                                        : (editorStore.currentSlide as Slide).panel.length === 1
                                          ? $vfm.open(`one-to-two-panels-${editorStore.selectedSlideIndex}`)
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
                <CustomEditorV
                    ref="editor"
                    @slide-edit="$emit('slide-edit')"
                    @config-edited="
                        (save: boolean = false) => {
                            $emit('custom-slide-updated', save, editorStore.selectedSlideLang);
                        }
                    "
                    @title-edit="
                        (title: string) => {
                            $emit(
                                'custom-slide-updated',
                                { ...(editorStore.currentSlide as Slide), title },
                                false,
                                editorStore.selectedSlideLang
                            );
                        }
                    "
                    v-if="advancedEditorView"
                />
                <component
                    ref="editor"
                    :is="editors[determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex])]"
                    :key="panelIndex + determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex])"
                    :panel="(editorStore.currentSlide as Slide).panel[panelIndex]"
                    :lang="editorStore.selectedSlideLang"
                    :uid="uid"
                    :centerSlide="centerSlide"
                    :dynamicSelected="dynamicSelected"
                    @slide-edit="$emit('slide-edit')"
                    v-else
                />
            </div>
        </div>
        <div v-else class="h-fit mt-4 text-center">
            <h4 class="text-lg font-bold">{{ $t('editor.slides.selectHeader') }}</h4>
            <p class="text-sm font-semibold text-gray-500">{{ $t('editor.slides.select') }}.</p>
        </div>
        <ActionModal
            :name="`change-slide-${editorStore.selectedSlideIndex}`"
            :title="
                $t('editor.slides.changePanelType.title', {
                    type: $t(`editor.slide.panel.type.${newType.toLowerCase() || 'unknown'}`)
                })
            "
            :message="$t('editor.slides.changePanelType.message')"
            @ok="
                determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex]) === 'map' &&
                ((editorStore.currentSlide as Slide).panel[panelIndex] as MapPanel).shared
                    ? $emit('slide-change-shared-map', { index: panelIndex, lang: langTranslate })
                    : '';

                changePanelType(determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex]), newType);
                toggleCenterPanel();
                toggleCenterSlide();
            "
            @Cancel="cancelTypeChange"
        />
        <ActionModal
            :name="`one-panel-only-${editorStore.selectedSlideIndex}`"
            :title="$t('editor.slides.changeToOnePanel.title')"
            :message="$t('editor.slides.changeToOnePanel.message')"
            @ok="toggleOnePanelOnly()"
            @Cancel="onePanelOnly = false"
        />
        <MultiOptionModal
            :name="`one-to-two-panels-${editorStore.selectedSlideIndex}`"
            :title="$t('editor.slides.addBlankPanel.title')"
            :message="$t('editor.slides.addBlankPanel.message')"
            :options="[
                { label: $t('editor.slides.addBlankPanel.left'), action: () => toggleOnePanelOnly('left') },
                { label: $t('editor.slides.addBlankPanel.right'), action: () => toggleOnePanelOnly('right') }
            ]"
            @cancel="onePanelOnly = true"
            :cancelAllowed="true"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef, watch } from 'vue';
import ActionModal from '@/components/support/action-modal.vue';
import MultiOptionModal from '@/components/support/multi-option-modal.vue';
import {
    BasePanel,
    BaseStartingConfig,
    DefaultConfigs,
    DynamicPanel,
    MapPanel,
    PanelType,
    Slide,
    SlideshowChartPanel,
    SlideshowImagePanel,
    SupportedLanguages,
    TextPanel
} from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';

import ChartEditorV from './panel-editors/chart-editor.vue';
import CustomEditorV from './panel-editors/custom-editor.vue';
import ImageEditorV from './panel-editors/image-editor.vue';
import TextEditorV from './panel-editors/text-editor.vue';
import MapEditorV from './panel-editors/map-editor.vue';
import VideoEditorV from './panel-editors/video-editor.vue';
import SlideshowEditorV from './panel-editors/slideshow-editor.vue';
import LoadingPageV from './support/loading-page.vue';
import DynamicEditorV from './panel-editors/dynamic-editor.vue';
import { toRaw } from 'vue';

import { useProductStore } from '@/stores/productStore';
import { useEditorStore } from '@/stores/editorStore';

import { useI18n } from 'vue-i18n';

import { ref } from 'vue';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = defineProps<{
    uid: string;
    isLast: boolean;
    otherLangSlide?: Slide;
}>();

const emit = defineEmits([
    'slide-change',
    'scroll-to-element',
    'slide-edit',
    'custom-slide-updated',
    'slide-change-shared-map'
]);

// =========================================
// Definitions

const panelIndex = ref(0);
const advancedEditorView = ref(false);

const productStore = useProductStore();
const editorStore = useEditorStore();

const { t } = useI18n();

const editor = useTemplateRef('editor');
const typeSelector = useTemplateRef('typeSelector');

const newType = ref('');
const onePanelOnly = ref(false);
const centerSlide = ref(false);
const centerPanel = ref(false);
const includeInToc = ref(true);
const dynamicSelected = ref(false);
const currentRoute = computed(() => window.location.href);
const langTranslate = ref('');
const currentSlide = computed(() => editorStore.currentSlide as Slide);

const editors: Record<string, any> = {
    text: TextEditorV,
    image: ImageEditorV,
    slideshow: SlideshowEditorV,
    chart: ChartEditorV,
    map: MapEditorV,
    video: VideoEditorV,
    loading: LoadingPageV,
    dynamic: DynamicEditorV
};

// =========================================
// Watchers

watch(
    currentSlide,
    () => {
        if ((editorStore.currentSlide as Slide) && (editorStore.currentSlide as Slide).panel) {
            onePanelOnly.value = (editorStore.currentSlide as Slide).panel.length === 1;
            langTranslate.value = t(`editor.lang.${editorStore.selectedSlideLang}`);
            centerPanel.value = (editorStore.currentSlide as Slide).panel[0]?.cssClasses?.includes('centerPanel') ?? false;
            centerSlide.value =
                (onePanelOnly.value
                    ? determineEditorType((editorStore.currentSlide as Slide).panel[0]) === 'dynamic'
                        ? (editorStore.currentSlide as Slide).panel[0]?.cssClasses?.includes('centerSlideRight')
                        : (editorStore.currentSlide as Slide).panel[0]?.cssClasses?.includes('centerSlideFull')
                    : (editorStore.currentSlide as Slide).panel[0]?.cssClasses?.includes('centerSlideRight') &&
                      (editorStore.currentSlide as Slide).panel[1]?.cssClasses?.includes('centerSlideLeft')) ?? false;
            includeInToc.value = (editorStore.currentSlide as Slide).includeInToc ?? true;
            dynamicSelected.value = determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex.value]) === 'dynamic';
        }
    },
    { deep: true }
);

// =========================================
// Lifecycle functions

onMounted(() => {
    langTranslate.value = t(`editor.lang.${editorStore.selectedSlideLang}`);
});

// =========================================
// Component functions

/**
 * Determines whether a given panel has been modified from the default configuration of its type.
 *
 * @param {BasePanel} panel The panel to analyze.
 * @returns {boolean} Whether panel has been modified.
 */
function panelModified(panel: BasePanel): boolean {
    saveChanges(); // Used to capture unsaved changes before comparing with the corresponding default config
    const prevType = (editorStore.currentSlide as Slide).panel[panelIndex.value].type;
    const uuid = productStore.configFileStructure.uuid;

    let startingConfig = {
        ...JSON.parse(JSON.stringify(BaseStartingConfig)),
        dynamic: {
            type: PanelType.Dynamic,
            title:
                (editorStore.currentSlide as Slide).panel[0] && prevType === 'text'
                    ? ((editorStore.currentSlide as Slide).panel[0] as TextPanel).title
                    : '',
            titleTag: '',
            content:
                (editorStore.currentSlide as Slide).panel[0] && prevType === 'text'
                    ? ((editorStore.currentSlide as Slide).panel[0] as TextPanel).content
                    : '',
            children: []
        },
        map: {
            type: PanelType.Map,
            config: `${uuid}/ramp-config/${uuid}-map-${getNumberOfMaps()}.json`,
            title: '',
            scrollguard: false
        }
    };

    const oldStartingConfig = startingConfig[panel.type as keyof DefaultConfigs];
    let newConfig = Object.assign({}, toRaw(panel));
    newConfig.customStyles = newConfig.customStyles || undefined;
    return JSON.stringify(oldStartingConfig) !== JSON.stringify(newConfig);
}

function changePanelType(prevType: string, newType: string): void {
    let startingConfig = {
        ...JSON.parse(JSON.stringify(BaseStartingConfig)),
        dynamic: {
            type: PanelType.Dynamic,
            title:
                (editorStore.currentSlide as Slide).panel[0] && prevType === 'text'
                    ? ((editorStore.currentSlide as Slide).panel[0] as TextPanel).title
                    : '',
            titleTag: '',
            content:
                (editorStore.currentSlide as Slide).panel[0] && prevType === 'text'
                    ? ((editorStore.currentSlide as Slide).panel[0] as TextPanel).content
                    : '',
            children: []
        }
    };

    // When switching to a dynamic panel, remove the secondary panel.
    if (newType === 'dynamic') {
        // Remove source content of both panels
        (editorStore.currentSlide as Slide).panel.forEach((panel: BasePanel) => productStore.removeSourceCounts(panel));
        panelIndex.value = 0;
        (editorStore.currentSlide as Slide)['panel'] = [startingConfig[newType as keyof DefaultConfigs]];
        dynamicSelected.value = true;
    } else {
        // Remove source content of panel having its type swapped
        productStore.removeSourceCounts((editorStore.currentSlide as Slide).panel[panelIndex.value]);

        // Switching panel type when dynamic panels are not involved.
        (editorStore.currentSlide as Slide).panel[panelIndex.value] = startingConfig[newType as keyof DefaultConfigs];
    }
}

function saveChanges(): void {
    if (
        editor.value != null &&
        typeof (
            editor.value as
                | typeof ImageEditorV
                | typeof ChartEditorV
                | typeof VideoEditorV
                | typeof CustomEditorV
                | typeof TextEditorV
        ).saveChanges === 'function'
    ) {
        (
            editor.value as
                | typeof ImageEditorV
                | typeof ChartEditorV
                | typeof VideoEditorV
                | typeof CustomEditorV
                | typeof TextEditorV
        ).saveChanges();
    }
}

function selectSlide(index: number, lang?: SupportedLanguages): void {
    emit('slide-change', index, lang);
    emit('scroll-to-element', index);
}

function cancelTypeChange(): void {
    (typeSelector.value as HTMLSelectElement).value = determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex.value]);
}

function determineEditorType(panel: BasePanel): string {
    // Determine whether the slideshow consists of only charts. If so, display the chart editor.
    if (panel.type === 'slideshowChart') return PanelType.Chart;

    // Determine whether the slideshow consists of only images. If so, display the image editor.
    if (panel.type === 'slideshowImage') return PanelType.Image;

    if (panel.type !== PanelType.Slideshow) return panel.type;

    // Otherwise display the slideshow editor.
    return PanelType.Slideshow;
}

function toggleOnePanelOnly(addToWhichSide?: 'left' | 'right'): void {
    saveChanges();

    if (onePanelOnly.value) {
        (editorStore.currentSlide as Slide)['panel'] = [(editorStore.currentSlide as Slide).panel[panelIndex.value]];
        panelIndex.value = 0;
    } else {
        (editorStore.currentSlide as Slide)['panel'] = [
            ...(addToWhichSide === 'right' ? [Object.assign({}, (editorStore.currentSlide as Slide).panel[0])] : []),
            Object.assign(
                {},
                {
                    type: PanelType.Text,
                    title: '',
                    content: ''
                }
            ),
            ...(addToWhichSide === 'left' ? [Object.assign({}, (editorStore.currentSlide as Slide).panel[0])] : [])
        ];
        panelIndex.value = addToWhichSide === 'left' ? 0 : 1;
    }
    if (centerPanel.value) {
        toggleCenterPanel();
    }
    if (centerSlide.value) {
        toggleCenterSlide();
    }
}

function toggleCenterSlide(): void {
    if (determineEditorType((editorStore.currentSlide as Slide).panel[panelIndex.value]) === 'dynamic') {
        const dynamicPanel = (editorStore.currentSlide as Slide).panel[0] as DynamicPanel;

        (editorStore.currentSlide as Slide).panel[0].cssClasses = centerSlide.value
            ? 'centerSlideRight'
            : ((editorStore.currentSlide as Slide).panel[0].cssClasses || '').replace('centerSlideRight', '');

        (dynamicPanel.children ?? []).forEach((child) => {
            const panel = child.panel;
            if (panel.type === 'image' || panel.type === 'chart' || /^slideshow/.test(panel.type)) {
                const slideshowPanel =
                    panel.type === 'slideshowImage'
                        ? (panel as SlideshowImagePanel)
                        : panel.type === 'slideshowChart'
                          ? (panel as SlideshowChartPanel)
                          : panel;
                applyTextAlign(slideshowPanel, centerSlide.value, true);
            } else {
                applyTextAlign(panel, centerSlide.value, true);
            }
        });
    } else if (onePanelOnly.value || (editorStore.currentSlide as Slide).panel.length === 1) {
        if (centerSlide.value) {
            (editorStore.currentSlide as Slide).panel[0].cssClasses = 'centerSlideFull';
        } else {
            (editorStore.currentSlide as Slide).panel[0].cssClasses = (editorStore.currentSlide as Slide).panel[0].cssClasses?.replace(
                'centerSlideRight',
                ''
            );
            (editorStore.currentSlide as Slide).panel[0].cssClasses = (editorStore.currentSlide as Slide).panel[0].cssClasses?.replace(
                'centerSlideLeft',
                ''
            );
            (editorStore.currentSlide as Slide).panel[0].cssClasses = (editorStore.currentSlide as Slide).panel[0].cssClasses?.replace(
                'centerSlideFull',
                ''
            );
        }
    } else {
        if (centerSlide.value) {
            (editorStore.currentSlide as Slide).panel[0].cssClasses = 'centerSlideRight';
            (editorStore.currentSlide as Slide).panel[1].cssClasses = 'centerSlideLeft';
        } else {
            (editorStore.currentSlide as Slide).panel[0].cssClasses = ((editorStore.currentSlide as Slide).panel[0].cssClasses || '').replace(
                'centerSlideRight',
                ''
            );
            (editorStore.currentSlide as Slide).panel[1].cssClasses = ((editorStore.currentSlide as Slide).panel[1].cssClasses || '').replace(
                'centerSlideLeft',
                ''
            );
        }
    }
}

function toggleCenterPanel(): void {
    if (centerPanel.value) {
        for (const p in (editorStore.currentSlide as Slide).panel) {
            (editorStore.currentSlide as Slide).panel[p].cssClasses = 'centerPanel';
        }
    } else {
        for (const p in (editorStore.currentSlide as Slide).panel) {
            (editorStore.currentSlide as Slide).panel[p].cssClasses = ((editorStore.currentSlide as Slide).panel[p].cssClasses || '').replace(
                'centerPanel',
                ''
            );
        }
    }
}

function getNumberOfMaps(): number {
    let n = 0;
    productStore.configFileStructure.rampConfig.forEach((_f) => {
        n += 1;
    });
    return n;
}

function toggleIncludeInToc(): void {
    (editorStore.currentSlide as Slide).includeInToc = includeInToc.value ?? false;
}

// =========================================
// Component exposes

defineExpose({ saveChanges, panelIndex, advancedEditorView });
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
