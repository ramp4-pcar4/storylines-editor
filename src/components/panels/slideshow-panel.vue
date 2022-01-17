<template>
    <div class="w-full px-10 my-8 bg-gray-200_ h-28_" :style="{ width: `${width}px` }">
        <hooper ref="carousel" v-if="width !== -1" class="h-auto" :infiniteScroll="config.loop">
            <slide v-for="(image, index) in config.images" :key="index" :index="index" class="self-center">
                <img
                    :src="image.src"
                    :height="image.height"
                    :width="image.width"
                    :alt="image.altText"
                    class="m-auto story-graphic"
                />
            </slide>

            <hooper-navigation slot="hooper-addons"></hooper-navigation>
            <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>

        <div v-if="config.caption" class="text-center mt-5 text-sm" v-html="md.render(config.caption)"></div>
    </div>
</template>

<script lang="ts">
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

import MarkdownIt from 'markdown-it';

import { SlideshowPanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: {
        Hooper,
        Slide,
        HooperNavigation,
        HooperPagination
    }
})
export default class SlideshowPanelV extends Vue {
    @Prop() config!: SlideshowPanel;

    width = -1;

    md = new MarkdownIt({ html: true });

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
