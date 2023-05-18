<template>
    <Scrollama class="flex-1 prose max-w-none my-5">
        <component :is="config.titleTag || 'h2'" class="px-10 mb-0 chapter-title top-20">
            {{ config.title }}
        </component>

        <div class="px-10 md-content object-contain" v-html="mdContent"></div>
    </Scrollama>
</template>

<script lang="ts">
import Scrollama from 'vue-scrollama';
import MarkdownIt from 'markdown-it';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { TextPanel } from '@/definitions';

@Component({
    components: {
        Scrollama
    }
})
export default class TextPanelV extends Vue {
    @Prop() config!: TextPanel;

    md = new MarkdownIt({ html: true });
    mdContent = '';

    mounted(): void {
        this.mdContent = this.md
            .render(this.config.content)
            .replace(/<table/g, '<div class="table-container"><table')
            .replace(/<\/table>/g, '</table></div>');

        document.querySelectorAll('.storyramp-app a:not([target])').forEach((el: any) => (el.target = '_blank'));
    }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 640px) {
    .chapter-title {
        max-width: 100vw;
    }

    .md-content {
        max-width: 100vw;

        ::v-deep .table-container {
            overflow-x: auto;
        }
    }
}
</style>
