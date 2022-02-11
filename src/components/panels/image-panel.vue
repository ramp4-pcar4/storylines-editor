<template>
    <div class="graphic self-start justify-center flex flex-col h-full align-middle py-5 w-full">
        <full-screen :expandable="config.fullscreen" :type="config.type">
            <img
                :src="config.src"
                :class="config.class"
                :alt="config.altText"
                class="graphic px-10 mx-auto my-6 block flex object-contain sm:max-w-screen sm:max-h-screen"
            />
        </full-screen>

        <div v-if="config.caption" class="text-center mt-5 text-sm max-w-full" v-html="md.render(config.caption)"></div>
    </div>
</template>

<script lang="ts">
import { ImagePanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

import MarkdownIt from 'markdown-it';
import FullscreenV from '@/components/panels/helpers/fullscreen.vue';

@Component({
    components: {
        'full-screen': FullscreenV
    }
})
export default class ImagePanelV extends Vue {
    @Prop() config!: ImagePanel;

    md = new MarkdownIt({ html: true });
}
</script>

<style lang="scss">
@media screen and (max-width: 640px) {
    .graphic {
        max-width: 100vw;
        max-height: 40vh;
        background-color: white;
    }
}
</style>
