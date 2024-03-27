<template>
    <div>
        <label class="mb-5">{{ $t('editor.title') }}:</label>
        <input type="text" name="title" :value="metadata.title" @change="metadataChanged" class="w-1/3" />
        <br />
        <label class="mb-5">{{ $t('editor.slides.title') }}:</label>
        <input type="text" name="introTitle" :value="metadata.introTitle" @change="metadataChanged" class="w-1/4" />
        <label class="mb-5">{{ $t('editor.slides.intro') }}:</label>
        <input
            type="text"
            name="introSubtitle"
            :value="metadata.introSubtitle"
            @change="metadataChanged"
            class="w-1/4"
        />
        <br />
        <!-- only display an image preview if one is provided.-->
        <div v-if="!!metadata.logoPreview">
            <label>{{ $t('editor.logoPreview') }}:</label>
            <img
                :src="metadata.logoPreview"
                v-if="!!metadata.logoPreview && metadata.logoPreview != 'error'"
                class="image-preview"
            />
            <p v-if="metadata.logoPreview == 'error'" class="image-preview">
                {{ $t('editor.image.loadingError') }}
            </p>
        </div>
        <label class="mb-5">{{ $t('editor.logo') }}:</label>
        <input type="text" @change="$emit('logo-source-changed', $event)" :value="metadata.logoName" class="w-1/4" />
        <button @click.stop="openFileSelector" class="bg-black text-white hover:bg-gray-800">
            {{ $t('editor.browse') }}
        </button>
        <button v-if="metadata.logoName || metadata.logoPreview" @click.stop="removeLogo" class="border border-black">
            {{ $t('editor.remove') }}
        </button>
        <!-- hide the actual file input -->
        <input
            type="file"
            id="logoUpload"
            @change="$emit('logo-changed', $event)"
            class="w-1/4"
            style="display: none"
        />
        <br />
        <label>{{ $t('editor.logoAltText') }}:</label>
        <input type="text" name="logoAltText" :value="metadata.logoAltText" @change="metadataChanged" class="w-2/3" />
        <br />
        <label class="mb-5"></label>
        <p class="inline-block">
            <i>
                {{ $t('editor.logoAltText.desc') }}
            </i>
        </p>
        <br />
        <label>{{ $t('editor.contextLink') }}:</label>
        <input type="text" name="contextLink" :value="metadata.contextLink" @change="metadataChanged" class="w-2/3" />
        <br />
        <label class="mb-5"></label>
        <p class="inline-block">
            <i>
                {{ $t('editor.contextLink.info') }}
            </i>
        </p>
        <br />
        <label>{{ $t('editor.contextLabel') }}:</label>
        <input type="text" name="contextLabel" :value="metadata.contextLabel" @change="metadataChanged" class="w-2/3" />
        <br />
        <label class="mb-5"></label>
        <p class="inline-block">
            <i> {{ $t('editor.contextLabel.info') }}</i>
        </p>
        <br />
        <label class="mr-15">{{ $t('editor.tocOrientation') }}:</label>
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
        <label class="mb-5"></label>
        <p class="inline-block">
            <i>{{ $t('editor.tocOrientation.info') }}</i>
        </p>
        <br />
        <label class="mb-5">{{ $t('editor.dateModified') }}:</label>
        <input type="date" name="dateModified" :value="metadata.dateModified" @change="metadataChanged" />
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
