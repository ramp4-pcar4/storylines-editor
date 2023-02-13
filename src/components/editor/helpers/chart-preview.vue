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
import { ChartConfig, DQVChartConfig } from '@/definitions';
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

    mounted(): void {
        this.chartConfig = this.chart;
        this.chartName = this.chart.name || '';
        this.loading = false;
    }

    loadChart(chartOptions: DQVChartConfig): void {
        // initialize higcharts editor and link to edit summoner node
        const modalEditor = highed.ModalEditor(
            `edit-${this.chartName}-btn`,
            {
                allowDone: true,
                features: 'import templates customize'
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

        modalEditor.editor.chart.options.setAll(chartOptions);
        // modalEditor.editor.chart.loadProject(chartOptions);
    }
}
</script>

<style lang="scss" scoped>
.chart-item {
    width: 46%;
}
</style>
