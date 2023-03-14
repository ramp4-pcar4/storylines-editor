<template>
    <li class="chart-item items-center mt-8 mx-5 overflow-hidden">
        <div class="relative border-solid border-2 items-center justify-center text-center w-full">
            <button
                class="bg-white absolute h-6 w-6 leading-5 rounded-full top-2 left-0 z-10 cursor-pointer"
                @click="() => $emit('delete', chart)"
            >
                <svg height="22px" width="22px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <!-- chart component -->
            <dqv-chart
                class="w-full h-full"
                :config="chartConfig"
                :key="chartIdx"
                :configFileStructure="configFileStructure"
                @loaded="loadChart"
                v-if="!loading"
            ></dqv-chart>
        </div>
        <!-- chart description and edit  -->
        <div class="flex mt-4 items-center">
            <label class="name-label font-bold flex-2"
                >{{ $t('editor.chart.label.name') }}: <span class="font-normal">{{ chartName }}</span></label
            >
            <!-- edit button -->
            <button class="chart-btn bg-gray-100 cursor-pointer hover:bg-gray-200" :id="`edit-${chart.name}-btn`">
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
    </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ChartConfig, DQVChartConfig, PieSeriesData, PieDataRow, LineSeriesData } from '@/definitions';
import ChartV from '@/components/panels/helpers/chart.vue';

@Component({
    components: {
        'dqv-chart': ChartV
    }
})
export default class ChartPreviewV extends Vue {
    @Prop() chart!: ChartConfig;
    @Prop() configFileStructure!: any;

    loading = true;
    chartIdx = 0;
    chartConfig = {};
    chartName = '';
    modalEditor: any = undefined;

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
            (newChart: any) => {
                const chart = JSON.parse(newChart);
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
}
</style>