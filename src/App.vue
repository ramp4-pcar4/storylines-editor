<template>
    <div id="app">
        <div class="p-32 text-center intro">
            <h1 class="m-10 font-bold text-7xl">Story RAMP</h1>
            <p>
                For a guide and recipes on how to configure / customize this project,<br />
                check out the
                <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
            </p>

            <p class="mt-20 text-8xl">V</p>
        </div>

        <Story />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Story from '@/components/story.vue';

@Component({
    components: {
        Story
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
</style>
