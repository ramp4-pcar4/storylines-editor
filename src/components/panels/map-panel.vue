<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Map Panel</h1>
    </div>
</template>

<script lang="ts">
import { MapPanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class MapPanelV extends Vue {
    @Prop() config!: MapPanel;
}
</script>

<style lang="scss"></style>
