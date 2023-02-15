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
                    <button @click.stop="removeSlide(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path
                                d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                            />
                        </svg>
                    </button>
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
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

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
    @Prop() currentSlide!: any;
    @Prop() slideIndex!: number;
    total = 0;

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

    removeSlide(index: number): void {
        if (confirm(this.$t('editor.slides.deleteSlide.confirm') as string)) {
            if (index === this.slideIndex) {
                this.$emit('slide-change', -1);
            }
            this.slides.splice(index, 1);
            this.$emit('slides-updated', this.slides);
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
