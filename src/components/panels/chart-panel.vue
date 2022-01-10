<template>
    <div class="dv-chart justify-center flex h-full align-middle" dv-config="config" id="chart1">
        <div class="dv-chart-container" role="region" aria-hidden="false" :aria-label="title">
            <highcharts :options="chartOptions" ref="chart"></highcharts>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Chart } from 'highcharts-vue';
import { ChartPanel } from '@/definitions';
import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';

dataModule(Highcharts);

@Component({
    components: {
        highcharts: Chart
    }
})
export default class ChartPanelV extends Vue {
    @Prop() config!: ChartPanel;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    $papa: any; // not sure how to fix this in shims
    chartConfig: any = {};
    chartOptions: any = {};
    title = '';

    mounted(): void {
        const extension = this.config.src.split('.').pop();

        // get input given by src path
        if (extension === 'json') {
            fetch(this.config.src).then((data) => {
                // parse JSON data
                data.json().then((res) => {
                    this.chartConfig = res;
                    // extract and format options to be passed into highcharts (change this depending on config structure)
                    this.chartOptions = this.chartConfig;
                    this.title = this.chartOptions.title.text;
                });
            });
        } else if (extension === 'csv') {
            // if data is hosted on server can simply be passed into chartOptions under csvUrl (local file needs to be parsed)
            this.chartOptions = this.parseCSVFile();
        }
    }

    /**
     * Parse and process CSV file contents and return a properly configured highcharts options object.
     */
    parseCSVFile(): any {
        fetch(this.config.src).then((data) => {
            const dqvOptions = this.config.options;

            // download: true needed for local files which is treated as an URL
            this.$papa.parse(data.url, {
                header: true,
                dynamicTyping: true,
                download: true,
                complete: (res: any) => {
                    // process parsed CSV data (get fields and xaxis categories first)
                    const fields = res.meta.fields;
                    const cato = res.meta.fields.shift();
                    const xAxis = {
                        title: {
                            text: dqvOptions?.xAxisLabel ? dqvOptions?.xAxisLabel : ''
                        },
                        categories: res.data.map((row: any[]) => row[cato])
                    };

                    // get all series data for each field
                    let series: any[] = [];
                    fields.forEach((f: string) => {
                        const colData = res.data.map((row: any) => row[f]);
                        // default to line graph (not sure best way to configure this with CSV input)
                        series.push({
                            name: f,
                            data: colData,
                            type: dqvOptions?.type ? dqvOptions?.type : 'line'
                        });
                    });

                    // initializing chartOptions with filtered CSV data + configurable options (TODO)
                    this.chartOptions = {
                        series: series,
                        xAxis: xAxis,
                        title: {
                            text: dqvOptions?.title ? dqvOptions?.title : ''
                        },
                        subtitle: {
                            text: dqvOptions?.subtitle ? dqvOptions?.subtitle : ''
                        },
                        credits: {
                            enabled: dqvOptions?.credits ? dqvOptions?.credits : false
                        },
                        yAxis: {
                            title: {
                                text: dqvOptions?.yAxisLabel ? dqvOptions?.yAxisLabel : ''
                            }
                        }
                    };
                }
            });
        });
    }
}
</script>

<style lang="scss">
.dv-chart-container {
    overflow: hidden;
}
</style>
