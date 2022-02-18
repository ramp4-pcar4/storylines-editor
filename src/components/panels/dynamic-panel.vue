<template>
    <div :id="this.$vnode.key" class="story-slide w-full h-full flex sm:flex-row flex-col">
        <Scrollama class="flex-1 order-2 sm:order-1 prose max-w-none my-5">
            <h2 class="px-10 mb-0 chapter-title top-20">
                {{ config.title }}
            </h2>

            <div class="px-10 md-content" v-html="md.render(config.content)"></div>
        </Scrollama>
        <panel class="dynamic-content flex-2" :config="activeConfig" :ratio="false"></panel>
    </div>
</template>

<script lang="ts">
import Scrollama from 'vue-scrollama';
import MarkdownIt from 'markdown-it';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { DynamicPanel, BasePanel } from '@/definitions';

@Component({
    components: {
        panel: () => import('./panel.vue'),
        Scrollama
    }
})
export default class DynamicPanelV extends Vue {
    @Prop() config!: DynamicPanel;

    // By default, the active config is set to the first child in the children list.
    activeConfig: BasePanel = this.config.children[0].panel;

    md = new MarkdownIt({ html: true });

    mounted(): void {
        document.querySelectorAll('.storyramp-app a:not([target])').forEach((el: any) => (el.target = '_blank'));

        this.addDynamicURLs();
    }

    /**
     * Adds panel-switching functionality to URLs.
     */
    addDynamicURLs() {
        // Find all URLs that contain the `panel` attribute.
        const urls = Array.from(this.$el.querySelectorAll('a[panel]'));
        urls.forEach((el: any) => {
            // Find the target panel and add an event listener to the URL.
            const target = el.attributes['panel'].value;

            el.onclick = () => {
                // Find the panel.
                const panel = this.config.children.find((el) => {
                    return target == el.id;
                });

                // If the panel exists, switch the displayed panel.
                if (panel) this.activeConfig = panel.panel;
            };
        });
    }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 640px) {
    .dynamic-content {
        max-height: 40vh;
    }
}
</style>
