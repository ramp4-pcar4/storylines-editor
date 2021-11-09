<template>
    <div class="bg-gray-100 text-center inline-block h-full align-middle">
        <h1 class="align-middle">Temporary Image Panel</h1>
    </div>
</template>

<script lang="ts">
import { ImagePanel } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ImagePanelV extends Vue {
    @Prop() config!: ImagePanel;
}
</script>

<style lang="scss"></style>
