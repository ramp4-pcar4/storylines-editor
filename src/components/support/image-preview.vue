<template>
    <li class="image-item items-center my-8 mx-4 overflow-hidden">
        <div class="relative items-center justify-center text-center w-full grabbable pt-8">
            <button
                class="respected-standard-button respected-transparent-button absolute h-6 w-6 leading-5 rounded-full top-1 left-0 p-0 cursor-pointer"
                @click="() => $emit('delete', imageFile)"
                :content="$t('editor.image.delete')"
                v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                :aria-label="$t('editor.image.delete')"
            >
                <svg height="24px" width="24px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <gallery-buttons
                v-if="itemCount > 1"
                class="side-buttons"
                ref="galleryButtons"
                :index="index"
                :itemCount="itemCount"
                galleryType="image"
                @move-left="$emit('move-left', index)"
                @move-right="$emit('move-right', index)"
            />
            <div class="flex-grow image-container">
                <img
                    class="image-file object-cover"
                    :title="imageFile.id.split('/').at(-1)"
                    :src="imageFile.src"
                    :alt="imageFile.altText"
                />
            </div>
        </div>
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { ImageFile } from '@/definitions';
import GalleryButtonsV from '../support/gallery-buttons.vue';

@Options({
    components: {
        'gallery-buttons': GalleryButtonsV
    }
})
export default class ImagePreviewV extends Vue {
    @Prop() imageFile!: ImageFile;
    @Prop() index!: number;
    @Prop() itemCount!: number;
}
</script>

<style lang="scss" scoped>
.image-item {
    width: 30%;
    cursor: move; // fallback
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;

    .image-file {
        aspect-ratio: auto;
        max-height: 300px;
    }

    .image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
    }

    button {
        padding: 0 !important;
    }
}

@media only screen and (max-width: 1500px) {
    .image-item {
        width: 41%;
    }
}

@media only screen and (max-width: 900px) {
    .image-item {
        width: 90%;
    }

    .image-container {
        padding-left: 1.75rem;
        padding-right: 1.75rem;
    }

    .side-buttons {
        @apply left-0 top-1/2 transform -translate-y-1/2 flex-col gap-3 right-auto top-auto;
    }
}
</style>
