<template>
    <!-- Preview mode of current storylines product -->
    <div>
        <div class="storyramp-app bg-white" v-if="config !== undefined">
            <header class="sticky top-0 z-50 w-full h-16 leading-9 bg-white border-b border-gray-200">
                <!-- TODO: change this route back to the main editor (complete along with #89) -->
                <!-- TODO: remove this when figured out a way to solve configFileStructure issues and open in new tab -->
                <router-link :to="{ name: 'home' }" target>
                    <button class="bg-white border border-black font-bold hover:bg-gray-100 px-8 mx-4">
                        {{ $t('editor.back') }}
                    </button>
                </router-link>

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
                </div>
            </header>

            <introduction :config="config.introSlide" :editor="!!configFileStructure"></introduction>

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

import MobileMenuV from '@/components/story/mobile-menu.vue';
import StoryContentV from '@/components/story/story-content.vue';
import IntroV from '@/components/story/introduction.vue';

@Component({
    components: {
        StoryContentV,
        MobileMenuV,
        introduction: IntroV
    }
})
export default class StoryPreviewV extends Vue {
    @Prop() config!: StoryRampConfig | undefined;
    @Prop() configFileStructure!: any;

    activeChapterIndex = -1;
    lang = 'en';

    created(): void {
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

@media screen and (min-width: 640px) {
    .mobile-menu {
        display: none !important;
    }
}
</style>
