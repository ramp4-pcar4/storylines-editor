<template>
    <div class="block">
        <!-- Upload images area -->
        <div
            class="upload-image text-center m-5 p-12 bg-blue-100"
            :class="{ dragging: isDragging }"
            @dragover.prevent="() => (dragging = true)"
            @dragleave.prevent="() => (dragging = false)"
            @drop.prevent="dropImages($event)"
        >
            <label class="drag-label cursor-pointer">
                <span>
                    <div>{{ $t('editor.image.label.drag') }}</div>
                    <div>
                        {{ $t('editor.image.label.or') }}
                        <span class="text-blue-400 font-bold">{{ $t('editor.image.label.browse') }}</span>
                        {{ $t('editor.image.label.upload') }}
                    </div>
                </span>
                <input type="file" class="cursor-pointer" @change="onFileChange" multiple="multiple" />
            </label>
        </div>

        <!-- Gallery preview of all images -->
        <ul class="flex flex-wrap list-none" v-show="imagePreviews.length">
            <ImagePreview v-for="(image, idx) in imagePreviews" :key="idx" :imageFile="image" @delete="deleteImage">
                <div class="flex mt-4 items-center">
                    <label class="alt-label">Alt tag:</label>
                    <input type="text" v-model="image.altText" />
                </div>
            </ImagePreview>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ImagePanel, ImageFile } from '@/definitions';
import ImagePreviewV from '@/components/editor/helpers/image-preview.vue';

@Component({
    components: {
        ImagePreview: ImagePreviewV
    }
})
export default class ImageEditorV extends Vue {
    @Prop() panel!: any;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;

    dragging = false;
    imagePreviews = [] as Array<ImageFile>;

    get isDragging(): boolean {
        return this.dragging;
    }

    mounted(): void {
        this.imagePreviews = this.panel.images.map((image: ImagePanel) => {
            const filename = image.src.replace(/^.*[\\/]/, '');
            return {
                ...image,
                id: filename ? filename : image.src
            };
        });
        // console.log('MOUNTED IMAGE EDITOR: ', this.imagePreviews, this.panel.images);
    }

    onFileChange(e: Event): void {
        // create object URL(s) to display image(s)
        const filelist = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>);
        this.imagePreviews.push(
            ...filelist.map((file: File) => {
                // Add the uploaded images to the product ZIP file.
                this.configFileStructure.assets[this.lang].file(file.name, file);

                return {
                    id: file.name,
                    altText: '',
                    src: URL.createObjectURL(file)
                };
            })
        );
    }

    dropImages(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            const files = [...e.dataTransfer.files];
            this.imagePreviews.push(
                ...files.map((file: File) => {
                    // Add the uploaded images to the product ZIP file.
                    this.configFileStructure.assets[this.lang].file(file.name, file);

                    return {
                        id: file.name,
                        altText: '',
                        src: URL.createObjectURL(file)
                    };
                })
            );
            this.dragging = false;
        }
    }

    deleteImage(img: ImageFile): void {
        const idx = this.imagePreviews.findIndex((file: ImageFile) => file.id === img.id);
        if (idx !== -1) {
            // Remove the image from the product ZIP file.
            this.configFileStructure.assets[this.lang].remove(this.imagePreviews[idx].id);
            URL.revokeObjectURL(this.imagePreviews[idx].src);
            this.imagePreviews.splice(idx, 1);
        }
    }

    saveChanges(final: boolean): void {
        this.panel.images = this.imagePreviews.map((imageFile: ImageFile) => {
            return {
                ...imageFile,
                src: final ? `${this.configFileStructure.uuid}/assets/en/${imageFile.id}` : imageFile.src
            };
        });
        // console.log('FINALIZING IMAGE CHANGES: ', this.panel.images, this.imagePreviews);
    }
}
</script>

<style lang="scss" scoped>
.upload-image {
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

.drag-label {
    width: auto !important;
}

.alt-label {
    width: 12% !important;
    margin-right: 0.5rem !important;
    text-align: left !important;
}

.dragging {
    background-color: #fffaf0;
    border-color: #fff;
}
</style>
