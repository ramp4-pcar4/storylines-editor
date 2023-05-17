<template>
    <div class="carousel self-start px-10 my-8 bg-gray-200_" :style="{ width: `${width}px` }">
        <hooper
            ref="carousel"
            v-if="width !== -1 && config.charts.length > 1"
            class="h-full"
            :infiniteScroll="config.loop"
        >
            <slide
                v-for="(chartConfig, index) in config.charts"
                :key="`chart-${index}`"
                :index="index"
                class="self-center"
            >
                <dqv-chart :config="chartConfig" :configFileStructure="configFileStructure" />
            </slide>

            <hooper-navigation slot="hooper-addons"></hooper-navigation>
            <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>

        <div v-else-if="width !== -1">
            <dqv-chart :config="config.charts[0]" :configFileStructure="configFileStructure" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Hooper, Navigation as HooperNavigation, Pagination as HooperPagination, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

import { ChartPanel } from '@/definitions';
import ChartV from '@/components/panels/helpers/chart.vue';

@Component({
    components: {
        'dqv-chart': ChartV,
        Hooper,
        Slide,
        HooperNavigation,
        HooperPagination
    }
})
export default class ChartPanelV extends Vue {
    @Prop() config!: ChartPanel;
    @Prop() configFileStructure!: any;

    width = -1;

    mounted(): void {
        setTimeout(() => {
            this.width = this.$el.clientWidth;
        }, 100);
    }
}
</script>

<style lang="scss" scoped>
.hooper {
    height: auto;

    ::v-deep .hooper-navigation svg {
        overflow: visible;
    }

    ::v-deep .hooper-indicator {
        border: 1px solid #878787;

        width: 24px;
        height: 6px;
        border-radius: 0px;

        &.is-active {
            border: none;
            background-color: var(--sr-accent-colour);
        }

        &:hover {
            background-color: white;
            // background-color: lighten(#00d2d3, 20%);
            border-color: var(--sr-accent-colour);
        }
    }
}

@media screen and (max-width: 640px) {
    .carousel {
        max-width: 100vw;
        max-height: 50vh;
        background-color: white;
    }
}
</style>
