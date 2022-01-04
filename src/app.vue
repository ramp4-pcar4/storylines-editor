<template>
    <div id="app" class="storyramp-app bg-white">
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
import StoryV from '@/components/story/story.vue';
import IntroV from '@/components/story/introduction.vue';

import config from '../public/410b88da-0ed1-4749-903f-5e76c24e2e5f/410b88da-0ed1-4749-903f-5e76c24e2e5f_fr';
import { StoryRampConfig } from '@/definitions';

@Component({
    components: {
        StoryV,
        introduction: IntroV
    }
})
export default class App extends Vue {
    config: StoryRampConfig = config;
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.ovwContainer .layerTile {
    max-width: initial;
}

body {
    font-size: 16px;
}

#app {
    font-family: $font-list;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    --sr-accent-colour: #00d2d3;

    --sr-content-background: rgba(249, 250, 251, 1);

    --sr-border-colour: rgba(229, 231, 235, 1);
    // border-gray-200

    .scroll-arrow {
        animation: bounce-light 1s 4.5;

        &:hover {
            animation-iteration-count: infinite;
        }
    }

    @keyframes bounce-light {
        0%,
        100% {
            transform: translateY(-10%);
            animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
        }
    }
}

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
