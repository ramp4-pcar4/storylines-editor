<template>
    <div>
        <div class="font-bold block text-lg">{{ config.title }}</div>
        <div class="block">{{ config.content }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class TextPanelV extends Vue {
    @Prop() config!: any; // TODO: replace with TypeScript type
}
</script>
