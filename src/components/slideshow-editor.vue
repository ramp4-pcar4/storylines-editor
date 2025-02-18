<template>
    <div class="block mt-3">
        <!-- Menu with option to add a new chart -->
        <div class="flex items-center">
            <span class="font-bold pr-4">{{
                $t('editor.slideshow.label.info', {
                    num: panel.items.length
                })
            }}</span>

            <!-- add item button -->
            <button class="editor-button bg-gray-100 cursor-pointer hover:bg-gray-200" @click="this.changeEditStatus()">
                <div class="flex items-center">
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
                </div>
            </button>
        </div>
        <hr class="border-solid border-t-2 border-gray-300 my-2" />
        <!-- Metadata Editor -->

        <!-- Slideshow caption -->
        <div class="mt-5 mb-8">
            <label class="editor-label" for="slideshowCaption">{{ $t('editor.image.slideshowCaption') }}</label>
            <input
                id="slideshowCaption"
                class="editor-input block w-full lg:w-1/2"
                type="text"
                v-model="panel.caption"
            />
        </div>

        <table class="w-2/3 mt-5">
            <thead>
                <tr class="table-header">
                    <th :aria-label="$t('editor.slideshow.label.slideNumber')"></th>
                    <th>{{ $t('editor.slideshow.label.type') }}</th>
                    <th>{{ $t('dynamic.panel.actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-contents" v-for="(item, idx) in panel.items" :key="idx">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <span @click="editItem(idx)" class="underline">Edit</span>
                        |
                        <span @click="deleteItem(idx)" class="underline">Remove</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <br /><br />
        <div v-if="editingStatus !== 'none'">
            <h2 class="text-xl font-bold">{{ $t(`editor.slideshow.label.${editingStatus}`) }}</h2>
            <hr class="border-solid border-t-2 border-gray-300 my-2" />
            <div>
                <div class="mt-3" v-if="editingStatus === 'create'">
                    <!-- Creating new slide -->
                    <label class="editor-label mb-5 text-left">{{ $t('editor.slideshow.label.type') }}</label>
                    <br />
                    <select class="rounded shadow w-48" @input="onTypeInput" :value="newSlideType">
                        <option v-for="thing in Object.keys(editors)" :key="thing" :value="thing">
                            {{ thing }}
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
                    ></component>
                    <div class="mt-3 w-full flex justify-end">
                        <button
                            id="add-new-item"
                            class="editor-button bg-black text-white hover:bg-gray-800"
                            @click="saveItem(true)"
                        >
                            {{ $t('editor.slideshow.label.add') }}
                        </button>
                    </div>
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
                    ></component>
                    <div class="mt-3 w-full flex justify-end">
                        <button class="editor-button bg-black text-white hover:bg-gray-800" @click="saveItem()">
                            {{ $t('editor.saveChanges') }}
                        </button>
                    </div>
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
        delete this.panel.userCreated; // This property is only needed by the editor
        return;
    }

    changeEditStatus(): void {
        if (this.editingStatus === 'create') {
            this.editingStatus = 'none';
        } else {
            this.editingStatus = 'create';

            // After switching the edit status, scroll to the add button.
            this.$nextTick(() => {
                document.getElementById('add-new-item')?.scrollIntoView({ behavior: 'smooth' });
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

select {
    border: 1px solid #a1a1a1;
    background: white;
    padding: 0.25rem 0.5rem;
}
</style>
