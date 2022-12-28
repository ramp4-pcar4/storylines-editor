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
        <ul class="flex flex-wrap list-none" v-show="imageFiles.length">
            <ImagePreview v-for="(image, idx) in imageFiles" :key="idx" :imageFile="image" @delete="deleteImage">
                <div class="flex mt-4 items-center">
                    <label class="alt-label">Alt tag:</label>
                    <input type="text" />
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

    imageFiles = [] as Array<ImageFile>;
    dragging = false;
    // TODO: add file saving mechanism once user save storylines task complete #227

    mounted(): void {
        // load image files from existing storylines product
        if (this.panel.type === 'slideshow' && this.panel.images.length) {
            this.imageFiles = this.panel.images.map((image: ImagePanel) => {
                const path = image.src.match(/.*\/(.*)$/);
                return {
                    id: path ? path[-1] : image.src,
                    src: image.src,
                    altText: image.altText
                };
            });
        } else if (this.panel.src !== undefined) {
            const path = this.panel.src.match(/.*\/(.*)$/);
            this.imageFiles.push({
                id: path ? path[-1] : this.panel.src,
                src: this.panel.src,
                altText: this.panel.altText
            });
        }
    }

    get isDragging(): boolean {
        return this.dragging;
    }

    onFileChange(e: Event): void {
        // create object URL(s) to display image(s)
        const filelist = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>);
        this.imageFiles.push(
            ...filelist.map((file: File) => {
                // Add the uploaded images to the product ZIP file.
                this.configFileStructure.assets[this.lang].file(file.name, file);

                return {
                    id: file.name,
                    src: URL.createObjectURL(file),
                    altText: ''
                };
            })
        );
    }

    dropImages(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            const files = [...e.dataTransfer.files];
            this.imageFiles.push(
                ...files.map((file: File) => {
                    // Add the uploaded images to the product ZIP file.
                    this.configFileStructure.assets[this.lang].file(file.name, file);

                    return {
                        id: file.name,
                        src: URL.createObjectURL(file),
                        altText: ''
                    };
                })
            );
            this.dragging = false;
        }
    }

    deleteImage(img: ImageFile): void {
        const idx = this.imageFiles.findIndex((file: ImageFile) => file.id === img.id);
        if (idx !== -1) {
            // Remove the image from the product ZIP file.
            this.configFileStructure.assets[this.lang].remove(this.imageFiles[idx].id);
            this.imageFiles.splice(idx, 1);
        }
    }

    saveChanges(): void {
        // TODO - save all alt texts, image files, final config, etc.
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
