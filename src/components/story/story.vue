<template>
    <div v-if="!isLoading">
        <div class="storyramp-app bg-white">
            <header class="sticky top-0 z-50 w-full h-16 leading-9 bg-white border-b border-gray-200">
                <div class="flex w-full sm:px-6 py-3 mx-auto">
                    <MobileMenuV
                        class="mobile-menu"
                        :active-chapter-index="activeChapterIndex"
                        :slides="config.slides"
                        :lang="lang"
                    />
                    <div class="flex-none font-semibold">
                        <span class="text-lg">{{ config.title }}</span>
                    </div>
                    <div class="flex justify-end flex-auto space-x-6">
                        <!-- Any links we want in the header can go here -->
                    </div>
                </div>
            </header>

            <introduction :config="config.introSlide"></introduction>

            <div class="w-full mx-auto pb-10" id="story">
                <StoryContentV :config="config" :lang="lang" @step="updateActiveIndex" />
            </div>

            <footer class="p-8 pt-2 text-right text-sm">
                Context:
                <a class="text-blue-500 font-semibold" :href="config.contextLink" target="_NEW">{{
                    config.contextLabel
                }}</a>
                |
                <a href="https://github.com/ramp4-pcar4/story-ramp" target="_NEW" class="font-semibold text-blue-500"
                    >ramp4-pcar4/story-ramp</a
                >
            </footer>
        </div>
    </div>

    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div v-else>
        <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
            <spinner size="120px" background="#00D2D3" color="#009cd1" stroke="10px" style="margin: 0 auto"></spinner>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

import MobileMenuV from './mobile-menu.vue';
import StoryContentV from '@/components/story/story-content.vue';
import IntroV from '@/components/story/introduction.vue';

import { StoryRampConfig } from '@/definitions';
import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';

@Component({
    components: {
        StoryContentV,
        MobileMenuV,
        introduction: IntroV,
        spinner: Circle2
    }
})
export default class StoryV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    isLoading = true;
    activeChapterIndex = -1;
    lang = 'en';

    created(): void {
        const uid = this.$route.params.uid ? this.$route.params.uid : '00000000-0000-0000-0000-000000000000';
        this.lang = this.$route.params.lang ? this.$route.params.lang : 'en';
        if (uid) {
            this.fetchConfig(uid, this.lang);
        }

        // set page lang
        const html = document.documentElement; // returns the html tag
        html.setAttribute('lang', this.lang);
    }

    // react to param changes in URL
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        const uid = to.params.uid;
        this.lang = to.params.lang;
        this.fetchConfig(uid, this.lang);
        next();
    }

    fetchConfig(uid: string, lang: string): void {
        import(`@/../public/${uid}/${uid}_${lang}.ts`)
            .then((res) => {
                this.config = res.default;
                this.isLoading = false;
            })
            .catch((err) => {
                console.error(`There exists no config given by the URL params: ${err}`);
                // redirect to canada.ca 404 page on invalid URL params
                window.location.href = 'https://www.canada.ca/errors/404.html';
            });
    }

    updateActiveIndex(idx: number): void {
        this.activeChapterIndex = idx;
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.storyramp-app {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.5;
        border-bottom: 0px;
    }
}

@media screen and (min-width: 640px) {
    .mobile-menu {
        display: none !important;
    }
}
</style>
