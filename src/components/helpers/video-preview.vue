<template>
    <div class="my-8 mx-4 overflow-hidden w-full">
        <div class="relative text-center w-full grabbable">
            <button
                class="bg-white absolute h-6 w-6 leading-5 rounded-full top-0 right-0 p-0 cursor-pointer"
                @click="() => $emit('delete', file)"
                :content="$t('editor.video.delete')"
                v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
            >
                <svg height="24px" width="24px" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg" :aria-label="$t('editor.video.delete')">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    />
                </svg>
            </button>
            <div class="video-container">
                <!-- YouTube video -->
                <template v-if="file.videoType === 'YouTube'">
                    <iframe
                        class="w-3/5"
                        :src="file.src"
                        :height="file.height ? file.height : 400"
                        :width="file.width"
                        allowfullscreen
                    ></iframe>
                </template>

                <!-- video with local/external source -->
                <template v-if="file.videoType === 'local' || file.videoType === 'external'">
                    <video
                        class="w-3/5"
                        :title="file.title"
                        :height="file.height ? file.height : 500"
                        :width="file.width"
                        controls
                    >
                        <source :type="fileType" :src="file.src" />
                        <!-- add captions with transcript -->
                        <track
                            kind="captions"
                            :src="file.caption"
                            :srclang="lang"
                            :label="langs[lang]"
                            v-if="file.caption"
                        />
                    </video>
                </template>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import { VideoFile } from '@/definitions';
import MarkdownIt from 'markdown-it';

export default class VideoPreviewV extends Vue {
    @Prop() file!: VideoFile;
    @Prop() fileType!: string;
    @Prop() lang!: string;

    md = new MarkdownIt({ html: true });
    langs = { en: 'English', fr: 'French' } as Record<string, string>;

    expandTranscript = false;
    rawTranscript = '';
    transcriptContent = '';
}
</script>

<style lang="scss" scoped>
.video-file {
    max-height: 300px;
}

.video-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    padding: 0 !important;
}
</style>
