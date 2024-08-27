<template>
    <div>
        <div class="flex justify-between items-center p-8 border-b border-solid border-black">
            <h1 class="text-4xl">{{ $t('editor.respectTitle') }}</h1>
            <router-link
                :to="{ name: 'home', params: { lang: currLang === 'en' ? 'fr' : 'en' } }"
                v-if="sourceFile !== 'index-ca-en.html#' && sourceFile !== 'index-ca-fr.html#'"
            >
                <div class="underline">{{ `${currLang === 'en' ? 'Français' : 'English'}` }}</div>
            </router-link>
        </div>
        <div class="relative mr-28 ml-28">
            <h2 class="pt-10 text-4xl font-semibold">{{ $t('editor.dashboard') }}</h2>
            <div class="text-xl font-semibold w-full text-right pt-2 pb-2">
                {{ $t('editor.landing.greeting') }} {{ userName }}!
            </div>

            <div class="mb-5 text-2xl font-semibold">{{ $t('editor.chooseOption') }}</div>
            <div class="flex justify-center">
                <div class="home-btn-container border border-gray-400 border-solid mr-5 home-buttons flex-1">
                    <router-link :to="{ name: 'metadataNew' }" class="flex justify-center h-full w-full" target>
                        <button class="flex items-center text-xl font-bold px-2" tabindex="-1">
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
                            {{ $t('editor.createProduct') }}
                        </button>
                    </router-link>
                </div>
                <div class="home-btn-container border border-gray-400 border-solid flex-1 home-buttons">
                    <router-link :to="{ name: 'metadataExisting' }" class="flex justify-center h-full w-full" target>
                        <button class="flex items-center text-xl font-bold px-2" tabindex="-1">
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
                            {{ $t('editor.loadProduct') }}
                        </button>
                    </router-link>
                </div>
            </div>

            <h2 class="pt-8 pb-5 text-2xl font-semibold">{{ $t('editor.previousProducts') }}</h2>
            <table class="shadow-lg bg-white w-full">
                <colgroup>
                    <col class="w-3/5" />
                    <col span="2" />
                </colgroup>
                <tr>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div class="m-2 mr-0 ml-3">{{ $t('editor.previousProducts.productInfo') }}</div>
                    </td>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div class="ml-0">{{ $t('editor.previousProducts.lastModified') }}</div>
                    </td>
                    <td style="background-color: #e7e7e7" class="font-bold border-b border-solid border-black">
                        <div class="ml-0">{{ $t('editor.previousProducts.actions') }}</div>
                    </td>
                </tr>
                <tr v-for="(storyline, idx) in userStorylines" :key="idx">
                    <td
                        style="background-color: #f9f9f9"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        <div class="m-2 mt-4 ml-3">UUID: {{ storyline.uuid }}</div>
                        <div class="m-2 mb-4 ml-3">
                            {{ $t('editor.previousProducts.productInfo.title') + ': ' + storyline.titleEN }}
                        </div>
                    </td>
                    <td
                        style="background-color: #f9f9f9"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        May 3, 2024
                    </td>
                    <td
                        style="background-color: #f9f9f9"
                        class="border-b border-solid"
                        :class="idx === userStorylines.length - 1 ? 'border-black' : 'border-gray-200'"
                    >
                        <button
                            class="flex items-center font-semibold rounded-sm p-2 px-6 border border-solid border-black home-buttons"
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
import { Vue } from 'vue-property-decorator';
import { Storyline, useUserStore } from '../stores/userStore';
import { RouteLocationNormalized } from 'vue-router';

export default class HomeV extends Vue {
    userStore = useUserStore();
    currLang = 'en';
    sourceFile = 'index.html#';

    mounted(): void {
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.sourceFile = window.location.href.split('/').find((s) => s.includes('#'));
        // just for testing purposes
        this.userStore.userProfile.userName = 'Test User';
        this.userStore.userProfile.storylines = [
            {
                uuid: '00000000-0000-0000-0000-000000000000',
                titleEN: 'Test StoryRAMP',
                titleFR: "Aperçu des secteurs de l’INRP : 'extraction de sables bitumineux111111"
            },
            {
                uuid: '6dabdc70-8ad9-43d6-a09a-92cae0d9a2c3',
                titleEN: 'new product',
                titleFR: 'new product'
            },
            {
                uuid: '123456',
                titleEN: 'a product',
                titleFR: 'a product'
            }
        ];
    }
    get userName(): string {
        return this.userStore.userProfile.userName || 'Guest';
    }

    get userStorylines(): Array<Storyline> {
        return this.userStore.userProfile.storylines;
    }
}
</script>

<style lang="scss">
.home-btn-container {
    height: 12vh;
    width: 45vh;
}
.home-buttons:hover {
    background-color: #e7e7e7;
}
</style>
