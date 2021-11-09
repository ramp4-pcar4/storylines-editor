<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Chart Panel</h1>
    </div>
</template>

<script lang="ts">
import { ChartPanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ChartPanelV extends Vue {
    @Prop() config!: ChartPanel;
}
</script>

<style lang="scss"></style>
