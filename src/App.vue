<template>
    <div id="app" class="bg-white">
        <header class="sticky top-0 z-50 w-full h-16 leading-9 bg-white border-b border-gray-200">
            <div class="flex w-full px-6 py-3 mx-auto max-w-9xl">
                <div class="flex-none font-semibold">
                    <span class="text-lg">{{ story.title }}</span>
                </div>
                <div class="flex justify-end flex-auto space-x-6">
                    <span>Sharepoint</span>
                    <a href="https://github.com/ramp4-pcar4/story-ramp">Github</a>
                </div>
            </div>
        </header>

        <header class="py-24 mx-auto text-center max-w-9xl">
            <svg
                class="w-56 h-auto m-auto"
                width="27.781"
                height="26.811"
                viewBox="0 0 27.781 26.811"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m19.003 22.189-17.94-12.375c-1.818-1.254-1.2-3.865 1.067-4.479l19.067-5.175a2.7 2.7 0 0 1 3.616 2.492l-1.13 17.549c-0.134 2.083-2.862 3.242-4.68 1.988z"
                    fill="#ff9f43"
                />
                <path
                    d="m13.313 25.244-10.569-20.669a2.883 2.883 0 0 1 3.007-4.161l19.587 3.023a2.883 2.883 0 0 1 2.127 4.162l-9.023 17.646a2.883 2.883 0 0 1-5.129-1e-3z"
                    fill="#00d2d3"
                />
                <path
                    d="m24.765 3.3483-9.764-1.507-11.988 3.255 4.785 9.361 11.205 7.732a2.888 2.888 0 0 0 0.806 0.383l4.256-8.323z"
                    fill="#001a49"
                />
            </svg>

            <h1 class="m-10 text-5xl font-bold text-gray-800">{{ story.title }}</h1>
            <p class="w-1/2 m-auto text-2xl font-semibold text-gray-500">
                {{ story.subTitle }}
            </p>

            <a href="#story" class="inline-block mt-10 scroll-arrow" v-smooth-scroll>
                <svg
                    class="w-auto h-24 m-auto"
                    width="90"
                    height="104.84"
                    viewBox="0 0 90 104.83"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m89.51 77.659-44.51 25.698-44.51-25.698 3.86e-4 -51.395 44.51-25.698 44.51 25.698z"
                        fill="#fff"
                        stroke="#00d2d3"
                        stroke-dasharray="4.8960465, 4.8960465"
                        stroke-dashoffset="2.7"
                        stroke-width=".5"
                    />
                    <path
                        d="m45 104.27-44.51-25.697v-10.646l44.51 25.697 44.51-25.697v10.646z"
                        fill="#00d2d3"
                        stroke="#00d2d3"
                        stroke-width=".97921"
                    />
                </svg>
            </a>
        </header>

        <main class="w-full mx-auto max-w-9xl" id="story">
            <StoryV :value="story" />
        </main>

        <footer class="p-8 text-center">
            2021 - Design by <span class="font-semibold text-accent-blue">BeSD UX Team</span>
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StoryV from '@/components/story.vue';

import story, { StoryConfig } from '@/story-config';

@Component({
    components: {
        StoryV
    }
})
export default class App extends Vue {
    story: StoryConfig = story;
}
</script>

<style lang="scss">
body {
    font-size: 16px;
}

#app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    --sr-accent-colour: #00d2d3;

    --sr-content-background: rgba(249, 250, 251, 1);

    // border-gray-200
    --sr-border-colour: rgba(229, 231, 235, 1);

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
</style>
