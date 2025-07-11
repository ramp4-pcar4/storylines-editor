<template>
    <div>
        <!-- Section: Title, orientation -->
        <section>
            <!-- Title -->
            <div class="metadata-item">
                <label class="respected-standard-label" for="metaTitle">{{ $t('editor.title') }}</label>
                <!-- v-show prevents WAVE warning for orphaned form label -->
                <div v-show="editing">
                    <input
                        type="text"
                        name="title"
                        id="metaTitle"
                        :value="productStore.metadata.title"
                        @change="metadataChanged"
                        class="respected-standard-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.title') }}
                    </p>
                </div>
                <p v-if="!editing">{{ productStore.metadata.title || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Layout and Navigation Section -->
            <section class="border mt-5 rounded-md px-4 md:px-5 py-3">
                <h2 class="text-xl font-bold">{{ $t('editor.metadataForm.layoutAndNav.heading') }}</h2>
                <!-- Same TOC orientation and return-to-top values across both ENG/FR configs -->
                <div class="metadata-item">
                    <div class="flex gap-2">
                        <input
                            v-show="editing"
                            type="checkbox"
                            id="sameConfig"
                            class="self-center rounded-none cursor-pointer w-4 h-4"
                            v-model="productStore.metadata.sameConfig"
                            @change="metadataChanged"
                        />
                        <label class="respected-standard-label" for="sameConfig">{{ $t('editor.sameConfig') }}</label>
                    </div>
                    <p v-show="editing" class="metadata-subcaption">
                        {{ $t('editor.sameConfig.info') }}
                    </p>
                    <p v-if="!editing">
                        {{
                            productStore.metadata.sameConfig
                                ? $t('editor.metadataForm.enabled')
                                : $t('editor.metadataForm.disabled')
                        }}
                    </p>
                </div>
                <!-- ToC orientation -->
                <div class="metadata-item">
                    <label class="respected-standard-label" for="toc">{{ $t('editor.tocOrientation') }}</label>
                    <div v-show="editing">
                        <select
                            class="respected-standard-select"
                            name="tocOrientation"
                            id="toc"
                            @change="metadataChanged"
                            v-model="productStore.metadata.tocOrientation"
                        >
                            <option value="vertical">{{ $t('editor.tocOrientation.vertical') }}</option>
                            <option value="horizontal">{{ $t('editor.tocOrientation.horizontal') }}</option>
                        </select>
                        <p class="metadata-subcaption">
                            {{ $t('editor.metadataForm.caption.tocOrientation') }}
                        </p>
                    </div>
                    <p v-if="!editing">{{ productStore.metadata.tocOrientation || $t('editor.metadataForm.na') }}</p>
                </div>
                <!-- Include return to top navigation -->
                <div class="metadata-item">
                    <div class="flex gap-2">
                        <input
                            v-show="editing"
                            type="checkbox"
                            id="returnToTop"
                            class="self-center rounded-none cursor-pointer w-4 h-4"
                            v-model="productStore.metadata.returnTop"
                            @change="metadataChanged"
                        />
                        <label class="respected-standard-label" for="returnToTop">{{ $t('editor.returnTop') }}</label>
                    </div>
                    <p v-show="editing" class="metadata-subcaption">
                        {{ $t('editor.tocOrientation.info') }}
                    </p>
                    <p v-if="!editing">
                        {{
                            productStore.metadata.returnTop
                                ? $t('editor.metadataForm.enabled')
                                : $t('editor.metadataForm.disabled')
                        }}
                    </p>
                </div>
            </section>
        </section>
        <!-- Section: Introduction page details -->
        <section class="border mt-5 rounded-md px-4 md:px-5 py-3">
            <h2 class="text-xl font-bold">{{ $t('editor.metadataForm.introPage.heading') }}</h2>
            <p class="mb-5">
                {{ $t('editor.metadataForm.introPage.explanation') }}
            </p>
            <!-- Subsection: Intro title/subtitles -->
            <section class="flex gap-2 flex-wrap">
                <!-- Intro title -->
                <div class="metadata-item w-full md:w-5/12 flex-1">
                    <label class="respected-standard-label" for="introTitle">{{ $t('editor.slides.title') }}</label>
                    <div v-show="editing">
                        <input
                            type="text"
                            name="introTitle"
                            :value="productStore.metadata.introTitle"
                            @change="metadataChanged"
                            id="introTitle"
                            class="respected-standard-input"
                        />
                        <p class="metadata-subcaption">
                            {{ $t('editor.metadataForm.caption.introTitle') }}
                        </p>
                    </div>
                    <p v-if="!editing">{{ productStore.metadata.introTitle || $t('editor.metadataForm.na') }}</p>
                </div>
                <!-- Intro subtitle -->
                <div class="metadata-item w-full md:w-5/12 flex-1">
                    <label class="respected-standard-label" for="introSubtitle">{{ $t('editor.slides.intro') }}</label>
                    <div v-show="editing">
                        <input
                            type="text"
                            name="introSubtitle"
                            id="introSubtitle"
                            :value="productStore.metadata.introSubtitle"
                            @change="metadataChanged"
                            class="respected-standard-input"
                        />
                        <p class="metadata-subcaption">
                            {{ $t('editor.metadataForm.caption.introSubtitle') }}
                        </p>
                    </div>
                    <p v-if="!editing">{{ productStore.metadata.introSubtitle || $t('editor.metadataForm.na') }}</p>
                </div>
            </section>
            <!-- Subsection: Logo stuff -->
            <section>
                <div class="metadata-item">
                    <label class="respected-standard-label" for="metaLogo">{{ $t('editor.logo') }}</label>
                    <div v-show="editing" class="flex flex-wrap gap-2 items-center">
                        <!-- Logo URL -->
                        <input
                            type="text"
                            id="metaLogo"
                            @change="onImageSourceInput($event, 'logo')"
                            :value="productStore.metadata.logoName"
                            class="respected-standard-input lg:w-1/2"
                        />
                        <!-- Upload button -->
                        <button
                            @click.stop="openFileSelector('logoUpload')"
                            class="respected-standard-button respected-black-bg-button respected-form-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M19 4H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H5V8h14v10h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2m-7.35 6.35l-2.79 2.79c-.32.32-.1.86.35.86H11v5c0 .55.45 1 1 1s1-.45 1-1v-5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01"
                                />
                            </svg>
                            <div>{{ $t('editor.browse') }}</div>
                        </button>
                        <!-- Delete button -->
                        <button
                            v-if="productStore.metadata.logoName || productStore.metadata.logoPreview"
                            @click.stop="removeLogo"
                            class="respected-standard-button respected-gray-border-button respected-form-button"
                        >
                            {{ $t('editor.remove') }}
                        </button>
                    </div>
                    <p class="break-all" v-if="!editing">
                        {{ productStore.metadata.logoName || $t('editor.metadataForm.na') }}
                    </p>
                </div>
                <!-- Logo Preview -->
                <div v-if="!!productStore.metadata.logoPreview" class="metadata-item">
                    <div class="respected-standard-label">{{ $t('editor.logoPreview') }}:</div>
                    <img
                        :src="productStore.metadata.logoPreview"
                        v-if="!!productStore.metadata.logoPreview && productStore.metadata.logoPreview != 'error'"
                        class="image-preview"
                        :alt="$t('editor.logoPreviewAltText')"
                    />
                    <p v-if="productStore.metadata.logoPreview == 'error'" class="image-preview">
                        {{ $t('editor.image.loadingError') }}
                    </p>
                </div>
                <!-- hide the actual file input. Label prevents a WAVE error -->
                <label style="display: none" for="logoUpload">Logo upload</label>
                <input
                    type="file"
                    id="logoUpload"
                    @change="onFileChange($event, 'logo')"
                    class="respected-standard-input w-1/4"
                    style="display: none"
                />
                <!-- Logo alt text -->
                <div class="metadata-item">
                    <label class="respected-standard-label" for="logoAltText">{{ $t('editor.logoAltText') }}</label>
                    <div v-show="editing">
                        <input
                            type="text"
                            name="logoAltText"
                            id="logoAltText"
                            :value="productStore.metadata.logoAltText"
                            @change="metadataChanged"
                            class="respected-standard-input"
                        />
                        <p class="metadata-subcaption">
                            {{ $t('editor.metadataForm.caption.logoAltText') }}
                        </p>
                    </div>
                    <p v-if="!editing">{{ productStore.metadata.logoAltText || $t('editor.metadataForm.na') }}</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <div class="metadata-item">
                        <span class="respected-standard-label">{{ $t('editor.introTitleColour') }}</span>
                        <ColourPickerInput
                            name="titleColour"
                            :value="productStore.metadata.titleColour"
                            @change="metadataChanged"
                            :disabled="!editing"
                        />
                    </div>
                    <div class="metadata-item">
                        <span class="respected-standard-label">{{ $t('editor.introSubtitleColour') }}</span>
                        <ColourPickerInput
                            name="subtitleColour"
                            :value="productStore.metadata.subtitleColour"
                            @change="metadataChanged"
                            :disabled="!editing"
                        />
                    </div>
                    <div class="metadata-item">
                        <div class="flex gap-2 items-center">
                            <span class="respected-standard-label">{{ $t('editor.introButtonColour') }}</span>
                            <span
                                :content="$t('editor.colourPicker.label.buttonLabel')"
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
                        <ColourPickerInput
                            name="buttonColour"
                            :value="productStore.metadata.buttonColour"
                            @change="metadataChanged"
                            :disabled="!editing"
                        />
                    </div>
                </div>
            </section>
            <!-- Subsection: Intro background stuff -->
            <section>
                <div class="metadata-item">
                    <label class="respected-standard-label" for="metaIntroBg">{{ $t('editor.introBackground') }}</label>
                    <div v-show="editing">
                        <!-- Intro slide background URL -->
                        <div class="flex flex-wrap gap-2 items-center">
                            <input
                                type="text"
                                id="metaIntroBg"
                                @change="onImageSourceInput($event, 'introBg')"
                                :value="productStore.metadata.introBgName"
                                class="respected-standard-input lg:w-1/2"
                            />
                            <!-- Upload button -->
                            <button
                                style="padding-top: 6.5px; padding-bottom: 6.5px"
                                @click.stop="openFileSelector('backgroundUpload')"
                                class="respected-standard-button respected-black-bg-button respected-form-button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19 4H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H5V8h14v10h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2m-7.35 6.35l-2.79 2.79c-.32.32-.1.86.35.86H11v5c0 .55.45 1 1 1s1-.45 1-1v-5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01"
                                    />
                                </svg>
                                <div>{{ $t('editor.browse') }}</div>
                            </button>
                            <!-- Delete button -->
                            <button
                                v-if="productStore.metadata.introBgName || productStore.metadata.introBgPreview"
                                @click.stop="removeIntroBackground"
                                class="respected-standard-button respected-gray-border-button respected-form-button"
                            >
                                {{ $t('editor.remove') }}
                            </button>
                        </div>
                        <p class="metadata-subcaption">
                            {{ $t('editor.metadataForm.caption.introBackground') }}
                        </p>
                    </div>

                    <p class="break-all" v-if="!editing">
                        {{ productStore.metadata.introBgName || $t('editor.metadataForm.na') }}
                    </p>
                </div>
                <!-- Logo Preview -->
                <div v-if="!!productStore.metadata.introBgPreview" class="metadata-item">
                    <div class="respected-standard-label">{{ $t('editor.introBackgroundPreview') }}:</div>
                    <img
                        :src="productStore.metadata.introBgPreview"
                        v-if="!!productStore.metadata.introBgPreview && productStore.metadata.introBgPreview != 'error'"
                        class="image-preview"
                        :alt="$t('editor.introBackgroundPreview')"
                    />
                    <p v-if="productStore.metadata.introBgPreview == 'error'" class="image-preview">
                        {{ $t('editor.image.loadingError') }}
                    </p>
                </div>
                <!-- hide the actual file input. Label prevents a WAVE error -->
                <label style="display: none" for="backgroundUpload">Intro background upload</label>
                <input
                    type="file"
                    id="backgroundUpload"
                    @change="onFileChange($event, 'introBg')"
                    class="respected-standard-input w-1/4"
                    style="display: none"
                />
            </section>
        </section>
        <!-- Section: End of page information -->
        <section class="border mt-5 rounded-md px-4 md:px-5 py-3">
            <h2 class="text-xl font-bold">{{ $t('editor.metadataForm.endOfPage.heading') }}</h2>
            <p class="mb-5">{{ $t('editor.metadataForm.endOfPage.explanation') }}</p>
            <!-- Context link -->
            <div class="metadata-item">
                <label class="respected-standard-label" for="contextLink">{{ $t('editor.contextLink') }}</label>
                <div v-show="editing">
                    <input
                        type="text"
                        name="contextLink"
                        id="contextLink"
                        :value="productStore.metadata.contextLink"
                        @change="metadataChanged"
                        class="respected-standard-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.contextLink') }}
                    </p>
                </div>
                <p class="break-all" v-if="!editing">
                    {{ productStore.metadata.contextLink || $t('editor.metadataForm.na') }}
                </p>
            </div>
            <!-- Context label -->
            <div class="metadata-item">
                <label class="respected-standard-label" for="contextLabel">{{ $t('editor.contextLabel') }}</label>
                <div v-show="editing">
                    <input
                        type="text"
                        name="contextLabel"
                        id="contextLabel"
                        :value="productStore.metadata.contextLabel"
                        @change="metadataChanged"
                        class="respected-standard-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.contextLabel') }}
                    </p>
                </div>
                <p v-if="!editing">{{ productStore.metadata.contextLabel || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Date modified -->
            <div class="metadata-item">
                <label class="respected-standard-label" for="dateModified">{{ $t('editor.dateModified') }}</label>
                <div v-show="editing">
                    <input
                        class="respected-standard-input w-full md:w-1/3"
                        type="date"
                        name="dateModified"
                        id="dateModified"
                        :value="productStore.metadata.dateModified"
                        @change="metadataChanged"
                    />
                </div>
                <p v-if="!editing">{{ productStore.metadata.dateModified || $t('editor.metadataForm.na') }}</p>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { MetadataContent } from '@/definitions';
import { Options, Prop, Vue } from 'vue-property-decorator';
import ColourPickerInput from '../support/colour-picker-input.vue';
import { useProductStore } from '@/stores/productStore';

@Options({
    components: {
        ColourPickerInput: ColourPickerInput
    }
})
export default class MetadataEditorV extends Vue {
    @Prop({ default: true }) editing!: boolean;

    productStore = useProductStore();

    productStore = useProductStore();

    openFileSelector(where = 'logoUpload'): void {
        document.getElementById(where)?.click();
    }

    metadataChanged(event: Event): void {
        this.productStore.updateMetadata(
            (event.target as HTMLInputElement).name,
            (event.target as HTMLInputElement).value
        );
    }

    removeLogo(): void {
        this.productStore.metadata.logoName = '';
        this.productStore.metadata.logoPreview = '';
        this.productStore.decrementSourceCount('Logo');
    }

    removeIntroBackground(): void {
        this.productStore.metadata.introBgName = '';
        this.productStore.metadata.introBgPreview = '';
        this.productStore.decrementSourceCount('Background');
    }

    onImageSourceInput(e: InputEvent, src: string): void {
        const isImgUrl = (url: string) => {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
                img.onerror = () => resolve(false);
                img.onload = () => resolve(true);
            });
        };

        switch (src) {
            case 'logo':
                this.productStore.metadata.logoName = (e.target as HTMLInputElement).value;

                isImgUrl(this.productStore.metadata.logoName).then((res) => {
                    if (res) {
                        this.productStore.metadata.logoPreview = this.productStore.metadata.logoName;
                        Message.success(this.$t('editor.editMetadata.message.imageSuccessfulLoad'));
                    } else {
                        this.productStore.metadata.logoPreview = 'error';
                        Message.error(this.$t('editor.editMetadata.message.error.imageFailedLoad'));
                    }
                });

                break;
            case 'introBg':
                this.productStore.metadata.introBgName = (e.target as HTMLInputElement).value;

                isImgUrl(this.productStore.metadata.introBgName).then((res) => {
                    if (res) {
                        this.productStore.metadata.introBgPreview = this.productStore.metadata.introBgName;
                        Message.success(this.$t('editor.editMetadata.message.imageSuccessfulLoad'));
                    } else {
                        this.productStore.metadata.introBgPreview = 'error';
                        Message.error(this.$t('editor.editMetadata.message.error.imageFailedLoad'));
                    }
                });
                break;
            default:
                console.error('onImageSourceInput received invalid source.');
        }
    }

    onFileChange(e: Event, src: string): void {
        // Retrieve the uploaded file.
        const uploadedFile = ((e.target as HTMLInputElement).files as ArrayLike<File>)[0];

        switch (src) {
            case 'logo':
                this.productStore.logoImage = uploadedFile;

                // Generate an image preview.
                this.productStore.metadata.logoPreview = URL.createObjectURL(uploadedFile);
                this.productStore.metadata.logoName = uploadedFile.name;
                break;
            case 'introBg':
                this.productStore.introBgImage = uploadedFile;

                // Generate an image preview.
                this.productStore.metadata.introBgPreview = URL.createObjectURL(uploadedFile);
                this.productStore.metadata.introBgName = uploadedFile.name;
                break;
            default:
                console.error('onFileChange received invalid source.');
        }
    }
}
</script>

<style lang="scss">
h2 {
    line-height: 80%;
}

.metadata-item {
    margin-bottom: 20px;
}

.metadata-subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}
</style>
