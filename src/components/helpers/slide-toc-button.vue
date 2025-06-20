<template>
    <button
        :aria-label="content"
        class="flex gap-2 px-2 rounded-md bg-transparent hover:bg-gray-200"
        :disabled="!element[lang]"
        :class="{
            'selected-toc-config-item': element[lang] === currentSlide,
            'py-1': !isMobileSidebar,
            'py-2': isMobileSidebar,
            'border-2 border-blue-500': isMobileSidebar && element[lang] === currentSlide,
            'cursor-not-allowed border-2 border-red-400': !element[lang]
        }"
        @click.stop="
            $emit('select-slide');
            isMobileSidebar && $emit('close-sidebar');
        "
    >
        <!-- ::lang:: text -->
        <p class="font-bold italic text-gray-500 select-none" :class="{ 'text-gray-700': isActiveSlide }">
            {{ lang === 'en' ? 'EN' : 'FR' }}
        </p>
        <!-- Config title -->
        <div class="flex flex-col gap-0.5">
            <p
                class="text-left select-none truncate-multiline"
                :class="{
                    italic: !element[lang]?.title
                }"
                v-truncate="{
                    options: {
                        delay: '200',
                        placement: isMobileSidebar ? 'top' : 'right',
                        content: content,
                        animateFill: true,
                        offset: [0, isMobileSidebar ? 0 : 50],
                        touch: ['hold', 500]
                    }
                }"
            >
                {{ content }}
            </p>
            <!-- Mini-icons (panel type) -->
            <div class="flex gap-0.5">
                <button
                    :aria-label="panel?.type"
                    v-for="(panel, panelIndex) in element[lang]?.panel"
                    class="flex gap-0.5 border rounded w-min py-0.5 px-0.5 cursor-default"
                    :class="[
                        panel?.type === 'map' && panel.shared
                            ? 'border-yellow-800 bg-yellow-200 hover:border-yellow-400'
                            : 'border-transparent hover:border-gray-400 hover:bg-gray-300',
                        element[lang] === currentSlide && this.stateStore.selectedPanelIndex === panelIndex ? '' : ''
                    ]"
                    :style="[
                        element[lang] === currentSlide && this.stateStore.selectedPanelIndex === panelIndex
                            ? 'background-color: #c1c1c5 !important;'
                            : ''
                    ]"
                    @click.stop="
                        () => {
                            $emit('select-slide', panelIndex);
                        }
                    "
                    v-tippy="{
                        theme: 'left-align',
                        delay: '200',
                        placement: 'bottom-start',
                        content: createMiniIconTooltip(panelIndex, element, panel),
                        touch: ['hold', 500],
                        allowHTML: true
                    }"
                >
                    <span
                        v-html="determinePanelImage(panel?.type)"
                        :style="{
                            fill: panel?.type === 'map' && panel.shared ? '#92400e' : 'rgba(0,0,0,0.75)'
                        }"
                        style="min-height: 11px; max-height: 11px; min-width: 11px; max-width: 11px"
                    ></span>
                    <!-- Potentially needed in the future for shared map configs -->
                    <!--                    <svg-->
                    <!--                        v-if="panel?.type === 'map' && panel.shared"-->
                    <!--                        xmlns="http://www.w3.org/2000/svg"-->
                    <!--                        shape-rendering="geometricPrecision"-->
                    <!--                        text-rendering="geometricPrecision"-->
                    <!--                        image-rendering="optimizeQuality"-->
                    <!--                        fill-rule="evenodd"-->
                    <!--                        clip-rule="evenodd"-->
                    <!--                        viewBox="0 0 512 511.999"-->
                    <!--                        width="11"-->
                    <!--                        height="11"-->
                    <!--                        fill="#854d0e"-->
                    <!--                    >-->
                    <!--                        <path-->
                    <!--                            d="M476.335 35.664v.001c47.554 47.552 47.552 125.365.002 172.918l-101.729 101.73c-60.027 60.025-162.073 42.413-194.762-32.45 35.888-31.191 53.387-21.102 87.58-6.638 20.128 8.512 43.74 3.955 60.08-12.387l99.375-99.371c21.49-21.493 21.492-56.662 0-78.155-21.489-21.488-56.677-21.472-78.151 0l-71.278 71.28c-23.583-11.337-50.118-14.697-75.453-10.07a121.476 121.476 0 0118.767-24.207l82.651-82.65c47.554-47.551 125.365-47.555 172.918-.001zM35.664 476.334l.001.001c47.554 47.552 125.365 47.552 172.917 0l85.682-85.682a121.496 121.496 0 0019.325-25.157c-27.876 6.951-57.764 4.015-83.932-8.805l-70.192 70.19c-21.472 21.471-56.658 21.492-78.149 0-21.492-21.491-21.493-56.658 0-78.149l99.375-99.376c20.363-20.363 61.002-26.435 91.717 1.688 29.729-3.133 41.275-8.812 59.742-26.493-39.398-69.476-137.607-80.013-194.757-22.863L35.664 303.417c-47.552 47.553-47.552 125.364 0 172.917z"-->
                    <!--                        />-->
                    <!--                    </svg>-->
                </button>
            </div>
        </div>

        <!-- Options for ::lang:: items with missing configs (e.g. one language has config, other doesn't) -->
        <div v-if="!element[lang]" class="ml-auto flex my-auto">
            <!-- Create a new blank config -->
            <button
                :aria-label="$t('editor.slides.toc.newBlankConfig')"
                class="slide-toc-button"
                v-tippy="{
                    delay: '200',
                    placement: 'top-start',
                    content: $t('editor.slides.toc.newBlankConfig'),
                    animateFill: false,
                    touch: ['hold', 500]
                }"
                @click="$emit('create-config')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 399 511.66"
                    width="14"
                    height="14"
                    class="mx-1"
                >
                    <path
                        fill-rule="nonzero"
                        d="M71.1 0h190.92c5.22 0 9.85 2.5 12.77 6.38L394.7 136.11c2.81 3.05 4.21 6.92 4.21 10.78l.09 293.67c0 19.47-8.02 37.23-20.9 50.14l-.09.08c-12.9 12.87-30.66 20.88-50.11 20.88H71.1c-19.54 0-37.33-8.01-50.22-20.9C8.01 477.89 0 460.1 0 440.56V71.1c0-19.56 8-37.35 20.87-50.23C33.75 8 51.54 0 71.1 0zm45.78 254.04c-8.81 0-15.96-7.15-15.96-15.95 0-8.81 7.15-15.96 15.96-15.96h165.23c8.81 0 15.96 7.15 15.96 15.96 0 8.8-7.15 15.95-15.96 15.95H116.88zm0 79.38c-8.81 0-15.96-7.15-15.96-15.96 0-8.8 7.15-15.95 15.96-15.95h156.47c8.81 0 15.96 7.15 15.96 15.95 0 8.81-7.15 15.96-15.96 15.96H116.88zm0 79.39c-8.81 0-15.96-7.15-15.96-15.96s7.15-15.95 15.96-15.95h132.7c8.81 0 15.95 7.14 15.95 15.95 0 8.81-7.14 15.96-15.95 15.96h-132.7zm154.2-363.67v54.21c1.07 13.59 5.77 24.22 13.99 31.24 8.63 7.37 21.65 11.52 38.95 11.83l36.93-.05-89.87-97.23zm96.01 129.11-43.31-.05c-25.2-.4-45.08-7.2-59.39-19.43-14.91-12.76-23.34-30.81-25.07-53.11l-.15-2.22V31.91H71.1c-10.77 0-20.58 4.42-27.68 11.51-7.09 7.1-11.51 16.91-11.51 27.68v369.46c0 10.76 4.43 20.56 11.52 27.65 7.11 7.12 16.92 11.53 27.67 11.53h256.8c10.78 0 20.58-4.4 27.65-11.48 7.13-7.12 11.54-16.93 11.54-27.7V178.25z"
                    />
                </svg>
            </button>
            <!-- Button: Copy the ::oppositeLang:: config in the same slide, if it exists -->
            <!-- Only available if the slide's ::lang:: config is undefined -->
            <button
                :aria-label="
                    lang === 'en' ? $t('editor.slides.toc.newConfigFromFR') : $t('editor.slides.toc.newConfigFromEng')
                "
                v-if="element[oppositeLang]"
                class="slide-toc-button"
                v-tippy="{
                    delay: '200',
                    placement: 'top-start',
                    content:
                        lang === 'en'
                            ? $t('editor.slides.toc.newConfigFromFR')
                            : $t('editor.slides.toc.newConfigFromEng'),
                    animateFill: false,
                    touch: ['hold', 500]
                }"
                @click="$emit('copy-config')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" class="mx-1">
                    <path
                        d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                    />
                </svg>
            </button>
        </div>
        <div v-else class="ml-auto flex my-auto">
            <!-- ::lang:: options dropdown menu -->
            <toc-options :copy-allowed="!!element[oppositeLang]" @copy="$emit('copy')" @clear="$emit('clear')" />
        </div>
    </button>
</template>

<script lang="ts">
import { BasePanel, PanelType, Slide } from '@/definitions';
import { useStateStore } from '@/stores/stateStore';
import { Options, Prop, Vue } from 'vue-property-decorator';
import TocOptions from '@/components/helpers/toc-options.vue';

import TextEditorIcon from '@/assets/text-editor.svg?raw';
import ImageEditorIcon from '@/assets/image-editor.svg?raw';
import MapEditorIcon from '@/assets/map-editor.svg?raw';
import ChartEditorIcon from '@/assets/chart-editor.svg?raw';
import VideoEditorIcon from '@/assets/video-editor.svg?raw';
import AudioEditorIcon from '@/assets/audio-editor.svg?raw';
import SlideshowEditorIcon from '@/assets/slideshow-editor.svg?raw';
import DynamicEditorIcon from '@/assets/dynamic-editor.svg?raw';

@Options({
    components: {
        TocOptions
    }
})
export default class SlideTocV extends Vue {
    @Prop() lang!: string;
    @Prop() element!: Slide;
    @Prop() currentSlide!: Slide | string;
    @Prop({ default: false }) isMobileSidebar!: boolean;
    @Prop() isActiveSlide!: boolean;

    stateStore = useStateStore();

    oppositeLang = '';
    content = '';

    textEditorIcon = TextEditorIcon;
    imageEditorIcon = ImageEditorIcon;
    mapEditorIcon = MapEditorIcon;
    chartEditorIcon = ChartEditorIcon;
    videoEditorIcon = VideoEditorIcon;
    audioEditorIcon = AudioEditorIcon;
    slideshowEditorIcon = SlideshowEditorIcon;
    dynamicEditorIcon = DynamicEditorIcon;

    createMiniIconTooltip(panelIndex: number, element: Slide, panel: BasePanel) {
        // Function to escape HTML sequences
        // panel.title is user input, and therefore a potential attack vector
        const escapeHTML = (text: string) => {
            if (!text) return text;
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };

        // Max length of the title (starting on the second line of the tooltip). Title will truncate after.
        // maxLength == 130 is around 2 and a half lines
        const maxLength = 130;

        return `<p style="justify-self: left; text-align: left"><strong>${
            element[this.lang]?.panel.length > 1
                ? this.$t('editor.slides.panelNumber', { num: panelIndex + 1 })
                : this.$t('editor.slides.fullscreenPanel')
        }: ${this.$t(`editor.slide.panel.type.${panel?.type}`)}</strong><br/>${
            panel.title
                ? '"' +
                  escapeHTML(panel.title).substring(0, maxLength) +
                  ((panel.title as string)?.length > maxLength ? '...' : '') +
                  '"'
                : 'No title'
        }</p>`;
    }

    updateContent(): void {
        if (this.element[this.lang]?.title) {
            this.content = this.element[this.lang]?.title;
        } else if (this.element[this.lang]) {
            this.content =
                this.lang === 'en'
                    ? this.$t('editor.slides.toc.newENGSlideText')
                    : this.$t('editor.slides.toc.newFRSlideText');
        } else {
            this.content =
                this.lang === 'en' ? this.$t('editor.slide.toc.noENGslide') : this.$t('editor.slide.toc.noFRSlide');
        }
    }

    mounted(): void {
        this.oppositeLang = this.lang === 'en' ? 'fr' : 'en';
        this.updateContent();
    }

    updated(): void {
        this.updateContent();
    }

    determinePanelImage(type: PanelType): string {
        if (!type) return '';

        const panelIcons: Record<PanelType, string> = {
            [PanelType.Text]: this.textEditorIcon,
            [PanelType.Image]: this.imageEditorIcon,
            [PanelType.Map]: this.mapEditorIcon,
            [PanelType.Chart]: this.chartEditorIcon,
            [PanelType.Video]: this.videoEditorIcon,
            [PanelType.Audio]: this.audioEditorIcon,
            [PanelType.Slideshow]: this.slideshowEditorIcon,
            [PanelType.SlideshowImage]: this.imageEditorIcon,
            [PanelType.SlideshowChart]: this.chartEditorIcon,
            [PanelType.Dynamic]: this.dynamicEditorIcon,
            [PanelType.Loading]: ''
        };

        return panelIcons[type] ?? '';
    }
}
</script>

<style lang="scss" scoped>
.truncate-multiline {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.slide-toc-button {
    border-radius: 3px;
    padding: 2px;
}
.slide-toc-button:hover {
    background-color: rgb(209, 213, 219);
}
</style>
