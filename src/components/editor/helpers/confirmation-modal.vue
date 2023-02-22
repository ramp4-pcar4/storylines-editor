<template>
    <vue-modal :name="name" :outer-close="false" :hide-close-btn="true" size="md">
        <h2 slot="header" class="text-lg font-bold">{{ message }}</h2>
        <div class="w-full flex justify-end">
            <button class="confirm-button hover:bg-gray-800" @click.stop="onOk">Confirm</button>
            <button class="cancel-button hover:bg-gray-100" @click.stop="onCancel">Cancel</button>
        </div>
    </vue-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class MetadataEditorV extends Vue {
    @Prop() message!: string;
    @Prop() name!: string;

    $modals: any;

    onOk(): void {
        this.$emit('Ok');
        this.$modals.hide(this.name);
    }

    onCancel(): void {
        this.$emit('Cancel');
        this.$modals.hide(this.name);
    }
}
</script>

<style scoped lang="css">
.confirm-button {
    background-color: black !important;
    color: white !important;
}
.cancel-button {
    background-color: white !important;
    border: 1px solid black !important;
}
</style>
