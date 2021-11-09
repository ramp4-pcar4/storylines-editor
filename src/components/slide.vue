<template>
    <div class="w-full h-full flex flex-row">
        <panel v-for="(panel, idx) in config.panel" :key="idx" :config="panel" :index="idx"></panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import PanelV from './panels/panel.vue';
import { Slide } from '@/definitions';

@Component({
    components: {
        panel: PanelV
    }
})
export default class SlideV extends Vue {
    @Prop() config!: Slide;
}
</script>

<style lang="scss" scoped></style>
