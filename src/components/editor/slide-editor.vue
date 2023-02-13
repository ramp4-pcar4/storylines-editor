<template>
    <div class="flex-grow m-5">
        <div v-if="currentSlide !== ''">
            <div class="flex">
                <div class="flex flex-col">
                    <label>Slide title:</label>
                    <div class="flex">
                        <input type="text" v-model="currentSlide.title" class="w-2/3" />
                        <span class="ml-auto"></span>
                        <button
                            @click.stop="selectSlide(slideIndex - 1)"
                            :disabled="slideIndex === 0"
                            class="border border-black"
                        >
                            Previous Slide
                        </button>
                        <button
                            @click.stop="selectSlide(slideIndex + 1)"
                            :disabled="isLast"
                            class="border border-black"
                        >
                            Next Slide
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div class="flex border-b border-black">
                <button
                    @click="
                        () => {
                            panelIndex = 0;
                            saveChanges();
                        }
                    "
                    class="border-t border-l border-r"
                    :class="panelIndex == 0 ? 'border-black' : 'border-white'"
                >
                    <span class="align-middle inline-block">
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
                    </span>
                    <span class="align-middle inline-block">
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
                    </span>
                    <span class="align-middle inline-block pl-1">Left Panel</span>
                </button>
                <button
                    @click="
                        () => {
                            panelIndex = 1;
                            saveChanges();
                        }
                    "
                    class="border-t border-l border-r"
                    :class="panelIndex == 1 ? 'border-black' : 'border-white'"
                    v-if="currentSlide.panel[panelIndex].type !== 'dynamic'"
                >
                    <span class="align-middle inline-block">
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
                    </span>
                    <span class="align-middle inline-block">
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
                    </span>

                    <span class="align-middle inline-block pl-1">Right Panel</span>
                </button>
            </div>
            <div>
                <div class="flex mt-4">
                    <span class="font-bold text-xl">Content:</span>
                    <span class="ml-auto flex-grow"></span>
                    <div
                        v-if="panelIndex === 1 || currentSlide.panel[panelIndex].type === 'dynamic'"
                        class="flex flex-col mr-8"
                    >
                        <label class="text-left text-lg">Content type:</label>
                        <select
                            @change="changePanelType(currentSlide.panel[panelIndex].type, $event.target.value)"
                            :value="currentSlide.panel[panelIndex].type"
                        >
                            <option
                                v-for="thing in Object.keys(editors).filter(
                                    (editor) => editor !== 'slideshow' && editor !== 'loading'
                                )"
                                :key="thing"
                                :value="thing === 'image' ? 'slideshow' : thing"
                            >
                                {{ thing }}
                            </option>
                        </select>
                    </div>
                </div>
                <component
                    ref="editor"
                    :is="editors[currentSlide.panel[panelIndex].type]"
                    :key="panelIndex + currentSlide.panel[panelIndex].type"
                    :panel="currentSlide.panel[panelIndex]"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                    :uid="uid"
                ></component>
            </div>
        </div>
        <div v-else class="flex h-full mt-4 justify-center text-gray-600 text-xl">
            <span>Please select a slide to edit.</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { StoryRampConfig, DefaultConfigs, PanelType } from '@/definitions';

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import LoadingPageV from './helpers/loading-page.vue';
import DynamicEditorV from './dynamic-editor.vue';

@Component({
    components: {
        spinner: Circle2,
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'loading-page': LoadingPageV,
        'dynamic-editor': DynamicEditorV
    }
})
export default class SlideEditorV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    @Prop() currentSlide!: any;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;
    @Prop() uid!: string;
    @Prop() slideIndex!: number;
    @Prop() isLast!: number;

    panelIndex = 0;

    editors = {
        text: 'text-editor',
        image: 'image-editor',
        slideshow: 'image-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        loading: 'loading-page',
        dynamic: 'dynamic-editor'
    };

    changePanelType(prevType: string, newType: string): void {
        if (confirm(this.$t('editor.slides.changeSlide.confirm') as string)) {
            const startingConfig: DefaultConfigs = {
                text: {
                    type: PanelType.Text,
                    title: '',
                    content: ''
                },
                dynamic: {
                    type: PanelType.Dynamic,
                    title: '',
                    titleTag: '',
                    content: '',
                    children: []
                },
                slideshow: {
                    type: PanelType.Slideshow,
                    images: []
                },
                chart: {
                    type: PanelType.Chart,
                    charts: []
                },
                map: {
                    type: PanelType.Map,
                    config: '',
                    title: '',
                    scrollguard: false
                }
            };

            // When switching to a dynamic panel, remove the secondary panel.
            if (newType === 'dynamic') {
                this.panelIndex = 0;
                Vue.set(this.currentSlide, 'panel', [startingConfig[newType as keyof DefaultConfigs]]);
            } else {
                // When switching from a dynamic panel, add back the secondary panel.
                if (prevType === 'dynamic') {
                    Vue.set(this.currentSlide, 'panel', [
                        Object.assign({}, startingConfig['text' as keyof DefaultConfigs]),
                        Object.assign({}, startingConfig[newType as keyof DefaultConfigs])
                    ]);
                } else {
                    // Switching panel type when dynamic panels are not involved.
                    Vue.set(this.currentSlide.panel, this.panelIndex, startingConfig[newType as keyof DefaultConfigs]);
                }
            }
        }
    }

    saveChanges(): void {
        if (this.$refs.editor !== undefined && typeof (this.$refs.editor as any).saveChanges === 'function') {
            (this.$refs.editor as any).saveChanges();
        }
    }

    selectSlide(index: number): void {
        this.$emit('slide-change', index);
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    margin-left: 0.5rem;
}

select {
    border: 1px black solid;
    background: white;
    padding: 0.25rem 0.5rem;
}

.table-of-contents-slide button {
    padding: 0;
    border: none;
}
</style>
