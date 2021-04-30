<template>
    <img :src="payload.src" :class="payload.class" :style="payload.style" />
</template>

<script lang="ts">
import { ImageGraphic } from '@/story-config';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ImageGraphicV extends Vue {
    @Prop() payload!: ImageGraphic['payload'];
}
</script>

<style lang="sass" scoped></style>
