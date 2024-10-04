<template>
    <div class="overflow-y-auto top-20 h-auto self-start flex-grow p-5">
        <div v-if="!!currentSlide">
            <div class="flex">
                <div class="flex flex-col w-full">
                    <h2 class="font-bold mb-3">{{ $t('editor.slides.currentLangLabel', { lang: langTranslate }) }}</h2>
                    <label class="editor-label" for="slideTitle">{{ $t('editor.slides.slideTitle') }}:</label>
                    <div class="flex">
                        <input
                            type="text"
                            id="slideTitle"
                            v-model="currentSlide.title"
                            :placeholder="$t('editor.slides.addSlideTitle')"
                            class="editor-input w-2/3"
                        />
                        <span class="ml-auto"></span>
                        <button
                            @click.stop="selectSlide(slideIndex - 1)"
                            :disabled="slideIndex === 0"
                            class="editor-button border border-black"
                        >
                            {{ $t('editor.slides.previousSlide') }}
                        </button>
                        <button
                            @click.stop="selectSlide(slideIndex + 1)"
                            :disabled="isLast"
                            class="editor-button border border-black"
                        >
                            {{ $t('editor.slides.nextSlide') }}
                        </button>
                    </div>
                    <div class="flex mt-3">
                        <label class="ml-0" for="fullSlide">
                            <span class="mr-2 font-bold">{{ $t('editor.slides.makeFull') }}</span>
                        </label>
                        <input
                            type="checkbox"
                            id="fullSlide"
                            class="editor-input rounded-none cursor-pointer w-4 h-4"
                            v-model="rightOnly"
                            :disabled="rightOnly && determineEditorType(currentSlide.panel[panelIndex]) === 'dynamic'"
                            @change.stop="
                                if (currentSlide.panel.length > 1 && panelModified(currentSlide.panel[0])) {
                                    $vfm.open(`right-only-${slideIndex}`);
                                } else {
                                    toggleRightOnly();
                                }
                            "
                        />
                        <label class="ml-0" for="centerSlide">
                            <span class="mr-2 font-bold">{{ $t('editor.slides.centerSlide') }}</span>
                        </label>
                        <input
                            type="checkbox"
                            id="centerSlide"
                            class="editor-input rounded-none cursor-pointer w-4 h-4"
                            v-model="centerSlide"
                            :disabled="centerPanel"
                            @change.stop="toggleCenterSlide()"
                        />
                        <label class="ml-0" for="centerPanel">
                            <span class="mr-2 font-bold">{{ $t('editor.slides.centerPanel') }}</span>
                        </label>
                        <input
                            type="checkbox"
                            id="centerPanel"
                            class="editor-input rounded-none cursor-pointer w-4 h-4"
                            v-model="centerPanel"
                            :disabled="centerSlide"
                            @change.stop="toggleCenterPanel()"
                        />
                        <label class="ml-0" for="inToc">
                            <span class="mx-2 font-bold"> {{ $t('editor.slides.includeInToc') }}</span>
                        </label>
                        <input
                            type="checkbox"
                            id="inToc"
                            class="editor-input rounded-none cursor-pointer w-4 h-4"
                            v-model="includeInToc"
                            @change.stop="toggleIncludeInToc()"
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
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="editor-button border-t border-l border-r"
                    :class="panelIndex == 0 && !advancedEditorView ? 'border-black' : 'border-white'"
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
                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.leftPanel') }}</span>
                </button>
                <button
                    @click="
                        () => {
                            panelIndex = 1;
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="editor-button border-t border-l border-r"
                    :class="panelIndex == 1 && !advancedEditorView ? 'border-black' : 'border-white'"
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

                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.rightPanel') }}</span>
                </button>
                <button
                    @click="
                        () => {
                            panelIndex = 0;
                            advancedEditorView = true;
                            saveChanges();
                        }
                    "
                    class="editor-button border-t border-l border-r"
                    :class="advancedEditorView ? 'border-black' : 'border-white'"
                >
                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.advanced') }}</span>
                </button>
            </div>
            <div v-else class="border-b border-black">
                <button
                    @click="
                        () => {
                            advancedEditorView = false;
                            saveChanges();
                        }
                    "
                    class="editor-button border-t border-l border-r"
                    :class="!advancedEditorView ? 'border-black' : 'border-white'"
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

                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.fullscreenPanel') }}</span>
                </button>
                <button
                    @click="
                        () => {
                            advancedEditorView = true;
                            saveChanges();
                        }
                    "
                    class="editor-button border-t border-l border-r"
                    :class="advancedEditorView ? 'border-black' : 'border-white'"
                >
                    <span class="align-middle inline-block pl-1">{{ $t('editor.slides.advanced') }}</span>
                </button>
            </div>
            <div>
                <div class="flex mt-4">
                    <span class="font-bold text-xl">{{ $t('editor.slides.content') }}:</span>
                    <span class="ml-auto flex-grow"></span>
                    <div v-if="!advancedEditorView" class="flex flex-col mr-8">
                        <label class="editor-label text-left text-lg" for="contentTypeSelect"
                            >{{ $t('editor.slides.contentType') }}:</label
                        >
                        <select
                            id="contentTypeSelect"
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
                                {{ thing }}
                            </option>
                        </select>
                    </div>
                </div>
                <custom-editor
                    ref="editor"
                    :config="currentSlide"
                    @slide-edit="$emit('slide-edit')"
                    @config-edited="(slideConfig: Slide, save?: boolean = false) => $emit('custom-slide-updated', slideConfig, save)"
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
                    @slide-edit="(changedFromDefault: boolean = true) => {
                        $emit('slide-edit');

                        // changedFromDefault should hold a boolean indicating whether the panel is actually modified 
                        // (different from initial state). Only needed for some multimedia editors; text editors
                        // write directly to currentSlide constantly, which is handled by panelModified().
                        currentSlide.panel[panelIndex].modified = changedFromDefault || undefined;
                    }
                    "
                    v-else
                ></component>
            </div>
        </div>
        <div v-else class="flex h-full mt-4 justify-center text-gray-600 text-xl">
            <span>{{ $t('editor.slides.select') }}</span>
        </div>
        <confirmation-modal
            :name="`change-slide-${slideIndex}`"
            :message="
                $t('editor.slides.changeSlide.confirm', {
                    title: currentSlide.title
                })
            "
            @ok="
                changePanelType(determineEditorType(currentSlide.panel[panelIndex]), newType);
                toggleCenterPanel();
                toggleCenterSlide();
            "
            @Cancel="cancelTypeChange"
        />
        <confirmation-modal
            :name="`right-only-${slideIndex}`"
            :message="
                $t('editor.slides.changeSlide.confirm', {
                    title: currentSlide.title
                })
            "
            @ok="toggleRightOnly()"
            @Cancel="rightOnly = !rightOnly"
        />
    </div>
</template>

<script lang="ts">
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
    SlideshowPanel,
    SourceCounts,
    StoryRampConfig,
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

    panelIndex = 0;
    advancedEditorView = false;
    newType = '';
    rightOnly = false;
    centerSlide = false;
    centerPanel = false;
    includeInToc = true;
    dynamicSelected = false;

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
        this.langTranslate = this.$t(`editor.lang.${this.lang}`);
        this.currentSlide ? (this.rightOnly = this.currentSlide.panel.length === 1) : false;
        this.centerPanel = this.currentSlide.centerPanel ?? false;
        this.centerSlide = this.currentSlide.centerSlide ?? false;
        this.includeInToc = this.currentSlide.includeInToc ?? true;
        this.rightOnly = this.currentSlide.rightOnly ?? false;
    }

    /**
     * Determines whether a given panel has been modified from the default configuration of its type.
     * Note that some editors (e.g. text) write directly to currentSlide after each change,
     * while other editors (e.g. image) do not. The first type is handled completely in
     * panelModified; the second type requires you to set `panel.modified` for the given panel beforehand,
     * indicating whether changes have been made from the specific editor sub-component (see
     * `<component>`'s `@slide-edit` event handler).
     * @param {BasePanel} panel The panel to analyze.
     * @returns {boolean} Whether panel has been modified.
     */
    panelModified(panel: BasePanel): boolean {
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

        return (
            JSON.stringify(oldStartingConfig) !== JSON.stringify(newConfig) ||
            this.currentSlide.panel[this.panelIndex].modified === true
        );
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

            case 'slideshow': {
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

    selectSlide(index: number): void {
        this.$emit('slide-change', index);
    }

    cancelTypeChange(): void {
        (this.$refs.typeSelector as HTMLSelectElement).value = this.determineEditorType(
            this.currentSlide.panel[this.panelIndex]
        );
    }

    determineEditorType(panel: BasePanel): string {
        if (panel.type !== PanelType.Slideshow) return panel.type;
        if ((panel as SlideshowPanel).items.length === 0 || (panel as SlideshowPanel).userCreated)
            return PanelType.Slideshow;

        // Determine whether the slideshow consists of only charts. If so, display the chart editor.
        const allCharts = (panel as SlideshowPanel).items.every((item: BasePanel) => item.type === PanelType.Chart);
        if (allCharts) return PanelType.Chart;

        // Determine whether the slideshow consists of only images. If so, display the image editor.
        const allImages = (panel as SlideshowPanel).items.every((item: BasePanel) => item.type === PanelType.Image);
        if (allImages) return PanelType.Image;

        // Otherwise display the slideshow editor.
        return PanelType.Slideshow;
    }

    toggleRightOnly(): void {
        this.currentSlide.rightOnly = this.rightOnly;
        this.saveChanges();
        if (this.rightOnly) {
            this.panelIndex = 0;
            this.currentSlide['panel'] = [this.currentSlide.panel[1]];
        } else {
            this.currentSlide['panel'] = [
                Object.assign(
                    {},
                    {
                        type: PanelType.Text,
                        title: '',
                        content: ''
                    }
                ),
                Object.assign({}, this.currentSlide.panel[0])
            ];
        }
    }

    toggleCenterSlide(): void {
        this.currentSlide.centerSlide = this.centerSlide;
        if (this.determineEditorType(this.currentSlide.panel[this.panelIndex]) === 'dynamic') {
            if (this.centerSlide) {
                this.currentSlide.panel[0].customStyles = 'text-align: right;';
            } else {
                this.currentSlide.panel[0].customStyles = (this.currentSlide.panel[0].customStyles || '').replace(
                    'text-align: right;',
                    ''
                );
            }
        } else if (this.rightOnly) {
            if (this.centerSlide) {
                this.currentSlide.panel[0].customStyles = 'text-align: center;';
            } else {
                this.currentSlide.panel[0].customStyles = (this.currentSlide.panel[0].customStyles || '').replace(
                    'text-align: right;',
                    ''
                );
                this.currentSlide.panel[0].customStyles = (this.currentSlide.panel[0].customStyles || '').replace(
                    'text-align: left;',
                    ''
                );
                this.currentSlide.panel[0].customStyles = (this.currentSlide.panel[0].customStyles || '').replace(
                    'text-align: center;',
                    ''
                );
            }
        } else {
            if (this.centerSlide) {
                this.currentSlide.panel[0].customStyles = 'text-align: right;';
                this.currentSlide.panel[1].customStyles = 'text-align: left;';
            } else {
                this.currentSlide.panel[0].customStyles = (this.currentSlide.panel[0].customStyles || '').replace(
                    'text-align: right;',
                    ''
                );
                this.currentSlide.panel[1].customStyles = (this.currentSlide.panel[1].customStyles || '').replace(
                    'text-align: left;',
                    ''
                );
            }
        }
    }

    toggleCenterPanel(): void {
        this.currentSlide.centerPanel = this.centerPanel;
        if (this.centerPanel) {
            for (const p in this.currentSlide.panel) {
                this.currentSlide.panel[p].customStyles = 'text-align: center;';
            }
        } else {
            for (const p in this.currentSlide.panel) {
                this.currentSlide.panel[p].customStyles = (this.currentSlide.panel[p].customStyles || '').replace(
                    'text-align: center;',
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
