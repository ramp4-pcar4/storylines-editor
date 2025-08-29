<template>
    <div class="block mt-6">
        <!-- Menu with option to add a new chart -->
        <div class="flex items-center">
            <span class="font-semibold text-lg pr-4">{{
                $t('editor.chart.label.info', {
                    num: storylinesChartConfigs.length
                })
            }}</span>
            <!-- add chart button -->
            <button
                class="respected-standard-button respected-black-bg-button respected-thin-button"
                id="modal-btn"
                :disabled="!allowMany && storylinesChartConfigs.length > 0"
                @click="() => $vfm.open('highcharts-create-modal')"
            >
                <div class="flex items-center">
                    <svg
                        fill="currentColor"
                        height="18px"
                        width="18px"
                        viewBox="0 0 23 21"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
        <div class="m-4" v-if="storylinesChartConfigs.length === 0">
            <span class="italic text-gray-400">{{ $t('editor.chart.label.empty') }}</span>
        </div>

        <!-- Gallery preview of all charts -->
        <ul class="flex flex-wrap list-none" v-show="storylinesChartConfigs.length">
            <draggable
                v-model="storylinesChartConfigs"
                handle=".handle"
                @update="onChartsEdited"
                class="w-full flex flex-wrap list-none"
                item-key="name"
            >
                <template #item="{ element, index }">
                    <ChartPreviewV
                        :key="`${element.name}-${index}`"
                        :chart="element"
                        :chartVersion="chartVersions[element.name]"
                        :lang="lang"
                        :index="index"
                        @edit="
                            (chart: ChartConfig) => {
                                openEditor(chart.name as string);
                            }
                        "
                        @delete="$vfm.open(`${element.name}-${index}`)"
                        @captionEdit="onChartsEdited"
                    ></ChartPreviewV>
                </template>
            </draggable>
        </ul>
        <action-modal
            v-for="(chart, idx) in storylinesChartConfigs"
            :key="`${chart.name}-${idx}`"
            :name="`${chart.name}-${idx}`"
            :title="$t('editor.chart.delete.confirm.header')"
            :message="$t('editor.chart.delete.confirm', { name: chart.name })"
            @ok="deleteChart(chart)"
        ></action-modal>

        <vue-final-modal
            modal-id="highcharts-edit-modal"
            :esc-to-close="false"
            :click-to-close="false"
            content-class="flex flex-col overflow-y-auto bg-white w-full rounded-lg"
            class="flex justify-center items-center w-full"
        >
            <highcharts-accessible-configuration-kit
                v-if="editingConfig"
                :key="editingConfig.title.text"
                :plugin="true"
                :lang="lang"
                :config="editingConfig"
                @cancel="
                    () => {
                        editingConfig = null;
                        editingName = null;
                        $vfm.close('highcharts-edit-modal');
                    }
                "
                @saved="
                    (updatedConfig: HighchartsConfig) => {
                        saveChart(editingName as string, updatedConfig);
                        editingConfig = null;
                        editingName = null;
                        $vfm.close('highcharts-edit-modal');
                    }
                "
            ></highcharts-accessible-configuration-kit>
        </vue-final-modal>

        <vue-final-modal
            modal-id="highcharts-create-modal"
            :esc-to-close="false"
            :click-to-close="false"
            content-class="flex flex-col overflow-y-auto bg-white w-full rounded-lg"
            class="flex justify-center items-center w-full"
        >
            <highcharts-accessible-configuration-kit
                :id="`new-editor-${chartIdx}`"
                :key="`new-editor-${chartIdx}`"
                :plugin="true"
                :lang="lang"
                :title="$t('editor.chart.label.newTitle', { num: chartIdx })"
                @cancel="() => $vfm.close('highcharts-create-modal')"
                @saved="createNewChart"
            />
        </vue-final-modal>
    </div>
</template>

<script setup lang="ts">
import ActionModal from '@/components/support/action-modal.vue';
import { ChartConfig, ChartPanel, HighchartsConfig, PanelType, SlideshowChartPanel } from '@/definitions';
import { VueFinalModal } from 'vue-final-modal';
import { useProductStore } from '@/stores/productStore';
import { getCurrentInstance, onMounted, ref } from 'vue';

import { applyTextAlign } from '@/utils/styleUtils';
import ChartPreviewV from '../support/chart-preview.vue';
import draggable from 'vuedraggable';

import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';
import { useI18n } from 'vue-i18n';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = withDefaults(
    defineProps<{
        panel: ChartPanel | SlideshowChartPanel;
        lang: string;
        allowMany?: boolean;
        centerSlide?: boolean;
        dynamicSelected?: boolean;
    }>(),
    {
        allowMany: true,
        centerSlide: false,
        dynamicSelected: false
    }
);

const emit = defineEmits(['slide-edit']);

// =========================================
// Definitions

dataModule(Highcharts);

const { $vfm } = getCurrentInstance()!.proxy!;
const { t } = useI18n();

const productStore = useProductStore();

const edited = ref(false);
const oldChartName = ref('');
const chartIdx = ref(1);

const storylinesChartConfigs = ref([] as Array<ChartConfig>);
const highchartsChartConfigs = ref([] as Array<HighchartsConfig>);
const chartVersions = ref({} as Record<string, number>);
const editingConfig = ref(null as HighchartsConfig | null);
const editingName = ref(null as string | null);

// =========================================
// Watchers

// =========================================
// Lifecycle functions

onMounted(() => {
    applyTextAlign(props.panel, props.centerSlide, props.dynamicSelected);

    // This allows us to access the chart(s) using one consistent variable instead of needing to check panel type.
    const charts =
        props.panel.type === PanelType.SlideshowChart
            ? (props.panel.items as Array<ChartPanel>)
            : props.panel.src
              ? [props.panel]
              : [];

    // fetch single existing chart config from ZIP
    if (props.panel.type === PanelType.Chart && props.panel.src) {
        fetchChartConfig(props.panel, 0, props.panel.config?.title?.text);
    }

    if (props.centerSlide && props.dynamicSelected) {
        for (const c in charts) {
            charts[c].customStyles += 'text-align: left;';
        }
    } else if (!props.centerSlide && props.dynamicSelected) {
        for (const c in charts) {
            charts[c].customStyles = (charts[c].customStyles || '').replace('text-align: left;', '');
        }
    }

    // fetch multiple existing chart configs from ZIP
    if (props.panel.type === PanelType.SlideshowChart) {
        let idx = 0;
        charts.forEach((chart: ChartPanel) => {
            fetchChartConfig(chart, idx, chart.name);
        });
    }
});

// =========================================
// Component functions

function fetchChartConfig(chart: ChartPanel | { config?: any; src?: string }, idx: number, chartName?: string) {
    const chartSrc = chart?.src?.split('/').slice(1).join('/');
    // chartName
    //     ? `charts/${this.lang}/${chartName}.json`
    //     : chart.src
    //       ? chart.src.substring(chart.src.indexOf('/') + 1)
    //       : '';

    let highchartsJson = productStore.configFileStructure.zip.file(chartSrc);

    // If not found, create file from config
    if (!highchartsJson && chartName) {
        const title = chartName;
        productStore.configFileStructure.charts[props.lang].file(
            `${title}.json`,
            JSON.stringify(chart.config, null, 4)
        );
        highchartsJson = productStore.configFileStructure.zip.file(chartSrc);
    }

    if (highchartsJson) {
        highchartsJson.async('string').then((res: string) => {
            highchartsChartConfigs.value.push(JSON.parse(res));
            extractStorylinesChartConfig(chart as ChartPanel, idx);
            idx += 1;
        });
    }
    chartIdx.value += 1;
}

function openEditor(name: string) {
    const idx = highchartsChartConfigs.value.findIndex((cfg) => cfg.title.text === name);
    if (idx !== -1) {
        editingConfig.value = highchartsChartConfigs.value[idx];
        editingName.value = name;
        $vfm.open('highcharts-edit-modal');
    }
    oldChartName.value = name;
}

function createNewChart(newConfig: HighchartsConfig): void {
    const chartSrc = `${productStore.configFileStructure.uuid}/charts/${props.lang}/${newConfig.title?.text}.json`;

    // Check to see if a chart already exists with the provided name. If so, alert the user and re-prompt.
    if (productStore.sourceExists(chartSrc)) {
        alert(
            t('editor.chart.label.nameExists', {
                name: newConfig.title?.text
            })
        );
        return;
    } else {
        const title = newConfig.title?.text;
        const chartConfig = {
            name: title,
            src: chartSrc
        };

        productStore.incrementSourceCount(chartSrc);

        // Add chart config to ZIP file.
        productStore.configFileStructure.charts[props.lang].file(`${title}.json`, JSON.stringify(newConfig, null, 4));
        storylinesChartConfigs.value.push(chartConfig);
        chartVersions.value[title] = 0;
        highchartsChartConfigs.value.push(newConfig);
    }
    onChartsEdited();
    $vfm.close('highcharts-create-modal');
    chartIdx.value += 1;
}

function extractStorylinesChartConfig(chart: ChartPanel, chartIdx: number): void {
    let chartName = '';
    // extract chart name
    if (highchartsChartConfigs.value[chartIdx]?.title.text) {
        chartName = highchartsChartConfigs.value[chartIdx]?.title.text;
    } else if (chart.options && chart.options.title) {
        chartName = chart.options.title;
    } else {
        const path = chart.src.match(/.*\/(.*)$/);
        chartName = path ? path[1].replace(/\.[^/.]+$/, '').replace(/\./g, ' ') : chart.src;
    }
    // save storylines chart config
    storylinesChartConfigs.value.push({
        name: chartName,
        ...chart
    });
    chartVersions.value[chartName] = 0;
}

function saveChart(name: string, updatedConfig: HighchartsConfig): void {
    const idx = storylinesChartConfigs.value.findIndex((c) => c.name === name);
    if (idx !== -1) {
        if (updatedConfig.title?.text !== oldChartName.value) {
            // Check to ensure chart does not rename to an existing chart title
            const newName = `${productStore.configFileStructure.uuid}/charts/${props.lang}/${updatedConfig.title?.text}.json`;
            if (productStore.sourceCounts[newName] > 0) {
                alert(
                    t('editor.chart.label.nameExists', {
                        name: updatedConfig.title?.text
                    })
                );
                return;
            }

            // Remove old chart config from ZIP file and add in new one.
            const oldName = `${productStore.configFileStructure.uuid}/charts/${props.lang}/${oldChartName.value}.json`;
            productStore.sourceCounts[oldName] -= 1;
            delete chartVersions.value[oldChartName.value];
            if (productStore.sourceCounts[oldName] === 0) {
                productStore.configFileStructure.charts[props.lang].remove(`${oldChartName.value}.json`);
            }

            if (productStore.sourceCounts[newName]) {
                productStore.sourceCounts[newName] += 1;
            } else {
                productStore.sourceCounts[newName] = 1;
            }
        }

        const newTitle = updatedConfig.title.text;
        // Add updated chart config to ZIP
        productStore.configFileStructure.charts[props.lang].file(
            `${newTitle}.json`,
            JSON.stringify(updatedConfig, null, 4)
        );

        // Update local copies of Highcharts + Storylines chart configs
        storylinesChartConfigs.value[idx] = {
            name: updatedConfig.title?.text,
            src: `${productStore.configFileStructure.uuid}/charts/${props.lang}/${newTitle}.json`
        };
        chartVersions.value[newTitle] = (chartVersions.value[newTitle] || 0) + 1;

        highchartsChartConfigs.value[idx] = updatedConfig;
    }
    onChartsEdited();
}

function deleteChart(chart: ChartConfig): void {
    const idx = storylinesChartConfigs.value.findIndex((chartFile: ChartConfig) => chartFile.name === chart.name);
    if (idx !== -1) {
        // Remove the chart from the config file.
        productStore.sourceCounts[`${productStore.configFileStructure.uuid}/charts/${props.lang}/${chart.name}.json`] -=
            1;
        if (
            productStore.sourceCounts[
                `${productStore.configFileStructure.uuid}/charts/${props.lang}/${chart.name}.json`
            ] === 0
        ) {
            productStore.configFileStructure.charts[props.lang].remove(`${chart.name}.json`);
        }
        storylinesChartConfigs.value.splice(idx, 1);
        highchartsChartConfigs.value.splice(idx, 1);
    }
    onChartsEdited();
}

function saveChanges(): void {
    if (edited.value) {
        // Delete the existing properties so we can rebuild the object.
        Object.keys(props.panel).forEach((key) => {
            // @ts-ignore
            delete props.panel[key];
        });

        // Handle case where every chart is deleted.
        if (storylinesChartConfigs.value.length === 0) {
            props.panel.type = PanelType.Chart;
            (props.panel as ChartPanel).src = '';
        } else if (storylinesChartConfigs.value.length === 1) {
            props.panel.type = PanelType.Chart;

            // Grab the one chart config from the array.
            const newChart = storylinesChartConfigs.value[0];

            // Sort of gross, but required to update the panel config as we're not allowed to directly manipulate props.
            Object.keys(newChart).forEach((key) => {
                // @ts-ignore
                (props.panel as ChartPanel)[key] = newChart[key];
            });
        } else {
            props.panel.type = PanelType.SlideshowChart;

            // Turn each of the chart configs into a chart panel and add them to the slideshow.
            (props.panel as SlideshowChartPanel).items = storylinesChartConfigs.value.map((chart: ChartConfig) => {
                return {
                    ...chart,
                    type: PanelType.Chart
                } as ChartPanel;
            });
        }
    }

    edited.value = false;
}

function onChartsEdited(): void {
    edited.value = true;
    saveChanges();
    emit('slide-edit', 'Chart editor');
}

// =========================================
// Component exposes

defineExpose({ saveChanges });
</script>

<style lang="scss">
.name-label {
    text-align: left !important;
}

.highcharts-app-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
