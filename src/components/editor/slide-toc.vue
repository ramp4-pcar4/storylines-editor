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
        </div>
        <ul>
            <draggable :list="slides" @update="$emit('slides-updated', slides)">
                <li
                    class="toc-slide border-t flex px-2 cursor-pointer hover:bg-gray-100"
                    :class="currentSlide === slide ? 'bg-gray-100' : ''"
                    @click="selectSlide(index)"
                    v-for="(slide, index) in slides"
                    :key="slide.title + index"
                >
                    <tippy delay="200" placement="right">{{ slide.title }}</tippy>
                    <div class="self-center overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow ml-2">
                        Slide {{ index + 1 }}: <span class="font-bold overflow-hidden">{{ slide.title || '' }}</span>
                    </div>
                    <div class="flex">
                        <div class="flex flex-col">
                            <button @click.stop="$modals.show(`delete-slide-${index}`)">
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
                        :message="$t('editor.slides.deleteSlide.confirm', { title: slide.title })"
                        @Ok="removeSlide(index)"
                    />
                </li>
            </draggable>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import cloneDeep from 'clone-deep';
import draggable from 'vuedraggable';

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import SlideEditorV from './slide-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Component({
    components: {
        spinner: Circle2,
        'slide-editor': SlideEditorV,
        'confirmation-modal': ConfirmationModalV,
        draggable
    }
})
export default class SlideTocV extends Vue {
    @Prop() slides!: any[];
    @Prop() currentSlide!: any;
    @Prop() slideIndex!: number;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;
    @Prop() sourceCounts!: any;

    total = 0;
    $modals: any;

    selectSlide(index: number): void {
        this.$emit('slide-change', index);
    }

    addNewSlide(): void {
        this.slides.push({
            title: `Untitled${this.total ? '(' + this.total + ')' : ''}`,
            panel: [
                {
                    type: 'text',
                    title: '',
                    content: ''
                },
                {
                    type: 'text',
                    title: '',
                    content: ''
                }
            ]
        });
        this.$emit('slides-updated', this.slides);
        this.total++;
    }

    copySlide(index: number): void {
        this.slides.splice(index + 1, 0, cloneDeep(this.slides[index]));
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
        const panel = this.slides.find((panel: any, idx: number) => idx === deletedIndex).panel;
        panel.forEach((p: any) => this.removeSourceHelper(p));
    }

    removeSourceHelper(panel: any): void {
        // The provided panel is being removed. Update source counts accordingly.
        switch (panel.type) {
            case 'map':
                this.sourceCounts[panel.config] -= 1;
                if (this.sourceCounts[panel.config] === 0) {
                    this.configFileStructure.config.remove(`${panel.config.substring(panel.config.indexOf('/') + 1)}`);
                }
                break;

            case 'chart':
                panel.charts.forEach((chart: any) => {
                    this.sourceCounts[chart.src] -= 1;
                    if (this.sourceCounts[chart.src] === 0) {
                        this.configFileStructure.config.remove(`${chart.src.substring(chart.src.indexOf('/') + 1)}`);
                    }
                });
                break;

            case 'slideshow':
                panel.images.forEach((image: any) => {
                    this.sourceCounts[image.src] -= 1;
                    if (this.sourceCounts[image.src] === 0) {
                        this.configFileStructure.config.remove(`${image.src.substring(image.src.indexOf('/') + 1)}`);
                    }
                });
                break;

            case 'dynamic':
                panel.children.forEach((subPanel: any) => {
                    this.removeSourceCounts(subPanel.panel);
                });
                break;
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
</style>
