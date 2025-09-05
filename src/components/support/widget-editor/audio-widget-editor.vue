<template>
    <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
        <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
            <h2 slot="header" class="text-xl font-semibold">{{ $t('audio.editor.header') }}</h2>
            <div class="flex flex-row gap-2">
                <!-- ENG/FR config toggle -->
                <button
                    class="respected-standard-button respected-gray-border-button respected-thin-button"
                    @click="onBack"
                    tabindex="0"
                >
                    {{ $t('dynamic.back') }}
                </button>
                <button class="respected-standard-button respected-black-bg-button respected-thin-button" @click="onOk">
                    {{ $t('editor.slideshow.label.add') }}
                </button>
            </div>
        </div>
    </div>
    <div class="mx-4">
        <div class="mb-5">
            <label class="respected-standard-label" for="audioTitle">{{ $t('audio.editor.title') }}</label>
            <input
                type="text"
                name="title"
                id="audioTitle"
                v-model="audioSettings.title"
                class="respected-standard-input"
            />
        </div>

        <div class="mb-5">
            <label class="respected-standard-label" for="audioSource">{{ $t('audio.editor.source') }}</label>
            <div>
                <div class="flex flex-wrap gap-2 items-center">
                    <!-- Logo URL -->
                    <input
                        type="text"
                        id="audioSource"
                        v-model="audioSettings.source.name"
                        class="respected-standard-input flex-1"
                    />
                    <!-- Upload button -->
                    <button
                        @click.stop="openFileSelector('audioUpload')"
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
                    <!-- <button
                                class="respected-standard-button respected-gray-border-button respected-form-button"
                            >
                                {{ $t('editor.remove') }}
                            </button> -->
                </div>
                <span class="subcaption">{{ $t('audio.editor.source.caption') }}</span>
            </div>

            <!-- hide the actual file input. Label prevents a WAVE error -->
            <label style="display: none" for="audioUpload">Audio Upload</label>
            <input
                type="file"
                id="audioUpload"
                accept=".ogg,.wav,.mp3"
                @change="upload($event)"
                class="respected-standard-input w-1/4"
                style="display: none"
            />
        </div>

        <div class="mb-5">
            <label class="respected-standard-label" for="audioTranscript">{{ $t('audio.editor.transcript') }}</label>
            <textarea
                type="text"
                name="title"
                id="audioTranscript"
                rows="4"
                v-model="audioSettings.transcript"
                class="respected-standard-input"
            ></textarea>
        </div>

        <div class="mb-5">
            <span class="respected-standard-label">{{ $t('editor.preview') }}</span>
            <storylines-audio-widget
                :src="audioSettings.source.preview || audioSettings.source.name"
                :title="audioSettings.title"
                :transcript="audioSettings.transcript"
            ></storylines-audio-widget>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { useProductStore } from '@/stores/productStore';
import type { AudioSettings } from '@/definitions';

export default class AudioWidgetV extends Vue {
    productStore = useProductStore();

    audioSettings: AudioSettings = {
        title: '',
        transcript: '',
        source: {
            name: '',
            preview: null
        }
    };

    onOk(): void {
        // Emits the 'ok' event, which adds the audio widget to the text editor.
        this.$emit('ok', this.audioSettings);

        // Audio widget was added, so reset the settings for the next one.
        this.reset();
    }

    onBack(): void {
        // Modal was closed, so reset the audio settings.
        this.reset();
        this.$emit('back');
    }

    openFileSelector(where: string): void {
        document.getElementById(where)?.click();
    }

    reset(): void {
        this.audioSettings = {
            title: '',
            transcript: '',
            source: {
                name: '',
                preview: null
            }
        };
    }

    async upload(event: Event): Promise<void> {
        // Retrieve the uploaded file.
        const uploadedFile = ((event.target as HTMLInputElement).files as ArrayLike<File>)[0];
        const { inSharedAsset, newAssetName, uploadSource, oppositeSourceCount } =
            await this.productStore.addUploadedFile(uploadedFile, false);

        this.audioSettings.source.name = uploadSource;
        this.audioSettings.source.preview = URL.createObjectURL(uploadedFile);
    }
}
</script>

<style lang="css" scoped>
.subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}

.audio-transcript > * {
    width: 100%;
}
</style>
