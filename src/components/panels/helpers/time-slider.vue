<template>
    <div class="time-slider">
        <span class="my-2.5 text-base">{{ range[0] }} - {{ range[1] }}</span>
        <div class="time-slider-backdrop"></div>
        <div ref="sliderTarget" class="noUi-target noUiSlider"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import noUiSlider, { API, PipsMode } from 'nouislider';
import { TimeSliderConfig } from '@/definitions';

@Component
export default class TimeSlider extends Vue {
    @Prop() config!: TimeSliderConfig;
    @Prop() mapi!: any;

    sliderElement!: HTMLElement;
    slider!: API;
    start: number | undefined;
    end: number | undefined;
    range: string[] = ['', ''];

    mounted(): void {
        this.start = 2010;
        this.end = 2019;
        this.sliderElement = this.$refs.sliderTarget as HTMLElement;
        this.slider = noUiSlider.create(this.sliderElement, {
            start: this.config.start,
            range: {
                min: this.config.range[0],
                max: this.config.range[1]
            },
            connect: true,
            step: 1,
            pips: {
                mode: PipsMode.Steps,
                density: 1,
                filter: (val: number) => {
                    if (val % 1 === 0) {
                        return 1;
                    }
                    return -1;
                }
            }
        });

        this.slider.on('update', () => {
            this.range = (this.slider.get() as string[]).map((n: string) => {
                return n.split('.')[0];
            });

            this.mapi.layers.allLayers[0].setFilterSql(
                'time_slider',
                `${this.config.attribute} >= ${this.range[0]} AND ${this.config.attribute} <= ${this.range[1]}`
            );
        });

        // to have an element focusable inside the RAMP container, its tabindex must not be 0;
        // tabindex 0 is controlled by the browser; RAMP focus manager will ignore such elements and not set focus to them;
        const sliderHandles = this.sliderElement.querySelectorAll('.noUi-handle');
        sliderHandles.forEach((handle: Element) => {
            handle.setAttribute('tabindex', '-2');
        });
    }
}
</script>

<style lang="scss">
.time-slider {
    @import './../../../../node_modules/nouislider/dist/nouislider';

    @apply absolute w-full left-0 flex flex-col items-center bg-white;

    height: 150px;
    pointer-events: all;

    .noUi-target {
        @apply w-4/5;
    }

    // hide the slider rail
    .noUi-connect {
        background: var(--sr-accent-colour);
    }

    .noUi-base {
        @apply cursor-pointer;
    }

    // hide most of the slider handle leaving a bottom border only
    .noUi-origin {
        .noUi-handle {
            &::before,
            &::after {
                content: none !important;
            }

            @apply w-7 right-0 transform translate-x-1/2 cursor-pointer;

            border-radius: 50%;
            border-color: #595959;
        }
    }
}
</style>
