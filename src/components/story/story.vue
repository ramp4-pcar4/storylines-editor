<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div v-if="loadStatus === 'loading'">
        <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
            <spinner size="120px" background="#00D2D3" color="#009cd1" stroke="10px" style="margin: 0 auto"></spinner>
        </div>
    </div>

    <div v-else-if="loadStatus === 'error'">
        <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
            <div style="font-size: 200px">!</div>
            <div>
                {{ $t('story.error') }}
            </div>
        </div>
    </div>

    <div v-else-if="loadStatus === 'loaded'">
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
                <a class="text-blue-700 font-semibold" :href="config.contextLink" target="_NEW">{{
                    config.contextLabel
                }}</a>
                |
                <a href="https://github.com/ramp4-pcar4/story-ramp" target="_NEW" class="font-semibold text-blue-700"
                    >ramp4-pcar4/story-ramp</a
                >
            </footer>

            <div class="storyramp-modified" v-if="config.dateModified">
                {{ $t('story.date') }}
                {{ config.dateModified }}
            </div>
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
    loadStatus = 'loading';
    activeChapterIndex = -1;
    lang = 'en';

    created(): void {
        const uid = this.$route.params.uid;
        this.lang = this.$route.params.lang ? this.$route.params.lang : 'en';
        if (uid) {
            this.fetchConfig(uid, this.lang);
        } else {
            console.error(`Please supply the language and id URL params in the form of /[lang]/[uid].`);
            // if no URL params have been provided redirect to canada.ca 404 page
            window.location.href = 'https://www.canada.ca/errors/404.html';
        }

        // set page lang
        const html = document.documentElement; // returns the html tag
        html.setAttribute('lang', this.lang);
        this.$i18n.locale = this.lang;
    }

    // react to param changes in URL
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        const uid = to.params.uid;
        this.lang = to.params.lang;
        this.$i18n.locale = this.lang;
        this.fetchConfig(uid, this.lang);
        next();
    }

    fetchConfig(uid: string, lang: string): void {
        fetch(`${uid}/${uid}_${lang}.json`)
            .then((res) => {
                res.json().then((config: any) => {
                    this.config = config;
                    this.loadStatus = 'loaded';

                    // set page title
                    if (this.config) {
                        document.title = this.config.title + ' - Canada.ca';
                    }
                });
            })
            .catch((err) => {
                if (err.code === 'MODULE_NOT_FOUND') {
                    console.error(`There exists no config given by the URL params: ${err}`);
                    // redirect to canada.ca 404 page on invalid URL params
                    window.location.href = 'https://www.canada.ca/errors/404.html';
                } else {
                    // Some unknown error, possibly a build error that could indicate an error in the
                    // configuration file.
                    this.loadStatus = 'error';

                    // Print out the error stack.
                    console.error(err.stack);
                }
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

    .storyramp-modified {
        max-width: 1536px;
        margin: 0 auto;
        padding-left: 15px;
        padding-top: 1em;
        padding-bottom: 1em;
    }
}

@media screen and (min-width: 640px) {
    .mobile-menu {
        display: none !important;
    }
}
</style>
