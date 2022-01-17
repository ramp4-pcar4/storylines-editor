<template>
    <div class="storyramp-app bg-white">
        <header class="sticky top-0 z-50 w-full h-16 leading-9 bg-white border-b border-gray-200">
            <div class="flex w-full px-6 py-3 mx-auto">
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
            <StoryV :config="config" />
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import StoryV from '@/components/story/story.vue';
import IntroV from '@/components/story/introduction.vue';

import config from '@/../public/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000_en';
import { StoryRampConfig } from '@/definitions';

@Component({
    components: {
        StoryV,
        introduction: IntroV
    }
})
export default class StoryRampV extends Vue {
    config: StoryRampConfig = config;

    created(): void {
        const uid = this.$route.params.uid;
        const lang = this.$route.params.lang;
        if (uid) {
            this.fetchConfig(uid, lang);
        }
    }

    // react to param changes in URL
    beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
        const uid = to.params.uid;
        const lang = to.params.lang;
        this.fetchConfig(uid, lang);
        next();
    }

    fetchConfig(uid: string, lang?: string): void {
        // default to 'en'
        lang = lang ? lang : 'en';
        import(`@/../public/${uid}/${uid}_${lang}.ts`)
            .then((res) => {
                this.config = res.default;
            })
            .catch((err) => {
                console.error(`There exists no config given by the URL params: ${err}`);
                // redirect to canada.ca 404 page on invalid URL params
                window.location.href = 'https://www.canada.ca/errors/404.html';
            });
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
</style>
