<template>
    <vue-final-modal
        modalId="admin-upload-modal"
        content-class="edit-metadata-content max-h-full overflow-y-auto max-w-xl mx-4 p-7 bg-white border rounded-lg"
        class="flex justify-center items-center"
    >
        <div class="modal-contents">
            <div class="text-xl text-center pb-8 font-bold">{{ $t('editor.adminUpload') }}</div>
            <div class="flex flex-col items-center pb-2">
                <label class="pb-1" for="product-uuid">{{ $t('editor.uuid.new') }}: </label>
                <input
                    type="text"
                    name="uuid"
                    id="product-uuid"
                    class="respected-standard-input text-center"
                    v-model="productUuid"
                    @input="checkUuid"
                    placeholder="4523ae53-5d58-4a0e-8b01-54d9824871f5"
                    :class="{
                        'input-error': error
                    }"
                />
                <div class="warning-container">
                    <!-- Display a warning if there is one. -->
                    <span
                        v-if="warning !== 'none'"
                        class="flex flex-row items-center justify-center text-accent-dark-orange rounded p-1"
                    >
                        <span class="align-middle inline-block mr-1 fill-current">
                            <svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                                    fill-rule="nonzero"
                                />
                            </svg>
                        </span>
                        <div>
                            <span class="inline-block select-none text-sm">
                                {{ $t(`editor.warning.${warning}`) }}
                            </span>
                        </div>
                    </span>
                </div>
            </div>
            <div
                class="file-upload flex flex-col items-center justify-center bg-blue-100 border-4 border-dashed border-blue-300"
                :class="{ dragging: isDragging }"
                @dragover.prevent="() => (dragging = true)"
                @dragleave.prevent="() => (dragging = false)"
                @drop.prevent="productDropped($event)"
            >
                <div class="self-end p-2">
                    <span
                        :content="`${$t('editor.adminUpload.zipFileInfo')}<br/><br/>${$t(
                            'editor.adminUpload.folderUploadInfo'
                        )}`"
                        v-tippy="{
                            placement: 'bottom-start',
                            theme: 'left-align',
                            hideOnClick: false,
                            animateFill: true,
                            touch: ['hold', 500],
                            allowHTML: true
                        }"
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
                <div class="flex gap-3 flex-col items-center justify-center p-6 pt-0">
                    <span>{{ $t('editor.adminUpload.drag') }}</span>
                    {{ $t('editor.label.or')[0].toUpperCase() + $t('editor.label.or').slice(1) }}

                    <label
                        class="cursor-pointer"
                        :content="$t('editor.adminUpload.zipFileInfo')"
                        v-tippy="{
                            placement: 'bottom-start',
                            theme: 'left-align',
                            hideOnClick: false,
                            animateFill: true,
                            touch: ['hold', 500]
                        }"
                        @keydown.enter="clickZipUpload"
                        tabindex="0"
                    >
                        <span class="text-blue-700 font-bold">{{
                            $t('editor.label.browse')[0].toUpperCase() + $t('editor.label.browse').slice(1)
                        }}</span>
                        {{ $t('editor.label.upload.zip') }}
                        <input
                            type="file"
                            name="zip"
                            id="product-zip-file"
                            @change="productZipUploaded"
                            multiple="false"
                            accept="application/x-zip-compressed"
                            class="cursor-pointer"
                            ref="productZipInput"
                            tabindex="-1"
                        />
                    </label>
                    <label
                        class="cursor-pointer pt-4"
                        :content="$t('editor.adminUpload.folderUploadInfo')"
                        v-tippy="{
                            placement: 'bottom-start',
                            theme: 'left-align',
                            hideOnClick: false,
                            animateFill: true,
                            touch: ['hold', 500]
                        }"
                        @keydown.enter="clickFolderUpload"
                        tabindex="0"
                    >
                        <span class="text-blue-700 font-bold">{{
                            $t('editor.label.browse')[0].toUpperCase() + $t('editor.label.browse').slice(1)
                        }}</span>
                        {{ $t('editor.label.upload.folder') }}
                        <input
                            type="file"
                            name="folder"
                            id="product-folder"
                            @change="productFolderUploaded"
                            multiple="false"
                            webkitdirectory
                            directory
                            class="cursor-pointer"
                            ref="productFolderInput"
                            tabindex="-1"
                        />
                    </label>

                    <div class="pt-4">{{ $t('editor.adminUpload.fileName') }}: {{ productUploadName || 'N/A' }}</div>
                </div>
            </div>
            <br />

            <div class="modal-footer">
                <div class="inline-flex align-middle self-center" v-if="loading">
                    <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                </div>
                <button
                    type="submit"
                    @click="uploadZip"
                    class="respected-standard-button respected-black-bg-button"
                    :disabled="error"
                >
                    {{ $t('editor.video.label.upload') }}
                </button>
                <button @click="closeModal" class="respected-standard-button respected-gray-border-button">
                    {{ $t('editor.cancel') }}
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';

import { useLockStore } from '../../stores/lockStore';
import { VueFinalModal } from 'vue-final-modal';

import { VueSpinnerOval } from 'vue3-spinners';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { throttle } from 'throttle-debounce';
import JSZip from 'jszip';
import { fromEvent } from 'file-selector';
import Message from 'vue-m-message';

@Options({
    components: {
        'vue-final-modal': VueFinalModal,
        spinner: VueSpinnerOval
    },
    emits: ['obtain-profile']
})
export default class AdminUplaodV extends Vue {
    @Prop() userName: string;

    lockStore = useLockStore();

    apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';
    productZip: string | File = '';
    productUploadName = '';
    productUuid = '';
    loading = false;
    dragging = false;
    error = false;
    checkingUuid = false;
    warning = 'none';

    get isDragging(): boolean {
        return this.dragging;
    }

    productZipUploaded(e: Event): void {
        const uploadedFiles = (e.target as HTMLInputElement).files as ArrayLike<File>;
        if (uploadedFiles.length > 0) {
            if (uploadedFiles.length > 1) {
                Message.info(this.$t('editor.adminUpload.oneFileOnly'));
            }
            const fileUploaded = uploadedFiles[0];
            if (fileUploaded.type === 'application/x-zip-compressed') {
                this.productZip = fileUploaded;
                this.productUploadName = fileUploaded.name;
            } else {
                Message.error(this.$t('editor.adminUpload.incorrectType'));
            }
        } else {
            this.productZip = '';
            this.productUploadName = '';
        }
    }

    clickZipUpload() {
        this.$refs['productZipInput'].click();
    }

    clickFolderUpload() {
        this.$refs['productFolderInput'].click();
    }

    productFolderUploaded(e: Event): void {
        const uploadedFiles = (e.target as HTMLInputElement).files as ArrayLike<File>;
        uploadedFiles.forEach((file) => {
            // Add filePath property to each file
            file.filePath = file.webkitRelativePath;
        });
        this.uploadFolderHelper(uploadedFiles);
    }

    productDropped(e: Event): void {
        if (e.dataTransfer !== null) {
            const fileUploaded = e.dataTransfer.files[0];
            if (e.dataTransfer.files.length > 1) {
                Message.info(this.$t('editor.adminUpload.oneFileOnly'));
            }

            if (fileUploaded.type === 'application/x-zip-compressed') {
                this.productZip = fileUploaded;
                this.productUploadName = fileUploaded.name;
            } else {
                fromEvent(e).then((files) => {
                    files.forEach((file) => {
                        // Remove initial slash. Creating new property because others are read only
                        file.filePath = file.relativePath.split('/').slice(1).join('/');
                    });
                    this.uploadFolderHelper(files);
                });
            }
            this.dragging = false;
        }
    }

    uploadFolderHelper(uploadedFiles: Array<File>): void {
        if (uploadedFiles.length > 0) {
            const configZip = new JSZip();
            let containsEnConfig = false;
            let containsFrConfig = false;
            let folderUuidEn = '';
            let folderUuidFr = '';
            configZip.folder('ramp-config');
            configZip.folder('assets/en');
            configZip.folder('assets/fr');
            configZip.folder('charts');
            configZip.folder('styles');

            uploadedFiles.forEach((file) => {
                if (file.name.includes('_en.json')) {
                    containsEnConfig = true;
                    folderUuidEn = file.name.split('_en.json')[0];
                }

                if (file.name.includes('_fr.json')) {
                    containsFrConfig = true;
                    folderUuidFr = file.name.split('_fr.json')[0];
                }
            });

            // Ensure that there exists a json config for each lang
            if (!(containsEnConfig && containsFrConfig && folderUuidEn === folderUuidFr)) {
                Message.error(this.$t('editor.adminUpload.folder.invalidStructure'));
                return;
            }

            for (const file of uploadedFiles) {
                // Ignore git files
                if (!file.filePath.includes('.git')) {
                    // If this file is not within a valid subfolder, the folder is not valid strcture
                    if (
                        ['ramp-config', 'styles', 'assets', 'charts'].every(
                            (str) => file.filePath.split('/')[1] !== str
                        )
                    ) {
                        if (
                            file.filePath.split('/')[1] !== `${folderUuidEn}_en.json` &&
                            file.filePath.split('/')[1] !== `${folderUuidEn}_fr.json`
                        ) {
                            Message.error(this.$t('editor.adminUpload.folder.invalidStructure'));
                            return;
                        }
                    }

                    // If this files highest parent is not the same as the names of the config files, the folder is not
                    // valid structure
                    if (file.filePath.split('/')[0] !== folderUuidEn) {
                        Message.error(this.$t('editor.adminUpload.folder.invalidStructure'));
                        return;
                    }

                    configZip.file(file.filePath.split('/').slice(1).join('/'), file);
                }
            }

            configZip.generateAsync({ type: 'blob' }).then((content: Blob) => {
                this.productZip = content;
                this.productUploadName = folderUuidEn;
            });
        } else {
            this.productZip = '';
            this.productUploadName = '';
        }
    }

    checkUuid = throttle(300, (): void => {
        // All reserved characters in URLs. The user can't use these for their UUID
        const illegalChars = [':', '/', '#', '?', '&', '@', '%', '+'];
        const illegalCharsContained = illegalChars.filter((badChar) => this.productUuid.includes(badChar));

        if (illegalCharsContained.length) {
            this.error = true;
            this.checkingUuid = false;
            this.warning = 'badChar';
            return;
        } else {
            this.error = false;
        }

        fetch(this.apiUrl + `/check/${this.productUuid}`).then((res: Response) => {
            if (res.status !== 404) {
                this.error = true;
                this.warning = 'uuid';
            } else {
                this.error = false;
            }
            this.checkingUuid = false;
        });

        if (this.error === false) {
            this.warning = 'none';
        }
    });

    // TODO: Once the editor decoupling PR is merged, split this up using the helpers in the productStore
    uploadZip(): void {
        if (this.productUuid && this.productZip) {
            // Need to use UUID provided by user
            const zipFileName = `${this.productUuid}.zip`;
            this.productZip = new File([this.productZip], zipFileName, { type: 'application/x-zip-compressed' });
            this.loading = true;
            this.lockStore
                .lockStoryline(this.productUuid)
                .then(() => {
                    const formData = new FormData();
                    formData.append('data', this.productZip);
                    const headers = {
                        'Content-Type': 'multipart/form-data',
                        user: this.userName,
                        secret: this.lockStore.secret
                    };
                    axios
                        .post(this.apiUrl + `/upload/${this.productUuid}`, formData, { headers })
                        .then((res: AxiosResponse) => {
                            const responseData = res.data;
                            const commitHash = responseData.commitHash; // commit hash of the git commit
                            axios
                                .post(this.apiUrl + `/admin-rename`, {
                                    user: this.userName,
                                    newUuid: this.productUuid,
                                    secret: this.lockStore.secret
                                })
                                .then(() => {
                                    if (
                                        import.meta.env.VITE_APP_NET_API_URL &&
                                        import.meta.env.VITE_APP_CURR_ENV &&
                                        this.productUuid
                                    ) {
                                        axios
                                            .post(import.meta.env.VITE_APP_NET_API_URL + '/api/user/register', {
                                                uuid: this.productUuid,
                                                titleEn: '',
                                                titleFr: ''
                                            })
                                            .then(() => {
                                                formData.append('uuid', this.productUuid);
                                                formData.append('titleEn', '');
                                                formData.append('titleFr', '');
                                                formData.append('commitHash', commitHash);
                                                formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                                                axios
                                                    .post(
                                                        import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit',
                                                        formData
                                                    )
                                                    .then(() => {
                                                        Message.success(this.$t('editor.adminUpload.successfulUpload'));
                                                        this.lockStore.unlockStoryline();
                                                        this.closeModal();
                                                        this.loading = false;
                                                        this.$emit('obtain-profile');
                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                        this.lockStore.unlockStoryline();
                                                        this.closeModal();
                                                        this.loading = false;
                                                    });
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                                this.lockStore.unlockStoryline();
                                                this.closeModal();
                                                this.loading = false;
                                            });
                                    } else {
                                        Message.success(this.$t('editor.adminUpload.successfulUpload'));
                                        this.lockStore.unlockStoryline();
                                        this.closeModal();
                                        this.loading = false;
                                        this.$emit('obtain-profile');
                                    }
                                })
                                .catch(() => {
                                    Message.error(this.$t('editor.warning.renameFailed'));
                                    this.lockStore.unlockStoryline();
                                    this.closeModal();
                                    this.loading = false;
                                });
                        })
                        .catch(() => {
                            Message.error(this.$t('editor.editMetadata.message.error.failedZipFile'));
                            this.lockStore.unlockStoryline();
                            this.closeModal();
                            this.loading = false;
                        });
                })
                .catch(() => {
                    Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                });
        } else {
            Message.error(this.$t('editor.adminUpload.missingInput'));
        }
    }

    closeModal(): void {
        this.$vfm.close('admin-upload-modal');
        const fileInput = document.querySelector('#product-zip-file');
        (fileInput as HTMLInputElement).value = '';
        const folderInput = document.querySelector('#product-folder');
        (folderInput as HTMLInputElement).value = '';
        this.productUuid = '';
        this.productZip = '';
        this.productUploadName = '';
        this.error = false;
        this.warning = 'none';
    }
}
</script>

<style lang="scss"></style>
