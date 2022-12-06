<template>
    <div class="block">
        <!-- Menu with option to add a new chart -->
        <div class="flex items-center">
            <span class="font-bold px-4">{{
                $t('editor.chart.label.info', {
                    num: chartConfigs.length
                })
            }}</span>
            <!-- add chart button -->
            <button class="chart-btn bg-gray-100 cursor-pointer hover:bg-gray-200" id="modal-btn">
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
            <ChartPreview
                v-for="(chart, idx) in chartConfigs"
                :key="idx"
                :chart="chart"
                @delete="deleteChart"
                @edit="editChart"
            ></ChartPreview>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ChartFile } from '@/definitions';
import ChartPanelV from '@/components/panels/chart-panel.vue';
import ChartPreviewV from '@/components/editor/helpers/chart-preview.vue';

@Component({
    components: {
        'chart-panel': ChartPanelV,
        ChartPreview: ChartPreviewV
    }
})
export default class ChartEditorV extends Vue {
    @Prop() panel!: any;
    chartConfigs = [] as Array<ChartFile>;

    mounted(): void {
        highed.ready(() => {
            highed.ModalEditor(
                'modal-btn',
                {
                    allowDone: true,
                    features: 'import templates customize',
                    defaultChartOptions: {
                        title: {
                            text: `Chart ${this.chartConfigs.length + 1}`
                        },
                        data: {}
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
        const chart = JSON.parse(chartInfo);
        // prevent duplicate chart names (alternative is to assign a unique ID for each chart)
        if (this.chartConfigs.some((chartConfig) => chartConfig.name === chart.title.text)) {
            alert('Existing chart already has the same chart name.');
        } else {
            const chartConfig = {
                name: chart.title.text,
                config: chart
            };

            this.chartConfigs.push(chartConfig);
        }
    }

    editChart(chartInfo: { oldChart: ChartFile; newChart: ChartFile }): void {
        const idx = this.chartConfigs.findIndex((chartFile: ChartFile) => chartFile.name === chartInfo.oldChart.name);
        if (idx !== -1) {
            this.chartConfigs[idx] = chartInfo.newChart;
        }
    }

    deleteChart(chart: ChartFile): void {
        const idx = this.chartConfigs.findIndex((chartFile: ChartFile) => chartFile.name === chart.name);
        if (idx !== -1) {
            this.chartConfigs.splice(idx, 1);
        }
    }

    saveChanges(): void {
        // TODO - save chart configs
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
