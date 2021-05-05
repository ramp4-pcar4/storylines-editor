<template>
    <img
        :src="payload.src"
        :class="payload.class || 'px-10 my-8'"
        :style="payload.style"
        class="block max-w-full max-h-screen story-graphic"
    />
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
