<template>
    <div class="block mt-6">
        <!-- Section selection header buttons -->
        <div class="flex gap-2 border-b pb-1 px-1.5" style="border-color: rgba(209, 213, 219, 1)">
            <!-- Text section button -->
            <button
                @click="() => changePanel('text')"
                :aria-label="$t('dynamic.textSection')"
                class="respected-standard-button respected-transparent-button respected-thin-button"
                :class="editingStatus === 'text' ? 'bg-gray-200' : ''"
                :style="editingStatus === 'text' ? 'font-weight: bold' : ''"
            >
                {{ $t('dynamic.textSection') }}
            </button>
            <!-- Panel collection button -->
            <button
                @click="() => changePanel('panels')"
                :aria-label="$t('dynamic.panel.collection') + ` (${panel.children.length})`"
                class="respected-standard-button respected-transparent-button respected-thin-button"
                :class="editingStatus !== 'text' ? 'bg-gray-200' : ''"
                :style="editingStatus !== 'text' ? 'font-weight: bold' : ''"
            >
                {{ $t('dynamic.panel.collection') + ` (${panel.children.length})` }}
            </button>
        </div>
        <!-- Text Section -->
        <div v-if="editingStatus === 'text'">
            <component :is="'text-editor'" key="text" :panel="panel" :lang="lang"></component>
        </div>
        <!-- Panel section -->
        <div v-if="editingStatus === 'panels'">
            <div class="w-full lg:w-4/5 max-h-96 overflow-y-auto mt-5 border border-gray-400 rounded-md">
                <!-- Panel collection table -->
                <table class="w-full border-separate">
                    <thead class="bg-white sticky top-0" style="z-index: 5">
                        <tr style="top: 2px; z-index: 6" class="table-header sticky">
                            <!-- Header: Move panel buttons -->
                            <th
                                style="width: 10%; text-align: left !important"
                                class="rounded-tl"
                                :aria-label="$t('editor.slideshow.label.slideNumber')"
                            ></th>
                            <!-- Header: Panel # and ID -->
                            <th style="width: 40%; text-align: left !important" :aria-label="$t('dynamic.panel.id')">
                                <span class="mx-2">{{ $t('dynamic.panel.id') }}</span>
                            </th>
                            <!-- Header: Panel type -->
                            <th style="width: 20%; text-align: left !important">
                                <span class="mx-2">{{ $t('dynamic.panel.type') }}</span>
                            </th>
                            <!-- Header: Panel actions -->
                            <th style="width: 30%; text-align: left !important" class="rounded-tr">
                                <span class="mx-2">{{ $t('dynamic.panel.actions') }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="table-contents"
                            v-for="(item, idx) in panel.children"
                            :key="idx"
                            :class="{
                                'bg-gray-100': idx % 2 !== 0,
                                'bg-blue-200 hover-editing': editingSlide === idx
                            }"
                        >
                            <!-- Move panel buttons -->
                            <td
                                class="px-0.5 flex flex-col lg:flex-row gap-0.5 justify-center items-center"
                                :class="{ 'rounded-bl': idx === panel.children.length - 1 }"
                            >
                                <!-- Move panel up button -->
                                <button
                                    :disabled="idx === 0 || editingSlide !== -1"
                                    @click="moveChildUp(idx)"
                                    :aria-label="$t('editor.slides.toc.moveSlideUp')"
                                    style="border: none !important; padding-left: 0.375rem; padding-right: 0.375rem"
                                    class="respected-standard-button respected-transparent-button"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'top',
                                        content: $t('editor.slides.toc.moveSlideUp'),
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 66.91"
                                        style="enable-background: new 0 0 122.88 66.91"
                                        xml:space="preserve"
                                        height="14"
                                        width="14"
                                        class="fill-current"
                                    >
                                        <g>
                                            <path
                                                d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <!-- Move panel down button -->
                                <button
                                    :disabled="idx === panel.children.length - 1 || editingSlide !== -1"
                                    @click="moveChildDown(idx)"
                                    :aria-label="$t('editor.slides.toc.moveSlideDown')"
                                    style="border: none !important; padding-left: 0.375rem; padding-right: 0.375rem"
                                    class="respected-standard-button respected-transparent-button rotate-180 transform"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'top',
                                        content: $t('editor.slides.toc.moveSlideDown'),
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 66.91"
                                        style="enable-background: new 0 0 122.88 66.91"
                                        xml:space="preserve"
                                        height="14"
                                        width="14"
                                        class="fill-current"
                                    >
                                        <g>
                                            <path
                                                d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </td>
                            <!-- Panel # and ID -->
                            <td style="text-align: left !important" class="truncate px-2">
                                <div class="px-2">
                                    <span class="text-gray-600">{{ `${idx + 1}. ` }}</span> {{ item.id }}
                                </div>
                            </td>
                            <!-- Panel type -->
                            <td style="text-align: left !important">
                                <span class="mx-2">{{ determineEditorType(item.panel) }}</span>
                            </td>
                            <!-- Panel actions -->
                            <td style="text-align: left !important">
                                <div class="px-2">
                                    <!-- Edit panel -->
                                    <span
                                        @click="() => switchSlide(idx)"
                                        @keydown.enter="() => switchSlide(idx)"
                                        class="slideshow-text-button underline cursor-pointer rounded-sm"
                                        tabindex="0"
                                        >{{ $t('editor.chart.label.edit') }}</span
                                    >
                                    |
                                    <!-- Delete panel -->
                                    <span
                                        @click="editingSlide === -1 && $vfm.open(`delete-item-${idx}`)"
                                        @keydown.enter="editingSlide === -1 && $vfm.open(`delete-item-${idx}`)"
                                        class="slideshow-text-button underline rounded-sm"
                                        :class="[
                                            editingSlide === -1
                                                ? 'text-red-700 cursor-pointer'
                                                : 'text-gray-600 cursor-not-allowed'
                                        ]"
                                        tabindex="0"
                                        >{{ $t('editor.remove') }}</span
                                    >
                                </div>
                            </td>

                            <confirmation-modal
                                :name="`delete-item-${idx}`"
                                :message="$t('dynamic.panel.remove')"
                                @ok="() => removeSlide(item as any, idx)"
                            />
                        </tr>
                        <!-- Add new panel row-->
                        <tr class="table-add-row sticky bottom-1 z-20 bg-white">
                            <td></td>
                            <!-- New panel ID input -->
                            <td class="flex flex-col items-start">
                                <input
                                    id="panelId"
                                    class="respected-standard-input"
                                    type="text"
                                    :placeholder="$t('dynamic.panel.enterID')"
                                    v-model="newSlideName"
                                    :aria-label="$t('dynamic.panel.enterID')"
                                />
                                <p v-if="idUsed" class="text-red-500">{{ $t('dynamic.panel.idTaken') }}</p>
                            </td>
                            <!-- New panel type input -->
                            <td>
                                <select
                                    v-model="newSlideType"
                                    class="respected-standard-select"
                                    style="
                                        width: 80% !important;
                                        text-align-last: left !important;
                                        text-align: start !important;
                                        justify-self: start !important;
                                    "
                                >
                                    <option v-for="thing in Object.keys(editors)" :key="thing">
                                        {{ thing }}
                                    </option>
                                </select>
                            </td>
                            <!-- Confirm new panel creation button -->
                            <td>
                                <button
                                    class="respected-standard-button respected-gray-border-button respected-thin-button justify-self-start"
                                    @click="createNewSlide"
                                    :aria-label="$t('dynamic.panel.add')"
                                    :disabled="idUsed || !newSlideName"
                                >
                                    {{ $t('dynamic.panel.add') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Panel editing area -->
            <div id="editor-area" v-if="editingSlide !== -1">
                <br />
                <hr />
                <br />
                <div class="flex justify-between items-center">
                    <!-- Header: Title, panel # and ID -->
                    <div class="flex flex-col">
                        <h2 class="font-bold text-xl">{{ $t('dynamic.panel.editor') }}</h2>
                        <p class="font-semibold text-md text-gray-500">
                            {{ `#${editingSlide + 1} - ${panel.children[editingSlide].id}` }}
                        </p>
                    </div>
                    <!-- Done button: closes panel editing area -->
                    <button
                        class="respected-standard-button respected-black-bg-button"
                        @click="switchSlide(-1)"
                        :aria-label="$t('editor.done')"
                    >
                        {{ $t('editor.done') }}
                    </button>
                </div>

                <!-- Actual panel editor -->
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
    editingSlide = -1;

    newSlideName = '';
    newSlideType = 'text';

    get idUsed(): boolean {
        return this.panel.children.some((ch: DynamicChildItem) => ch.id === this.newSlideName);
    }

    moveChildUp(index: number): void {
        if (index === 0) {
            return;
        }
        const item = JSON.parse(JSON.stringify(this.panel.children[index]));
        this.panel.children.splice(index, 1);
        this.panel.children.splice(index - 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a child
        // being edited is moved. In that case, ensure focus remains on that child
        if (this.editingSlide !== -1) {
            // If child being edited is current child
            if (this.editingSlide === index) {
                this.editingSlide -= 1;
                // If child being edited is previous child (shift it down)
            } else if (this.editingSlide === index - 1) {
                this.editingSlide += 1;
            }
        }
    }

    moveChildDown(index: number): void {
        if (index === this.panel.children.length - 1) {
            return;
        }

        const item = JSON.parse(JSON.stringify(this.panel.children[index]));
        this.panel.children.splice(index, 1);
        this.panel.children.splice(index + 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a child
        // being edited is moved. In that case, ensure focus remains on that child
        if (this.editingSlide !== -1) {
            // If child being edited is current child
            if (this.editingSlide === index) {
                this.editingSlide += 1;
                // If child being edited is next child (shift it up)
            } else if (this.editingSlide === index + 1) {
                this.editingSlide -= 1;
            }
        }
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
            this.editingSlide = -1;
        } else {
            // Save slide changes if necessary and switch to the newly selected slide.
            this.saveChanges();
            this.editingSlide = idx;

            // After switching the edit status, scroll to the add button.
            this.$nextTick(() => {
                document.getElementById('editor-area')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            });
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
    }

    createNewSlide(): void {
        if (!this.newSlideName) return;

        const newConfig = {
            id: this.newSlideName,
            panel: JSON.parse(JSON.stringify(this.startingConfig[this.newSlideType as keyof DefaultConfigs]))
        };
        this.editingSlide = this.panel.children.length;
        // this.editingMode = false;
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
            this.editingSlide !== -1 &&
            this.$refs.slide !== undefined &&
            typeof (this.$refs.slide as ImageEditorV | ChartEditorV)?.saveChanges === 'function'
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
    padding-bottom: 0 !important;
}

.table-add-row input[type='text'],
.table-add-row select,
.table-add-row button {
    width: 250px !important;
    max-width: 100% !important;
    padding-top: 3px !important;
    padding-bottom: 3px !important;
}

.table-add-row button {
    width: 180px !important;
    max-width: 100% !important;
    text-align: center;
    padding: 3px !important;
}

.table-add-row select {
    width: 180px !important;
    max-width: 100% !important;
    text-align: center;
    padding-top: 4.5px !important;
    padding-bottom: 4.5px !important;
}
</style>
