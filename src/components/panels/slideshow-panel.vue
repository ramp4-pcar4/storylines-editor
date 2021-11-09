<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Slideshow Panel</h1>
    </div>
</template>

<script lang="ts">
import { SlideshowPanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class SlideshowPanelV extends Vue {
    @Prop() config!: SlideshowPanel;
}
</script>

<style lang="scss"></style>
