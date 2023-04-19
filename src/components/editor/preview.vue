<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div v-if="loadStatus === 'loading'">
        <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
            <spinner size="120px" background="#00D2D3" color="#009cd1" stroke="10px" style="margin: 0 auto"></spinner>
        </div>
    </div>

    <div v-else-if="loadStatus === 'loaded'">
        <div class="storyramp-app bg-white" v-if="config !== undefined">
            <header class="sticky top-0 z-50 flex border-b border-black bg-gray-200 py-2 px-2 justify-between">
                <span class="font-semibold text-lg m-1">{{ config.title }}</span>
            </header>

            <introduction :config="config.introSlide" :configFileStructure="configFileStructure"></introduction>

            <div class="w-full mx-auto pb-10" id="story">
                <StoryContentV
                    :config="config"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                    @step="updateActiveIndex"
                />
            </div>

            <footer class="p-8 pt-2 text-right text-sm">
                Context:
                <a class="text-blue-700 font-semibold" :href="config.contextLink" target="_NEW">{{
                    config.contextLabel
                }}</a>
                |
                <a
                    href="https://github.com/ramp4-pcar4/storylines-editor"
                    target="_NEW"
                    class="font-semibold text-blue-700"
                    >ramp4-pcar4/storylines-editor</a
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { StoryRampConfig } from '@/definitions';

import StoryContentV from '@/components/story/story-content.vue';
import IntroV from '@/components/story/introduction.vue';
import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';

@Component({
    components: {
        StoryContentV,
        introduction: IntroV,
        spinner: Circle2
    }
})
export default class StoryPreviewV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    configFileStructure: any;
    savedProduct = false;
    loadStatus = 'loading';
    activeChapterIndex = -1;
    lang = 'en';
    uid = '';

    created(): void {
        const uid = this.$route.params.uid;
        const lang = this.$route.params.lang;
        if (uid) {
            this.savedProduct = true;
            // attempt to fetch saved config file from the server (TODO: setup as express route?)
            fetch(`http://localhost:6040/retrieve/${uid}/${lang}`).then((res: any) => {
                if (res.status === 404) {
                    console.error(`There does not exist a saved product with UID ${uid}.`);
                    // redirect to canada.ca 404 page on invalid URL params
                    // window.location.href = 'https://www.canada.ca/errors/404.html';
                } else {
                    res.json().then((config: StoryRampConfig) => {
                        this.config = config;
                        this.loadStatus = 'loaded';
                        document.title = this.config.title + ' - Canada.ca';
                    });
                }
            });
        } else {
            this.config = (window as any).props.config;
            this.configFileStructure = (window as any).props.configFileStructure;
            this.loadStatus = 'loaded';
        }

        // set page lang
        const html = document.documentElement;
        html.setAttribute('lang', this.lang);
        this.$i18n.locale = this.lang;
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

    .prose a {
        font-weight: bold;
    }

    .prose a:not([panel])::after {
        content: url('../../assets/popout.svg');
    }
}
</style>
