<template>
    <div>
        <div class="flex toc-header p-2 mt-10">
            <span class="flex items-center justify-center font-bold"> {{ $t('editor.slides.title') }}</span>
            <span class="flex-1"></span>
            <span class="ml-auto"></span>
            <button v-on:click="addNewSlide">
                <span class="align-middle inline-block px-1"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                    </svg>
                </span>
                <span class="align-middle inline-block">{{ $t('editor.slides.addSlide') }}</span>
            </button>
            <button
                @click.stop="$vfm.open(`copy-from-other-lang`)"
                v-tippy="{
                    delay: '200',
                    placement: 'right',
                    content: $t('editor.slides.copyFromLang'),
                    animateFill: true
                }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path
                        d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                    />
                </svg>
            </button>
            <vue-final-modal
                modalId="copy-from-other-lang"
                content-class="flex flex-col max-w-xl mx-4 p-4 bg-white border rounded-lg space-y-2"
                class="flex justify-center items-center"
            >
                <h2 slot="header" class="text-xl font-bold">{{ $t('editor.slides.copyFromLang') }}</h2>
                <div class="flex flex-col">
                    <button
                        class="w-32 h-12 ml-0"
                        @click="copyAllFromOtherLang(configFileStructure.configs[lang === 'en' ? 'fr' : 'en'].slides)"
                    >
                        {{ $t('editor.slides.copyAll') }}
                    </button>
                    <span class="text-lg font-bold my-6"> {{ $t('editor.image.label.or') }} </span>
                    <div class="flex">
                        <select v-model="selectedForCopying" class="overflow-ellipsis copy-select">
                            <option
                                v-for="(slide, index) in configFileStructure.configs[lang === 'en' ? 'fr' : 'en']
                                    .slides"
                                :value="index"
                                :key="slide.title + index"
                            >
                                {{ $t('editor.slides.slide') }} {{ index + ': ' + slide.title }}
                            </option>
                        </select>

                        <button
                            @click="
                                copyFromOtherLang(
                                    configFileStructure.configs[lang === 'en' ? 'fr' : 'en'].slides[selectedForCopying]
                                )
                            "
                        >
                            {{ $t('editor.slides.copy') }}
                        </button>
                    </div>
                </div>
            </vue-final-modal>
        </div>
        <ul>
            <draggable v-model="slides" @update="$emit('slides-updated', slides)" item-key="title">
                <template #item="{ element, index }">
                    <li
                        class="toc-slide border-t flex px-2 cursor-pointer hover:bg-gray-100"
                        :class="currentSlide === element ? 'bg-gray-100' : ''"
                        @click="selectSlide(index)"
                        :key="element.title + index"
                        v-tippy="{
                            delay: '200',
                            placement: 'right',
                            content: element.title,
                            animateFill: true
                        }"
                    >
                        <div class="self-center overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow ml-2">
                            {{ $t('editor.slides.slide') }} {{ index + 1 }}:
                            <span class="font-bold overflow-hidden">{{ element.title || 'Add a title' }}</span>
                        </div>
                        <div class="flex">
                            <div class="flex flex-col">
                                <button @click.stop="$vfm.open(`delete-slide-${index}`)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <path
                                            d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                        />
                                    </svg>
                                </button>
                                <button @click.stop="copySlide(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                        <path
                                            d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div class="flex flex-col mr-2 ml-1 my-1">
                                <button
                                    :class="index == 0 ? 'text-gray-500 cursor-not-allowed' : ''"
                                    @click.stop="moveUp(index)"
                                    :disabled="index == 0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="20" width="20">
                                        <path d="m2 16 8-12 8 12Z" />
                                    </svg>
                                </button>
                                <button
                                    class="rotate-180 transform"
                                    :class="index == slides.length - 1 ? 'text-gray-500 cursor-not-allowed' : ''"
                                    @click.stop="moveDown(index)"
                                    :disabled="index == slides.length - 1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="20" width="20">
                                        <path d="m2 16 8-12 8 12Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <confirmation-modal
                            :name="`delete-slide-${index}`"
                            :message="$t('editor.slides.deleteSlide.confirm', { title: element.title })"
                            @ok="removeSlide(index)"
                        />
                    </li>
                </template>
            </draggable>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import {
    BasePanel,
    ChartConfig,
    ChartPanel,
    ConfigFileStructure,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    Slide,
    SlideshowPanel,
    SourceCounts,
    TextPanel
} from '@/definitions';
import { VueFinalModal } from 'vue-final-modal';
import cloneDeep from 'clone-deep';
import draggable from 'vuedraggable';

import SlideEditorV from './slide-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Options({
    components: {
        'slide-editor': SlideEditorV,
        'confirmation-modal': ConfirmationModalV,
        'vue-final-modal': VueFinalModal,
        draggable
    }
})
export default class SlideTocV extends Vue {
    @Prop() slides!: Slide[];
    @Prop() currentSlide!: Slide | string;
    @Prop() slideIndex!: number;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;

    selectedForCopying = 0;

    selectSlide(index: number): void {
        this.$emit('slide-change', index);
    }

    addNewSlide(): void {
        this.slides.push({
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
        });
        this.selectSlide(this.slides.length - 1);
        this.$emit('slides-updated', this.slides);
    }

    copyFromOtherLang(slide: Slide | undefined): void {
        if (slide) {
            this.slides.splice(this.slides.length, 0, cloneDeep(slide));
            this.$emit('slides-updated', this.slides);
        }
    }

    copyAllFromOtherLang(slides: Slide[] | undefined): void {
        if (slides) {
            this.slides.splice(this.slides.length, 0, ...slides.map((slide) => cloneDeep(slide)));
            this.$emit('slides-updated', this.slides);
        }
    }

    copySlide(index: number): void {
        this.slides.splice(index + 1, 0, cloneDeep(this.slides[index]));
        this.$emit('slides-updated', this.slides);
    }

    removeSlide(index: number): void {
        if (index === this.slideIndex) {
            this.$emit('slide-change', -1);
        }

        // Before removing the slide, updated the sources for the panels.
        this.removeSourceCounts(index);

        this.slides.splice(index, 1);
        this.$emit('slides-updated', this.slides);
    }

    removeSourceCounts(deletedIndex: number): void {
        const panel = this.slides.find((slide: Slide, idx: number) => idx === deletedIndex)?.panel;
        panel?.forEach((p: BasePanel) => this.removeSourceHelper(p));
    }

    removeSourceHelper(panel: BasePanel): void {
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

            case 'slideshow': {
                const slideshowPanel = panel as SlideshowPanel;
                slideshowPanel.items.forEach((item: TextPanel | MapPanel | ChartPanel | ImagePanel) => {
                    this.removeSourceHelper(item);
                });
                break;
            }

            case 'dynamic': {
                const dynamicPanel = panel as DynamicPanel;
                dynamicPanel.children.forEach((subPanel: DynamicChildItem) => {
                    this.removeSourceHelper(subPanel.panel);
                });
                break;
            }

            case 'text': {
                break;
            }
        }
    }

    moveUp(index: number): void {
        this.moveDown(index - 1);
    }

    moveDown(index: number): void {
        this.slides.splice(index + 1, 0, this.slides.splice(index, 1)[0]);
        this.$emit('slides-updated', this.slides);
    }
}
</script>

<style lang="scss" scoped>
.toc-slide button {
    border: none !important;
    background: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

.toc-slide button:hover {
    background: none !important;
}

.copy-select {
    width: 450px;
}
</style>
