<template>
    <vue-final-modal
        @click="$emit('save-changes')"
        modalId="metadata-edit-modal"
        content-class="edit-metadata-content max-h-full overflow-y-auto max-w-xl mx-4 p-7 bg-white border rounded-lg"
        class="flex justify-center items-center"
    >
        <div @click.stop class="flex flex-col space-y-2">
            <div class="sticky top-0 bg-white pt-5 pb-2 mb-2 border-b border-gray-300 z-50">
                <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2">
                    <h2 slot="header" class="text-2xl font-bold">{{ $t('editor.editMetadata') }}</h2>
                    <div class="flex flex-row gap-2">
                        <!-- ENG/FR config toggle -->
                        <button
                            class="editor-button editor-forms-button border border-gray-300"
                            @click="$emit('lang-change')"
                            tabindex="0"
                        >
                            {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                        </button>
                        <button
                            class="editor-button editor-forms-button bg-black text-white hover:bg-gray-800"
                            @click="$emit('save-changes')"
                        >
                            {{ $t('editor.done') }}
                        </button>
                    </div>
                </div>
            </div>
            <metadata-content
                :metadata="metadata"
                @metadata-changed="(key, value) => $emit('metadata-changed', key, value)"
                @image-changed="(event, type) => $emit('image-changed', event, type)"
                @image-source-changed="(event, type) => $emit('image-source-changed', event, type)"
                @logo-removed="$emit('logo-removed')"
                @background-removed="$emit('background-removed')"
            ></metadata-content>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import MetadataContentV from './metadata-content.vue';
import { Options, Prop, Vue } from 'vue-property-decorator';
import { MetadataContent } from '@/definitions';
import { VueFinalModal } from 'vue-final-modal';

@Options({
    components: {
        'metadata-content': MetadataContentV,
        'vue-final-modal': VueFinalModal
    },
    emits: [
        'metadata-changed',
        'image-changed',
        'image-source-changed',
        'logo-removed',
        'background-removed',
        'lang-change',
        'save-changes'
    ]
})
export default class MetadataModalV extends Vue {
    @Prop() metadata!: MetadataContent;
    @Prop() configLang: 'en' | 'fr';
}
</script>

<style lang="scss"></style>
