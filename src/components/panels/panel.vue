<template>
    <div class="flex flex-col">
        <component :is="getTemplate()" :config="config"></component>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TextPanelV from './text-panel.vue';

enum panelTypes {
    'text',
    'map',
    'multimedia',
    'dqvchart'
}

@Component({
    components: {
        TextPanelV
    }
})
export default class PanelV extends Vue {
    @Prop() config!: any; // TODO: replace with a proper TypeScript type

    /**
     * Returns the corresponding component for this panel.
     */
    getTemplate() {
        const panelTemplates: any = {
            text: TextPanelV,
            [panelTypes.map]: undefined,
            [panelTypes.multimedia]: undefined,
            [panelTypes.dqvchart]: undefined
        };

        return panelTemplates[this.config.type];
    }
}
</script>

<style lang="scss" scoped></style>
