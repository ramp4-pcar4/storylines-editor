<template>
    <div class="dv-chart justify-center flex align-middle" dv-config="config">
        <div
            class="dv-chart-container items-stretch"
            role="region"
            aria-hidden="false"
            :aria-label="title"
            v-if="!loading"
        >
            <highcharts :options="chartOptions" ref="chart"></highcharts>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Chart } from 'highcharts-vue';
import { ChartConfig, DQVChartConfig, SeriesData } from '@/definitions';
import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

dataModule(Highcharts);
exporting(Highcharts);
exportData(Highcharts);

@Component({
    components: {
        highcharts: Chart
    }
})
export default class ChartV extends Vue {
    @Prop() config!: ChartConfig;

    chartOptions: DQVChartConfig = {} as DQVChartConfig;
    title = '';
    loading = true;
    menuOptions = [
        'viewFullscreen',
        'printChart',
        'separator',
        'downloadPNG',
        'downloadJPEG',
        'downloadPDF',
        'downloadSVG',
        'separator',
        'downloadCSV',
        'downloadXLS'
    ];

    created(): void {
        const extension = this.config.src.split('.').pop();

        // get input given by src path
        if (extension === 'json') {
            fetch(this.config.src).then((data) => {
                // parse JSON data
                data.json().then((res: DQVChartConfig) => {
                    this.chartOptions = res;
                    this.title = this.chartOptions.title.text;
                    this.loading = false;
                });
            });
        } else if (extension === 'csv') {
            // if data is hosted on server can simply be passed into chartOptions under csvUrl (local file needs to be parsed)
            this.parseCSVFile();
        }
    }

    mounted(): void {
        setTimeout(() => {
            (this.$refs.chart as any).chart.reflow();
        }, 100);

        window.addEventListener('resize', () => {
            // adjust width for mobile resolutions
            (this.$refs.chart as any).chart.reflow();
        });
    }

    /**
     * Parse and process CSV file contents and return a properly configured highcharts options object.
     */
    parseCSVFile(): void {
        fetch(this.config.src).then((data) => {
            const dqvOptions = this.config.options;

            // export options displayed on hamburger menu
            const exportOptions = {
                buttons: {
                    contextButton: {
                        menuItems: this.menuOptions
                    }
                },
                enabled: dqvOptions?.export !== undefined ? dqvOptions?.export : true
            };

            // extract general chart options that applies to all chart types
            const defaultOptions = {
                chart: {
                    renderTo: 'dv-chart-container',
                    type: dqvOptions?.type,
                    ...(dqvOptions?.height &&
                        this.$el.clientHeight > dqvOptions?.height && { height: dqvOptions?.height }),
                    ...(dqvOptions?.width && this.$el.clientWidth > dqvOptions?.width && { width: dqvOptions?.width })
                },
                ...(dqvOptions?.title && { title: { text: dqvOptions?.title } }),
                ...(dqvOptions?.subtitle && { subtitle: { text: dqvOptions?.subtitle } }),
                ...(dqvOptions?.colours && { colors: dqvOptions?.colours }),
                exporting: exportOptions,
                credits: {
                    enabled: dqvOptions?.credits !== undefined ? dqvOptions?.credits : false
                }
            };

            // download: true needed for local files which is treated as an URL
            this.$papa.parse(data.url, {
                header: dqvOptions?.type === 'pie' ? false : true,
                dynamicTyping: true,
                download: true,
                complete: (res: any) => {
                    // construct highcharts objects based on chart type
                    if (dqvOptions?.type === 'pie') {
                        this.makePieChart(res.data, defaultOptions);
                    } else {
                        this.makeLineChart(res.meta.fields, res.data, defaultOptions);
                    }
                }
            });

            this.loading = false;
        });
    }

    /**
     * Parse chart data content and return a highcharts formatted series object for a pie chart.
     */
    makePieChart(data: any, defaultOptions: any): void {
        let series: { data: SeriesData[] } = { data: [] };

        // construct series data
        data.forEach((slice: any) => {
            series.data.push({
                name: slice[0],
                // in case of strings being passed in such as '10%'
                y: parseFloat(slice[1])
            });
        });

        // plot options for pie charts
        const plotOptions = {
            pie: {
                name: '',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        };

        // initializing chartOptions for line/bar charts
        this.chartOptions = {
            ...defaultOptions,
            plotOptions: plotOptions,
            series: series
        };
    }

    /**
     * Parse chart data content and return a highcharts formatted series object for a line/bar chart.
     */
    makeLineChart(fields: string[], data: any, defaultOptions: any): void {
        const dqvOptions = this.config.options;
        // find xAxis categories for line/bar charts
        const cato = fields.shift() as string;
        const xAxis = {
            title: {
                text: dqvOptions?.xAxisLabel ? dqvOptions?.xAxisLabel : ''
            },
            categories: data.map((row: any) => row[cato])
        };

        // construct series data
        let series: SeriesData[] = [];
        fields.forEach((f: string) => {
            const colData = data.map((row: any) => row[f]);
            series.push({
                name: f,
                data: colData
            });
        });

        // initializing chartOptions for line/bar charts
        this.chartOptions = {
            ...defaultOptions,
            series: series,
            xAxis: xAxis,
            yAxis: {
                title: {
                    text: dqvOptions?.yAxisLabel ? dqvOptions?.yAxisLabel : ''
                }
            }
        };
    }
}
</script>

<style lang="scss">
.dv-chart-container {
    overflow: hidden;
}

@media screen and (max-width: 640px) {
    .dv-chart {
        background-color: white;
    }

    .dv-chart-container {
        width: 100% !important;
        height: 100% !important;
    }
}
</style>
