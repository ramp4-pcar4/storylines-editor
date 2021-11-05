<template>
    <Scrollama class="flex-1 prose max-w-none">
        <h2 class="px-10 mb-0 chapter-title top-20">
            {{ config.title }}
        </h2>

        <div class="px-10 md-content" v-html="md.render(config.content)"></div>
    </Scrollama>
</template>

<script lang="ts">
import Scrollama from 'vue-scrollama';
import MarkdownIt from 'markdown-it';

import { Component, Prop, Vue } from 'vue-property-decorator';

interface TextPanelConfig {
    title: string;
    type: string;
    content: string; // in md format
}

@Component({
    components: {
        Scrollama
    }
})
export default class TextPanelV extends Vue {
    @Prop() config!: TextPanelConfig;

    md = new MarkdownIt();
}
</script>

<style scoped lang="scss"></style>
