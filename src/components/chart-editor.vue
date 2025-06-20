<template>
    <div class="block mt-3">
        <!-- Menu with option to add a new chart -->
        <div class="flex items-center">
            <span class="font-bold px-4">{{
                $t('editor.chart.label.info', {
                    num: storylinesChartConfigs.length
                })
            }}</span>
            <!-- add chart button -->
            <button
                class="editor-button chart-btn bg-gray-100 cursor-pointer hover:bg-gray-200"
                id="modal-btn"
                :disabled="!allowMany && storylinesChartConfigs.length > 0"
                @click="() => (creatingChart = true)"
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
        <div class="m-4" v-if="storylinesChartConfigs.length === 0 && !creatingChart">
            <span class="italic text-gray-400">{{ $t('editor.chart.label.empty') }}</span>
        </div>

        <!-- Gallery preview of all charts -->
        <ul class="flex flex-wrap list-none" v-show="storylinesChartConfigs.length && !creatingChart && !editorOpen">
            <draggable
                v-model="storylinesChartConfigs"
                handle=".handle"
                @update="onChartsEdited"
                class="w-full flex flex-wrap list-none"
                item-key="name"
            >
                <template #item="{ element, index }">
                    <ChartPreview
                        :key="`${element.name}-${index}`"
                        :chart="element"
                        :highchartConfig="highchartsChartConfigs[index]"
                        :configFileStructure="configFileStructure"
                        :sourceCounts="sourceCounts"
                        :lang="lang"
                        :index="index"
                        @edit="(chart: ChartConfig) => {
                            openEditor(chart.name as string)
                        }"
                        @delete="$vfm.open(`${element.name}-${index}`)"
                        @captionEdit="onChartsEdited"
                    ></ChartPreview>
                </template>
            </draggable>
        </ul>
        <confirmation-modal
            v-for="(chart, idx) in storylinesChartConfigs"
            :key="`${chart.name}-${idx}`"
            :name="`${chart.name}-${idx}`"
            :message="$t('editor.chart.delete.confirm', { name: chart.name })"
            @ok="deleteChart(chart)"
        ></confirmation-modal>

        <div v-for="config in highchartsChartConfigs">
            <highcharts-accessible-configuration-kit
                v-if="editorsOpen[config.title.text as string]"
                :key="config.title.text"
                :plugin="true"
                :lang="lang"
                :config="config"
                @cancel="() => closeEditor(config.title.text as string)"
                @saved="(updatedConfig: HighchartsConfig) => saveChart(config.title.text as string, updatedConfig)"
            ></highcharts-accessible-configuration-kit>
        </div>

        <highcharts-accessible-configuration-kit
            v-if="creatingChart"
            :id="`new-editor-${chartIdx}`"
            :key="`new-editor-${chartIdx}`"
            :plugin="true"
            :lang="lang"
            :title="$t('editor.chart.label.newTitle', { num: chartIdx })"
            @cancel="() => (creatingChart = false)"
            @saved="createNewChart"
        />
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import {
    ChartConfig,
    ChartPanel,
    ConfigFileStructure,
    HighchartsConfig,
    PanelType,
    SlideshowChartPanel,
    SourceCounts
} from '@/definitions';
import ChartPreviewV from './helpers/chart-preview.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import draggable from 'vuedraggable';

import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';

dataModule(Highcharts);

@Options({
    components: {
        ChartPreview: ChartPreviewV,
        'confirmation-modal': ConfirmationModalV,
        draggable
    }
})
export default class ChartEditorV extends Vue {
    @Prop() panel!: ChartPanel | SlideshowChartPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop({ default: true }) allowMany!: boolean;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

    edited = false;
    creatingChart = false;
    oldChartName = '';
    chartIdx = 1;

    storylinesChartConfigs = [] as Array<ChartConfig>;
    highchartsChartConfigs = [] as Array<HighchartsConfig>;
    editorsOpen = {} as Record<string, boolean>;

    get editorOpen(): boolean {
        return Object.values(this.editorsOpen).some((open) => open);
    }

    mounted(): void {
        // This allows us to access the chart(s) using one consistent variable instead of needing to check panel type.
        const charts =
            this.panel.type === PanelType.SlideshowChart
                ? (this.panel.items as Array<ChartPanel>)
                : this.panel.src
                ? [this.panel]
                : [];

        // fetch single existing chart config from ZIP
        if (this.panel.type === PanelType.Chart && this.panel.src) {
            const chartSrc = `${this.panel.src.substring(this.panel.src.indexOf('/') + 1)}`;
            const highchartsJson = this.configFileStructure.zip.file(chartSrc);
            if (highchartsJson) {
                highchartsJson.async('string').then((res: string) => {
                    this.highchartsChartConfigs.push(JSON.parse(res));
                });
            }

            this.extractStorylinesChartConfig(this.panel as ChartPanel);
            this.chartIdx += 1;
        }

        if (this.centerSlide && this.dynamicSelected) {
            for (const c in charts) {
                charts[c].customStyles += 'text-align: left;';
            }
        } else if (!this.centerSlide && this.dynamicSelected) {
            for (const c in charts) {
                charts[c].customStyles = (charts[c].customStyles || '').replace('text-align: left;', '');
            }
        }

        // fetch multiple existing chart configs from ZIP
        if (this.panel.type === PanelType.SlideshowChart) {
            charts.forEach((chart: ChartPanel) => {
                this.extractStorylinesChartConfig(chart);

                // extract actual highcharts config from
                const chartSrc = `${chart.src.substring(chart.src.indexOf('/') + 1)}`;
                const highchartsJson = this.configFileStructure.zip.file(chartSrc);
                if (highchartsJson) {
                    highchartsJson.async('string').then((res: string) => {
                        this.highchartsChartConfigs.push(JSON.parse(res));
                    });
                }
                this.chartIdx += 1;
            });
        }
    }

    openEditor(name: string) {
        this.editorsOpen[name] = true;
        this.oldChartName = name;
    }

    closeEditor(name: string) {
        this.editorsOpen[name] = false;
    }

    createNewChart(newConfig: HighchartsConfig): void {
        const chartSrc = `${this.configFileStructure.uuid}/charts/${this.lang}/${newConfig.title?.text}.json`;

        // Check to see if a chart already exists with the provided name. If so, alert the user and re-prompt.
        if (this.sourceCounts[chartSrc] > 0) {
            alert(
                this.$t('editor.chart.label.nameExists', {
                    name: newConfig.title?.text
                })
            );
            return;

        } else {
            const chartConfig = {
                name: newConfig.title?.text,
                chartIdx: 0,
                src: chartSrc
            };

            if (this.sourceCounts[chartSrc]) {
                this.sourceCounts[chartSrc] += 1;
            } else {
                this.sourceCounts[chartSrc] = 1;
            }

            // Add chart config to ZIP file.
            this.configFileStructure.charts[this.lang].file(
                `${newConfig.title?.text}.json`,
                JSON.stringify(newConfig, null, 4)
            );
            this.storylinesChartConfigs.push(chartConfig);
            this.highchartsChartConfigs.push(newConfig);
        }
        this.onChartsEdited();
        this.creatingChart = false;
        this.chartIdx += 1;
    }

    extractStorylinesChartConfig(chart: ChartPanel): void {
        let chartName = '';
        // extract chart name
        if (chart.options && chart.options.title) {
            chartName = chart.options.title;
        } else {
            const path = chart.src.match(/.*\/(.*)$/);
            chartName = path ? path[1].replace(/\.[^/.]+$/, '').replace(/\./g, ' ') : chart.src;
        }
        // save storylines chart config
        this.storylinesChartConfigs.push({
            name: chartName,
            chartIdx: 0,
            ...chart
        });
    }

    saveChart(name: string, updatedConfig: HighchartsConfig): void {
        const idx = this.storylinesChartConfigs.findIndex((c) => c.name === name);
        if (idx !== -1) {
            if (updatedConfig.title?.text !== this.oldChartName) {
                // Remove old chart config from ZIP file and add in new one.
                const oldName = `${this.configFileStructure.uuid}/charts/${this.lang}/${this.oldChartName}.json`;
                this.sourceCounts[oldName] -= 1;
                if (this.sourceCounts[oldName] === 0) {
                    this.configFileStructure.charts[this.lang].remove(`${this.oldChartName}.json`);
                }

                // Check to ensure chart does not rename to an existing chart title
                const newName = `${this.configFileStructure.uuid}/charts/${this.lang}/${updatedConfig.title?.text}.json`;
                if (this.sourceCounts[newName] > 0) {
                    alert(
                        this.$t('editor.chart.label.nameExists', {
                            name: updatedConfig.title?.text
                        })
                    );
                    return;
                }

                if (this.sourceCounts[newName]) {
                    this.sourceCounts[newName] += 1;
                } else {
                    this.sourceCounts[newName] = 1;
                }
            }
            // Add updated chart config to ZIP
            this.configFileStructure.charts[this.lang].file(
                `${updatedConfig.title.text}.json`,
                JSON.stringify(updatedConfig, null, 4)
            );

            // Update local copies of Highcharts + Storylines chart configs
            this.storylinesChartConfigs[idx] = {
                name: updatedConfig.title?.text,
                config: updatedConfig,
                chartIdx: this.storylinesChartConfigs[idx].chartIdx! + 1,
                src: `${this.configFileStructure.uuid}/charts/${this.lang}/${updatedConfig.title.text}.json`
            };
            this.highchartsChartConfigs[idx] = updatedConfig;
        }
        this.onChartsEdited();
        this.editorsOpen[name] = false;
    }

    deleteChart(chart: ChartConfig): void {
        const idx = this.storylinesChartConfigs.findIndex((chartFile: ChartConfig) => chartFile.name === chart.name);
        if (idx !== -1) {
            // Remove the chart from the config file.
            this.sourceCounts[`${this.configFileStructure.uuid}/charts/${this.lang}/${chart.name}.json`] -= 1;
            if (this.sourceCounts[`${this.configFileStructure.uuid}/charts/${this.lang}/${chart.name}.json`] === 0) {
                this.configFileStructure.charts[this.lang].remove(`${chart.name}.json`);
            }
            this.storylinesChartConfigs.splice(idx, 1);
            this.highchartsChartConfigs.splice(idx, 1);
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

            // Handle case where every chart is deleted.
            if (this.storylinesChartConfigs.length === 0) {
                this.panel.type = PanelType.Chart;
                (this.panel as ChartPanel).src = '';
            } else if (this.storylinesChartConfigs.length === 1) {
                this.panel.type = PanelType.Chart;

                // Grab the one chart config from the array.
                const newChart = this.storylinesChartConfigs[0];

                // Sort of gross, but required to update the panel config as we're not allowed to directly manipulate props.
                Object.keys(newChart).forEach((key) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (this.panel as ChartPanel)[key] = newChart[key];
                });
            } else {
                this.panel.type = PanelType.SlideshowChart;

                // Turn each of the chart configs into a chart panel and add them to the slideshow.
                (this.panel as SlideshowChartPanel).items = this.storylinesChartConfigs.map((chart: ChartConfig) => {
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

.highcharts-app-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
