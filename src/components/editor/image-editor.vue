<template>
    <div class="block">
        <!-- Upload images area -->
        <div
            class="upload-image text-center m-5 p-12 bg-blue-100 border-4 border-dashed border-blue-300"
            :class="{ dragging: isDragging }"
            @dragover.prevent="() => (dragging = true)"
            @dragleave.prevent="() => (dragging = false)"
            @drop.prevent="dropImages($event)"
            v-if="allowMany || (!allowMany && imagePreviews.length === 0)"
        >
            <label class="flex drag-label cursor-pointer">
                <span class="align-middle inline-block pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                        <path
                            d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"
                        />
                    </svg>
                </span>
                <span class="align-middle inline-block">
                    <span>
                        <div>{{ $t('editor.image.label.drag') }}</div>
                        <div>
                            {{ $t('editor.image.label.or') }}
                            <span class="text-blue-400 font-bold">{{ $t('editor.image.label.browse') }}</span>
                            {{ $t('editor.image.label.upload') }}
                        </div>
                    </span>
                    <input type="file" class="cursor-pointer" @change="onFileChange" :multiple="!!allowMany" />
                </span>
            </label>
        </div>

        <span
            v-if="allowMany || (!allowMany && imagePreviews.length === 0)"
            v-show="!imagePreviewsLoading && imagePreviews.length"
            class="flex justify-center"
        >
            <i> {{ $t('editor.image.reorder') }}</i>
        </span>

        <!-- Gallery preview of all images -->
        <draggable
            v-model="imagePreviews"
            v-show="!imagePreviewsLoading && imagePreviews.length"
            class="flex flex-wrap list-none border my-4"
            @update="onImagesEdited"
            item-key="id"
        >
            <template #item="{ element, index }">
                <ImagePreview :key="`${element.id}-${index}`" :imageFile="element" @delete="deleteImage">
                    <div class="flex mt-4 items-center w-full text-left">
                        <label class="text-label">{{ $t('editor.image.altTag') }}:</label>
                        <input class="w-4/5" type="text" v-model="element.altText" @change="onImagesEdited" />
                    </div>

                    <div class="flex mt-4 items-center w-full text-left">
                        <label class="text-label">{{ $t('editor.image.label.caption') }}:</label>
                        <input class="w-4/5" type="text" v-model="element.caption" @change="onImagesEdited" />
                    </div>
                </ImagePreview>
            </template>
        </draggable>

        <div v-show="imagePreviews.length > 1" class="flex items-center w-full text-left">
            <label class="text-label">{{ $t('editor.image.slideshowCaption') }}:</label>
            <input class="w-3/5" type="text" v-model="slideshowCaption" @change="onImagesEdited" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { ConfigFileStructure, ImageFile, ImagePanel, PanelType, SlideshowPanel, SourceCounts } from '@/definitions';
import draggable from 'vuedraggable';
import ImagePreviewV from '@/components/editor/helpers/image-preview.vue';

@Options({
    components: {
        ImagePreview: ImagePreviewV,
        draggable
    }
})
export default class ImageEditorV extends Vue {
    @Prop() panel!: ImagePanel | SlideshowPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop({ default: true }) allowMany!: boolean;

    dragging = false;
    edited = false;

    imagePreviewsLoading = false;
    imagePreviewPromises = [] as Array<Promise<ImageFile>>;
    imagePreviews = [] as Array<ImageFile>;
    slideshowCaption = '';

    get isDragging(): boolean {
        return this.dragging;
    }

    mounted(): void {
        // This basically allows us to access the image(s) using one consistent variable instead of needing to check panel type.
        const images =
            this.panel.type === PanelType.Slideshow
                ? (this.panel.items as Array<ImagePanel>)
                : this.panel.src
                ? [this.panel]
                : [];

        if (images !== undefined && images.length) {
            // Set images as loading until they are all loaded and resolve.
            this.imagePreviewsLoading = true;

            // Process each existing image.
            images.map((image: ImagePanel) => {
                // Check if the config file exists in the ZIP folder first.
                const assetSrc = `${image.src.substring(image.src.indexOf('/') + 1)}`;
                const filename = image.src.replace(/^.*[\\/]/, '');

                const assetFile = this.configFileStructure.zip.file(assetSrc);
                if (assetFile) {
                    this.imagePreviewPromises.push(
                        assetFile.async('blob').then((res: Blob) => {
                            return {
                                ...image,
                                id: filename ? filename : image.src,
                                src: URL.createObjectURL(res)
                            } as ImageFile;
                        })
                    );
                }
            });

            // Once all images have been retrieved, display them.
            Promise.all(this.imagePreviewPromises).then((res) => {
                this.imagePreviews = res;
                this.imagePreviewsLoading = false;
            });

            this.slideshowCaption = this.panel.caption as string;
        }
    }

    onFileChange(e: Event): void {
        // create object URL(s) to display image(s)
        const filelist = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>);
        this.imagePreviews.push(
            ...filelist.map((file: File) => {
                // Add the uploaded images to the product ZIP file.
                const uploadSource = `${this.configFileStructure.uuid}/assets/${this.lang}/${file.name}`;
                this.configFileStructure.assets[this.lang].file(file.name, file);

                if (this.sourceCounts[uploadSource]) {
                    this.sourceCounts[uploadSource] += 1;
                } else {
                    this.sourceCounts[uploadSource] = 1;
                }

                let imageSrc = URL.createObjectURL(file);
                return {
                    id: file.name,
                    altText: '',
                    caption: '',
                    src: imageSrc
                };
            })
        );
        this.onImagesEdited();
    }

    dropImages(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            let files = [...e.dataTransfer.files];

            // If allowMany is false, take the first one.
            if (!this.allowMany) {
                files = [files[0]];
            }

            this.imagePreviews.push(
                ...files.map((file: File) => {
                    // Add the uploaded images to the product ZIP file.
                    const uploadSource = `${this.configFileStructure.uuid}/assets/${this.lang}/${file.name}`;
                    this.configFileStructure.assets[this.lang].file(file.name, file);

                    if (this.sourceCounts[uploadSource]) {
                        this.sourceCounts[uploadSource] += 1;
                    } else {
                        this.sourceCounts[uploadSource] = 1;
                    }

                    let imageSrc = URL.createObjectURL(file);
                    return {
                        id: file.name,
                        altText: '',
                        caption: '',
                        src: imageSrc
                    };
                })
            );
            this.dragging = false;
        }
        this.onImagesEdited();
    }

    deleteImage(img: ImageFile): void {
        const idx = this.imagePreviews.findIndex((file: ImageFile) => file.id === img.id);
        if (idx !== -1) {
            const fileSource = `${this.configFileStructure.uuid}/assets/${this.lang}/${this.imagePreviews[idx].id}`;

            // Remove the image from the product ZIP file.
            this.sourceCounts[fileSource] -= 1;
            if (this.sourceCounts[fileSource] === 0) {
                this.configFileStructure.assets[this.lang].remove(this.imagePreviews[idx].id);
                URL.revokeObjectURL(this.imagePreviews[idx].src);
            }
            this.imagePreviews.splice(idx, 1);
        }
        this.onImagesEdited();
    }

    saveChanges(): void {
        if (this.edited) {
            // Delete the existing properties so we can rebuild the object.
            Object.keys(this.panel).forEach((key) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                delete this.panel[key];
            });

            // Handle case where everything is deleted.
            if (this.imagePreviews.length === 0) {
                this.panel.type = PanelType.Image;
                (this.panel as ImagePanel).src = '';
            } else if (this.imagePreviews.length === 1) {
                // If there's only one image uploaded, convert this to an image panel.
                this.panel.type = PanelType.Image;

                // Grab the one image from the array.
                const imageFile = this.imagePreviews[0];

                // Sort of gross, but required to update the panel config as we're not allowed to directly manipulate props.
                Object.keys(imageFile).forEach((key) => {
                    if (key === 'id') return; // we don't need this one.

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (this.panel as ImagePanel)[key] = imageFile[key];
                });

                (this.panel as ImagePanel).src = `${this.configFileStructure.uuid}/assets/${this.lang}/${imageFile.id}`;
            } else {
                // Otherwise, convert this to a slideshow panel.
                this.panel.type = PanelType.Slideshow;
                this.panel.caption = this.slideshowCaption ?? undefined;

                // Turn each of the image configs into an image panel and add them to the slidesow.
                (this.panel as SlideshowPanel).items = this.imagePreviews.map((imageFile: ImageFile) => {
                    return {
                        ...imageFile,
                        src: `${this.configFileStructure.uuid}/assets/${this.lang}/${imageFile.id}`,
                        type: PanelType.Image
                    } as ImagePanel;
                });
            }
        }
        this.edited = false;
    }

    onImagesEdited(): void {
        this.edited = true;
        this.$emit('slide-edit');
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

.text-label {
    width: 25% !important;
    margin-right: 0.5rem !important;
    margin-bottom: 0 !important;
}

.dragging {
    background-color: #fffaf0;
    border-color: #fff;
}
</style>
