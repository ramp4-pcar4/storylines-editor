<template>
    <vue-final-modal
        :modalId="name"
        content-class="flex flex-col max-h-full overflow-y-auto max-w-xl mx-4 p-4 bg-white border rounded-lg space-y-2"
        class="flex justify-center items-center"
    >
        <div class="mx-5 my-2">
            <h2 slot="header" class="text-2xl font-bold mb-1">{{ title }}</h2>
            <p>{{ message }}</p>
            <div class="w-full flex justify-end mt-3">
                <button class="editor-button bg-black text-white hover:bg-gray-800" @click="onOk">
                    {{ $t('editor.slides.continue') }}
                </button>
                <button class="editor-button hover:bg-gray-800" @click="onCancel">
                    {{ $t('editor.cancel') }}
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { VueFinalModal } from 'vue-final-modal';
// import { Options } from 'vue-property-decorator';

@Options({
    components: {
        'vue-final-modal': VueFinalModal
    }
})
export default class MetadataEditorV extends Vue {
    @Prop() name!: string;
    @Prop() title!: string;
    @Prop() message!: string;

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
h2 {
    line-height: 1.3;
    border-bottom: 0px;
}

button {
    border-radius: 3px;
    padding: 5px 12px;
    margin: 0px 10px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.vfm__content button:hover:enabled {
    background-color: #dbdbdb;
    color: black;
}

.vfm__content button:disabled {
    border: 1px solid gray;
    color: gray;
    cursor: not-allowed;
}
</style>
