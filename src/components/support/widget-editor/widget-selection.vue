<template>
    <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
        <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
            <h2 slot="header" class="text-xl font-semibold">{{ $t('widget.editor.header') }}</h2>
            <div class="flex flex-row gap-2">
                <!-- ENG/FR config toggle -->
                <button
                    class="respected-standard-button respected-gray-border-button respected-thin-button"
                    @click="onCancel"
                    tabindex="0"
                >
                    {{ $t('editor.cancel') }}
                </button>
            </div>
        </div>
    </div>
    <div class="widget-grid mx-4 py-5">
        <div
            @click="changeSelection('audio')"
            @keypress.enter="changeSelection('audio')"
            class="widget-selection"
            tabindex="0"
        >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="96" height="96" viewBox="0 0 75 75">
                <path
                    d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                    style="stroke: #111; stroke-width: 5; stroke-linejoin: round; fill: #111"
                />
                <path
                    d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                    style="fill: none; stroke: #111; stroke-width: 5; stroke-linecap: round"
                />
            </svg>
            <span>{{ $t('audio.editor.header') }}</span>
        </div>
        <!-- <div
            @click="changeSelection('gallery')"
            @keypress.enter="changeSelection('gallery')"
            class="widget-selection disabled"
            tabindex="0"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                height="96"
                width="96"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
                xml:space="preserve"
            >
                <g>
                    <g>
                        <path
                            d="M494.933,38.4h-409.6c-9.412,0-17.067,7.654-17.067,17.067v17.067H51.2c-9.412,0-17.067,7.654-17.067,17.067v17.067    H17.067C7.654,106.667,0,114.321,0,123.733v332.8c0,9.412,7.654,17.067,17.067,17.067h409.6c9.412,0,17.067-7.654,17.067-17.067    v-17.067H460.8c9.412,0,17.067-7.654,17.067-17.067v-17.067h17.067c9.412,0,17.067-7.654,17.067-17.067v-332.8    C512,46.054,504.346,38.4,494.933,38.4z M17.067,123.733h409.6l0.009,190.635l-44.783-51.183c-3.251-3.721-9.6-3.721-12.851,0    l-54.067,61.79L167.799,194.159c-3.234-2.884-8.098-2.884-11.332,0L17.067,318.071V123.733z M426.684,431.01v25.523H17.067V340.89    l145.067-128.947l147.934,131.49c1.69,1.51,3.942,2.193,6.204,2.142c2.278-0.145,4.395-1.186,5.888-2.901l53.308-60.911    l51.209,58.53l0.008,90.573c0,0.017-0.017,0.043-0.017,0.068S426.684,430.985,426.684,431.01z M460.8,422.4h-17.067V123.733    c0-9.412-7.654-17.067-17.067-17.067H51.2V89.6h409.6V422.4z M494.933,388.267h-17.067V89.6c0-9.412-7.654-17.067-17.067-17.067    H85.333V55.467h409.6V388.267z"
                        />
                    </g>
                </g>
                <g>
                    <g>
                        <path
                            d="M307.2,174.933c-18.825,0-34.133,15.309-34.133,34.133S288.375,243.2,307.2,243.2s34.133-15.309,34.133-34.133    S326.025,174.933,307.2,174.933z M307.2,226.133c-9.412,0-17.067-7.654-17.067-17.067c0-9.412,7.654-17.067,17.067-17.067    s17.067,7.654,17.067,17.067C324.267,218.479,316.612,226.133,307.2,226.133z"
                        />
                    </g>
                </g>
            </svg>
            Image Gallery
        </div> -->
        <div class="widget-selection disabled" tabindex="0"></div>
        <div class="widget-selection disabled" tabindex="0"></div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class WidgetSelectionV extends Vue {
    changeSelection(newSelection: 'audio' | 'gallery' | 'none'): void {
        this.$emit('change', newSelection);
    }

    onCancel(): void {
        this.$emit('cancel');
    }
}
</script>

<style lang="scss">
.widget-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.widget-selection {
    @apply border-2 border-dashed border-gray-300  p-5 text-center cursor-pointer hover:bg-gray-100;
    justify-items: center;
    align-items: center;

    & .disabled {
        color: #ccc;
    }
}
</style>
