<template>
    <div v-if="config.images.length === 1">
        <div class="graphic self-start justify-center flex flex-col h-full align-middle py-5 w-full">
            <full-screen :expandable="config.images[0].fullscreen" :type="config.type">
                <img
                    ref="img"
                    :src="slideIdx > 2 ? '' : config.images[0].src"
                    :class="config.images[0].class"
                    :alt="config.images[0].altText || ''"
                    :style="{ width: `${config.images[0].width}px`, height: `${config.images[0].height}px` }"
                    class="graphic-image px-10 mx-auto my-6 flex object-contain sm:max-w-screen sm:max-h-screen"
                />
            </full-screen>

            <div
                v-if="config.images[0].caption"
                class="text-center text-sm max-w-full graphic-caption"
                v-html="md.render(config.images[0].caption)"
            ></div>
        </div>
    </div>
    <div class="flex" v-else>
        <div
            ref="images"
            class="carousel self-center px-10 my-8 mx-auto bg-gray-200_ h-28_"
            :style="{ width: `${width}px` }"
        >
            <full-screen :expandable="config.fullscreen" :type="config.type">
                <hooper ref="carousel" v-if="width !== -1" class="h-full bg-white" :infiniteScroll="config.loop">
                    <slide v-for="(image, index) in config.images" :key="index" :index="index" class="self-center">
                        <img
                            :data-src="image.src"
                            :src="slideIdx > 2 ? '' : image.src"
                            :alt="image.altText || ''"
                            :style="{ width: `${image.width}px`, height: `${image.height}px` }"
                            class="m-auto story-graphic carousel-image"
                        />
                        <div
                            v-if="image.caption"
                            class="text-center my-8 text-sm"
                            v-html="md.render(image.caption)"
                        ></div>
                    </slide>

                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
            </full-screen>

            <div v-if="config.caption" class="text-center mt-5 text-sm" v-html="md.render(config.caption)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

import MarkdownIt from 'markdown-it';

import { ImagePanel } from '@/definitions';
import FullscreenV from '@/components/panels/helpers/fullscreen.vue';

@Component({
    components: {
        Hooper,
        Slide,
        'full-screen': FullscreenV,
        HooperNavigation,
        HooperPagination
    }
})
export default class SlideshowPanelV extends Vue {
    @Prop() config!: ImagePanel;
    @Prop() configFileStructure!: any;
    @Prop() slideIdx!: number;

    width = -1;

    md = new MarkdownIt({ html: true });

    observer =
        this.slideIdx > 2
            ? new IntersectionObserver(([image]) => {
                  // lazy load images
                  if (image.isIntersecting) {
                      if (this.config.images.length === 1) {
                          (this.$refs.img as Element).setAttribute('src', this.config.images[0].src);
                      } else {
                          (this.$refs.images as Element).querySelectorAll('.carousel-image').forEach((img) => {
                              img.setAttribute('src', img.getAttribute('data-src')!);
                          });
                      }
                      this.$forceUpdate();
                      this.observer!.disconnect();
                  }
              })
            : undefined;

    mounted(): void {
        setTimeout(() => {
            this.width = this.$el.clientWidth;
        }, 100);

        // obtain image files from ZIP folder in editor preview mode
        if (this.configFileStructure) {
            this.config.images.forEach((image) => {
                const assetSrc = `${image.src.substring(image.src.indexOf('/') + 1)}`;
                if (this.configFileStructure.zip.file(assetSrc)) {
                    this.configFileStructure.zip
                        .file(assetSrc)
                        .async('blob')
                        .then((res: any) => {
                            image.src = URL.createObjectURL(res);
                            this.$forceUpdate();
                        });
                }
            });
        }

        if (this.config.images.length > 1) {
            this.observer?.observe(this.$refs.images as Element);
        } else if (this.config.images.length === 1) {
            this.observer?.observe(this.$refs.img as Element);
        }
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
