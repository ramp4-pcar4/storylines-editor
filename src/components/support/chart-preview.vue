<template>
    <li class="items-center mt-8 mx-5 overflow-hidden w-full" :class="itemCount > 1 ? 'chart-item' : 'single-chart'">
        <div class="relative border-solid border-2 items-center justify-center text-center w-full">
            <button
                class="respected-standard-button respected-transparent-button close-button top-0"
                style="top: 0.5rem; left: 0.5rem"
                @click="() => $emit('delete', chart)"
                :content="$t('editor.chart.delete')"
                v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                :aria-label="$t('editor.chart.delete')"
            >
                <svg height="22px" width="22px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <button
                v-if="itemCount > 1"
                style="top: 2rem; left: 0.5rem"
                class="respected-standard-button respected-transparent-button close-button handle"
                :content="$t('editor.chart.drag')"
                v-tippy="{ placement: 'bottom', hideOnClick: false, animateFill: true }"
                :aria-label="$t('editor.chart.delete')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="22px" height="22px" viewBox="0 0 24 24">
                    <path
                        fill-rule="evenodd"
                        d="M8,18 C9.1045695,18 10,18.8954305 10,20 C10,21.1045695 9.1045695,22 8,22 C6.8954305,22 6,21.1045695 6,20 C6,18.8954305 6.8954305,18 8,18 Z M16,18 C17.1045695,18 18,18.8954305 18,20 C18,21.1045695 17.1045695,22 16,22 C14.8954305,22 14,21.1045695 14,20 C14,18.8954305 14.8954305,18 16,18 Z M8,10 C9.1045695,10 10,10.8954305 10,12 C10,13.1045695 9.1045695,14 8,14 C6.8954305,14 6,13.1045695 6,12 C6,10.8954305 6.8954305,10 8,10 Z M16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 C14.8954305,14 14,13.1045695 14,12 C14,10.8954305 14.8954305,10 16,10 Z M8,2 C9.1045695,2 10,2.8954305 10,4 C10,5.1045695 9.1045695,6 8,6 C6.8954305,6 6,5.1045695 6,4 C6,2.8954305 6.8954305,2 8,2 Z M16,2 C17.1045695,2 18,2.8954305 18,4 C18,5.1045695 17.1045695,6 16,6 C14.8954305,6 14,5.1045695 14,4 C14,2.8954305 14.8954305,2 16,2 Z"
                    />
                </svg>
            </button>
            <gallery-buttons
                v-if="itemCount > 1"
                class="side-buttons mx-3"
                ref="galleryButtons"
                :index="index"
                :itemCount="itemCount"
                galleryType="chart"
                @move-left="$emit('move-left', index)"
                @move-right="$emit('move-right', index)"
            />
            <!-- chart component -->
            <div class="chart-container p-4">
                <storylines-chart
                    class="w-full max-h-[300px] chart-interactive"
                    :config="chart"
                    :key="chartVersion"
                    :configFileStructure="productStore.configFileStructure"
                    v-if="!loading"
                ></storylines-chart>
            </div>
        </div>
        <!-- chart description and edit  -->
        <div class="flex flex-col-reverse lg:flex-row mt-4 items-start flex-wrap gap-2 gap-x-2 px-1 pb-1">
            <div class="flex-1 flex flex-col w-full">
                <label class="respected-standard-label"> {{ $t('editor.chart.label.name') }}</label>
                <label class="name-label font-bold">
                    <span class="font-normal break-all">{{ chartName }}</span>
                </label>

                <label :for="'chartPreviewCaption' + index" class="respected-standard-label mt-2">
                    {{ $t('editor.image.label.caption') }}
                </label>
                <input
                    :id="'chartPreviewCaption' + index"
                    class="respected-standard-input w-full"
                    type="text"
                    v-model="chart.caption"
                    :placeholder="$t('editor.caption.placeholder')"
                    @input="$emit('captionEdit')"
                />
            </div>

            <!-- edit button -->
            <button
                class="respected-standard-button respected-gray-border-button respected-thin-button"
                :id="`edit-${chart.name}-btn`"
                @click="$emit('edit', chart)"
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
    </li>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { ChartConfig } from '@/definitions';
import { useProductStore } from '@/stores/productStore';

import GalleryButtonsV from '../support/gallery-buttons.vue';

import Highcharts from 'highcharts';
import dataModule from 'highcharts/modules/data';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

dataModule(Highcharts);
exporting(Highcharts);
exportData(Highcharts);

@Options({
    components: {
        'gallery-buttons': GalleryButtonsV
    }
})
export default class ChartPreviewV extends Vue {
    @Prop() chart!: ChartConfig;
    @Prop() lang!: string;
    @Prop() index!: number;
    @Prop() itemCount!: number;
    @Prop() chartVersion!: number;

    productStore = useProductStore();

    loading = true;
    chartIdx = 0;
    chartName = '';

    mounted(): void {
        this.chartName = this.chart.name || '';
        this.loading = false;
    }
}
</script>

<style lang="scss" scoped>
.chart-item {
    width: 43%;

    .handle {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
}

.single-chart {
    max-width: 650px;
}

.close-button {
    background-color: white;
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
    line-height: 1.25rem;
    border-radius: 9999px;

    padding: 0;
    z-index: 10;
    cursor: pointer;
}

@media only screen and (max-width: 1050px) {
    .chart-item,
    .single-chart {
        width: 90%;
    }

    .chart-container {
        margin-left: 15px;
    }

    .side-buttons {
        @apply left-0 top-1/2 transform -translate-y-1/2 flex-col gap-3 right-auto top-auto;
    }
}
</style>
