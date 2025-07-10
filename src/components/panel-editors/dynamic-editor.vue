<template>
    <div class="block mt-6">
        <!-- left and right panel buttons for dynamic panels -->
        <div class="flex gap-2 border-b pb-1 px-1.5" style="border-color: rgba(209, 213, 219, 1)">
            <button
                @click="() => changePanel('text')"
                class="respected-standard-button respected-transparent-button respected-thin-button"
                :class="editingStatus === 'text' ? 'bg-gray-200' : ''"
                :style="editingStatus === 'text' ? 'font-weight: bold' : ''"
            >
                {{ $t('dynamic.textSection') }}
            </button>
            <button
                @click="() => changePanel('panels')"
                class="respected-standard-button respected-transparent-button respected-thin-button"
                :class="editingStatus !== 'text' ? 'bg-gray-200' : ''"
                :style="editingStatus !== 'text' ? 'font-weight: bold' : ''"
            >
                {{ $t('dynamic.panel.collection') }}
            </button>
        </div>
        <!-- Text Section -->
        <div v-if="editingStatus === 'text'">
            <component :is="'text-editor'" key="text" :panel="panel" :lang="lang"></component>
        </div>
        <div v-if="editingStatus === 'panels'">
            <table style="width: 66.66%; min-width: 500px" class="mt-5">
                <tr class="table-header">
                    <th>{{ $t('dynamic.panel.id') }}</th>
                    <th>{{ $t('dynamic.panel.type') }}</th>
                    <th>{{ $t('dynamic.panel.actions') }}</th>
                </tr>
                <tr class="table-contents" v-for="(item, idx) in panel.children" :key="idx">
                    <td>{{ item.id }}</td>
                    <td>{{ determineEditorType(item.panel) }}</td>
                    <td>
                        <button @click="() => switchSlide(idx)">{{ $t('editor.chart.label.edit') }}</button> |
                        <button @click="$vfm.open(`delete-item-${idx}`)">{{ $t('editor.remove') }}</button>
                    </td>

                    <confirmation-modal
                        :name="`delete-item-${idx}`"
                        :message="$t('dynamic.panel.remove')"
                        @ok="() => removeSlide(item.panel as any, idx)"
                    />
                </tr>
                <tr class="table-add-row">
                    <td class="flex flex-col items-center">
                        <input
                            id="panelId"
                            class="respected-standard-input"
                            type="text"
                            :placeholder="$t('dynamic.panel.enterID')"
                            v-model="newSlideName"
                            :aria-label="$t('dynamic.panel.enterID')"
                        />
                        <p v-if="idUsed">{{ $t('dynamic.panel.idTaken') }}</p>
                    </td>
                    <td>
                        <select v-model="newSlideType" class="respected-standard-select justify-self-center">
                            <option v-for="thing in Object.keys(editors)" :key="thing">
                                {{ thing }}
                            </option>
                        </select>
                    </td>
                    <td>
                        <button
                            class="respected-standard-button respected-gray-border-button respected-thin-button justify-self-center"
                            @click="createNewSlide"
                            :disabled="idUsed || !newSlideName"
                        >
                            {{ $t('dynamic.panel.add') }}
                        </button>
                    </td>
                </tr>
            </table>

            <div v-if="editingSlide !== -1" :style="{ display: editingMode ? 'block' : 'none' }">
                <br />
                <hr />
                <br />
                <div>
                    <button
                        class="respected-standard-button respected-black-bg-button"
                        @click="switchSlide(-1)"
                        :aria-label="$t('editor.done')"
                    >
                        {{ $t('editor.done') }}
                    </button>
                </div>
                <component
                    ref="slide"
                    :is="editors[determineEditorType(panel.children[editingSlide].panel)]"
                    :key="editingSlide + determineEditorType(panel.children[editingSlide].panel)"
                    :panel="panel.children[editingSlide].panel"
                    :lang="lang"
                    :centerSlide="centerSlide"
                    :dynamicSelected="dynamicSelected"
                    @slide-edit="$emit('slide-edit', 'Dynamic editor')"
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
    DefaultConfigs,
    DynamicChildItem,
    DynamicPanel,
    PanelType
} from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';

import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import VideoEditorV from './video-editor.vue';
import SlideshowEditorV from './slideshow-editor.vue';
import ConfirmationModalV from '../support/confirmation-modal.vue';
import { useProductStore } from '@/stores/productStore';

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
    @Prop() lang!: string;
    @Prop() centerSlide!: boolean;
    @Prop() dynamicSelected!: boolean;

    productStore = useProductStore();

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
    editingMode = false;
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
        if (idx === -1 && this.editingSlide !== -1) {
            // user pressed Done, so apply styles to the last active slide
            const editedPanel = this.panel.children[this.editingSlide].panel;
            applyTextAlign(editedPanel, this.centerSlide, this.dynamicSelected);
            this.editingMode = false;
        } else {
            // Save slide changes if neccessary and switch to the newly selected slide.
            this.saveChanges();
            this.editingMode = true;
            this.editingSlide = idx;
        }
    }

    removeSlide(panel: BasePanel, index?: number): void {
        // Update source counts based on which panel is removed.
        this.productStore.removeSourceCounts(panel);

        if (index !== undefined) {
            // Remove the panel itself.
            this.panel.children = this.panel.children.filter((panel: DynamicChildItem, idx: number) => idx !== index);

            // If the slide being removed is the currently selected slide, unselect it.
            if (this.editingSlide === index) {
                this.editingSlide = -1;
            }
        }
        this.editingMode = false;
    }

    createNewSlide(): void {
        if (!this.newSlideName) return;

        const newConfig = {
            id: this.newSlideName,
            panel: JSON.parse(JSON.stringify(this.startingConfig[this.newSlideType as keyof DefaultConfigs]))
        };
        this.editingSlide = this.panel.children.length;
        this.editingMode = false;
        this.newSlideName = '';
        this.panel.children.push(newConfig);
    }

    determineEditorType(panel: BasePanel): string {
        // Determine whether the slideshow consists of only charts. If so, display the chart editor.
        if (panel.type === 'slideshowChart') return PanelType.Chart;

        // Determine whether the slideshow consists of only images. If so, display the image editor.
        if (panel.type === 'slideshowImage') return PanelType.Image;

        if (panel.type !== PanelType.Slideshow) return panel.type;

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
