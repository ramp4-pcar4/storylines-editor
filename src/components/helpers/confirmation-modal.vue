<template>
    <vue-final-modal
        :clickToClose="false"
        :escToClose="false"
        :modalId="name"
        class="flex justify-center items-center"
        content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
        <h2 slot="header" :class="messageClass ?? 'text-lg font-bold'">{{ message }}</h2>
        <div class="w-full flex justify-end">
            <button class="editor-button confirm-button hover:bg-gray-800" @click.stop="onOk">
                {{ $t('editor.confirm') }}
            </button>
            <button class="editor-button cancel-button hover:bg-gray-100" @click.stop="onCancel">
                {{ $t('editor.cancel') }}
            </button>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { VueFinalModal } from 'vue-final-modal';

@Options({
    components: {
        'vue-final-modal': VueFinalModal
    }
})
export default class MetadataEditorV extends Vue {
    @Prop() message!: string;
    @Prop() name!: string;
    @Prop() messageClass?: string;

    onOk(): void {
        this.$emit('ok');
        this.$vfm.close(this.name);
    }

    onCancel(): void {
        this.$emit('Cancel');
        this.$vfm.close(this.name);
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
