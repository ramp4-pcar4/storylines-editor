<template>
    <li class="relative w-1/5 m-4 overflow-hidden">
        <button class="cursor-pointer" @click="() => $emit('delete', imageFile)">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        </button>
        <img class="block object-cover w-full h-full" :src="imageFile.src" />
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

<style lang="scss" scoped></style>
