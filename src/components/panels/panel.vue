<template>
    <div class="flex flex-col">
        <component :is="getTemplate()" :config="config"></component>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PanelType, BasePanel } from '@/definitions';
import TextPanelV from './text-panel.vue';
import MapPanelV from './map-panel.vue';
import ImagePanelV from './image-panel.vue';
import AudioPanelV from './audio-panel.vue';
import VideoPanelV from './video-panel.vue';
import SlideshowPanelV from './slideshow-panel.vue';
import ChartPanelV from './chart-panel.vue';

@Component({
    components: {
        TextPanelV
    }
})
export default class PanelV extends Vue {
    @Prop() config!: BasePanel;

    /**
     * Returns the corresponding component for this panel.
     */
    getTemplate(): string {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const panelTemplates: any = {
            [PanelType.Text]: TextPanelV,
            [PanelType.Map]: MapPanelV,
            [PanelType.Image]: ImagePanelV,
            [PanelType.Audio]: AudioPanelV,
            [PanelType.Video]: VideoPanelV,
            [PanelType.Slideshow]: SlideshowPanelV,
            [PanelType.Chart]: ChartPanelV
        };

        console.log(this.config.type, panelTemplates[this.config.type]);

        return panelTemplates[this.config.type];
    }
}
</script>

<style lang="scss" scoped></style>
