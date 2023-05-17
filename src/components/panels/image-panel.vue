<template>
    <div class="graphic self-start justify-center flex flex-col h-full align-middle py-5 w-full">
        <full-screen :expandable="config.fullscreen" :type="config.type">
            <img
                ref="img"
                :src="slideIdx > 2 ? '' : config.src"
                :class="config.class"
                :alt="config.altText || ''"
                :style="{ width: `${config.width}px`, height: `${config.height}px` }"
                class="graphic-image px-10 mx-auto my-6 flex object-contain sm:max-w-screen sm:max-h-screen"
            />
        </full-screen>

        <div
            v-if="config.caption"
            class="text-center text-sm max-w-full graphic-caption"
            v-html="md.render(config.caption)"
        ></div>
    </div>
</template>

<script lang="ts">
import { ImagePanel } from '@/definitions';
import { Component, Prop, Vue } from 'vue-property-decorator';

import MarkdownIt from 'markdown-it';
import FullscreenV from '@/components/panels/helpers/fullscreen.vue';

@Component({
    components: {
        'full-screen': FullscreenV
    }
})
export default class ImagePanelV extends Vue {
    @Prop() config!: ImagePanel;
    @Prop() slideIdx!: number;

    md = new MarkdownIt({ html: true });

    observer =
        this.slideIdx > 2
            ? new IntersectionObserver(([image]) => {
                  // lazy load images
                  if (image.isIntersecting) {
                      (this.$refs.img as Element).setAttribute('src', this.config.src);
                      this.$forceUpdate();
                      this.observer!.disconnect();
                  }
              })
            : undefined;

    mounted(): void {
        this.observer?.observe(this.$refs.img as Element);
    }
}
</script>

<style lang="scss">
@media screen and (max-width: 640px) {
    .graphic {
        max-width: 100vw;
        background-color: white;
    }
    .graphic-image {
        max-height: 38vh;
    }
}
</style>
