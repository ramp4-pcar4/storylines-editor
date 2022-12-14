<template>
    <div class="flex flex-col">
        <label class="text-left">Panel title:</label>
        <input type="text" v-model="panel.title" />
        <label class="text-left">Panel body:</label>
        <v-md-editor v-model="panel.content" height="400px"></v-md-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class TextEditorV extends Vue {
    @Prop() panel!: any;
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}
</style>
