<template>
    <div>
        <!-- Header bar -->
        <header class="flex justify-between flex-wrap items-center pt-3 pb-2 border-b-2 border-solid border-black mb-5">
            <div class="flex items-center gap-3 px-4 md:px-20">
                <!-- Icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                    style="flex: 0 0 24px"
                >
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
                <div class="respected-standard-link-button">{{ `${currLang === 'en' ? 'Français' : 'English'}` }}</div>
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
                        style="margin-left: auto"
                        class="respected-standard-button respected-black-bg-button"
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

            <!-- put adminUpload component here -->
            <admin-upload :userName="userName" @obtain-profile="obtainUserProfile()"></admin-upload>

            <h2 class="pt-8 pb-5 text-2xl font-semibold">{{ $t('editor.previousProducts') }}</h2>
            <table class="shadow-lg bg-white w-full pr-0 mr-0 mb-10">
                <colgroup>
                    <col class="w-3/5" />
                    <col span="2" />
                </colgroup>
                <thead>
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
                </thead>
                <tbody>
                    <tr v-if="userStorylines.length === 0">
                        <td style="background-color: #f9f9f9" class="border-b border-solid text-center p-2" colspan="3">
                            {{ $t('editor.previousProducts.noProducts') }}
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
                                {{
                                    $t('editor.previousProducts.productInfo.title') +
                                    ': ' +
                                    (currLang === 'en' ? storyline.titleEN : storyline.titleFR)
                                }}
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
                                class="flex items-center justify-center font-semibold rounded-sm py-2 border border-solid border-black home-buttons"
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
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { Storyline, UserProfile, useUserStore } from '../../stores/userStore';
import AdminUploadV from './admin-upload.vue';

@Options({
    components: {
        'admin-upload': AdminUploadV
    }
})
export default class HomeV extends Vue {
    @Prop({ default: false }) sessionExpired!: boolean; // true if user was redirected here due to session expiring, false otherwise

    userStore = useUserStore();
    currLang = 'en';
    sourceFile = 'index.html#';
    profile: UserProfile = {};
    showExpired = false;

    mounted(): void {
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.sourceFile = window.location.href.split('/').find((s) => s.includes('#')) as string;
        // If the user was redirected here due to session end, show session end popup.
        if (this.sessionExpired) {
            this.showExpired = true;
        }
        this.obtainUserProfile();
    }

    obtainUserProfile(): void {
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
        return (
            this.profile?.storylines?.sort(
                (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
            ) || []
        );
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
            const hour = d.getHours().toString().padStart(2, '0');
            const minute = d.getMinutes().toString().padStart(2, '0');

            if (this.currLang === 'en') {
                return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' ' + hour + ':' + minute;
            } else {
                return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + hour + ':' + minute;
            }
        }
        return '';
    }

    editProduct(uuid: string): void {
        this.$router.push({ name: 'editor', params: { uid: uuid } });
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

.warning-container {
    width: 30vw;
    height: 20px;
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

.modal-contents {
    padding: 1.25em;
}

.file-upload {
    margin: 1.25rem;
}

.modal-footer {
    display: flex;
    justify-content: end;
    gap: 5px;
}

.editor-button {
    border-radius: 3px;
    padding: 5px 12px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.editor-input {
    width: 85%;
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
    .warning-container {
        width: 60vw;
        height: 25px;
    }
}

@media (width <= 400px) {
    .modal-contents {
        padding: 5px;
        padding-top: 15px;
    }

    .file-upload {
        margin: 2px;
        margin-bottom: 10px;
    }

    .modal-footer {
        flex-direction: column;
    }

    .editor-input {
        width: 100%;
    }

    .warning-container {
        width: 70vw;
        height: 10%;
    }
}
</style>
