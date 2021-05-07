<template>
    <div :id="`ramp-map-${chapterIndex}`" class="w-full bg-gray-200 rv-map h-story" :rv-config="payload.config"></div>
</template>

<script lang="ts">
import { MapGraphic } from '@/story-config';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MapGraphicV extends Vue {
    @Prop() payload!: MapGraphic['payload'];
    @Prop() chapterIndex!: number;
}
</script>

<style lang="scss" scoped>
.rv-map {
    height: calc(100vh - 4rem) !important;
    width: 100%;
}
</style>

// TODO: calc(max-h-screen - 4rem) to account for the sticky header
