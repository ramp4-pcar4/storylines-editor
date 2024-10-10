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
                    class="metadata-input"
                />
                <p class="metadata-subcaption">
                    {{ $t('editor.metadataForm.caption.title') }}
                </p>
            </div>
            <p v-if="!editing">{{ metadata.title || $t('editor.metadataForm.na') }}</p>
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
                        class="metadata-input"
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
                        class="metadata-input"
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
                <div v-show="editing" class="flex flex-wrap gap-1 items-center">
                    <!-- Logo URL -->
                    <input
                        type="text"
                        id="metaLogo"
                        @change="$emit('logo-source-changed', $event)"
                        :value="metadata.logoName"
                        class="metadata-input w-full lg:w-1/2"
                    />
                    <!-- Upload button -->
                    <button
                        @click.stop="openFileSelector"
                        class="metadata-button mb-0.5 bg-black border border-black text-white hover:bg-gray-800"
                    >
                        {{ $t('editor.browse') }}
                    </button>
                    <!-- Delete button -->
                    <button
                        v-if="metadata.logoName || metadata.logoPreview"
                        @click.stop="removeLogo"
                        class="metadata-button border mb-0.5 border-black"
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
            <label class="hidden" for="logoUpload">Logo upload</label>
            <input
                type="file"
                id="logoUpload"
                @change="$emit('logo-changed', $event)"
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
                        class="metadata-input"
                    />
                    <p class="metadata-subcaption">
                        {{ $t('editor.metadataForm.caption.logoAltText') }}
                    </p>
                </div>
                <p v-if="!editing">{{ metadata.logoAltText || $t('editor.metadataForm.na') }}</p>
            </div>
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
                    class="metadata-input"
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
                    class="metadata-input"
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
                    class="metadata-input w-full md:w-1/3"
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
import { Prop, Vue } from 'vue-property-decorator';

export default class MetadataEditorV extends Vue {
    @Prop() metadata!: MetadataContent;
    @Prop({ default: true }) editing!: boolean;

    openFileSelector(): void {
        document.getElementById('logoUpload')?.click();
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
    padding: 8px 10px;
    border: 1px solid lightgray;
    // outline: 1px solid lightgray;
    display: block;
    border-radius: 5px;
    margin-top: 0.15rem;
    margin-bottom: 0.25rem;
    max-width: 100%;
    width: 1200px;
}

.metadata-subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}

.metadata-select {
    padding: 8px 10px;
    border: 1px solid lightgray;
    display: block;
    border-radius: 5px;
    margin-top: 0.15rem;
    margin-bottom: 0.25rem;
    max-width: 100%;
    width: 300px;
}

.metadata-button {
    padding: 8px 15px;
    margin: 0;
    border-radius: 5px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.metadata-button:hover:enabled {
    background-color: #dbdbdb;
    color: black;
}

.metadata-button:disabled {
    border: 1px solid gray;
    color: gray;
    cursor: not-allowed;
}
</style>
