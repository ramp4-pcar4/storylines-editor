<template>
    <div class="sticky top-20 h-auto self-start flex-grow m-5">
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
                    <div class="flex mt-3">
                        <span class="mx-2 font-bold">Make the right panel the full slide</span>
                        <input
                            type="checkbox"
                            class="rounded-none cursor-pointer w-4 h-4"
                            v-model="rightOnly"
                            :disabled="rightOnly && currentSlide.panel[panelIndex].type === 'dynamic'"
                            @change.stop="$modals.show(`right-only-${slideIndex}`)"
                        />
                    </div>
                </div>
            </div>
            <br />
            <div class="flex border-b border-black" v-if="currentSlide.panel.length === 2">
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
            <div v-else class="border-b border-black">
                <button
                    @click="
                        () => {
                            saveChanges();
                        }
                    "
                    class="border-t border-l border-r border-black"
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
                                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </span>

                    <span class="align-middle inline-block pl-1">Fullscreen Panel</span>
                </button>
            </div>
            <div>
                <div class="flex mt-4">
                    <span class="font-bold text-xl">Content:</span>
                    <span class="ml-auto flex-grow"></span>
                    <div v-if="panelIndex === 1 || rightOnly" class="flex flex-col mr-8">
                        <label class="text-left text-lg">Content type:</label>
                        <select
                            ref="typeSelector"
                            @input="
                                newType = $event.target.value;
                                $modals.show(`change-slide-${slideIndex}`);
                            "
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
                    :sourceCounts="sourceCounts"
                ></component>
            </div>
        </div>
        <div v-else class="flex h-full mt-4 justify-center text-gray-600 text-xl">
            <span>Please select a slide to edit.</span>
        </div>
        <confirmation-modal
            :name="`change-slide-${slideIndex}`"
            :message="$t('editor.slides.changeSlide.confirm', { title: currentSlide.title })"
            @Ok="changePanelType(currentSlide.panel[panelIndex].type, newType)"
            @Cancel="cancelTypeChange"
        />
        <confirmation-modal
            :name="`right-only-${slideIndex}`"
            :message="$t('editor.slides.changeSlide.confirm', { title: currentSlide.title })"
            @Ok="toggleRightOnly()"
            @Cancel="rightOnly = !rightOnly"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { StoryRampConfig, DefaultConfigs, PanelType } from '@/definitions';

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import LoadingPageV from './helpers/loading-page.vue';
import DynamicEditorV from './dynamic-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Component({
    components: {
        spinner: Circle2,
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'loading-page': LoadingPageV,
        'dynamic-editor': DynamicEditorV,
        'confirmation-modal': ConfirmationModalV
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
    @Prop() sourceCounts!: any;

    $modals: any;

    panelIndex = 0;
    newType = '';
    rightOnly = false;

    editors = {
        text: 'text-editor',
        image: 'image-editor',
        slideshow: 'image-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        loading: 'loading-page',
        dynamic: 'dynamic-editor'
    };

    @Watch('currentSlide', { deep: true })
    onSlideChange(): void {
        this.currentSlide ? (this.rightOnly = this.currentSlide.panel.length === 1) : false;
    }

    changePanelType(prevType: string, newType: string): void {
        const startingConfig: DefaultConfigs = {
            text: {
                type: PanelType.Text,
                title: '',
                content: ''
            },
            dynamic: {
                type: PanelType.Dynamic,
                title: this.currentSlide.panel[0] && prevType === 'text' ? this.currentSlide.panel[0].title : '',
                titleTag: '',
                content: this.currentSlide.panel[0] && prevType === 'text' ? this.currentSlide.panel[0].content : '',
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

        // Before swapping panel type, update sources from the to-be-deleted config.
        this.currentSlide.panel.forEach((panel: any) => this.removeSourceCounts(panel));

        // When switching to a dynamic panel, remove the secondary panel.
        if (newType === 'dynamic') {
            this.panelIndex = 0;
            Vue.set(this.currentSlide, 'panel', [startingConfig[newType as keyof DefaultConfigs]]);
        } else {
            // Switching panel type when dynamic panels are not involved.
            Vue.set(this.currentSlide.panel, this.panelIndex, startingConfig[newType as keyof DefaultConfigs]);
        }
    }

    removeSourceCounts(panel: any): void {
        // The provided panel is being removed. Update source counts accordingly.
        switch (panel.type) {
            case 'map':
                this.sourceCounts[panel.config] -= 1;
                if (this.sourceCounts[panel.config] === 0) {
                    this.configFileStructure.zip.remove(`${panel.config.substring(panel.config.indexOf('/') + 1)}`);
                }
                break;

            case 'chart':
                panel.charts.forEach((chart: any) => {
                    this.sourceCounts[chart.src] -= 1;
                    if (this.sourceCounts[chart.src] === 0) {
                        this.configFileStructure.zip.remove(`${chart.src.substring(chart.src.indexOf('/') + 1)}`);
                    }
                });
                break;

            case 'slideshow':
                panel.images.forEach((image: any) => {
                    this.sourceCounts[image.src] -= 1;
                    if (this.sourceCounts[image.src] === 0) {
                        this.configFileStructure.zip.remove(`${image.src.substring(image.src.indexOf('/') + 1)}`);
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

    saveChanges(): void {
        if (this.$refs.editor !== undefined && typeof (this.$refs.editor as any).saveChanges === 'function') {
            (this.$refs.editor as any).saveChanges();
        }
    }

    selectSlide(index: number): void {
        this.$emit('slide-change', index);
    }

    cancelTypeChange(): void {
        (this.$refs.typeSelector as HTMLSelectElement).value = this.currentSlide.panel[this.panelIndex].type;
    }

    toggleRightOnly(): void {
        this.saveChanges();
        if (this.rightOnly) {
            this.panelIndex = 0;
            Vue.set(this.currentSlide, 'panel', [this.currentSlide.panel[1]]);
        } else {
            Vue.set(this.currentSlide, 'panel', [
                Object.assign(
                    {},
                    {
                        type: PanelType.Text,
                        title: '',
                        content: ''
                    }
                ),
                Object.assign({}, this.currentSlide.panel[0])
            ]);
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    margin-left: 0.5rem;
}

input[type='checkbox']:checked {
    accent-color: black;
    color: white;
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
