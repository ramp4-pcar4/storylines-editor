<template>
    <li class="chart-item items-center mt-8 mx-5 overflow-hidden">
        <div class="relative border-solid border-2 items-center justify-center text-center w-full">
            <button
                class="editor-button bg-white absolute h-6 w-6 leading-5 rounded-full top-2 left-0 p-0 z-10 cursor-pointer"
                @click="() => $emit('delete', chart)"
                :content="$t('editor.chart.delete')"
                v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                :aria-label="$t('editor.chart.delete')"
            >
                <svg
                    class="absolute transform -translate-x-1/2 -translate-y-1/2"
                    height="22px"
                    width="22px"
                    viewBox="0 0 352 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <button
                class="editor-button bg-white absolute h-6 w-6 leading-5 rounded-full bottom-2 -right-1 p-0 z-10 handle"
                :aria-label="$t('editor.chart.delete')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="22px" height="22px" viewBox="0 0 24 24">
                    <path
                        fill-rule="evenodd"
                        d="M8,18 C9.1045695,18 10,18.8954305 10,20 C10,21.1045695 9.1045695,22 8,22 C6.8954305,22 6,21.1045695 6,20 C6,18.8954305 6.8954305,18 8,18 Z M16,18 C17.1045695,18 18,18.8954305 18,20 C18,21.1045695 17.1045695,22 16,22 C14.8954305,22 14,21.1045695 14,20 C14,18.8954305 14.8954305,18 16,18 Z M8,10 C9.1045695,10 10,10.8954305 10,12 C10,13.1045695 9.1045695,14 8,14 C6.8954305,14 6,13.1045695 6,12 C6,10.8954305 6.8954305,10 8,10 Z M16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 C14.8954305,14 14,13.1045695 14,12 C14,10.8954305 14.8954305,10 16,10 Z M8,2 C9.1045695,2 10,2.8954305 10,4 C10,5.1045695 9.1045695,6 8,6 C6.8954305,6 6,5.1045695 6,4 C6,2.8954305 6.8954305,2 8,2 Z M16,2 C17.1045695,2 18,2.8954305 18,4 C18,5.1045695 17.1045695,6 16,6 C14.8954305,6 14,5.1045695 14,4 C14,2.8954305 14.8954305,2 16,2 Z"
                    />
                </svg>
            </button>
            <!-- chart component -->
            <storylines-chart
                class="w-full h-full"
                :config="chartConfig"
                :key="chartIdx"
                :configFileStructure="configFileStructure"
                @loaded="loadChart"
                v-if="!loading"
            ></storylines-chart>
        </div>
        <!-- chart description and edit  -->
        <div class="flex mt-4 items-center">
            <label class="editor-label name-label font-bold flex-2"
                >{{ $t('editor.chart.label.name') }}: <span class="font-normal">{{ chartName }}</span></label
            >
            <!-- edit button -->
            <button
                class="editor-button chart-btn bg-gray-100 cursor-pointer hover:bg-gray-200"
                :id="`edit-${chart.name}-btn`"
            >
                <div class="flex items-center">
                    <svg height="18px" width="18px" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"
                        />
                    </svg>
                    <span class="px-2">
                        {{ $t('editor.chart.label.edit') }}
                    </span>
                </div>
            </button>
        </div>
        <div class="flex items-center mt-2">
            <label :for="'chartPreviewCaption' + index" class="font-bold"
                >{{ $t('editor.image.label.caption') }}:
            </label>
            <input
                :id="'chartPreviewCaption' + index"
                class="editor-input w-2/5 ml-2"
                type="text"
                v-model="chart.caption"
                placeholder="Add a caption"
                @input="$emit('captionEdit')"
            />
        </div>
    </li>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import {
    ChartConfig,
    ConfigFileStructure,
    DQVChartConfig,
    LineSeriesData,
    PieDataRow,
    PieSeriesData,
    SourceCounts
} from '@/definitions';

import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

dataModule(Highcharts);
exporting(Highcharts);
exportData(Highcharts);

export default class ChartPreviewV extends Vue {
    @Prop() chart!: ChartConfig;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() lang!: string;
    @Prop() index!: number;

    loading = true;
    chartIdx = 0;
    chartConfig = {};
    chartName = '';
    modalEditor: typeof highed.ModalEditor = undefined;

    mounted(): void {
        this.chartConfig = this.chart;
        this.chartName = this.chart.name || '';
        this.loading = false;
    }

    /**
     * Save initial set of chart options used to create chart.
     */
    loadChart(chartOptions: DQVChartConfig): void {
        // initialize higcharts editor and link to edit summoner node
        if (this.modalEditor) {
            return;
        }

        this.modalEditor = highed.ModalEditor(
            `edit-${this.chartName}-btn`,
            {
                allowDone: true,
                features: 'import templates customize done',
                importer: {
                    options: 'plugins csv json'
                },
                defaultChartOptions: chartOptions
            },
            (newChart: string) => {
                const chart = JSON.parse(newChart);
                const newName = `${this.configFileStructure.uuid}/charts/${this.lang}/${chart.title.text}.json`;

                // Check to see if a chart already exists with the provided name. If so, alert the user and re-prompt.
                if (this.sourceCounts[newName] > 0 && chart.title.text != this.chart.name) {
                    alert(
                        this.$t('editor.chart.label.nameExists', {
                            name: chart.title.text
                        })
                    );

                    // Re-open the editor so the issue can be fixed.
                    setTimeout(() => this.modalEditor.show(), 100);
                } else {
                    const chartConfig = {
                        name: chart.title.text,
                        config: chart,
                        src: ''
                    };

                    this.$emit('edit', { oldChart: this.chart, newChart: chartConfig });
                    this.chartConfig = chartConfig;
                    this.chartName = chartConfig.name;
                    this.chartIdx += 1;
                }
            }
        );

        // restore CSV data if exists
        if (chartOptions.data?.csv !== undefined) {
            const csvData = chartOptions.data.csv;
            this.modalEditor.editor.dataTable.loadCSV({ csv: csvData });
        } else {
            this.convertSeriesToCSV(chartOptions);
        }

        this.modalEditor.editor.chart.options.setAll(chartOptions);
    }

    /*
     * Convert series data into formatted csvData string for charts created without using editor
     * so that the datatable when re-opening modal is properly populated.
     */
    convertSeriesToCSV(chartOptions: DQVChartConfig): void {
        if (chartOptions.chart?.type === 'pie') {
            const seriesData = (chartOptions?.series as PieSeriesData).data;
            if (seriesData) {
                // pie charts only have one set of series data with the name;y format
                const csvData = [
                    // first row is attempt to extract data labels if exists
                    `${(chartOptions?.series as PieSeriesData).name};${chartOptions?.yAxis?.title.text}`,
                    ...seriesData.map((row: PieDataRow) => `${row.name};${row.y}`)
                ];

                // load formatted CSV string into datatable
                this.modalEditor.editor.dataTable.loadCSV({ csv: csvData.join('\n') });
            }
        } else {
            if (chartOptions?.series && (chartOptions?.series as LineSeriesData[]).length) {
                // other chart types may have multiple sets of series data along with x-axis categories
                // append series data name to its data set
                let seriesData = (chartOptions?.series as LineSeriesData[]).map((series: LineSeriesData) => [
                    series.name,
                    ...series.data
                ]);
                if (chartOptions.xAxis !== undefined) {
                    // add xAxis categories to series data if it exists
                    const catoData = [chartOptions.xAxis?.title?.text].concat(chartOptions.xAxis?.categories);
                    seriesData.unshift(catoData);
                }

                // join series data together
                let csvData = seriesData[0].map((_, idx) => seriesData.map((data) => data[idx]).join(';'));

                // load formatted CSV string into datatable
                this.modalEditor.editor.dataTable.loadCSV({ csv: csvData.join('\n') });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.chart-item {
    width: 46%;

    .handle {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
}
</style>
