<template>
    <!-- Section: Title, orientation -->
    <section>
        <!-- Title -->
        <div class="metadata-item">
            <label class="metadata-label" for="metaTitle">{{ $t('editor.title') }}</label>
            <!-- v-show prevents WAVE warning for orphaned form label -->
            <div v-show="editing">
                <input
                    type="text"
                    name="title"
                    id="metaTitle"
                    :value="metadata.title"
                    @change="metadataChanged"
                    class="metadata-input editor-input"
                />
                <p class="metadata-subcaption">
                    {{ $t('editor.metadataForm.caption.title') }}
                </p>
            </div>
            <p v-if="!editing">{{ metadata.title || $t('editor.metadataForm.na') }}</p>
        </div>
        <!-- Layout and Navigation Section -->
        <section class="border rounded-md px-4 md:px-5 py-3">
            <h2 class="text-xl font-bold">{{ $t('editor.metadataForm.layoutAndNav.heading') }}</h2>
            <!-- Same TOC orientation and return-to-top values across both ENG/FR configs -->
            <div v-if="modal" class="metadata-item">
                <div class="flex gap-2 pt-2">
                    <input
                        v-show="editing"
                        type="checkbox"
                        id="sameConfig"
                        class="editor-input rounded-none cursor-pointer w-4 h-4"
                        v-model="metadata.sameConfig"
                        @change="metadataChanged"
                    />
                    <label class="metadata-label" for="sameConfig">{{ $t('editor.sameConfig') }}</label>
                </div>
                <p v-show="editing" class="metadata-subcaption">
                    {{ $t('editor.sameConfig.info') }}
                </p>
                <p v-if="!editing">
                    {{ metadata.returnTop ? $t('editor.metadataForm.enabled') : $t('editor.metadataForm.disabled') }}
                </p>
            </div>
            <!-- ToC orientation -->
            <div class="metadata-item">
                <label class="metadata-label" for="toc">{{ $t('editor.tocOrientation') }}</label>
                <div v-show="editing">
                    <select
                        class="metadata-select"
                        name="tocOrientation"
                        id="toc"
                        @change="metadataChanged"
                        v-model="metadata.tocOrientation"
                    >
                        <option value="vertical">{{ $t('editor.tocOrientation.vertical') }}</option>
                        <option value="horizontal">{{ $t('editor.tocOrientation.horizontal') }}</option>
                    </select>
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.tocOrientation') }}
                    </p>
                </div>
                <p v-if="!editing">{{ metadata.tocOrientation || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Include return to top navigation -->
            <div class="metadata-item">
                <div class="flex gap-2">
                    <input
                        v-show="editing"
                        type="checkbox"
                        id="returnToTop"
                        class="editor-input rounded-none cursor-pointer w-4 h-4"
                        v-model="metadata.returnTop"
                        @change="metadataChanged"
                    />
                    <label class="metadata-label" for="returnToTop">{{ $t('editor.returnTop') }}</label>
                </div>
                <p v-show="editing" class="metadata-subcaption">
                    {{ $t('editor.tocOrientation.info') }}
                </p>
                <p v-if="!editing">
                    {{ metadata.returnTop ? $t('editor.metadataForm.enabled') : $t('editor.metadataForm.disabled') }}
                </p>
            </div>
        </section>
    </section>
    <!-- Section: Introduction page details -->
    <section class="border rounded-md px-4 md:px-5 py-3">
        <h2 class="text-xl font-bold">{{ $t('editor.metadataForm.introPage.heading') }}</h2>
        <p class="mb-5">
            {{ $t('editor.metadataForm.introPage.explanation') }}
        </p>
        <!-- Subsection: Intro title/subtitles -->
        <section class="flex gap-2 flex-wrap">
            <!-- Intro title -->
            <div class="metadata-item w-full md:w-5/12 flex-1">
                <label class="metadata-label" for="introTitle">{{ $t('editor.slides.title') }}</label>
                <div v-show="editing">
                    <input
                        type="text"
                        name="introTitle"
                        :value="metadata.introTitle"
                        @change="metadataChanged"
                        id="introTitle"
                        class="metadata-input editor-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.introTitle') }}
                    </p>
                </div>
                <p v-if="!editing">{{ metadata.introTitle || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Intro subtitle -->
            <div class="metadata-item w-full md:w-5/12 flex-1">
                <label class="metadata-label" for="introSubtitle">{{ $t('editor.slides.intro') }}</label>
                <div v-show="editing">
                    <input
                        type="text"
                        name="introSubtitle"
                        id="introSubtitle"
                        :value="metadata.introSubtitle"
                        @change="metadataChanged"
                        class="metadata-input editor-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.introSubtitle') }}
                    </p>
                </div>
                <p v-if="!editing">{{ metadata.introSubtitle || $t('editor.metadataForm.na') }}</p>
            </div>
        </section>
        <!-- Subsection: Logo stuff -->
        <section>
            <div class="metadata-item">
                <label class="metadata-label" for="metaLogo">{{ $t('editor.logo') }}</label>
                <div v-show="editing" class="flex flex-wrap gap-2 items-center">
                    <!-- Logo URL -->
                    <input
                        type="text"
                        id="metaLogo"
                        @change="$emit('image-source-changed', $event, 'logo')"
                        :value="metadata.logoName"
                        class="metadata-input editor-input w-full lg:w-1/2"
                    />
                    <!-- Upload button -->
                    <button
                        style="padding-top: 6.5px; padding-bottom: 6.5px"
                        @click.stop="openFileSelector('logoUpload')"
                        class="editor-button editor-forms-button mb-0.5 bg-black border border-black text-white hover:bg-gray-800 flex items-center gap-2 shadow-sm"
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
                        v-if="metadata.logoName || metadata.logoPreview"
                        @click.stop="removeLogo"
                        class="editor-button py-1.5 border border-black"
                    >
                        {{ $t('editor.remove') }}
                    </button>
                </div>
                <p class="break-all" v-if="!editing">{{ metadata.logoName || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Logo Preview -->
            <div v-if="!!metadata.logoPreview" class="metadata-item">
                <div class="metadata-label">{{ $t('editor.logoPreview') }}:</div>
                <img
                    :src="metadata.logoPreview"
                    v-if="!!metadata.logoPreview && metadata.logoPreview != 'error'"
                    class="image-preview"
                    :alt="$t('editor.logoPreviewAltText')"
                />
                <p v-if="metadata.logoPreview == 'error'" class="image-preview">
                    {{ $t('editor.image.loadingError') }}
                </p>
            </div>
            <!-- hide the actual file input. Label prevents a WAVE error -->
            <label style="display: none" for="logoUpload">Logo upload</label>
            <input
                type="file"
                id="logoUpload"
                @change="$emit('image-changed', $event, 'logo')"
                class="editor-input w-1/4"
                style="display: none"
            />
            <!-- Logo alt text -->
            <div class="metadata-item">
                <label class="metadata-label" for="logoAltText">{{ $t('editor.logoAltText') }}</label>
                <div v-show="editing">
                    <input
                        type="text"
                        name="logoAltText"
                        id="logoAltText"
                        :value="metadata.logoAltText"
                        @change="metadataChanged"
                        class="metadata-input editor-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.logoAltText') }}
                    </p>
                </div>
                <p v-if="!editing">{{ metadata.logoAltText || $t('editor.metadataForm.na') }}</p>
            </div>
            <div class="flex flex-wrap gap-4">
                <div class="metadata-item">
                    <span class="metadata-label">{{ $t('editor.introTitleColour') }}</span>
                    <ColourPickerInput
                        name="titleColour"
                        :value="metadata.titleColour"
                        @change="metadataChanged"
                        :disabled="!editing"
                    />
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">{{ $t('editor.introSubtitleColour') }}</span>
                    <ColourPickerInput
                        name="subtitleColour"
                        :value="metadata.subtitleColour"
                        @change="metadataChanged"
                        :disabled="!editing"
                    />
                </div>
                <div class="metadata-item">
                    <div class="flex gap-2 items-center">
                        <span class="metadata-label">{{ $t('editor.introButtonColour') }}</span>
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
                        :value="metadata.buttonColour"
                        @change="metadataChanged"
                        :disabled="!editing"
                    />
                </div>
            </div>
        </section>
        <!-- Subsection: Intro background stuff -->
        <section>
            <div class="metadata-item">
                <label class="metadata-label" for="metaIntroBg">{{ $t('editor.introBackground') }}</label>
                <div v-show="editing">
                    <!-- Intro slide background URL -->
                    <div class="flex flex-wrap gap-2 items-center">
                        <input
                            type="text"
                            id="metaIntroBg"
                            @change="$emit('image-source-changed', $event, 'introBg')"
                            :value="metadata.introBgName"
                            class="metadata-input editor-input w-full lg:w-1/2"
                        />
                        <!-- Upload button -->
                        <button
                            style="padding-top: 6.5px; padding-bottom: 6.5px"
                            @click.stop="openFileSelector('backgroundUpload')"
                            class="editor-button editor-forms-button mb-0.5 bg-black border border-black text-white hover:bg-gray-800 flex items-center gap-2 shadow-sm"
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
                            v-if="metadata.introBgName || metadata.introBgPreview"
                            @click.stop="removeIntroBackground"
                            class="editor-button border mb-0.5 border-black"
                        >
                            {{ $t('editor.remove') }}
                        </button>
                    </div>
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.introBackground') }}
                    </p>
                </div>

                <p class="break-all" v-if="!editing">{{ metadata.introBgName || $t('editor.metadataForm.na') }}</p>
            </div>
            <!-- Logo Preview -->
            <div v-if="!!metadata.introBgPreview" class="metadata-item">
                <div class="metadata-label">{{ $t('editor.introBackgroundPreview') }}:</div>
                <img
                    :src="metadata.introBgPreview"
                    v-if="!!metadata.introBgPreview && metadata.introBgPreview != 'error'"
                    class="image-preview"
                    :alt="$t('editor.introBackgroundPreview')"
                />
                <p v-if="metadata.introBgPreview == 'error'" class="image-preview">
                    {{ $t('editor.image.loadingError') }}
                </p>
            </div>
            <!-- hide the actual file input. Label prevents a WAVE error -->
            <label style="display: none" for="backgroundUpload">Intro background upload</label>
            <input
                type="file"
                id="backgroundUpload"
                @change="$emit('image-changed', $event, 'introBg')"
                class="editor-input w-1/4"
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
            <label class="metadata-label" for="contextLink">{{ $t('editor.contextLink') }}</label>
            <div v-show="editing">
                <input
                    type="text"
                    name="contextLink"
                    id="contextLink"
                    :value="metadata.contextLink"
                    @change="metadataChanged"
                    class="metadata-input editor-input"
                />
                <p class="metadata-subcaption">
                    {{ $t('editor.metadataForm.caption.contextLink') }}
                </p>
            </div>
            <p class="break-all" v-if="!editing">{{ metadata.contextLink || $t('editor.metadataForm.na') }}</p>
        </div>
        <!-- Context label -->
        <div class="metadata-item">
            <label class="metadata-label" for="contextLabel">{{ $t('editor.contextLabel') }}</label>
            <div v-show="editing">
                <input
                    type="text"
                    name="contextLabel"
                    id="contextLabel"
                    :value="metadata.contextLabel"
                    @change="metadataChanged"
                    class="metadata-input editor-input"
                />
                <p class="metadata-subcaption">
                    {{ $t('editor.metadataForm.caption.contextLabel') }}
                </p>
            </div>
            <p v-if="!editing">{{ metadata.contextLabel || $t('editor.metadataForm.na') }}</p>
        </div>
        <!-- Date modified -->
        <div class="metadata-item">
            <label class="metadata-label" for="dateModified">{{ $t('editor.dateModified') }}</label>
            <div v-show="editing">
                <input
                    class="metadata-input editor-input w-full md:w-1/3"
                    type="date"
                    name="dateModified"
                    id="dateModified"
                    :value="metadata.dateModified"
                    @change="metadataChanged"
                />
            </div>
            <p v-if="!editing">{{ metadata.dateModified || $t('editor.metadataForm.na') }}</p>
        </div>
    </section>
</template>

<script lang="ts">
import { MetadataContent } from '@/definitions';
import { Options, Prop, Vue } from 'vue-property-decorator';
import ColourPickerInput from './colour-picker-input.vue';

@Options({
    components: {
        ColourPickerInput: ColourPickerInput
    }
})
export default class MetadataEditorV extends Vue {
    @Prop() metadata!: MetadataContent;
    @Prop({ default: true }) editing!: boolean;
    @Prop({ default: false }) modal!: boolean;

    openFileSelector(where: string = 'logoUpload'): void {
        document.getElementById(where)?.click();
    }

    metadataChanged(event: Event): void {
        this.$emit(
            'metadata-changed',
            (event.target as HTMLInputElement).name,
            (event.target as HTMLInputElement).value
        );
    }

    removeLogo(): void {
        this.metadata.logoName = '';
        this.metadata.logoPreview = '';
        this.$emit('logoRemoved');
    }

    removeIntroBackground(): void {
        this.metadata.introBgName = '';
        this.metadata.introBgPreview = '';
        this.$emit('backgroundRemoved');
    }
}
</script>

<style lang="scss">
h2 {
    line-height: 80%;
}

.metadata-label {
    font-weight: bold;
    text-align: left;
}

.metadata-item {
    margin-bottom: 20px;
}

.metadata-input {
    //padding: 8px 10px;
    border: 1px solid lightgray !important;
    // outline: 1px solid lightgray;
    display: block;
    border-radius: 5px;
    margin-top: 0.15rem;
    margin-bottom: 0.25rem;
    max-width: 100%;
    width: 1200px;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
}

.metadata-subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}

.metadata-select {
    padding: 8px 10px;
    border: 1px solid lightgray;
    background-color: white;
    display: block;
    border-radius: 5px;
    margin-top: 0.15rem;
    margin-bottom: 0.25rem;
    max-width: 100%;
    width: 300px;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
