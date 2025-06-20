<template>
    <vue-final-modal :modalId="name" :clickToClose="false" content-class="" class="flex justify-center items-center">
        <div
            class="multi-option-modal flex flex-col max-h-full overflow-y-auto mx-4 p-4 bg-white border rounded-xl space-y-2"
        >
            <div class="mx-5 my-2">
                <h2
                    v-if="title"
                    slot="header"
                    class="text-2xl mb-3 text-pretty"
                    style="font-weight: 700; line-height: 1.3"
                >
                    {{ title }}
                </h2>
                <p v-if="message" style="font-weight: 500" class="text-pretty">{{ message }}</p>
                <div class="w-full flex items-center gap-3 justify-end mt-5">
                    <button
                        v-for="option in options"
                        class="respected-standard-button respected-black-bg-button respected-thin-button"
                        style="margin: 0 !important"
                        @click="
                            () => {
                                option.action();
                                this.$vfm.close(this.name);
                            }
                        "
                    >
                        {{ option.label }}
                    </button>
                    <button
                        v-if="cancelAllowed"
                        class="respected-standard-button respected-gray-border-button respected-thin-button"
                        style="margin: 0 !important"
                        @click="onCancel"
                    >
                        {{ $t('editor.cancel') }}
                    </button>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { VueFinalModal } from 'vue-final-modal';
// import { Options } from 'vue-property-decorator';

interface modalOption {
    label: string;
    action: () => void;
}

@Options({
    components: {
        'vue-final-modal': VueFinalModal
    }
})
export default class MetadataEditorV extends Vue {
    @Prop() name!: string;
    @Prop() title!: string;
    @Prop() message!: string | undefined;
    @Prop() options!: modalOption[];
    @Prop({ default: false }) cancelAllowed!: boolean;

    onCancel(): void {
        this.$emit('Cancel');
        this.$vfm.close(this.name);
    }
}
</script>

<style scoped lang="css">
.multi-option-modal {
    width: 500px !important;
    min-width: 1px !important;
    max-width: 90%;
    border-radius: 0.75rem /* 12px */;
}
h2 {
    line-height: 1.3;
    border-bottom: 0px;
}
</style>
