<template>
    <div id="app">
        <header class="sticky top-0 z-50 w-full h-16 leading-9 bg-white border-b border-gray-200">
            <div class="flex w-full px-6 py-3 mx-auto max-w-8xl">
                <div class="flex-none font-bold"><span class="text-lg">Story RAMP</span></div>
                <div class="flex justify-end flex-auto space-x-6">
                    <span>Sharepoint</span>
                    <span>Github</span>
                </div>
            </div>
        </header>

        <header class="p-32 text-center intro">
            <svg
                class="w-auto h-40 m-auto"
                width="27.781"
                height="26.811"
                version="1.1"
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

            <h1 class="m-10 font-bold text-7xl">Story RAMP</h1>
            <p>
                For a guide and recipes on how to configure / customize this project,<br />
                check out the
                <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
            </p>

            <p class="mt-20 text-8xl">V</p>
        </header>

        <main class="w-full mx-auto max-w-8xl">
            <StoryV />
        </main>

        <footer class="p-10 text-center">2021 Web-mapping Team</footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StoryV from '@/components/story.vue';

@Component({
    components: {
        StoryV
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    background-color: #fff;

    .intro {
        height: 75vh;
    }
}

body {
    font-size: 16px;
}
</style>
