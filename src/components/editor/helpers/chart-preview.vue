<template>
    <li class="chart-item items-center my-8 mx-5 overflow-hidden">
        <div class="relative border-solid border-2 items-center justify-center text-center w-full">
            <button
                class="bg-white absolute h-6 w-6 leading-5 rounded-full top-0 left-0 p-0 z-10 cursor-pointer"
                @click="() => $emit('delete', chart)"
            >
                <svg height="22px" width="22px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <dqv-chart class="w-full h-full" :config="chart" :key="chartIdx"></dqv-chart>
        </div>
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ChartFile } from '@/definitions';
import ChartV from '@/components/panels/helpers/chart.vue';

@Component({
    components: {
        'dqv-chart': ChartV
    }
})
export default class ChartPreviewV extends Vue {
    @Prop() chart!: ChartFile;
    @Prop() chartIdx!: number;
}
</script>

<style lang="scss" scoped>
.chart-item {
    width: 46%;
}
</style>
