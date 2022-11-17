<template>
    <div class="block">
        <button class="bg-gray-500 text-white font-semibold h-16 cursor-pointer" id="modal-btn">
            Create New Chart
        </button>
        <div id="chart-result" class="border-2 border-black m-5" style="height: 500px">
            <chart-panel :config="chartConfig" :key="chartIdx" v-if="!loading"></chart-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChartPanelV from '@/components/panels/chart-panel.vue';

@Component({
    components: {
        'chart-panel': ChartPanelV
    }
})
export default class ChartEditorV extends Vue {
    chartConfig = {};
    chartIdx = 0;
    loading = true;

    mounted(): void {
        highed.ready(() => {
            highed.ModalEditor(
                'modal-btn',
                {
                    allowDone: true,
                    features: 'import templates customize welcome done',
                    importer: {
                        options: 'plugins csv json samples'
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (chart: any) => {
                    this.createNewChart(chart.toString());
                }
            );
        });
    }

    createNewChart(chartInfo: string): void {
        const chartConfig = {
            type: 'chart',
            charts: [{ config: JSON.parse(chartInfo) }]
        };
        console.log('CHART CONFIG: ', chartConfig);
        this.chartConfig = chartConfig;
        this.loading = false;
        this.chartIdx += 1;
    }
}
</script>

<style lang="scss" scoped></style>
