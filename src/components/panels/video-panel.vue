<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Video Panel</h1>
    </div>
</template>

<script lang="ts">
import { VideoPanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class VideoPanelV extends Vue {
    @Prop() config!: VideoPanel;
}
</script>

<style lang="scss"></style>
