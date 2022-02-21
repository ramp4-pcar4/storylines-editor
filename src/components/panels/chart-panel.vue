<template>
    <div class="self-start w-full px-10 my-8 bg-gray-200_ h-28_" :style="{ width: `${width}px` }">
        <hooper
            ref="carousel"
            v-if="width !== -1 && config.charts.length > 1"
            class="h-auto"
            :infiniteScroll="config.loop"
        >
            <slide
                v-for="(chartConfig, index) in config.charts"
                :key="`chart-${index}`"
                :index="index"
                class="self-center"
            >
                <dqv-chart :config="chartConfig" />
            </slide>

            <hooper-navigation slot="hooper-addons"></hooper-navigation>
            <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>

        <div v-else-if="width !== -1">
            <dqv-chart :config="config.charts[0]" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
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

    width = -1;

    mounted(): void {
        setTimeout(() => {
            this.width = this.$el.clientWidth;
        }, 100);

        // window.addEventListener('resize', () => {
        //     // adjust width for mobile resolutions
        //     if (window.innerWidth > 640) {
        //         this.width = 1121;
        //         console.log('NORMAL SCREEN: ', this.width);
        //     } else {
        //         this.width = 0.97 * window.innerWidth;
        //         console.log('MOBILE SCREEN: ', this.width);
        //     }
        // });
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
</style>
