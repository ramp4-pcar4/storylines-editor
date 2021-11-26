<template>
    <div class="dv-chart justify-center flex h-full align-middle" dv-config="config" id="chart1">
        <div class="dv-chart-container" role="region" aria-hidden="false" :aria-label="title">
            <!-- TODO: insert a hidden sr element here describing chart for accessibility purposes -->
            <highcharts :options="chartOptions"></highcharts>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Chart } from 'highcharts-vue';
import { ChartPanel } from '@/definitions';

@Component({
    components: {
        highcharts: Chart
    }
})
export default class ChartPanelV extends Vue {
    @Prop() config!: ChartPanel;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    chartConfig: any = {};
    chartOptions: any = {};
    title = '';

    created(): void {
        // get json object given by src path
        fetch(this.config.src)
            .then((res) => res.json())
            .then((data) => {
                this.chartConfig = data;

                // extract and format options to be passed into highcharts (change this depending on config structure)
                this.chartOptions = this.chartConfig.charts.chart1;
                this.title = this.chartOptions.title.text;
            });
    }
}
</script>

<style lang="scss">
.dv-chart-container {
    overflow: hidden;
}
</style>
