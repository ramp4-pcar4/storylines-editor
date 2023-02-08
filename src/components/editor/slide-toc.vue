<template>
    <div>
        <div class="flex">
            <span>{{ $t('editor.slides.title') }}</span>
            <span class="ml-auto"></span>
            <button v-on:click="addNewSlide">{{ $t('editor.slides.addSlide') }}</button>
        </div>
        <ul>
            <li class="flex toc-slide" v-for="(slide, index) in slides" :key="slide.title + index">
                <div class="flex" @click="selectSlide(index)">
                    <span class="self-center w-44 overflow-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0"
                        >Slide {{ index + 1 }}: {{ slide.title | '' }}</span
                    >
                    <span class="ml-auto flex-grow"></span>
                    <div class="flex flex-col">
                        <button @click.stop="removeSlide(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path
                                    d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z"
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
                    <div class="flex flex-col">
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
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import cloneDeep from 'clone-deep';

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import SlideEditorV from './slide-editor.vue';

@Component({
    components: {
        spinner: Circle2,
        'slide-editor': SlideEditorV
    }
})
export default class SlideTocV extends Vue {
    @Prop() slides!: any[];
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;

    slideIndex: number | undefined = undefined;

    selectSlide(index: number): void {
        this.slideIndex = index;
        this.$emit('slide-change', this.slideIndex);
    }

    addNewSlide(): void {
        this.slides.push({
            title: 'New Slide',
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
    }

    copySlide(index: number): void {
        this.slides.splice(index + 1, 0, cloneDeep(this.slides[index]));
    }

    removeSlide(index: number): void {
        if (confirm(this.$t('editor.slides.deleteSlide.confirm') as string)) {
            if (index === this.slideIndex) {
                this.slideIndex = undefined;
                this.$emit('slide-change', this.slideIndex);
            }
            this.slides.splice(index, 1);
        }
    }

    moveUp(index: number): void {
        this.moveDown(index - 1);
    }

    moveDown(index: number): void {
        this.slides.splice(index + 1, 0, this.slides.splice(index, 1)[0]);
    }
}
</script>

<style lang="scss" scoped>
.toc-slide button {
    border: none !important;
    padding: 0 !important;
}
</style>
