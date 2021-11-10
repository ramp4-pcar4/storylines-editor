<template>
    <div class="justify-center flex h-full align-middle py-5">
        <img :src="config.src" :class="config.class" :alt="config.altText" class="px-10 my-8 block max-w-full" />
    </div>
</template>

<script lang="ts">
import { ImagePanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ImagePanelV extends Vue {
    @Prop() config!: ImagePanel;
}
</script>

<style lang="scss"></style>
