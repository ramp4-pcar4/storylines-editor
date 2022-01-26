<template>
    <div class="justify-center flex flex-col h-full align-middle py-5 w-full">
        <img
            :src="config.src"
            :class="config.class"
            :alt="config.altText"
            class="px-10 my-6 block w-auto flex object-contain max-h-screen"
        />

        <div v-if="config.caption" class="text-center mt-5 text-sm max-w-full" v-html="md.render(config.caption)"></div>
    </div>
</template>

<script lang="ts">
import { ImagePanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

import MarkdownIt from 'markdown-it';

@Component({})
export default class ImagePanelV extends Vue {
    @Prop() config!: ImagePanel;

    md = new MarkdownIt({ html: true });
}
</script>

<style lang="scss"></style>
