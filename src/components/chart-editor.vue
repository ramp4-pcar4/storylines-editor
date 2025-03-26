<template>
    <div class="block mt-3">
        <!-- Menu with option to add a new chart -->
        <div class="flex items-center">
            <span class="font-bold px-4">{{
                $t('editor.chart.label.info', {
                    num: chartConfigs.length
                })
            }}</span>
            <!-- add chart button -->
            <button
                class="editor-button chart-btn bg-gray-100 cursor-pointer hover:bg-gray-200"
                id="modal-btn"
                @click="clearEditor()"
                :disabled="!allowMany && chartConfigs.length > 0"
            >
                <div class="flex items-center">
                    <svg height="18px" width="18px" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span class="px-2">
                        {{ $t('editor.chart.label.create') }}
                    </span>
                </div>
            </button>
        </div>
        <hr class="border-solid border-t-2 border-gray-300 my-2" />

        <!-- No charts to display -->
        <div class="m-4" v-if="chartConfigs.length === 0">
            <span class="italic text-gray-400">{{ $t('editor.chart.label.empty') }}</span>
        </div>

        <!-- Gallery preview of all charts -->
        <ul class="flex flex-wrap list-none" v-show="chartConfigs.length">
            <draggable
                v-model="chartConfigs"
                handle=".handle"
                @update="onChartsEdited"
                class="w-full flex flex-wrap list-none"
                item-key="name"
            >
                <template #item="{ element, index }">
                    <ChartPreview
                        :key="`${element.name}-${index}`"
                        :chart="element"
                        :configFileStructure="configFileStructure"
                        :sourceCounts="sourceCounts"
                        :lang="lang"
                        :index="index"
                        @edit="editChart"
                        @delete="$vfm.open(`${element.name}-${index}`)"
                        @captionEdit="onChartsEdited"
                    ></ChartPreview>
                </template>
            </draggable>
        </ul>
        <confirmation-modal
            v-for="(chart, idx) in chartConfigs"
            :key="`${chart.name}-${idx}`"
            :name="`${chart.name}-${idx}`"
            :message="$t('editor.chart.delete.confirm', { name: chart.name })"
            @ok="deleteChart(chart)"
        ></confirmation-modal>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import {
    ChartConfig,
    ChartPanel,
    ConfigFileStructure,
    Highchart,
    PanelType,
    SlideshowPanel,
    SourceCounts
} from '@/definitions';
import ChartPreviewV from './helpers/chart-preview.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import draggable from 'vuedraggable';

@Options({
    components: {
        ChartPreview: ChartPreviewV,
        'confirmation-modal': ConfirmationModalV,
        draggable
    }
})
export default class ChartEditorV extends Vue {
    @Prop() panel!: ChartPanel | SlideshowPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop({ default: true }) allowMany!: boolean;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

    edited = false;

    chartConfigs = [] as Array<ChartConfig>;
    modalEditor = {} as typeof highed.ModalEditor;

    mounted(): void {
        // attach highcharts modal editor to summoner node
        highed.ready(() => {
            this.modalEditor = highed.ModalEditor(
                'modal-btn',
                {
                    allowDone: true,
                    features: 'import templates customize done',
                    importer: {
                        options: 'plugins csv json'
                    }
                },
                (chart: Highchart) => {
                    this.createNewChart(chart.toString());
                }
            );
        });

        // This allows us to access the chart(s) using one consistent variable instead of needing to check panel type.
        const charts =
            this.panel.type === PanelType.Slideshow
                ? (this.panel.items as Array<ChartPanel>)
                : this.panel.src
                ? [this.panel]
                : [];

        if (this.centerSlide && this.dynamicSelected) {
            for (const c in charts) {
                charts[c].customStyles += 'text-align: left;';
            }
        } else if (!this.centerSlide && this.dynamicSelected) {
            for (const c in charts) {
                charts[c].customStyles = (charts[c].customStyles || '').replace('text-align: left;', '');
            }
        }

        // load charts from existing storylines product
        if (charts !== undefined && charts.length) {
            this.chartConfigs = charts.map((chart: ChartPanel) => {
                let chartName = '';
                // extract chart name
                if (chart.options && chart.options.title) {
                    chartName = chart.options.title;
                } else {
                    const path = chart.src.match(/.*\/(.*)$/);
                    chartName = path ? path[1].replace(/\.[^/.]+$/, '').replace(/\./g, ' ') : chart.src;
                }
                return {
                    name: chartName,
                    ...chart
                };
            });
        }
    }

    clearEditor(): void {
        // reset to clear modal editor options
        let chart_options = {
            title: {
                text: `Chart ${this.chartConfigs.length + 1}`
            },
            subtitle: {
                text: ''
            },
            credits: {
                enabled: false
            }
        };
        chart_options =
            this.lang === 'en'
                ? Object.assign({}, chart_options, { lang: { thousandsSep: ',' } })
                : Object.assign({}, chart_options, { lang: { thousandsSep: ' ' } });
        this.modalEditor.editor.chart.options.setAll(chart_options);
        // resets and clears datatable section
        const defaultTableData = `"Column 1";"Column 2"\n" "";" "`;
        this.modalEditor.editor.dataTable.loadCSV({ csv: defaultTableData });
    }

    createNewChart(chartInfo: string): void {
        const chart = JSON.parse(chartInfo);
        const chartSrc = `${this.configFileStructure.uuid}/charts/${this.lang}/${chart.title.text}.json`;

        // Check to see if a chart already exists with the provided name. If so, alert the user and re-prompt.
        if (this.sourceCounts[chartSrc] > 0) {
            alert(
                this.$t('editor.chart.label.nameExists', {
                    name: chart.title.text
                })
            );

            // Re-open the editor the the issue can be fixed.
            setTimeout(() => this.modalEditor.show(), 100);
        } else {
            const chartConfig = {
                name: chart.title.text,
                src: chartSrc
            };

            if (this.sourceCounts[chartSrc]) {
                this.sourceCounts[chartSrc] += 1;
            } else {
                this.sourceCounts[chartSrc] = 1;
            }

            // Add chart config to ZIP file.
            this.configFileStructure.charts[this.lang].file(`${chart.title.text}.json`, JSON.stringify(chart, null, 4));
            this.chartConfigs.push(chartConfig);
        }
        this.onChartsEdited();
    }

    editChart(chartInfo: { oldChart: ChartConfig; newChart: ChartConfig }): void {
        const idx = this.chartConfigs.findIndex((chartFile: ChartConfig) => chartFile.name === chartInfo.oldChart.name);
        if (idx !== -1) {
            // Remove old chart config from ZIP file and add in new one.
            const oldName = `${this.configFileStructure.uuid}/charts/${this.lang}/${chartInfo.oldChart.name}.json`;
            this.sourceCounts[oldName] -= 1;
            if (this.sourceCounts[oldName] === 0) {
                this.configFileStructure.charts[this.lang].remove(`${chartInfo.oldChart.name}.json`);
            }

            const newName = `${this.configFileStructure.uuid}/charts/${this.lang}/${chartInfo.newChart.name}.json`;
            if (this.sourceCounts[newName]) {
                this.sourceCounts[newName] += 1;
            } else {
                this.sourceCounts[newName] = 1;
            }
            this.configFileStructure.charts[this.lang].file(
                `${chartInfo.newChart.name}.json`,
                JSON.stringify(chartInfo.newChart.config, null, 4)
            );

            chartInfo.newChart.src = `${this.configFileStructure.uuid}/charts/${this.lang}/${chartInfo.newChart.name}.json`;
            this.chartConfigs[idx] = {
                name: chartInfo.newChart.name,
                src: chartInfo.newChart.src
            };
        }
        this.onChartsEdited();
    }

    deleteChart(chart: ChartConfig): void {
        const idx = this.chartConfigs.findIndex((chartFile: ChartConfig) => chartFile.name === chart.name);
        if (idx !== -1) {
            // Remove the chart from the config file.
            this.sourceCounts[`${this.configFileStructure.uuid}/charts/${this.lang}/${chart.name}.json`] -= 1;
            if (this.sourceCounts[`${this.configFileStructure.uuid}/charts/${this.lang}/${chart.name}.json`] === 0) {
                this.configFileStructure.charts[this.lang].remove(`${chart.name}.json`);
            }
            this.chartConfigs.splice(idx, 1);
        }
        this.onChartsEdited();
    }

    saveChanges(): void {
        if (this.edited) {
            // Delete the existing properties so we can rebuild the object.
            Object.keys(this.panel).forEach((key) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                delete this.panel[key];
            });

            // Handle case where every image is deleted.
            if (this.chartConfigs.length === 0) {
                this.panel.type = PanelType.Chart;
                (this.panel as ChartPanel).src = '';
            } else if (this.chartConfigs.length === 1) {
                this.panel.type = PanelType.Chart;

                // Grab the one chart config from the array.
                const newChart = this.chartConfigs[0];

                // Sort of gross, but required to update the panel config as we're not allowed to directly manipulate props.
                Object.keys(newChart).forEach((key) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (this.panel as ChartPanel)[key] = newChart[key];
                });
            } else {
                this.panel.type = PanelType.Slideshow;

                // Turn each of the chart configs into a chart panel and add them to the slideshow.
                (this.panel as SlideshowPanel).items = this.chartConfigs.map((chart: ChartConfig) => {
                    return {
                        ...chart,
                        type: PanelType.Chart
                    } as ChartPanel;
                });
            }
        }

        this.edited = false;
    }

    onChartsEdited(): void {
        this.edited = true;
        this.saveChanges();
        this.$emit('slide-edit', 'Chart editor');
    }
}
</script>

<style lang="scss">
.name-label {
    text-align: left !important;
}
.chart-btn {
    border: none !important;
}

.highed-chart-frame-body {
    pointer-events: none;
}

.highed-toolbar-right .highed-icon {
    min-width: 0 !important;
    min-height: 0 !important;
    padding-left: 0 !important;
}

.panel.top.highed-scrollbar {
    margin-bottom: 0 !important;
}

.highed-res-preview {
    padding: 4px 0;
}

.highed-res-number:disabled {
    border-color: rgba(118, 118, 118, 0.3);
}

.highed-res-number {
    line-height: normal;
    background-color: field;
    border-width: 2px;
    border-style: inset;
}
</style>
