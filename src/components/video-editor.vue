<template>
    <div class="block">
        <!-- Upload video area -->
        <div class="flex flex-col mt-4 align-center w-full text-left">
            <label class="editor-label text-label" for="videoTitle">{{ $t('editor.video.title') }}</label>
            <input
                id="videoTitle"
                class="editor-input w-full lg:w-3/5"
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
            <label class="flex editor-label drag-label cursor-pointer">
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
                <label class="editor-label" for="videoURL">{{
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
                    class="editor-input flex-1"
                    type="search"
                    v-model="videoPreview.src"
                    v-if="videoPreview.videoType !== 'local'"
                />
                <input ref="videoUrl" id="videoURL" class="editor-input flex-1" type="search" v-else />
                <button
                    style="margin-top: 3px; padding-top: 7px; padding-bottom: 7px"
                    @click="uploadVideoUrl"
                    class="editor-button bg-white border border-black hover:bg-gray-100"
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
import { ConfigFileStructure, SourceCounts, VideoFile, VideoPanel } from '@/definitions';

import Message from 'vue-m-message';
import draggable from 'vuedraggable';
import VideoPreviewV from './helpers/video-preview.vue';
import JSZip from 'jszip';

@Options({
    components: {
        VideoPreview: VideoPreviewV,
        draggable
    }
})
export default class VideoEditorV extends Vue {
    @Prop() panel!: VideoPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

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

                const assetFile = this.configFileStructure.zip.file(assetSrc);
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
        if (this.centerSlide && this.dynamicSelected) {
            this.panel.customStyles += 'text-align: left !important;';
        } else if (!this.centerSlide && this.dynamicSelected) {
            this.panel.customStyles = (this.panel.customStyles || '').replace('text-align: left !important;', '');
        }
    }

    // TODO: move method into a plugin. That way it isn't repeated in the metadata/image editors
    // Converts a file into a promise that resolves to an ArrayBuffer containing the files data
    readBinaryData(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = () => {
                reject(new Error('Could not load file reader'));
            };
            fileReader.readAsArrayBuffer(file);
        });
    }

    // TODO: move method into a plugin. That way it isn't repeated in the metadata/image editors
    // Converts a file into a promise that resolves to its has, as an array of 8-bit integers
    obtainHashData(file: File): Promise<Uint8Array> {
        return this.readBinaryData(file)
            .then((res) => {
                res = new Uint8Array(res);
                return window.crypto.subtle.digest('SHA-256', res);
            })
            .then((res) => {
                res = new Uint8Array(res);
                return res;
            });
    }

    // TODO: move method into a plugin. That way it isn't repeated in the metadata/image editors
    /**
     * Helper used to find all instances of the specified file in the specified asset folder
     * @param file File that was uploaded
     * @param folder The asset folder withinn which we should be searching
     * @param checkNested Flag that indicates whether we should consider assets with nested subfolders
     */
    filesInAssetFolder(file: File, folder: string, checkNested = true): Array<Promise<string>> {
        // Here, if a file in the specified folder has the same name and hash as the file uploaded, then we consider the
        // two to be the same. Otherwise, we consider them to be different. We even consider if the asset is within a
        // subfolder of the specified folder, so long as the name and hash of the file is the same. There may be more than one
        // instance of the specified asset in the specified folder, albeit in seperate subfolders, hence why we collect
        // an array of duplicate asset promises
        const sharedAssetPromises = [];
        this.configFileStructure.assets[folder].forEach((relativePath, compressedBinary) => {
            const assetName = checkNested ? relativePath.split('/').at(-1) : relativePath;
            if (assetName === file.name) {
                sharedAssetPromises.push(
                    this.compareFiles(file, compressedBinary, assetName).then((fileSame) =>
                        fileSame ? relativePath : 'N/A'
                    )
                );
            }
        });

        return sharedAssetPromises;
    }

    // TODO: move method into a plugin. That way it isn't repeated in the metadata/image editors
    /**
     * Compares the hashes of two files
     * @param file File that was uploaded
     * @param compressedBinary Compressed binary file from configFileStructure
     * @param compressedName The name of the compressed binary file
     */
    async compareFiles(file: File, compressedBinary: JSZip.JSZipObject, compressedName: string): Promise<boolean> {
        const fileHash = await this.obtainHashData(file);
        const compressedType = compressedName.split('.').at(-1);

        return compressedBinary
            .async(compressedType !== 'svg' ? 'blob' : 'text')
            .then((assetFile) => {
                if (compressedType === 'svg') {
                    assetFile = new File([assetFile], compressedName, {
                        type: 'image/svg+xml'
                    });
                }
                return this.obtainHashData(assetFile);
            })
            .then((hash) => {
                return hash.join() === fileHash.join();
            });
    }

    // TODO: move method into a plugin. That way it isn't repeated in the metadata/image editors
    // adds an uploaded file that is either a: video, transcript or captions
    async addUploadedFile(file: File, type: string): Promise<void> {
        const oppositeLang = this.lang === 'en' ? 'fr' : 'en';
        const sharedAssetPaths = await Promise.all(this.filesInAssetFolder(file, 'shared', false));
        let inSharedAsset = false;
        let oppositeSourceCount = 0;
        let newAssetName = file.name;
        let uploadSource = `${this.configFileStructure.uuid}/assets/shared/${file.name}`;

        // Should contain either 0 or 1 promise.
        sharedAssetPaths.forEach((sharedAssetPath) => {
            inSharedAsset = sharedAssetPath !== 'N/A';
        });

        if (!inSharedAsset) {
            const oppositeAssetPaths = await Promise.all(this.filesInAssetFolder(file, oppositeLang));
            // If the current promise is empty, then the current path refers to an asset in the opposite asset folder that
            // has the same name, but different contents, as the asset uploaded. In this case we do nothing, as this asset
            // is not a valid duplicate.
            for (const oppositeAssetPath of oppositeAssetPaths) {
                if (oppositeAssetPath !== 'N/A') {
                    const oppositeFileSource = `${this.configFileStructure.uuid}/assets/${oppositeLang}/${oppositeAssetPath}`;
                    oppositeSourceCount += this.sourceCounts[oppositeFileSource] ?? 0;
                    this.sourceCounts[oppositeFileSource] = 0;
                    this.configFileStructure.assets[oppositeLang].remove(oppositeAssetPath);

                    // Add asset to shared folder if asset is yet to be moved to the shared folder. If an asset with the
                    // same name, but different content, is already in the shared folder, we must give the asset we are
                    // uploading a unique name. Otherwise the existing asset will be overwritten
                    if (!inSharedAsset) {
                        let i = 2;
                        while (this.configFileStructure.assets['shared'].file(newAssetName)) {
                            // If the updated name is the same as a file that already exists in the shared asset folder,
                            // we must compare that file with the uploaded file, since they wouldnt have been compared
                            // on the first run due to having different names
                            if (i > 2) {
                                const filesEqual = await this.compareFiles(
                                    file,
                                    this.configFileStructure.assets['shared'].file(newAssetName),
                                    newAssetName
                                );
                                if (filesEqual) break;
                            }
                            newAssetName = `${file.name.split('.').at(0)}(${i}).${file.name.split('.').at(-1)}`;
                            i++;
                        }
                        uploadSource = `${this.configFileStructure.uuid}/assets/shared/${newAssetName}`;
                        this.configFileStructure.assets['shared'].file(newAssetName, file);
                        inSharedAsset = true;
                    }
                    this.$emit('shared-asset', oppositeFileSource, uploadSource, oppositeLang); // must be emitted for each duplicate asset
                }
            }
        }

        // If the asset uploaded is in the shared asset folder, then no need to upload to the current langs assets folder
        if (!inSharedAsset) {
            const currAssetPaths = await Promise.all(this.filesInAssetFolder(file, this.lang, false));
            // Should contain either 0 or 1 promise.
            for (const currAssetPath of currAssetPaths) {
                // If asset w/ same name but different contents is in curr lang asset folder, set name in curr lang
                // asset folder to a unique name, to avoid overwriting an existing file.
                if (currAssetPath === 'N/A') {
                    let i = 2;
                    while (this.configFileStructure.assets[this.lang].file(newAssetName)) {
                        // If the updated name is the same as a file that already exists in the current langs asset folder,
                        // we must compare that file with the uploaded file, since they wouldnt have been compared
                        // on the first run due to having different names
                        if (i > 2) {
                            const filesEqual = await this.compareFiles(
                                file,
                                this.configFileStructure.assets[this.lang].file(newAssetName),
                                newAssetName
                            );
                            if (filesEqual) break;
                        }
                        newAssetName = `${file.name.split('.').at(0)}(${i}).${file.name.split('.').at(-1)}`;
                        i++;
                    }
                }
            }
            uploadSource = `${this.configFileStructure.uuid}/assets/${this.lang}/${newAssetName}`;
            this.configFileStructure.assets[this.lang].file(newAssetName, file);
        }

        if (this.sourceCounts[uploadSource]) {
            this.sourceCounts[uploadSource] += 1 + oppositeSourceCount;
        } else {
            this.sourceCounts[uploadSource] = 1 + oppositeSourceCount;
        }

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
            const videoFolder = this.videoPreview.id.split('/')[2];
            const videoRelativePath = this.videoPreview.id.split('/').slice(3).join('/');

            this.sourceCounts[videoSource] -= 1;
            if (this.sourceCounts[videoSource] === 0) {
                this.configFileStructure.assets[videoFolder].remove(videoRelativePath);
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
            console.log('SAVING PROPERLY');
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
        console.log('VID PANEL STUFF', JSON.parse(JSON.stringify(this.panel)));
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
