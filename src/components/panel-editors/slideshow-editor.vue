<template>
    <div class="block my-3">
        <!-- Metadata Editor -->

        <!-- Slideshow caption -->
        <div class="mt-5 mb-8">
            <label class="editor-label" for="slideshowCaption">{{ $t('editor.image.slideshowCaption') }}</label>
            <input
                id="slideshowCaption"
                class="editor-input block w-full lg:w-1/2"
                type="text"
                :placeholder="$t('editor.slideshow.addSlideTitle')"
                v-model="panel.caption"
            />
        </div>

        <!-- Slideshow items heading -->
        <div class="flex items-center">
            <span class="font-bold pr-4">{{
                $t('editor.slideshow.label.info', {
                    num: panel.items.length
                })
            }}</span>
        </div>
        <hr class="border-solid border-t-2 border-gray-300 my-2" />
        <div class="w-full lg:w-4/5 max-h-96 overflow-y-auto mt-5 border border-gray-400 rounded-md">
            <table class="w-full border-separate">
                <thead class="bg-white sticky top-0 z-10">
                    <tr style="top: 2px" class="table-header sticky z-20">
                        <th
                            style="width: 10%; text-align: left !important"
                            class="rounded-tl"
                            :aria-label="$t('editor.slideshow.label.slideNumber')"
                        ></th>
                        <th
                            style="width: 40%; text-align: left !important"
                            :aria-label="$t('editor.slideshow.label.slideNumber')"
                        >
                            {{ $t('editor.slideshow.label.slideNumber') }}
                        </th>
                        <th style="width: 20%">{{ $t('editor.slideshow.label.type') }}</th>
                        <th style="width: 30%" class="rounded-tr">{{ $t('dynamic.panel.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-if="panel.items.length > 0"
                        class="table-contents"
                        style="cursor: default !important"
                        v-for="(item, idx) in panel.items"
                        :key="idx"
                        :class="{
                            'bg-gray-100': idx % 2 !== 0,
                            'bg-blue-200 hover-editing':
                                editingStatus !== 'none' && editingStatus !== 'create' && editingIdx === idx
                        }"
                    >
                        <td class="space-y-1" :class="{ 'rounded-bl': idx === panel.items.length - 1 }">
                            <button
                                :disabled="idx === 0 || editingStatus === 'edit'"
                                @click="moveSlideUp(idx)"
                                style="border: none !important"
                                class="editor-button py-1 px-1.5"
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
                            <button
                                :disabled="idx === panel.items.length - 1 || editingStatus === 'edit'"
                                @click="moveSlideDown(idx)"
                                style="border: none !important"
                                class="editor-button py-1 px-1.5 rotate-180 transform"
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
                        <td style="text-align: left !important" class="truncate">
                            {{ idx + 1 }}. {{ item.title || $t('editor.slideshow.noTitle') }}
                        </td>
                        <td>{{ $t(`editor.slide.panel.type.${item.type}`) }}</td>
                        <td :class="{ 'rounded-br': idx === panel.items.length - 1 }">
                            <span
                                @click="editItem(idx)"
                                @keydown.enter="editItem(idx)"
                                class="slideshow-text-button underline cursor-pointer rounded-sm"
                                tabindex="0"
                                >{{ $t('editor.chart.label.edit') }}</span
                            >
                            |
                            <a
                                @click="deleteItem(idx)"
                                @keydown.enter="deleteItem(idx)"
                                class="slideshow-text-button underline cursor-pointer rounded-sm text-red-700"
                                tabindex="0"
                                >{{ $t('editor.remove') }}</a
                            >
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="self-center text-center italic" colspan="4">
                            {{ $t('editor.slideshow.noSlides') }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- add item button -->
        <button
            class="editor-button w-full lg:w-4/5 mt-5 border max-h-96 bg-gray-100 border-gray-400 rounded-md cursor-pointer hover:bg-gray-200 flex items-center"
            @click="this.changeEditStatus()"
        >
            <svg
                height="18px"
                width="18px"
                viewBox="0 0 23 21"
                xmlns="http://www.w3.org/2000/svg"
                v-if="editingStatus !== 'create'"
            >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <svg
                class="fill-current"
                height="18px"
                width="18px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
                v-else
            >
                <path
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
            </svg>
            <span class="px-2">
                {{ editingStatus === 'create' ? $t('editor.cancel') : $t('editor.slideshow.label.create') }}
            </span>
        </button>

        <br /><br />
        <div
            id="create-and-edit-area"
            v-if="editingStatus !== 'none'"
            class="border-2 rounded-lg p-4"
            :class="[editingStatus !== 'create' ? 'border-blue-300' : 'border-gray-300']"
        >
            <div class="flex w-full justify-between items-center">
                <h2 class="text-xl font-bold">
                    {{
                        $t(`editor.slideshow.label.${editingStatus}`) +
                        (editingStatus === 'edit' ? ` (#${editingIdx + 1})` : '')
                    }}
                </h2>
                <!-- Save new slide -->
                <button
                    v-if="editingStatus === 'create'"
                    id="add-new-item"
                    class="editor-button bg-black text-white hover:bg-gray-800"
                    @click="saveItem(true)"
                >
                    {{ $t('editor.slideshow.label.add') }}
                </button>
                <!-- Save changes to existing slide -->
                <button
                    v-else
                    id="edit-existing-item"
                    class="editor-button bg-black text-white hover:bg-gray-800"
                    @click="saveItem()"
                >
                    {{ $t('editor.saveChanges') }}
                </button>
            </div>

            <hr class="border-solid border-t-2 border-gray-300 my-2" />
            <div>
                <div class="mt-3" v-if="editingStatus === 'create'">
                    <!-- Creating new slide -->
                    <label class="editor-label mb-5 text-left">{{ $t('editor.slideshow.label.type') }}</label>
                    <br />
                    <select class="rounded shadow w-48" @input="onTypeInput" :value="newSlideType">
                        <option v-for="thing in Object.keys(editors)" :key="thing" :value="thing">
                            {{ $t(`editor.slide.panel.type.${thing}`) }}
                        </option>
                    </select>
                    <component
                        v-if="editingStatus === 'create'"
                        ref="slideEditor"
                        :is="editors[newSlideType]"
                        :panel="JSON.parse(JSON.stringify(startingConfig[newSlideType]))"
                        :configFileStructure="configFileStructure"
                        :lang="lang"
                        :sourceCounts="sourceCounts"
                        :allowMany="false"
                        @shared-asset="(oppositeAssetPath: string, sharedAssetName: string, oppositeLang: string) => {
                            $emit('shared-asset', oppositeAssetPath, sharedAssetName, oppositeLang);
                        }"
                    ></component>
                </div>
                <div v-else>
                    <!-- Editing existing slide-->
                    <component
                        ref="slideEditor"
                        :is="editors[panel.items[editingIdx].type]"
                        :panel="panel.items[editingIdx]"
                        :configFileStructure="configFileStructure"
                        :lang="lang"
                        :sourceCounts="sourceCounts"
                        :key="editingIdx + panel.items[editingIdx].type"
                        :allowMany="false"
                        @shared-asset="(oppositeAssetPath: string, sharedAssetName: string, oppositeLang: string) => {
                            $emit('shared-asset', oppositeAssetPath, sharedAssetName, oppositeLang);
                        }"
                    ></component>
                </div>
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
    ImagePanel,
    MapPanel,
    PanelType,
    SlideshowPanel,
    SourceCounts
} from '@/definitions';

import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import VideoEditorV from './video-editor.vue';

@Options({
    components: {
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'video-editor': VideoEditorV
    }
})
export default class SlideshowEditorV extends Vue {
    @Prop() panel!: SlideshowPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;

    editors: Record<string, string> = {
        text: 'text-editor',
        image: 'image-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        video: 'video-editor'
    };

    startingConfig: DefaultConfigs = {
        ...JSON.parse(JSON.stringify(BaseStartingConfig)),
        slideshow: {
            type: PanelType.Slideshow,
            items: []
        },
        map: {
            type: PanelType.Map,
            config: '',
            title: '',
            scrollguard: true // default to ON for slideshows. Allows users to use the cursor to switch slides.
        }
    };

    editingIdx = -1;
    newSlideName = '';
    newSlideType: 'text' | 'image' | 'chart' | 'map' = 'text';
    editingStatus: 'none' | 'edit' | 'create' = 'none';

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    onTypeInput(e: any): void {
        this.newSlideType = e.target.value;
    }

    editItem(idx: number): void {
        // Save slide changes if neccessary and switch to the newly selected slide.
        this.saveChanges();
        this.editingIdx = idx;
        this.editingStatus = 'edit';

        // After switching the edit status, scroll to the add button.
        this.$nextTick(() => {
            document.getElementById('create-and-edit-area')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
    }

    deleteItem(item: number): void {
        const panel = this.panel.items.find((panel: BasePanel, idx: number) => idx === item);

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

            case 'text': {
                break;
            }
        }

        // Remove the panel itself.
        this.panel.items = this.panel.items.filter((panel: BasePanel, idx: number) => idx !== item);

        // If the slide being removed is the currently selected slide, unselect it.
        if (this.editingIdx === item) {
            this.editingIdx = -1;
            this.editingStatus = 'none';
        }
    }

    moveSlideUp(index: number): void {
        if (index === 0) {
            return;
        }

        const item = JSON.parse(JSON.stringify(this.panel.items[index]));

        this.panel.items.splice(index, 1);
        this.panel.items.splice(index - 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a slide
        // being edited is moved. In that case, ensure focus remains on that slide
        if (this.editingStatus === 'edit') {
            // If slide being edited is current slide
            if (this.editingIdx === index) {
                this.editingIdx -= 1;
                // If slide being edited is previous slide (shift it down)
            } else if (this.editingIdx === index - 1) {
                this.editingIdx += 1;
            }
        }
    }

    moveSlideDown(index: number): void {
        if (index === this.panel.items.length - 1) {
            return;
        }

        const item = JSON.parse(JSON.stringify(this.panel.items[index]));

        this.panel.items.splice(index, 1);
        this.panel.items.splice(index + 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a slide
        // being edited is moved. In that case, ensure focus remains on that slide
        if (this.editingStatus === 'edit') {
            // If slide being edited is current slide
            if (this.editingIdx === index) {
                this.editingIdx += 1;
                // If slide being edited is next slide (shift it up)
            } else if (this.editingIdx === index + 1) {
                this.editingIdx -= 1;
            }
        }
    }

    saveItem(add = false): void {
        let itemConfig;

        if (add) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemConfig = (this.$refs.slideEditor as any).panel;
            this.panel.items.push(itemConfig);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemConfig = (this.$refs.slideEditor as any).panel;
        }

        if (itemConfig.type !== PanelType.Text) {
            if (
                this.$refs.slideEditor !== undefined &&
                typeof (this.$refs.slideEditor as ImageEditorV | ChartEditorV).saveChanges === 'function'
            ) {
                (this.$refs.slideEditor as ImageEditorV | ChartEditorV).saveChanges();

                if (itemConfig.type === PanelType.Map) {
                    this.$emit('slide-edit');
                }
            }
        }

        this.editingStatus = 'none';
    }

    saveChanges(): void {
        return;
    }

    changeEditStatus(): void {
        if (this.editingStatus === 'create') {
            this.editingStatus = 'none';
        } else {
            this.editingStatus = 'create';

            // After switching the edit status, scroll to the add button.
            this.$nextTick(() => {
                document
                    .getElementById('create-and-edit-area')
                    ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    width: fit-content !important;
}
select {
    border: 1px black solid;
    background: white;
    padding: 0.25rem 0.5rem;
}
.table-header th {
    text-align: center;
    background-color: #ddd;
    padding: 5px 10px;
}
.table-contents td {
    text-align: center;
    padding: 5px 10px;
}
.table-contents:hover {
    background-color: #eee;
    cursor: pointer;
}
.table-add-row th {
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
    border: 1px solid black;
    padding: 2px !important;
    margin-top: 0 !important;
}

.hover-editing:hover {
    background-color: rgb(219, 234, 254);
}

select {
    border: 1px solid #a1a1a1;
    background: white;
    padding: 0.25rem 0.5rem;
}

.slideshow-text-button:focus {
    outline: 2px solid royalblue;
    z-index: 2;
    outline-offset: 2px;
    transition-duration: 0.075s;
}
</style>
