<template>
    <div :id="this.$vnode.key" class="story-slide w-full h-full flex sm:flex-row flex-col">
        <Scrollama class="flex-1 order-2 sm:order-1 prose max-w-none my-5">
            <div class="return-button-container top-16" v-show="activeIdx !== defaultPanel.id">
                <button class="return-button" @click="clickBack">
                    <img
                        style="display: inline; margin: 0px"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB4UlEQVRIie3WP08WQRAG8J+2SolRQaLyKvR+BTsVaQnfwD9YCH4PS6I2ViAS1GhMKLWESkzUmBAT7azECoS8Fjcvqxe52zuMseBJNpebe2ae2dmdveUA/wiHGnCHcBWXcBqDYf+CT3iOp/j8t5IbwCy20a0ZO3gUie0L4/geQTcxhwmM4EiMkbDNB6eLDYy1Fb2lmEEXj3E2w2cYi9Lsp5qKjofjNm43dcZ0+O9oMPNBqbxtRHuYkcp+MsfhgVTe/WIpYt2rIw4pyrtp7zU9hlW8zhDuRKxtqf3+iJuR4VyF6FpwVjKEKdqri+tVpJdBmqgRXYv3HEyGz4sq0scgnSvZ+/Emvr3D8UxRij7v4n0VaSNIfSX7qvpTqzfKa98n7e5dHG6QeS66bZw+hOP5kr1c6hMNYo7+4reL8ozX43mhZP+Ki3gbgZblb65erPUq0o3Ibn6P723aaSH416pIp6QDZLhCfAWvMkQ72MIPNQcI3I8MFzMC1+FJxJrNIQ9IbTW9D9E7EeObBptxTPqtzbQU7flfaeo8JV0ElhTrVYeOVN4dxdnfCmNS2bcUB/6koqWOxhgN20JweuW93Fa0h37cVezMnMveQxlr2uR6Oyhdb8/4/Xq7rvj7PIv3A/w/+Am/TqGFCMnpPgAAAABJRU5ErkJggg=="
                    />
                    {{ $t('editor.back') }}
                </button>
            </div>

            <component
                :is="config.titleTag || 'h2'"
                class="px-10 mb-0 chapter-title top-20"
                :style="activeIdx !== defaultPanel.id ? 'margin-top: 0px;' : ''"
            >
                {{ config.title }}
            </component>

            <div class="px-10 md-content" v-html="md.render(config.content)"></div>
        </Scrollama>
        <panel
            class="dynamic-content flex-2"
            :config="activeConfig"
            :slideIdx="slideIdx"
            :dynamicIdx="activeIdx"
            :ratio="false"
            ref="content"
        >
        </panel>
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
    @Prop() slideIdx!: string;

    // Get the ID of the first (and default) panel.
    defaultPanel = this.config.children[0];

    // By default, the active config is set to the first child in the children list.
    activeConfig: BasePanel = this.defaultPanel.panel;
    activeIdx = this.defaultPanel.id;

    md = new MarkdownIt({ html: true });

    mounted(): void {
        document.querySelectorAll('.storyramp-app a:not([target])').forEach((el: any) => (el.target = '_blank'));

        this.addDynamicURLs();
    }

    /**
     * Adds panel-switching functionality to URLs.
     */
    addDynamicURLs(): void {
        // Find all URLs that contain the `panel` attribute.
        const urls = Array.from(this.$el.querySelectorAll('a[panel]'));
        urls.forEach((el: any) => {
            // Find the target panel and add an event listener to the URL.
            const target = el.attributes['panel'].value;

            // Change the target to self so clicking the link doesn't open in a new window. Also add a
            // dotted underline to indicate that clicking this link will stay in this window.
            el.style = 'text-decoration-style: dotted; text-underline-offset: 3px;';
            el.href = 'javascript:;';
            el.target = '_self';

            el.onclick = () => {
                // Find the panel.
                const panel = this.config.children.find((el) => {
                    return target == el.id;
                });

                // If the panel exists, switch the displayed panel.
                if (panel) {
                    // Quickly reset the config so the panel component can be reset.
                    this.activeConfig = {
                        type: 'loading'
                    };

                    setTimeout(() => {
                        this.activeConfig = panel.panel;
                        this.activeIdx = panel.id;
                    }, 10);

                    setTimeout(() => {
                        const elTop = (this.$refs['content'] as Vue).$el.getBoundingClientRect().top;
                        window.scrollTo({
                            top: window.pageYOffset + elTop - 63,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }, 50);
                }
            };
        });
    }

    /**
     * When clicking the back button, change the panel back to the default (first) panel.
     */
    clickBack(): void {
        this.activeConfig = {
            type: 'loading'
        };

        setTimeout(() => {
            this.activeConfig = this.defaultPanel.panel;
            this.activeIdx = this.defaultPanel.id;
        }, 10);

        setTimeout(() => {
            const elTop = (this.$refs['content'] as Vue).$el.getBoundingClientRect().top;
            window.scrollTo({
                top: window.pageYOffset + elTop - 63,
                left: 0,
                behavior: 'smooth'
            });
        }, 50);
    }
}
</script>

<style scoped lang="scss">
.return-button-container {
    position: sticky;
    text-align: right;
    z-index: 100;
    pointer-events: none;
}
.return-button {
    padding: 5px;
    font-size: 20px;
    pointer-events: auto;
    background: #fff;
    box-shadow: 0px 2px 5px #000;
}
.return-button img {
    margin: 0px;
}

@media screen and (max-width: 640px) {
    .return-button-container {
        position: static;
        text-align: center;
        margin-bottom: 10px;
    }
}
</style>
