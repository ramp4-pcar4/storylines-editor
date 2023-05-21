<template>
    <div class="flex">
        <div class="carousel self-center px-10 my-8 mx-auto bg-gray-200_" :style="{ width: `${width}px` }">
            <hooper
                @slide="onSlide"
                ref="carousel"
                v-if="width !== -1 && config.items.length > 1"
                :infiniteScroll="config.loop"
            >
                <slide v-for="(panelConfig, index) in panelConfigs" :key="`item-${index}`" :index="index">
                    <panel :config="panelConfig" :configFileStructure="configFileStructure" :slideIdx="slideIdx" />
                </slide>

                <hooper-navigation slot="hooper-addons"></hooper-navigation>
                <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>

            <div v-else-if="width !== -1">
                <panel :config="panelConfigs[0]" :configFileStructure="configFileStructure" :slideIdx="slideIdx" />
            </div>

            <div v-if="config.caption" class="text-center mt-5 text-sm" v-html="md.render(config.caption)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

import MarkdownIt from 'markdown-it';

import { SlideshowPanel } from '@/definitions';
import FullscreenV from '@/components/panels/helpers/fullscreen.vue';

@Component({
    components: {
        Hooper,
        Slide,
        'full-screen': FullscreenV,
        HooperNavigation,
        HooperPagination,
        panel: () => import('./panel.vue')
    }
})
export default class SlideshowPanelV extends Vue {
    @Prop() config!: SlideshowPanel;
    @Prop() configFileStructure!: any;
    @Prop() slideIdx!: number;

    md = new MarkdownIt({ html: true });
    panelConfigs: Array<any> = [];

    width = -1;

    mounted(): void {
        this.panelConfigs = this.config.items.map((item) => {
            let panelConfig: any = { ...item.config, type: item.type };
            if (item.type === 'chart') {
                panelConfig.charts = [item.config];
            } else if (item.type === 'image') {
                panelConfig.images = [item.config];
            }
            return panelConfig;
        });
        setTimeout(() => {
            this.width = this.$el.clientWidth;
        }, 100);
    }

    onSlide() {
        const hooperList = this.$el.querySelector('.hooper-list') as HTMLElement;
        setTimeout(() => {
            // use setTimeout otherwise you get value for previous slide for some reason..
            const hooperHeight = this.$el.querySelector('.is-current')?.clientHeight;
            hooperList.style.maxHeight = hooperHeight + 'px';
        }, 100);
    }
}
</script>

<style lang="scss" scoped>
.hooper {
    height: auto;
    ::v-deep .hooper-navigation svg {
        overflow: visible;
        padding-left: initial !important;
        border-radius: 100%;
        background: radial-gradient(white, transparent 75%);
    }

    ::v-deep .hooper-list {
        max-height: 300px;
        transition: all 0.1s;
    }

    ::v-deep .hooper-next {
        right: calc(-32px - 2em);
    }

    ::v-deep .hooper-prev {
        left: calc(-32px - 2em);
    }

    ::v-deep .hooper-pagination {
        transform: translate(50%, 200%);
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
        background-color: white;
    }
    .carousel-image {
        max-height: 48vh;
    }

    .graphic {
        max-width: 100vw;
        background-color: white;
    }
    .graphic-image {
        max-height: 38vh;
    }
}
</style>
