<template>
    <div
        :class="
            config.type !== 'text'
                ? `sticky ${config.type === 'map' ? 'top-16' : 'top-8'} sm:self-start flex-2 order-1 sm:order-2 z-50`
                : 'flex order-2 sm:order-1'
        "
        class="flex-col relative"
    >
        <slot></slot>
        <component
            :is="getTemplate()"
            :config="config"
            :configFileStructure="configFileStructure"
            :slideIdx="slideIdx"
            :lang="lang"
        ></component>
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
import DynamicPanelV from './dynamic-panel.vue';
import LoadingPanelV from './loading-panel.vue';

@Component({
    components: {
        TextPanelV
    }
})
export default class PanelV extends Vue {
    @Prop() config!: BasePanel;
    @Prop() configFileStructure!: any;
    @Prop() ratio!: boolean;
    @Prop() slideIdx!: number;
    @Prop() lang!: string;

    /**
     * Returns the corresponding component for this panel.
     */
    getTemplate(): string {
        const panelTemplates: any = {
            [PanelType.Text]: TextPanelV,
            [PanelType.Map]: MapPanelV,
            [PanelType.Image]: ImagePanelV,
            [PanelType.Audio]: AudioPanelV,
            [PanelType.Video]: VideoPanelV,
            [PanelType.Slideshow]: SlideshowPanelV,
            [PanelType.Chart]: ChartPanelV,
            [PanelType.Dynamic]: DynamicPanelV,
            [PanelType.Loading]: LoadingPanelV
        };

        return panelTemplates[this.config.type];
    }
}
</script>

<style lang="scss" scoped></style>
