<template>
    <vue-final-modal
        :clickToClose="false"
        :escToClose="false"
        :modalId="name"
        class="flex justify-center items-center"
        content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
        <h2 slot="header" :class="messageClass ?? 'text-lg font-bold'">{{ message }}</h2>
        <div class="w-full flex gap-3 justify-end">
            <button
                class="respected-standard-button respected-black-bg-button respected-thin-button"
                @click.stop="onOk"
            >
                {{ $t('editor.confirm') }}
            </button>
            <button
                class="respected-standard-button respected-gray-border-button respected-thin-button"
                @click.stop="onCancel"
            >
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

<style scoped lang="css"></style>
