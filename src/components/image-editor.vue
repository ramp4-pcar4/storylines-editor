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
            <label class="editor-label flex drag-label cursor-pointer">
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
            <label class="editor-label" for="imageSlideshowCaption">{{ $t('editor.image.slideshowCaption') }}</label>
            <input
                id="imageSlideshowCaption"
                class="editor-input w-full lg:w-2/3"
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
                            <label class="editor-label" :for="'altTag' + index">{{ $t('editor.image.altTag') }}</label>
                            <input
                                :id="'altTag' + index"
                                class="editor-input"
                                type="text"
                                v-model="element.altText"
                                @change="onImagesEdited"
                            />
                        </div>

                        <div class="flex flex-col mt-4 w-full text-left self-center">
                            <label class="editor-label" :for="'imgCaption' + index">{{
                                $t('editor.image.label.caption')
                            }}</label>
                            <input
                                :id="'imgCaption' + index"
                                class="editor-input"
                                type="text"
                                v-model="element.caption"
                                @change="onImagesEdited"
                            />
                        </div>

                        <div class="lg:flex gap-2 mt-4">
                            <div class="flex flex-col text-left self-center">
                                <label class="editor-label" :for="'imgHeight' + index">{{
                                    $t('editor.image.label.height')
                                }}</label>
                                <input
                                    :id="'imgHeight' + index"
                                    class="editor-input w-full"
                                    type="text"
                                    v-model="element.height"
                                    @change="onImagesEdited"
                                />
                            </div>

                            <div class="flex flex-col mt-4 lg:mt-0 text-left self-center">
                                <div class="flex flex-row gap-1.5 justify-start items-center">
                                    <label class="editor-label" :for="'imgWidth' + index">{{
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
                                    class="editor-input w-full"
                                    type="text"
                                    v-model="element.width"
                                    @change="onImagesEdited"
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
import { Options, Prop, Vue } from 'vue-property-decorator';
import { ConfigFileStructure, ImageFile, ImagePanel, PanelType, SlideshowPanel, SourceCounts } from '@/definitions';
import draggable from 'vuedraggable';
import ImagePreviewV from './helpers/image-preview.vue';

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
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

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

        if (this.centerSlide && this.dynamicSelected) {
            for (const i in images) {
                images[i].customStyles += 'text-align: left;';
            }
        } else if (!this.centerSlide && this.dynamicSelected) {
            for (const i in images) {
                images[i].customStyles = (images[i].customStyles || '').replace('text-align: left;', '');
            }
        }

        if (images !== undefined && images.length) {
            // Set images as loading until they are all loaded and resolve.
            this.imagePreviewsLoading = true;

            // Process each existing image.
            images.map((image: ImagePanel) => {
                // Check if the config file exists in the ZIP folder first.
                const assetSrc = `${image.src.substring(image.src.indexOf('/') + 1)}`;
                const filename = image.src.replace(/^.*[\\/]/, '');
                const assetFile = this.configFileStructure.zip.file(assetSrc);
                const assetType = assetSrc.split('.').at(-1);

                if (assetFile) {
                    if (assetType != 'svg') {
                        this.imagePreviewPromises.push(
                            assetFile.async('blob').then((res: Blob) => {
                                return {
                                    ...image,
                                    id: filename ? filename : image.src,
                                    src: URL.createObjectURL(res)
                                } as ImageFile;
                            })
                        );
                    } else {
                        this.imagePreviewPromises.push(
                            assetFile.async('text').then((res) => {
                                const imageFile = new File([res], filename, {
                                    type: 'image/svg+xml'
                                });
                                return {
                                    ...image,
                                    id: filename ? filename : image.src,
                                    src: URL.createObjectURL(imageFile)
                                } as ImageFile;
                            })
                        );
                    }
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
