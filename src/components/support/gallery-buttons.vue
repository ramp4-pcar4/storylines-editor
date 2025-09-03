<template>
    <div
        :class="['absolute flex z-50 top-1 right-0 gap-2', galleryType === 'image' ? 'image-gallery' : 'chart-gallery']"
    >
        <button
            class="flex justify-center items-center transform -rotate-90 p-1"
            :class="{ 'text-gray-400 opacity-30 cursor-not-allowed': index === 0 }"
            :disabled="index === 0"
            :aria-label="getMoveUpLabel()"
            v-tippy="{
                delay: '200',
                placement: 'top',
                content: getMoveUpLabel(),
                touch: ['hold', 500]
            }"
            @click="$emit('move-left', index)"
        >
            <svg class="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 66.91" height="14" width="14">
                <path
                    d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95
             c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73
             c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                />
            </svg>
        </button>

        <button
            class="flex justify-center items-center transform rotate-90 p-1"
            :class="{ 'text-gray-400 opacity-20 cursor-not-allowed': index === itemCount - 1 }"
            :disabled="index === itemCount - 1"
            :aria-label="getMoveDownLabel()"
            v-tippy="{
                delay: '200',
                placement: 'top',
                content: getMoveDownLabel(),
                touch: ['hold', 500]
            }"
            @click="$emit('move-right', index)"
        >
            <svg
                class="down-arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 66.91"
                height="14"
                width="14"
            >
                <path
                    d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95
             c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73
             c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class GalleryButtonsV extends Vue {
    @Prop() index!: number;
    @Prop() itemCount!: number;
    @Prop() galleryType!: string;

    getMoveUpLabel(): string {
        return this.galleryType === 'image' ? this.$t('editor.image.moveImageUp') : this.$t('editor.chart.moveChartUp');
    }

    getMoveDownLabel(): string {
        return this.galleryType === 'image'
            ? this.$t('editor.image.moveImageDown')
            : this.$t('editor.chart.moveChartDown');
    }
}
</script>

<style lang="scss">
button:hover {
    background-color: rgb(209, 213, 219);
}

@media (max-width: 900px) {
    .image-gallery .up-arrow,
    .image-gallery .down-arrow {
        transform: rotate(90deg);
    }
}

@media (max-width: 1050px) {
    .chart-gallery .up-arrow,
    .chart-gallery .down-arrow {
        transform: rotate(90deg);
    }
}
</style>
