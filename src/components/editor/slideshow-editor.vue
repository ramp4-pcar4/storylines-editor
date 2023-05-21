<template>
    <div class="block">
        <div class="flex items-center w-full text-left">
            <label class="text-label">Slideshow Caption:</label>
            <input class="w-1/3" type="text" v-model="panel.caption" @change="onItemsEdited" />
        </div>
        <!-- Menu with option to add a new item -->
        <div class="flex items-center mt-5">
            <span class="font-bold">{{
                $t('editor.slideshow.label.info', {
                    num: panel.items.length
                })
            }}</span>
            <!-- add item button -->
            <button class="bg-gray-100 cursor-pointer hover:bg-gray-200" id="modal-btn" @click="openAddModal()">
                <div class="flex items-center">
                    <svg height="18px" width="18px" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span class="px-2">
                        {{ $t('editor.slideshow.label.create') }}
                    </span>
                </div>
            </button>
        </div>
        <hr class="border-solid border-t-2 border-gray-300 my-2" />

        <table class="w-2/3 mt-5">
            <thead>
                <tr class="table-header">
                    <th></th>
                    <th>Item Type</th>
                    <th>Item Actions</th>
                </tr>
            </thead>
            <draggable v-model="panel.items" @update="onItemsEdited" :element="'tbody'">
                <tr class="table-contents" v-for="(item, idx) in panel.items" :key="idx">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <span @click="editItem(idx)" class="underline">Edit</span>
                        |
                        <span @click="deleteItem(idx)" class="underline">Remove</span>
                    </td>
                </tr>
            </draggable>
        </table>

        <div v-if="editingIdx !== -1 && !filesLoading" :key="editingIdx">
            <br />
            <hr />
            <br />
            <span class="font-bold text-xl">Item Editor:</span><br />
            <component
                v-if="panel.items[editingIdx].type === 'map' || panel.items[editingIdx].type === 'text'"
                ref="slide"
                :is="editors[panel.items[editingIdx].type]"
                :key="editingIdx + panel.items[editingIdx].type"
                :panel="panel.items[editingIdx].config"
                :configFileStructure="configFileStructure"
                :lang="lang"
                :sourceCounts="sourceCounts"
            ></component>
            <div v-else-if="panel.items[editingIdx].type === 'chart'">
                <div class="chart-editor my-5" id="edit-chart"></div>
            </div>
            <div v-else>
                <!-- only display an image preview if one is provided.-->
                <div class="my-4" v-if="!!imageSrcs[editingIdx]">
                    <label>{{ $t('editor.slideshow.label.imagePreview') }}:</label>
                    <img class="image-preview" :src="imageSrcs[editingIdx]" />
                </div>
                <label>{{ $t('editor.slideshow.label.image') }}:</label>
                <input type="text" disabled :value="getImageFileName()" class="w-1/4" />
                <button @click.stop="openFileSelector" class="bg-black text-white hover:bg-gray-800">
                    {{ $t('editor.browse') }}
                </button>
                <!-- hide the actual file input -->
                <input type="file" id="imageUpload" @change="onImageChange" class="w-1/4" style="display: none" />
                <div class="flex mt-4 items-center w-full text-left">
                    <label class="text-label">Alt tag:</label>
                    <input
                        class="w-1/4"
                        type="text"
                        v-model="
                            //@ts-expect-error
                            panel.items[editingIdx].config.altText
                        "
                        @change="onItemsEdited"
                    />
                </div>

                <div class="flex mt-4 items-center w-full text-left">
                    <label class="text-label">Caption:</label>
                    <input
                        class="w-1/4"
                        type="text"
                        v-model="
                            //@ts-expect-error
                            panel.items[editingIdx].config.caption
                        "
                        @change="onItemsEdited"
                    />
                </div>
            </div>
        </div>

        <vue-modal name="add-slideshow-item" :outer-close="false" size="xlg">
            <h2 slot="header" class="text-xl font-bold">{{ $t('editor.slideshow.label.create') }}</h2>
            <div>
                <label class="mb-5">{{ $t('editor.slideshow.label.type') }}:</label>
                <select @input="onTypeInput" :value="newType">
                    <option v-for="thing in Object.keys(editors)" :key="thing" :value="thing">
                        {{ thing }}
                    </option>
                </select>
                <br />
                <div v-if="newType === 'chart'">
                    <div class="flex flex-row items-center">
                        <label class="text-left mt-2">Chart config file name*:</label>
                        <input type="text" v-model="newFileName" />.json
                    </div>
                    <label class="text-left my-2">Chart config editor:</label>
                    <div class="chart-editor" id="add-chart"></div>
                </div>
                <component
                    v-else
                    ref="addEditor"
                    :is="editors[newType]"
                    :key="newType"
                    :panel="JSON.parse(JSON.stringify(startingConfig[newType]))"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                    :sourceCounts="sourceCounts"
                ></component>
            </div>
            <div class="mt-3 w-full flex justify-end">
                <button class="bg-black text-white hover:bg-gray-800" @click="addItem()">Add</button>
            </div>
        </vue-modal>
    </div>
</template>

<script lang="ts">
import {
    ChartConfig,
    DQVChartConfig,
    ImageConfig,
    LineSeriesData,
    MapConfig,
    PieDataRow,
    PieSeriesData,
    SlideshowPanel
} from '@/definitions';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import MapEditorV from './map-editor.vue';
import TextEditorV from './text-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import draggable from 'vuedraggable';
import ImagePreviewV from './helpers/image-preview.vue';
import ChartPreviewV from './helpers/chart-preview.vue';

@Component({
    components: {
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'confirmation-modal': ConfirmationModalV,
        draggable,
        'chart-preview': ChartPreviewV,
        'image-preview': ImagePreviewV
    }
})
export default class SlideshowEditorV extends Vue {
    @Prop() panel!: SlideshowPanel;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;
    @Prop() sourceCounts!: any;

    dragging = false;
    edited = false;

    $modals: any;

    editingIdx = -1;
    newType: 'text' | 'image' | 'chart' | 'map' = 'text';
    newFileName = '';

    imageSrcs: { [index: number]: string } = {};
    slideshowCaption = '';

    startingConfig = {
        text: {
            type: 'text',
            title: '',
            content: ''
        },
        image: {
            type: 'image',
            images: []
        },
        map: {
            type: 'map',
            config: '',
            title: '',
            scrollguard: false
        }
    };

    editors: { [key: string]: string } = {
        text: 'text-editor',
        image: 'image-editor',
        map: 'map-editor',
        chart: ''
    };

    filesLoading = false;
    filePromises: Array<Promise<void>> = [];

    chartConfigs: { [index: number]: DQVChartConfig } = {};
    chartEditor: any = {};

    get isDragging(): boolean {
        return this.dragging;
    }

    mounted() {
        this.filesLoading = true;
        this.panel.items.forEach((item, idx) => {
            if (item.type === 'image') {
                const assetSrc = `${(item.config as ImageConfig).src.substring(
                    (item.config as ImageConfig).src.indexOf('/') + 1
                )}`;

                this.filePromises.push(
                    this.configFileStructure.zip
                        .file(assetSrc)
                        .async('blob')
                        .then((res: any) => {
                            this.imageSrcs[idx] = URL.createObjectURL(res);
                        })
                );
            } else if (item.type === 'chart') {
                const assetSrc = `${(item.config as ChartConfig).src.substring(
                    (item.config as ChartConfig).src.indexOf('/') + 1
                )}`;
                this.filePromises.push(
                    this.configFileStructure.zip
                        .file(assetSrc)
                        .async('string')
                        .then((res: any) => {
                            this.chartConfigs[idx] = JSON.parse(res);
                        })
                );
            }
        });

        Promise.all(this.filePromises).then(() => {
            this.filesLoading = false;
        });
    }

    openAddModal() {
        this.editingIdx = -1;
        this.newFileName = '';
        this.$modals.show('add-slideshow-item');
        if (this.newType === 'chart') {
            this.initChartEditor('add-chart');
        }
    }

    onTypeInput(e: any) {
        this.newType = e.target.value;
        if (this.newType === 'chart') {
            this.initChartEditor('add-chart');
        }
    }

    initChartEditor(el: string, config?: DQVChartConfig) {
        const watcher = setInterval(() => {
            clearInterval(watcher);
            this.chartEditor = highed.Editor(el, {
                allowDone: true,
                features: 'import templates customize done',
                importer: {
                    options: 'plugins csv json'
                },
                defaultChartOptions: config ?? {
                    title: {
                        text: `New Chart`
                    },
                    subtitle: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    }
                }
            });
            this.chartEditor.chart.options.setAll(config);

            // resets and clears datatable section
            if (!config) {
                const defaultTableData = `"Column 1";"Column 2"\n" "";" "`;
                this.chartEditor.dataTable.loadCSV({ csv: defaultTableData });
            } else if (config.data?.csv !== undefined) {
                const csvData = config.data.csv;
                this.chartEditor.dataTable.loadCSV({ csv: csvData });
            } else {
                if (config.chart?.type === 'pie') {
                    const seriesData = (config?.series as PieSeriesData).data;
                    if (seriesData) {
                        // pie charts only have one set of series data with the name;y format
                        const csvData = [
                            // first row is attempt to extract data labels if exists
                            `${(config?.series as PieSeriesData).name};${config?.yAxis?.title.text}`,
                            ...seriesData.map((row: PieDataRow) => `${row.name};${row.y}`)
                        ];

                        // load formatted CSV string into datatable
                        this.chartEditor.dataTable.loadCSV({ csv: csvData.join('\n') });
                    }
                } else {
                    if (config?.series && (config?.series as LineSeriesData[]).length) {
                        // other chart types may have multiple sets of series data along with x-axis categories
                        // append series data name to its data set
                        let seriesData = (config?.series as LineSeriesData[]).map((series: LineSeriesData) => [
                            series.name,
                            ...series.data
                        ]);
                        if (config.xAxis !== undefined) {
                            // add xAxis categories to series data if it exists
                            const catoData = [config.xAxis?.title?.text].concat(config.xAxis?.categories);
                            seriesData.unshift(catoData);
                        }

                        // join series data together
                        let csvData = seriesData[0].map((_, idx) => seriesData.map((data) => data[idx]).join(';'));

                        // load formatted CSV string into datatable
                        this.chartEditor.dataTable.loadCSV({ csv: csvData.join('\n') });
                    }
                }
            }

            this.chartEditor.resize();
        }, 1000);
    }

    addItem() {
        let itemConf;
        switch (this.newType) {
            case 'text': {
                itemConf = (this.$refs.addEditor as any).panel;
                delete itemConf.type;
                this.panel.items.push({
                    type: 'text',
                    config: itemConf
                });
                break;
            }
            case 'map': {
                itemConf = (this.$refs.addEditor as any).panel;
                delete itemConf.type;
                this.panel.items.push({
                    type: 'map',
                    config: itemConf
                });
                break;
            }
            case 'image': {
                itemConf = (this.$refs.addEditor as any).imagePreviews;
                let idx: number = this.panel.items.length;
                this.panel.items = this.panel.items.concat(
                    itemConf.map((imgConf: any) => {
                        this.imageSrcs[idx] = imgConf.src;
                        idx += 1;
                        imgConf.src = `${this.configFileStructure.uuid}/assets/${this.lang}/${imgConf.id}`;
                        delete imgConf.id;
                        return { type: 'image', config: imgConf };
                    })
                );
                console.log(this.imageSrcs);
                break;
            }
            case 'chart': {
                itemConf = this.chartEditor.getEmbeddableJSON();
                const chartSrc = `${this.configFileStructure.uuid}/charts/${this.lang}/${this.newFileName}.json`;
                if (this.sourceCounts[chartSrc]) {
                    this.sourceCounts[chartSrc] += 1;
                } else {
                    this.sourceCounts[chartSrc] = 1;
                }

                // Add chart config to ZIP file.
                this.configFileStructure.charts[this.lang].file(
                    `${this.newFileName}.json`,
                    JSON.stringify(itemConf, null, 4)
                );
                this.panel.items.push({
                    type: 'chart',
                    config: { src: chartSrc }
                });
                this.chartConfigs[this.panel.items.length - 1] = itemConf;
                break;
            }
        }
        this.$modals.hide('add-slideshow-item');
        this.onItemsEdited();
    }

    deleteItem(idx: number) {
        const itemToDelete = this.panel.items[idx];
        if (itemToDelete.type !== 'text') {
            let fileSrc =
                itemToDelete.type === 'map'
                    ? (itemToDelete.config as MapConfig).config
                    : (itemToDelete.config as ImageConfig).src;

            // Remove the image from the product ZIP file.
            this.sourceCounts[fileSrc] -= 1;
            if (this.sourceCounts[fileSrc] === 0) {
                this.configFileStructure.zip.remove(`${fileSrc.substring(fileSrc.indexOf('/') + 1)}`);
            }
        }
        if (idx < this.editingIdx) {
            this.editingIdx -= 1;
        } else if (idx === this.editingIdx) {
            this.editingIdx = -1;
        }
        this.panel.items.splice(idx, 1);
    }

    editItem(idx: number) {
        this.saveChanges();
        this.editingIdx = idx;
        if (this.panel.items[this.editingIdx].type === 'chart') {
            this.initChartEditor('edit-chart', this.chartConfigs[this.editingIdx]);
        }
    }

    saveChanges() {
        // save the current chart file if one is being edited, so that changes to the chart are not lost
        if (this.editingIdx !== -1 && this.panel.items[this.editingIdx].type === 'chart') {
            const chartConf = this.chartEditor.getEmbeddableJSON();
            const fileSrc = (this.panel.items[this.editingIdx].config as ChartConfig).src;
            const fileName = fileSrc.slice(fileSrc.lastIndexOf('/') + 1);
            // Add chart config to ZIP file.
            this.configFileStructure.charts[this.lang].file(fileName, JSON.stringify(chartConf, null, 4));
            this.chartConfigs[this.editingIdx] = chartConf;
        }
    }

    onImageChange(e: Event): void {
        // Retrieve the uploaded file.
        const uploadedFile = ((e.target as HTMLInputElement).files as ArrayLike<File>)[0];

        // Add the uploaded images to the product ZIP file.
        const uploadSource = `${this.configFileStructure.uuid}/assets/${this.lang}/${uploadedFile.name}`;
        this.configFileStructure.assets[this.lang].file(uploadedFile.name, uploadedFile);

        if (this.sourceCounts[uploadSource]) {
            this.sourceCounts[uploadSource] += 1;
        } else {
            this.sourceCounts[uploadSource] = 1;
        }

        // Remove previous file if necessary
        const currentSource = (this.panel.items[this.editingIdx].config as ImageConfig).src;
        this.sourceCounts[currentSource] -= 1;
        if (this.sourceCounts[currentSource] === 0) {
            this.configFileStructure.assets[this.lang].remove(this.getImageFileName());
            URL.revokeObjectURL(this.imageSrcs[this.editingIdx]);
        }

        // Set new image as current image
        this.imageSrcs[this.editingIdx] = URL.createObjectURL(uploadedFile);
        (this.panel.items[this.editingIdx].config as ImageConfig).src = uploadSource;
    }

    getImageFileName(): string {
        const fileSrc = (this.panel.items[this.editingIdx].config as ImageConfig).src;
        return fileSrc.slice(fileSrc.lastIndexOf('/') + 1);
    }

    openFileSelector(): void {
        (this.$el.querySelector('#imageUpload') as HTMLElement).click();
    }

    onItemsEdited(): void {
        this.edited = true;
        this.$parent.$emit('slide-edit');
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

.chart-editor {
    height: 59vh;
}

.save-chart-button {
    margin: 0 !important;
}
</style>
