<template>
    <div class="block">
        <!-- Upload images area -->
        <div
            class="upload-image text-center m-5 p-12 bg-blue-100 cursor-pointer"
            @dragover.prevent="() => (dragging = true)"
            @dragleave.prevent="() => (dragging = false)"
            @drop.prevent="dropImages($event)"
        >
            <label for="file-input">
                <span>
                    <div>Drag your images here</div>
                    <div>or <span class="text-blue-400 font-bold">browse</span> to upload</div>
                </span>
                <input
                    type="file"
                    id="file-input"
                    class="inline-block font-semibold cursor-pointer"
                    @change="onFileChange"
                    multiple="multiple"
                />
            </label>
        </div>

        <!-- Gallery preview of all images -->
        <ul class="flex flex-wrap list-none" v-show="imageFiles.length">
            <ImagePreview v-for="(image, idx) in imageFiles" :key="idx" :imageFile="image" @delete="deleteImage">
                <div class="mt-10">
                    <label>Alt tag:</label>
                    <input type="text" v-model="altText" />
                </div>
            </ImagePreview>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ImageFile } from '@/definitions';
import ImagePreviewV from '@/components/editor/helpers/image-preview.vue';

@Component({
    components: {
        ImagePreview: ImagePreviewV
    }
})
export default class ImageEditorV extends Vue {
    imageURLs = [] as Array<string>;
    imageFiles = [] as Array<ImageFile>;
    imageTitle = '';
    dragging = false;
    altText = '';

    // TODO: add file saving mechanism once user save storylines task complete #227

    onFileChange(e: Event): void {
        // create object URL(s) to display image(s)
        const filelist = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>);
        this.imageURLs = filelist.map((file: File) => URL.createObjectURL(file));
        this.imageFiles = filelist.map((file: File) => {
            return {
                id: file.name,
                src: URL.createObjectURL(file),
                altText: ''
            };
        });
        console.log('UPLOAD IMAGES: ', this.imageFiles);
    }

    dropImages(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            const files = [...e.dataTransfer.files];
            this.imageFiles = files.map((file: File) => {
                return {
                    id: file.name,
                    src: URL.createObjectURL(file),
                    altText: ''
                };
            });
            console.log('DRAG IMAGES: ', this.imageFiles);
            this.dragging = false;
        }
    }

    deleteImage(img: ImageFile): void {
        const idx = this.imageFiles.findIndex((file: ImageFile) => file.id === img.id);
        if (idx !== -1) {
            this.imageFiles.splice(idx, 1);
        }
        console.log('DELETING IMAGE: ', img, idx);
    }
}
</script>

<style lang="scss" scoped>
.upload-image {
    // max-width: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: 0.2s ease;

    input[type='file']:not(:focus-visible) {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
}
</style>
