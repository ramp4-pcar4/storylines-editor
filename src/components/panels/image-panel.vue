<template>
    <div class="text-center inline-block h-full align-middle">
        <img :src="config.src" :class="config.class" :alt="config.altText" class="block my-8 bg-gray-200 max-w-full" />
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
