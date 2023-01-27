<template>
    <div class="flex-grow mx-5">
        <div v-if="currentSlide !== ''">
            <div class="flex">
                <div class="flex flex-col">
                    <label>Slide title:</label>
                    <input type="text" v-model="currentSlide.title" />
                </div>
                <span class="ml-auto"></span>
                <button>Previous Slide</button>
                <button>Next Slide</button>
            </div>
            <br />
            <div class="flex">
                <button @click="panelIndex = 0" :class="panelIndex == 0 ? 'font-extrabold' : ''">Left Panel</button>
                <button
                    @click="panelIndex = 1"
                    :class="panelIndex == 1 ? 'font-extrabold' : ''"
                    v-if="currentSlide.panel[panelIndex].type !== 'dynamic'"
                >
                    Right Panel
                </button>
            </div>
            <br />
            <div>
                <div class="flex">
                    <span class="font-bold text-xl">Content:</span>
                    <span class="ml-auto flex-grow"></span>
                    <div
                        v-if="panelIndex === 1 || currentSlide.panel[panelIndex].type === 'dynamic'"
                        class="flex flex-col"
                    >
                        <label class="text-left text-xl">Content type:</label>
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
        <div v-else>
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
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}

.table-of-contents-slide button {
    padding: 0;
    border: none;
}
</style>
