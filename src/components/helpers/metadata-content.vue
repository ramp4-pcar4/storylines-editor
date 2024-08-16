<template>
    <div>
        <label class="editor-label mb-5" for="metaTitle">{{ $t('editor.title') }}:</label>
        <input
            type="text"
            name="title"
            id="metaTitle"
            :value="metadata.title"
            @change="metadataChanged"
            class="editor-input w-1/3"
        />
        <br />
        <label class="editor-label mb-5" for="introTitle">{{ $t('editor.slides.title') }}:</label>
        <input
            type="text"
            name="introTitle"
            :value="metadata.introTitle"
            @change="metadataChanged"
            id="introTitle"
            class="editor-input w-1/4"
        />
        <label class="editor-label mb-5" for="introSubtitle">{{ $t('editor.slides.intro') }}:</label>
        <input
            type="text"
            name="introSubtitle"
            id="introSubtitle"
            :value="metadata.introSubtitle"
            @change="metadataChanged"
            class="editor-input w-1/4"
        />
        <br />
        <!-- only display an image preview if one is provided.-->
        <div v-if="!!metadata.logoPreview">
            <label class="editor-label">{{ $t('editor.logoPreview') }}:</label>
            <img
                :src="metadata.logoPreview"
                v-if="!!metadata.logoPreview && metadata.logoPreview != 'error'"
                class="image-preview"
                alt="preview of product logo"
            />
            <p v-if="metadata.logoPreview == 'error'" class="image-preview">
                {{ $t('editor.image.loadingError') }}
            </p>
        </div>
        <label class="editor-label mb-5" for="metaLogo">{{ $t('editor.logo') }}:</label>
        <input
            type="text"
            id="metaLogo"
            @change="$emit('logo-source-changed', $event)"
            :value="metadata.logoName"
            class="editor-input w-1/4"
        />
        <label for="logoUpload">
            <button @click.stop="openFileSelector" class="editor-button bg-black text-white hover:bg-gray-800">
                {{ $t('editor.browse') }}
            </button>
        </label>
        <button
            v-if="metadata.logoName || metadata.logoPreview"
            @click.stop="removeLogo"
            class="editor-button border border-black"
        >
            {{ $t('editor.remove') }}
        </button>
        <!-- hide the actual file input -->
        <input
            type="file"
            id="logoUpload"
            @change="$emit('logo-changed', $event)"
            class="editor-input w-1/4"
            style="display: none"
        />
        <br />
        <label class="editor-label" for="logoAltText">{{ $t('editor.logoAltText') }}:</label>
        <input
            type="text"
            name="logoAltText"
            id="logoAltText"
            :value="metadata.logoAltText"
            @change="metadataChanged"
            class="editor-input w-2/3"
        />
        <br />
        <div class="editor-label mb-5"></div>
        <p class="inline-block">
            <i>
                {{ $t('editor.logoAltText.desc') }}
            </i>
        </p>
        <br />
        <label class="editor-label" for="contextLink">{{ $t('editor.contextLink') }}:</label>
        <input
            type="text"
            name="contextLink"
            id="contextLink"
            :value="metadata.contextLink"
            @change="metadataChanged"
            class="editor-input w-2/3"
        />
        <br />
        <div class="editor-label mb-5"></div>
        <p class="inline-block">
            <i>
                {{ $t('editor.contextLink.info') }}
            </i>
        </p>
        <br />
        <label class="editor-label" for="contextLabel">{{ $t('editor.contextLabel') }}:</label>
        <input
            type="text"
            name="contextLabel"
            id="contextLabel"
            :value="metadata.contextLabel"
            @change="metadataChanged"
            class="editor-input w-2/3"
        />
        <br />
        <div class="editor-label mb-5"></div>
        <p class="inline-block">
            <i> {{ $t('editor.contextLabel.info') }}</i>
        </p>
        <br />
        <label class="editor-label mr-15" for="toc">{{ $t('editor.tocOrientation') }}:</label>
        <select
            class="border-solid border border-black p-1"
            name="tocOrientation"
            id="toc"
            @change="metadataChanged"
            v-model="metadata.tocOrientation"
        >
            <option value="vertical">{{ $t('editor.tocOrientation.vertical') }}</option>
            <option value="horizontal">{{ $t('editor.tocOrientation.horizontal') }}</option>
        </select>
        <br />
        <div class="editor-label mb-5"></div>
        <p class="inline-block">
            <i>{{ $t('editor.tocOrientation.info') }}</i>
        </p>
        <br />
        <label class="editor-label mb-5" for="dateModified">{{ $t('editor.dateModified') }}:</label>
        <input
            class="editor-input"
            type="date"
            name="dateModified"
            id="dateModified"
            :value="metadata.dateModified"
            @change="metadataChanged"
        />
        <br /><br />
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class MetadataEditorV extends Vue {
    @Prop() metadata!: {
        title: string;
        introTitle: string;
        introSubtitle: string;
        logoName: string;
        logoPreview: string;
        logoAltText: string;
        contextLink: string;
        contextLabel: string;
        tocOrientation: string;
        dateModified: string;
    };

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
