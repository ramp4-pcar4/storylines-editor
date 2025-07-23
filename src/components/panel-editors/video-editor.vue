<template>
    <div class="block">
        <!-- Upload video area -->
        <div class="flex flex-col mt-4 align-center w-full text-left">
            <label class="respected-standard-label text-label" for="videoTitle">{{ $t('editor.video.title') }}</label>
            <input
                id="videoTitle"
                class="respected-standard-input w-full lg:w-3/5"
                type="text"
                v-model="videoPreview.title"
                @input="onVideoEdited"
            />
        </div>

        <!-- Option 1: upload video file -->
        <div
            class="upload-video flex justify-center text-center m-5 p-12 bg-gray-100 border-4 border-dashed border-gray-300"
            :class="{ dragging: isDragging }"
            @dragover.prevent="() => (dragging = true)"
            @dragleave.prevent="() => (dragging = false)"
            @drop.prevent="dropVideo($event)"
        >
            <label class="flex respected-standard-label drag-label cursor-pointer">
                <span class="align-middle inline-block pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -2 30 30">
                        <path
                            d="M599,692 C597.896,692 597,692.896 597,694 L597,698 L575,698 L575,694 C575,692.896 574.104,692 573,692 C571.896,692 571,692.896 571,694 L571,701 C571,701.479 571.521,702 572,702 L600,702 C600.604,702 601,701.542 601,701 L601,694 C601,692.896 600.104,692 599,692 L599,692 Z M582,684 L584,684 L584,693 C584,694.104 584.896,695 586,695 C587.104,695 588,694.104 588,693 L588,684 L590,684 C590.704,684 591.326,684.095 591.719,683.7 C592.11,683.307 592.11,682.668 591.719,682.274 L586.776,676.283 C586.566,676.073 586.289,675.983 586.016,675.998 C585.742,675.983 585.465,676.073 585.256,676.283 L580.313,682.274 C579.921,682.668 579.921,683.307 580.313,683.7 C580.705,684.095 581.608,684 582,684 L582,684 Z"
                            transform="translate(-571.000000, -676.000000)"
                        />
                    </svg>
                </span>
                <span class="align-middle inline-block">
                    <span>
                        <div class="text-center">{{ $t('editor.video.label.drag') }}</div>
                        <div>
                            {{ $t('editor.label.or') }}
                            <span class="text-blue-700 font-bold">{{ $t('editor.label.browse') }}</span>
                            {{ $t('editor.label.upload') }}
                            {{ ' ' + $t('editor.video.label.sizeLimit', { size: fileSizeLimit }) }}
                        </div>
                    </span>
                    <input ref="videoFileInput" type="file" class="cursor-pointer" @change="onFileChange" />
                </span>
            </label>
        </div>

        <!-- Option 2: provide URL to external or YT link -->
        <div class="flex flex-col mt-4 w-full text-left">
            <div class="flex items-center gap-1.5">
                <label class="respected-standard-label" for="videoURL">{{
                    $t('editor.label.or') + ' ' + $t('editor.video.pasteUrl')
                }}</label>
                <span
                    class=""
                    :content="$t('editor.video.label.linkSupport')"
                    v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                    tabindex="0"
                >
                    <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="20"
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
            <div class="flex items-center gap-1.5 w-full">
                <input
                    ref="videoUrl"
                    id="videoURL"
                    class="respected-standard-input flex-1"
                    type="search"
                    v-model="videoPreview.src"
                    v-if="videoPreview.videoType !== 'local'"
                />
                <input ref="videoUrl" id="videoURL" class="respected-standard-input flex-1" type="search" v-else />
                <button
                    @click="uploadVideoUrl"
                    class="respected-standard-button respected-black-bg-button respected-form-button"
                >
                    {{ $t('editor.video.label.upload') }}
                </button>
            </div>
        </div>

        <!-- Preview of video -->
        <div
            v-if="!videoPreviewLoading && Object.keys(videoPreview).length !== 0"
            class="flex flex-wrap justify-center list-none border my-4"
            @update="onVideoEdited"
            item-key="id"
        >
            <VideoPreview
                :key="`${videoPreview.id}`"
                :file="videoPreview"
                :fileType="fileType"
                :lang="lang"
                @delete="deleteVideo"
            >
                <!-- <div class="flex mt-4 items-center w-full text-left">
                    <label class="text-label">{{ $t('editor.video.label.captions') }}:</label>
                    <input class="w-4/5" type="file" @change="updateCaptions" />
                </div>

                <div class="flex mt-4 items-center w-full text-left">
                    <label class="text-label">{{ $t('editor.video.label.transcript') }}:</label>
                    <input class="w-4/5" type="file" @change="updateTranscript" />
                </div> -->
            </VideoPreview>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { VideoFile, VideoPanel } from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';

import Message from 'vue-m-message';
import draggable from 'vuedraggable';
import VideoPreviewV from '../support/video-preview.vue';

import { useProductStore } from '@/stores/productStore';

@Options({
    components: {
        VideoPreview: VideoPreviewV,
        draggable
    }
})
export default class VideoEditorV extends Vue {
    @Prop() panel!: VideoPanel;
    @Prop() lang!: string;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

    productStore = useProductStore();
    dragging = false;
    edited = false;

    fileType = '';
    fileSizeLimit = 75; // File size limit in MB
    videoPreviewLoading = false;
    videoPreviewPromise = undefined as Promise<VideoFile> | undefined;
    videoPreview = {} as VideoFile | Record<string, never>;
    slideshowCaption = '';

    get isDragging(): boolean {
        return this.dragging;
    }

    mounted(): void {
        if (this.panel.src) {
            if (this.panel.videoType === 'local') {
                this.videoPreviewLoading = true;

                // retrieve existing video file
                const assetSrc = `${this.panel.src.substring(this.panel.src.indexOf('/') + 1)}`;
                const filename = this.panel.src.replace(/^.*[\\/]/, '');

                const assetFile = this.productStore.configFileStructure.zip.file(assetSrc);
                if (assetFile) {
                    this.videoPreviewPromise = assetFile.async('blob').then((res: Blob) => {
                        return {
                            ...this.panel,
                            id: this.panel.src,
                            src: URL.createObjectURL(res)
                        } as VideoFile;
                    });
                }
                // attempt to load in video to preview in editor
                this.videoPreviewPromise?.then((res) => {
                    this.videoPreview = res;
                    this.videoPreviewLoading = false;
                });

                this.slideshowCaption = this.panel.caption as string;
            } else {
                // existing file is a URL format
                this.videoPreview = {
                    id: this.panel.src,
                    title: this.panel.title,
                    videoType: this.panel.videoType === 'YouTube' ? 'YouTube' : 'external',
                    src: this.panel.src
                };
            }
        }
        applyTextAlign(this.panel, this.centerSlide, this.dynamicSelected);
    }

    // adds an uploaded file that is either a: video, transcript or captions
    async addUploadedFile(file: File, type: string): Promise<void> {
        const { inSharedAsset, newAssetName, uploadSource } = await this.productStore.addUploadedFile(file);

        // check if source file is creating a new video or uploading captions/transcript for current video
        const fileSrc = URL.createObjectURL(file);
        if (type === 'src') {
            const assetName = inSharedAsset ? newAssetName : file.name;
            this.videoPreview = {
                id: uploadSource,
                title: assetName,
                videoType: 'local',
                src: fileSrc
            };
            this.findFileType(assetName);
        } else {
            this.videoPreview[type as 'caption' | 'transcript'] = fileSrc;
        }
        this.edited = true;
        this.$emit('slide-edit');
    }

    onFileChange(e: Event): void {
        const file = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>)[0];

        // Block files which are too big
        if (file.size > this.fileSizeLimit * 1024 * 1024) {
            Message.error(
                this.$t('editor.video.sizeExceeded') +
                    ' ' +
                    this.$t('editor.video.label.sizeLimit', { size: this.fileSizeLimit })
            );
            return;
        }

        this.addUploadedFile(file, 'src').then(this.onVideoEdited);
    }

    findFileType(file: string): void {
        if (this.videoPreview.videoType === 'external' || this.videoPreview.videoType === 'local') {
            const fileName = file.substring(file.lastIndexOf('/') + 1);
            const ext = fileName.split('.').pop();
            this.fileType = `video/${ext}`;
        }
    }

    // extract the video ID from YouTube link (we need to convert to embed link)
    extractYoutubeId(url: string): string | null {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    }

    uploadVideoUrl(): void {
        // TODO: might need to improve upon detecting YT link depending on cases
        let url = (this.$refs.videoUrl as HTMLInputElement).value as string;

        // handle shortened URL case
        if (url.toLowerCase().includes('youtu.be')) {
            url = url.replace('youtu.be/', 'www.youtube.com/watch?v=');
        }

        const isYoutube = url.toLowerCase().includes('youtube');

        // change YT link to embed format
        if (isYoutube) {
            // extract and restructure YT url to be embeddable
            // const videoId = this.extractYoutubeId(url);
            // // TODO: add error handling for invalid URLs
            // url = 'https://www.youtube.com/embed/' + (videoId as string);
            url = url.replace('/watch?v=', '/embed/');
        }
        this.videoPreview = {
            id: url,
            title: this.videoPreview.title || url,
            videoType: url.includes('youtube') ? 'YouTube' : 'external',
            src: url
        };
        this.edited = true;
        this.$emit('slide-edit');
        this.onVideoEdited();
    }

    updateCaptions(e: Event): void {
        const file = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>)[0];
        this.addUploadedFile(file, 'caption');
    }

    updateTranscript(e: Event): void {
        const file = Array.from((e.target as HTMLInputElement).files as ArrayLike<File>)[0];
        this.addUploadedFile(file, 'transcript');
    }

    dropVideo(e: DragEvent): void {
        if (e.dataTransfer !== null) {
            const file = [...e.dataTransfer.files][0];
            this.addUploadedFile(file, 'src').then(() => {
                this.dragging = false;
            });
        }
        this.onVideoEdited();
    }

    deleteVideo(): void {
        if (this.videoPreview.videoType === 'local') {
            const videoSource = this.videoPreview.id;

            this.productStore.decrementSourceCount(videoSource);
            if (!this.productStore.sourceExists(videoSource)) {
                URL.revokeObjectURL(this.videoPreview.src);
            }
        }
        (this.$refs.videoFileInput as HTMLInputElement).value = '';
        this.videoPreview = {};
        this.onVideoEdited();
    }

    saveChanges(): void {
        if (this.edited && this.videoPreview) {
            // save all changes to panel config (cannot directly set to avoid prop mutate)
            this.panel.title = this.videoPreview.title;
            this.panel.videoType = this.videoPreview.videoType;

            this.panel.src = this.videoPreview.videoType === 'local' ? this.videoPreview.id : this.videoPreview.src;
            this.panel.caption = this.videoPreview.caption ? this.videoPreview.caption : '';
            this.panel.transcript = this.videoPreview.transcript ? this.videoPreview.transcript : '';
        }
        this.edited = false;
    }

    onVideoEdited(): void {
        this.edited = true;
        this.saveChanges();
        this.$emit('slide-edit', 'Video editor');
    }
}
</script>

<style lang="scss" scoped>
.upload-video {
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
