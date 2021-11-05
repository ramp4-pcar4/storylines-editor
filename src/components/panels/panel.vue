<template>
    <div class="flex flex-col">
        <component :is="getTemplate()" :config="config"></component>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PanelType, BasePanel } from '@/definitions';
import TextPanelV from './text-panel.vue';

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
            [PanelType.Map]: undefined,
            [PanelType.Image]: undefined,
            [PanelType.Audio]: undefined,
            [PanelType.Video]: undefined,
            [PanelType.Slideshow]: undefined,
            [PanelType.Chart]: undefined
        };

        return panelTemplates[this.config.type];
    }
}
</script>

<style lang="scss" scoped></style>
