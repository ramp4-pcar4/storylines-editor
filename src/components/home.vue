<template>
    <div>
        <!-- Header bar -->
        <header class="flex justify-between flex-wrap items-center pt-3 pb-2 border-b-2 border-solid border-black mb-5">
            <div class="flex items-center gap-3 px-7 md:px-20">
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36">
                    <path
                        fill="#DD2E44"
                        d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5s-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292s1.542-10.5 1.086-10.698s-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125s-3.337-1.48-3.793-1.282s1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5s-3.125.312-3.125 1s8.438 5.235 9 5.771s-2.914 2.802-2.417 3.229c.576.496 3.839-.83 10.417-.957V35a1 1 0 1 0 2 0v-6.04c6.577.127 9.841 1.453 10.417.957c.496-.428-2.979-2.694-2.417-3.229s9-5.084 9-5.771"
                    />
                </svg>
                <!-- Application title -->
                <h1 style="padding-top: 2px" class="text-xl font-semibold">
                    {{ $t('editor.respectTitle') }}
                </h1>
            </div>
            <!-- Language toggle -->
            <router-link
                class="px-7 md:px-20"
                :to="{ name: 'home', params: { lang: currLang === 'en' ? 'fr' : 'en' } }"
                v-if="!sourceFile.includes('index-ca')"
            >
                <div class="underline">{{ `${currLang === 'en' ? 'Français' : 'English'}` }}</div>
            </router-link>
        </header>
        <div class="relative" style="margin-right: 10%; margin-left: 10%">
            <div v-if="showExpired" class="w-full rounded-md bg-red-100 p-2 mt-5">
                <span class="flex flex-row items-center">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        style="color: rgb(245, 108, 108)"
                        class="w-10 h-10 pr-2"
                    >
                        <path
                            fill="currentColor"
                            d="M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"
                        ></path>
                    </svg>
                    {{ $t('editor.session.ended') }}
                    <button
                        @click.stop="
                            () => {
                                showExpired = false;
                            }
                        "
                        class="editor-button bg-black text-white hover:bg-gray-800 ml-auto"
                    >
                        {{ $t('editor.ok') }}
                    </button>
                </span>
            </div>
            <h2 class="pt-10 text-4xl font-semibold">{{ $t('editor.dashboard') }}</h2>
            <div class="text-xl font-semibold text-right pt-2 pb-2">
                {{ $t('editor.landing.greeting') }} {{ userName }}!
            </div>
            <div class="mb-5 text-2xl font-semibold">{{ $t('editor.chooseOption') }}</div>
            <div class="button-grid">
                <div class="home-btn-container border border-gray-400 border-solid home-buttons">
                    <router-link :to="{ name: 'metadataNew' }" class="flex justify-center h-full" target>
                        <button class="dashboard-option-button flex items-center text-xl font-bold px-2" tabindex="-1">
                            <svg
                                height="50"
                                width="50"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 pr-3"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <div style="font-size: calc(60% + 0.25vw)">{{ $t('editor.createProduct') }}</div>
                        </button>
                    </router-link>
                </div>
                <div class="home-btn-container border border-gray-400 border-solid home-buttons">
                    <router-link :to="{ name: 'metadataExisting' }" class="flex justify-center h-full" target>
                        <button class="dashboard-option-button flex items-center text-xl font-bold" tabindex="-1">
                            <span class="pr-3">
                                <svg
                                    width="55"
                                    height="55"
                                    viewBox="0 0 55 55"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.875 9.16675H48.125"
                                        stroke="#33363F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M11.4585 9.16675H43.5418V40.3417C43.5418 41.4619 43.5418 42.0219 43.3238 42.4497C43.1321 42.8261 42.8261 43.132 42.4498 43.3238C42.022 43.5417 41.4619 43.5417 40.3418 43.5417H14.6585C13.5384 43.5417 12.9783 43.5417 12.5505 43.3238C12.1742 43.132 11.8682 42.8261 11.6765 42.4497C11.4585 42.0219 11.4585 41.4619 11.4585 40.3417V9.16675Z"
                                        stroke="#33363F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M27.5 34.375V20.625"
                                        stroke="#33363F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M20.625 27.5L27.3939 20.7311C27.4525 20.6725 27.5475 20.6725 27.6061 20.7311L34.375 27.5"
                                        stroke="#33363F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </span>
                            <div style="font-size: calc(60% + 0.25vw)">{{ $t('editor.loadProduct') }}</div>
                        </button>
                    </router-link>
                </div>
                <div
                    class="home-btn-container border border-gray-400 border-solid home-buttons flex justify-center h-full"
                    target
                    @click="$vfm.open('admin-upload-modal')"
                    v-if="profile.role === 'Admin'"
                >
                    <button
                        class="dashboard-option-button flex items-center justify-center text-xl font-bold w-full"
                        tabindex="-1"
                    >
                        <span class="pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="55" height="55">
                                <path
                                    d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6M20 18H16V16H14V18H4V8H14V10H16V8H20V18M16 12V10H18V12H16M14 12H16V14H14V12M18 16H16V14H18V16Z"
                                />
                            </svg>
                        </span>
                        <div style="font-size: calc(60% + 0.25vw)">{{ $t('editor.adminUpload') }}</div>
                    </button>
                </div>
            </div>

            <vue-final-modal
                modalId="admin-upload-modal"
                content-class="edit-metadata-content max-h-full overflow-y-auto max-w-xl mx-4 p-7 bg-white border rounded-lg"
                class="flex justify-center items-center"
            >
                <div class="p-5">
                    <div class="text-xl text-center pb-8 font-bold">{{ $t('editor.adminUpload') }}</div>
                    <div class="flex flex-col items-center pb-5">
                        <label for="product-uuid">{{ $t('editor.uuid.new') }}: </label>
                        <input
                            type="text"
                            name="uuid"
                            id="product-uuid"
                            class="editor-input w-5/6 text-center"
                            v-model="productUuid"
                            @input="checkUuid"
                            placeholder="4523ae53-5d58-4a0e-8b01-54d9824871f5"
                            :class="{
                                'input-error': error
                            }"
                        />
                        <!-- TODO: try to keep this fixed in size, so the modal doesn't resize when rendered -->
                        <div class="w-5/6 h-1/6">
                            <!-- Display a warning if there is one. -->
                            <span
                                v-if="warning !== 'none'"
                                class="flex flex-row items-center text-accent-dark-orange rounded p-1"
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
                        class="flex flex-col items-center justify-center m-5 bg-blue-100 border-4 border-dashed border-blue-300"
                        :class="{ dragging: isDragging }"
                        @dragover.prevent="() => (dragging = true)"
                        @dragleave.prevent="() => (dragging = false)"
                        @drop.prevent="productZipDropped($event)"
                    >
                        <div class="self-end p-0">
                            <button
                                class="info-button w-min cursor-default"
                                :content="$t('editor.adminUpload.zipFileInfo')"
                                v-tippy="{
                                    theme: 'left-align',
                                    delay: '200',
                                    placement: 'bottom-start',
                                    touch: ['hold', 500],
                                    allowHTML: true
                                }"
                            >
                                i
                            </button>
                        </div>
                        <div class="flex flex-col items-center justify-center p-12 pt-4">
                            <label class="cursor-pointer p-4">
                                <span>{{ $t('editor.image.label.drag', { fileType: 'zip file' }) }}</span>
                                {{ $t('editor.label.or') }}
                                <span class="text-blue-700 font-bold">{{ $t('editor.label.browse') }}</span>
                                {{ $t('editor.label.upload') }}
                                <input
                                    type="file"
                                    name="zip"
                                    id="product-zip-file"
                                    @change="productZipUploaded"
                                    multiple="false"
                                    accept="application/x-zip-compressed"
                                    class="cursor-pointer"
                                />
                            </label>
                            <div>{{ $t('editor.adminUpload.fileName') }}: {{ productZipName || 'N/A' }}</div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="inline-flex align-middle mr-2" v-if="loading">
                            <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                        </div>
                        <button
                            type="submit"
                            @click="uploadZip"
                            class="editor-button editor-forms-button bg-black text-white hover:bg-gray-80 mr-2"
                            :disabled="error"
                        >
                            {{ $t('editor.video.label.upload') }}
                        </button>
                        <button @click="closeModal" class="editor-button editor-forms-button border border-gray-300">
                            {{ $t('editor.cancel') }}
                        </button>
                    </div>
                </div>
            </vue-final-modal>

            <h2 class="pt-8 pb-5 text-2xl font-semibold">{{ $t('editor.previousProducts') }}</h2>
            <table class="shadow-lg bg-white w-full pr-0 mr-0">
                <colgroup>
                    <col class="w-3/5" />
                    <col span="2" />
                </colgroup>
                <tr>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div style="font-size: calc(70% + 0.25vw)" class="m-2 mr-0 ml-3">
                            {{ $t('editor.previousProducts.productInfo') }}
                        </div>
                    </td>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div style="font-size: calc(70% + 0.25vw)">
                            {{ $t('editor.previousProducts.lastModified') }}
                        </div>
                    </td>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div style="font-size: calc(70% + 0.25vw)" class="ml-2">
                            {{ $t('editor.previousProducts.actions') }}
                        </div>
                    </td>
                </tr>
                <tr v-for="(storyline, idx) in userStorylines" :key="idx">
                    <td
                        style="background-color: #f9f9f9; padding-right: 1vw"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        <div class="m-2 mt-4 ml-3">{{ $t('editor.uuid') }}: {{ storyline.uuid }}</div>
                        <div class="m-2 mb-4 ml-3">
                            {{ $t('editor.previousProducts.productInfo.title') + ': ' + storyline.titleEN }}
                        </div>
                    </td>
                    <td
                        style="background-color: #f9f9f9; padding-right: 1vw"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        {{ dateFormatter(storyline.lastModified) }}
                    </td>
                    <td
                        style="background-color: #f9f9f9; padding-right: 1vw"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        <button
                            class="flex items-center font-semibold rounded-sm py-2 border border-solid border-black home-buttons"
                            style="
                                padding-right: 1vw;
                                padding-left: 1vw;
                                word-wrap: break-word;
                                overflow-wrap: break-word;
                                display: flex;
                                flex-wrap: wrap;
                                white-space: normal;
                                min-width: 0;
                                max-width: 100%;
                            "
                            @click="editProduct(storyline.uuid)"
                        >
                            <span class="pr-1">
                                <svg
                                    height="20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                                    />
                                </svg>
                            </span>
                            <span>{{ $t('editor.chart.label.edit') }}</span>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { Storyline, UserProfile, useUserStore } from '../stores/userStore';
import { useLockStore } from '../stores/lockStore';
import Message from 'vue-m-message';
import { VueFinalModal } from 'vue-final-modal';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { VueSpinnerOval } from 'vue3-spinners';
import { throttle } from 'throttle-debounce';

@Options({
    components: {
        'vue-final-modal': VueFinalModal,
        spinner: VueSpinnerOval
    }
})
export default class HomeV extends Vue {
    @Prop({ default: false }) sessionExpired!: boolean; // true if user was redirected here due to session expiring, false otherwise

    userStore = useUserStore();
    lockStore = useLockStore();
    currLang = 'en';
    sourceFile = 'index.html#';
    profile: UserProfile = {};
    showExpired = false;
    apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';
    productZip = '';
    productZipName = '';
    productUuid = '';
    loading = false;
    dragging = false;
    error = false;
    checkingUuid = false;
    warning = 'none';

    mounted(): void {
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.sourceFile = window.location.href.split('/').find((s) => s.includes('#'));
        // If the user was redirected here due to session end, show session end popup.
        if (this.sessionExpired) {
            this.showExpired = true;
        }
        this.userStore
            .fetchUserProfile()
            .then(() => {
                if (this.userStore.userProfile) {
                    this.profile = JSON.parse(JSON.stringify(this.userStore.userProfile));
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    get userName(): string {
        return this.profile?.userName || 'Guest';
    }

    get userStorylines(): Array<Storyline> {
        return this.profile?.storylines?.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)) || {};
    }

    get isDragging(): boolean {
        return this.dragging;
    }

    dateFormatter(date: string | null): string {
        if (date) {
            const d = new Date(date);
            const months = [
                this.$t('editor.month.january'),
                this.$t('editor.month.february'),
                this.$t('editor.month.march'),
                this.$t('editor.month.april'),
                this.$t('editor.month.may'),
                this.$t('editor.month.june'),
                this.$t('editor.month.july'),
                this.$t('editor.month.august'),
                this.$t('editor.month.september'),
                this.$t('editor.month.october'),
                this.$t('editor.month.november'),
                this.$t('editor.month.december')
            ];
            if (this.currLang === 'en') {
                return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            } else {
                return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
            }
        }
    }

    editProduct(uuid: number): void {
        this.$router.push({ name: 'editor', params: { uid: uuid } });
    }

    productZipUploaded(e: Event): void {
        // TODO: If a product folder was uploaded instead of a zip, zip it
        const uploadedFiles = (e.target as HTMLInputElement).files as ArrayLike<File>;
        if (uploadedFiles.length > 0) {
            if (uploadedFiles.length > 1) {
                Message.info(this.$t('editor.adminUpload.oneFileOnly'));
            }
            const fileUploaded = uploadedFiles[0];
            if (fileUploaded.type === 'application/x-zip-compressed') {
                this.productZip = fileUploaded;
                this.productZipName = fileUploaded.name;
            } else {
                Message.error(this.$t('editor.adminUpload.incorrectType'));
            }
        } else {
            this.productZip = '';
            this.productZipName = '';
        }
    }

    productZipDropped(e: Event) {
        // TODO: If a product folder was uploaded instead of a zip, zip it
        if (e.dataTransfer !== null) {
            const fileUploaded = e.dataTransfer.files[0];
            if (e.dataTransfer.files.length > 1) {
                Message.info(this.$t('editor.adminUpload.oneFileOnly'));
            }

            if (fileUploaded.type === 'application/x-zip-compressed') {
                this.productZip = fileUploaded;
                this.productZipName = fileUploaded.name;
            } else {
                Message.error(this.$t('editor.adminUpload.incorrectType'));
            }
            this.dragging = false;
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
                        .then(() => {
                            axios
                                .post(this.apiUrl + `/admin-rename`, {
                                    user: this.userName,
                                    newUuid: this.productUuid,
                                    secret: this.lockStore.secret
                                })
                                .then(() => {
                                    Message.success(this.$t('editor.adminUpload.successfulUpload'));
                                    this.lockStore.unlockStoryline();
                                })
                                .catch(() => {
                                    Message.error(this.$t('editor.warning.renameFailed'));
                                    this.lockStore.unlockStoryline();
                                });
                        })
                        .catch(() => {
                            Message.error(this.$t('editor.editMetadata.message.error.failedZipFile'));
                            this.lockStore.unlockStoryline();
                        })
                        .finally(() => {
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
        fileInput.value = '';
        this.productUuid = '';
        this.productZip = '';
        this.productZipName = '';
        this.error = false;
        this.warning = 'none';
    }
}
</script>

<style lang="scss">
.dashboard-option-button {
    outline: none !important;
}

.home-btn-container {
    width: 100%;
    min-height: 110px;
    justify-self: center;
}
.home-buttons:hover {
    background-color: #e7e7e7;
}

table {
    table-layout: fixed;
}

td {
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
}

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

.dragging {
    background-color: #fffaf0 !important;
    border-color: #fff !important;
}

.editor-button {
    border-radius: 3px;
    padding: 5px 12px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.editor-forms-button {
    padding: 8px 15px;
    border-radius: 5px;
}

.editor-button:hover:enabled {
    background-color: #dbdbdb;
    color: black;
}

.input-error {
    border: 1px solid red !important;
    outline-color: red !important;
}

.info-button {
    padding: 0px 10px !important;
    border: 2px solid black;
    margin: 4px;
    border-radius: 100px !important;
}

// At smaller screen widths, display all buttons in one column
@media (width <= 1000px) {
    .button-grid {
        grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    }
    .home-btn-container {
        width: 80vw;
    }
    .home-btn-container {
        justify-self: start;
    }
}
</style>
