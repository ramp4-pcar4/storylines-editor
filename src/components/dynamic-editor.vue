<template>
    <div class="block mt-2">
        <!-- left and right panel buttons for dynamic panels -->
        <div class="flex">
            <button
                @click="() => changePanel('text')"
                class="editor-button rounded-none rounded-l border hover:bg-gray-100"
                :class="editingStatus === 'text' ? 'border-black font-bold' : 'border-gray-300'"
            >
                {{ $t('dynamic.textSection') }}
            </button>
            <button
                @click="() => changePanel('panels')"
                class="editor-button rounded-none rounded-r border hover:bg-gray-100"
                :class="editingStatus !== 'text' ? 'border-black font-bold' : 'border-gray-300'"
            >
                {{ $t('dynamic.panel.collection') }}
            </button>
        </div>
        <!-- Text Section -->
        <div v-if="editingStatus === 'text'">
            <component
                :is="'text-editor'"
                key="text"
                :panel="panel"
                :configFileStructure="configFileStructure"
                :lang="lang"
            ></component>
        </div>
        <div v-if="editingStatus === 'panels'">
            <table class="w-2/3 mt-5">
                <tr class="table-header">
                    <th>{{ $t('dynamic.panel.id') }}</th>
                    <th>{{ $t('dynamic.panel.type') }}</th>
                    <th>{{ $t('dynamic.panel.actions') }}</th>
                </tr>
                <tr class="table-contents" v-for="(item, idx) in panel.children" :key="idx">
                    <td>{{ item.id }}</td>
                    <td>{{ determineEditorType(item.panel) }}</td>
                    <td>
                        <span @click="() => switchSlide(idx)">{{ $t('editor.chart.label.edit') }}</span> |
                        <span @click="$vfm.open(`delete-item-${idx}`)">{{ $t('editor.remove') }}</span>
                    </td>

                    <confirmation-modal
                        :name="`delete-item-${idx}`"
                        :message="$t('dynamic.panel.remove')"
                        @ok="() => removeSlide(item as any, idx)"
                    />
                </tr>
                <tr class="table-add-row">
                    <td class="flex flex-col items-center">
                        <input
                            id="panelId"
                            class="editor-input"
                            type="text"
                            :placeholder="$t('dynamic.panel.enterID')"
                            v-model="newSlideName"
                            :aria-label="$t('dynamic.panel.enterID')"
                        />
                        <p v-if="idUsed">{{ $t('dynamic.panel.idTaken') }}</p>
                    </td>
                    <td>
                        <select v-model="newSlideType" class="editor-input rounded shadow">
                            <option v-for="thing in Object.keys(editors)" :key="thing">
                                {{ thing }}
                            </option>
                        </select>
                    </td>
                    <td>
                        <button class="editor-button" @click="createNewSlide" :disabled="idUsed || !newSlideName">
                            {{ $t('dynamic.panel.add') }}
                        </button>
                    </td>
                </tr>
            </table>

            <div v-if="editingSlide !== -1">
                <br />
                <hr />
                <br />
                <span class="font-bold text-xl">{{ $t('dynamic.panel.editor') }}</span
                ><br />
                <component
                    ref="slide"
                    :is="editors[determineEditorType(panel.children[editingSlide].panel)]"
                    :key="editingSlide + determineEditorType(panel.children[editingSlide].panel)"
                    :panel="panel.children[editingSlide].panel"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                    :sourceCounts="sourceCounts"
                    :centerSlide="centerSlide"
                    :dynamicSelected="dynamicSelected"
                    @slide-edit="$emit('slide-edit', 'Dynamic editor')"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                ></component>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
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
    SlideshowPanel,
    SourceCounts,
    TextPanel,
    VideoPanel
} from '@/definitions';

import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import VideoEditorV from './video-editor.vue';
import SlideshowEditorV from './slideshow-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Options({
    components: {
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'slideshow-editor': SlideshowEditorV,
        'dynamic-editor': DynamicEditorV,
        'map-editor': MapEditorV,
        'video-editor': VideoEditorV,
        'confirmation-modal': ConfirmationModalV
    }
})
export default class DynamicEditorV extends Vue {
    @Prop() panel!: DynamicPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() centerSlide!: boolean;
    @Prop() dynamicSelected!: boolean;

    editors: Record<string, string> = {
        text: 'text-editor',
        image: 'image-editor',
        slideshow: 'slideshow-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        video: 'video-editor'
    };

    startingConfig: DefaultConfigs = JSON.parse(JSON.stringify(BaseStartingConfig));

    editingStatus = 'text';
    editingSlide = -1;

    newSlideName = '';
    newSlideType = 'text';

    get idUsed(): boolean {
        return this.panel.children.some((ch: DynamicChildItem) => ch.id === this.newSlideName);
    }

    changePanel(target: string): void {
        if (this.editingStatus !== 'text') {
            this.saveChanges();
        }
        this.editingStatus = target;
    }

    switchSlide(idx: number): void {
        // Save slide changes if neccessary and switch to the newly selected slide.
        this.saveChanges();
        this.editingSlide = idx;
    }

    removeSlide(panel: BasePanel, index?: number): void {
        // Update source counts based on which panel is removed.
        switch (panel?.type) {
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

            case 'chart': {
                const chartPanel = panel as ChartPanel;
                this.sourceCounts[chartPanel.src] -= 1;
                if (this.sourceCounts[chartPanel.src] === 0) {
                    this.configFileStructure.zip.remove(`${chartPanel.src.substring(chartPanel.src.indexOf('/') + 1)}`);
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

            case 'slideshow': {
                const slideshowPanel = panel as SlideshowPanel;
                slideshowPanel.items.forEach((item: TextPanel | ImagePanel | MapPanel | ChartPanel) => {
                    this.removeSlide(item);
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
        }

        if (index !== undefined) {
            // Remove the panel itself.
            this.panel.children = this.panel.children.filter((panel: DynamicChildItem, idx: number) => idx !== index);

            // If the slide being removed is the currently selected slide, unselect it.
            if (this.editingSlide === index) {
                this.editingSlide = -1;
            }
        }
    }

    createNewSlide(): void {
        if (!this.newSlideName) return;

        const newConfig = {
            id: this.newSlideName,
            panel: JSON.parse(JSON.stringify(this.startingConfig[this.newSlideType as keyof DefaultConfigs]))
        };

        this.newSlideName = '';
        this.panel.children.push(newConfig);
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

    saveChanges(): void {
        if (
            this.$refs.slide !== undefined &&
            typeof (this.$refs.slide as ImageEditorV | ChartEditorV).saveChanges === 'function'
        ) {
            (this.$refs.slide as ImageEditorV | ChartEditorV).saveChanges();
        }
    }
}
</script>

<style lang="scss">
.table-header th {
    text-align: center;
    background-color: #ddd;
    padding: 5px;
}
.table-contents td {
    text-align: center;
    padding: 5px;
}
.table-contents:hover {
    background-color: #eee;
    cursor: pointer;
}
.table-add-row td {
    vertical-align: top;
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 5px;
}
.table-add-row input[type='text'],
.table-add-row select,
.table-add-row button {
    width: 150px !important;
    text-align: center;
    font-weight: normal;
    //border: 1px solid black;
    padding: 2px !important;
    margin-top: 0 !important;
}
</style>
