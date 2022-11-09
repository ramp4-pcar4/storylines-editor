<template>
    <li class="image-item items-center my-8 mx-5 overflow-hidden">
        <div class="relative items-center justify-center text-center w-full">
            <button
                class="bg-white absolute h-6 w-6 leading-5 rounded-full top-0 right-0 p-0 cursor-pointer"
                @click="() => $emit('delete', imageFile)"
            >
                <svg height="20px" width="20px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <img
                class="image-file object-cover w-full h-full"
                :title="imageFile.id"
                :src="imageFile.src"
                :alt="imageFile.altText"
            />
        </div>
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ImageFile } from '@/definitions';

@Component({})
export default class ImagePreviewV extends Vue {
    @Prop() imageFile!: ImageFile;
}
</script>

<style lang="scss" scoped>
.image-item {
    width: 30%;

    .image-file {
        aspect-ratio: 1/1;
    }
}
</style>
