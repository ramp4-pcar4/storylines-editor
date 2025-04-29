<template>
    <div class="block">
        <!-- Upload images area -->
        <div
            class="upload-image flex items-center justify-center m-5 p-12 bg-blue-100 border-4 border-dashed border-blue-300"
            :class="{ dragging: isDragging }"
            @dragover.prevent="() => (dragging = true)"
            @dragleave.prevent="() => (dragging = false)"
            @drop.prevent="dropImages($event)"
            v-if="allowMany || (!allowMany && imagePreviews.length === 0)"
        >
            <label class="respected-standard-label flex drag-label cursor-pointer">
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
                            {{ $t('editor.label.or') }}
                            <span class="text-blue-700 font-bold">{{ $t('editor.label.browse') }}</span>
                            {{ $t('editor.label.upload') }}
                        </div>
                    </span>
                    <input type="file" class="cursor-pointer" @change="onFileChange" :multiple="!!allowMany" />
                </span>
            </label>
        </div>

        <div v-show="imagePreviews.length > 1" class="flex flex-col w-full text-left mb-4">
            <label class="respected-standard-label" for="imageSlideshowCaption">{{
                $t('editor.image.slideshowCaption')
            }}</label>
            <input
                id="imageSlideshowCaption"
                class="respected-standard-input w-full lg:w-2/3"
                type="text"
                v-model="slideshowCaption"
                @change="onImagesEdited"
            />
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
            class="flex flex-wrap list-none border my-4 rounded-md"
            @update="onImagesEdited"
            item-key="id"
        >
            <template #item="{ element, index }">
                <ImagePreview
                    :key="`${element.id}-${index}`"
                    :imageFile="element"
                    @delete="deleteImage"
                    class="border border-gray-200 rounded-md p-3"
                >
                    <div class="px-2 pb-2">
                        <div class="flex flex-col mt-4 w-full text-left self-center">
                            <label class="respected-standard-label" :for="'altTag' + index">{{
                                $t('editor.image.altTag')
                            }}</label>
                            <input
                                :id="'altTag' + index"
                                class="respected-standard-input"
                                type="text"
                                v-model="element.altText"
                                @change="onImagesEdited"
                            />
                        </div>

                        <div class="flex flex-col mt-4 w-full text-left self-center">
                            <label class="respected-standard-label" :for="'imgCaption' + index">{{
                                $t('editor.image.label.caption')
                            }}</label>
                            <input
                                :id="'imgCaption' + index"
                                class="respected-standard-input"
                                type="text"
                                v-model="element.caption"
                                @change="onImagesEdited"
                            />
                        </div>

                        <div class="lg:flex gap-2 mt-4">
                            <div class="flex flex-col text-left self-center">
                                <label class="respected-standard-label" :for="'imgHeight' + index">{{
                                    $t('editor.image.label.height')
                                }}</label>
                                <input
                                    :id="'imgHeight' + index"
                                    class="respected-standard-input w-full"
                                    type="number"
                                    v-model="element.height"
                                    @change="onImagesEdited"
                                    @keydown="
                                        (e) => {
                                            if (isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                e.preventDefault();
                                            }
                                        }
                                    "
                                />
                            </div>

                            <div class="flex flex-col mt-4 lg:mt-0 text-left self-center">
                                <div class="flex flex-row gap-1.5 justify-start items-center">
                                    <label class="respected-standard-label" :for="'imgWidth' + index">{{
                                        $t('editor.image.label.width')
                                    }}</label>
                                    <span
                                        :content="$t('editor.image.label.widthWarning')"
                                        v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                                        tabindex="0"
                                    >
                                        <svg
                                            class="fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 416.979 416.979"
                                            xml:space="preserve"
                                        >
                                            <g>
                                                <path
                                                    d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85   c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786   c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576   c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765   c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <input
                                    :id="'imgWidth' + index"
                                    class="respected-standard-input w-full"
                                    type="number"
                                    v-model="element.width"
                                    @change="onImagesEdited"
                                    @keydown="
                                        (e) => {
                                            if (isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                e.preventDefault();
                                            }
                                        }
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </ImagePreview>
            </template>
        </draggable>
    </div>
</template>

<script lang="ts">
import { applyTextAlign } from '@/utils/styleUtils';
import { Options, Prop, Vue } from 'vue-property-decorator';
import { ImageFile, ImagePanel, PanelType, SlideshowImagePanel } from '@/definitions';
import draggable from 'vuedraggable';
import ImagePreviewV from '../support/image-preview.vue';
import { useProductStore } from '@/stores/productStore';

@Options({
    components: {
        ImagePreview: ImagePreviewV,
        draggable
    }
})
export default class ImageEditorV extends Vue {
    @Prop() panel!: ImagePanel | SlideshowImagePanel;
    @Prop() lang!: string;
    @Prop({ default: true }) allowMany!: boolean;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

    productStore = useProductStore();

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
        applyTextAlign(this.panel, this.centerSlide, this.dynamicSelected);
        
        // This basically allows us to access the image(s) using one consistent variable instead of needing to check panel type.
        const images =
            this.panel.type === PanelType.SlideshowImage
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
                const compressedAssetFile = this.productStore.configFileStructure.zip.file(assetSrc);
                const assetType = assetSrc.split('.').at(-1);

                if (compressedAssetFile) {
                    this.imagePreviewPromises.push(
                        compressedAssetFile.async(assetType !== 'svg' ? 'blob' : 'text').then((assetFile) => {
                            if (assetType === 'svg') {
                                assetFile = new File([assetFile], filename, {
                                    type: 'image/svg+xml'
                                });
                            }
                            return {
                                ...image,
                                id: image.src,
                                src: URL.createObjectURL(assetFile)
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

    async addUploadedFile(file: File): Promise<ImageFile> {
        const { inSharedAsset, newAssetName, uploadSource } = await this.productStore.addUploadedFile(file);

        let imageSrc = URL.createObjectURL(file);
        return {
            id: uploadSource,
            altText: '',
            caption: '',
            src: imageSrc
        };
    }

    onFileChange(e: Event): void {
        // create object URL(s) to display image(s)
        const filelist = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>);
        const filePromises = filelist.map((file: File) => this.addUploadedFile(file));
        Promise.all(filePromises).then((files) => {
            this.imagePreviews.push(...files);
            this.onImagesEdited();
        });
        //reset input value
        (e.target as HTMLInputElement).value = '';
    }

    dropImages(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            let files = [...e.dataTransfer.files];

            // If allowMany is false, take the first one.
            if (!this.allowMany) {
                files = [files[0]];
            }

            const filePromises = files.map((file: File) => this.addUploadedFile(file));
            Promise.all(filePromises).then((files) => {
                this.imagePreviews.push(...files);
                this.onImagesEdited();
            });

            this.dragging = false;
        }
    }

    deleteImage(img: ImageFile): void {
        const idx = this.imagePreviews.findIndex((file: ImageFile) => file.id === img.id);
        if (idx !== -1) {
            const assetFolder = this.imagePreviews[idx].id.split('/')[2];
            const assetSource = this.imagePreviews[idx].id;
            const assetRelativePath = this.imagePreviews[idx].id.split('/').slice(3).join('/');

            // Remove the image from the product ZIP file.
            this.productStore.decrementSourceCount(assetSource);
            if (!this.productStore.sourceExists(assetSource)) {
                // Revote the object URL if the image has been fully removed.
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
                (this.panel as ImagePanel).src = imageFile.id;
            } else {
                // Otherwise, convert this to a slideshowImage panel.
                this.panel.type = PanelType.SlideshowImage;
                this.panel.caption = this.slideshowCaption ?? undefined;

                // Turn each of the image configs into an image panel and add them to the slideshow.
                (this.panel as SlideshowImagePanel).items = this.imagePreviews.map((imageFile: ImageFile) => {
                    const { id, ...restOfImage } = imageFile; // we don't need the id
                    const imageSrc = id;
                    return {
                        ...restOfImage,
                        src: imageSrc,
                        type: PanelType.Image
                    } as ImagePanel;
                });
            }
        }
        this.edited = false;
    }

    onImagesEdited(): void {
        this.edited = true;
        this.saveChanges();
        this.$emit('slide-edit', 'Image editor');
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
