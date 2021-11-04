<template>
    <div class="w-full h-full flex flex-row">
        <panel v-for="(panel, idx) in config.panel" :key="idx" :config="panel" :index="idx"></panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PanelV from './panel.vue';

@Component({
    components: {
        panel: PanelV
    }
})
export default class SlideV extends Vue {
    @Prop() config!: any; // TODO: replace with a proper TypeScript type

    // TODO: remove this. For demo purposes.
    beforeMount() {
        this.config = {
            panel: [
                {
                    type: 'text',
                    title: 'Hello World',
                    content: 'o/'
                },
                {
                    type: 'text',
                    title: 'Hello from the other side',
                    content: 'o7'
                }
            ]
        };
    }
}
</script>

<style lang="scss" scoped></style>
