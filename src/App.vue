<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
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
}
</style>
