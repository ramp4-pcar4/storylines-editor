<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Audio Panel</h1>
    </div>
</template>

<script lang="ts">
import { AudioPanel } from '@/definitions';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AudioPanelV extends Vue {
    @Prop() config!: AudioPanel;
}
</script>

<style lang="scss"></style>
