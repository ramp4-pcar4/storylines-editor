<template>
    <div class="time-slider">
        <button class="absolute top-1 left-4 play-button" @click="intervalID >= 0 ? endLoop() : startLoop()">
            <svg
                v-if="intervalID === -1"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#595959"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 5v14l11-7z" />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#595959"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
        </button>
        <span class="my-2.5 text-base range-display"
            ><span class="">{{ range[0] }}</span
            ><span class="" v-if="range[1]"> - {{ range[1] }}</span></span
        >
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
    intervalID = -1;

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
            const sliderValues = this.slider.get() as string | string[];
            if (Array.isArray(sliderValues)) {
                this.range = sliderValues.map((n: string) => {
                    return n.split('.')[0];
                });
            } else {
                this.range = [sliderValues.split('.')[0]];
            }

            let sqlString: string;

            switch (this.range.length) {
                case 1:
                    sqlString = `${this.config.attribute} = ${this.range[0]}`;
                    break;

                default:
                    sqlString = `${this.config.attribute} >= ${this.range[0]} AND ${this.config.attribute} <= ${this.range[1]}`;
                    break;
            }

            this.mapi.layers.allLayers[0].setFilterSql('time_slider', sqlString);
        });

        // to have an element focusable inside the RAMP container, its tabindex must not be 0;
        // tabindex 0 is controlled by the browser; RAMP focus manager will ignore such elements and not set focus to them;
        const sliderHandles = this.sliderElement.querySelectorAll('.noUi-handle');
        sliderHandles.forEach((handle: Element) => {
            handle.setAttribute('tabindex', '-2');
        });
    }

    /**
     * Begins looping through the values on the time slider
     */
    startLoop(): void {
        const sliderValues = this.slider.get() as string | string[];
        if (Array.isArray(sliderValues)) {
            this.slider.set(sliderValues.map(() => sliderValues[0]));
        }
        // delay happens before first call
        this.intervalID = setInterval(this.moveHandleRight, 1400);
    }

    /**
     * Moves handle(s) one to the right of the first (leftmost) handle. Loops if the handles are at the end.
     */
    moveHandleRight(): void {
        const sliderValues = this.slider.get(true) as number | number[];
        let newValues;
        if (Array.isArray(sliderValues)) {
            newValues = sliderValues.map(() => {
                return sliderValues[0] === this.config.range[1] ? this.config.range[0] : sliderValues[0] + 1;
            });
        } else {
            newValues = [sliderValues === this.config.range[1] ? this.config.range[0] : sliderValues + 1];
        }
        this.slider.set(newValues);
    }

    /**
     * Cancels looping through the values on the time slider
     */
    endLoop(): void {
        clearInterval(this.intervalID);
        // reset so template knows we aren't looping
        this.intervalID = -1;
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

    // MEDIA QUERY
    @media screen and (max-width: 640px) {
        .noUi-value:nth-of-type(4n) {
            display: none;
        }

        .range-display {
            @apply m-0;
        }

        .noUi-marker-large {
            height: 9px !important;
        }

        .play-button {
            @apply left-2 top-0;
        }
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
