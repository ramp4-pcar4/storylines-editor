<template>
    <vue-final-modal
        @click="$emit('save-changes')"
        modalId="metadata-edit-modal"
        content-class="edit-metadata-content max-h-full overflow-y-auto max-w-xl p-7 bg-white border rounded-lg"
        class="flex justify-center items-center"
    >
        <div @click.stop class="flex flex-col space-y-2">
            <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
                <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
                    <h2 slot="header" class="text-xl font-semibold">{{ $t('editor.editMetadata') }}</h2>
                    <div class="flex flex-row gap-2">
                        <!-- ENG/FR config toggle -->
                        <button
                            class="respected-standard-button respected-gray-border-button respected-thin-button"
                            @click="$emit('lang-change')"
                            tabindex="0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2 5h14M9 2v3m4 0q-2 8-9 11m2-7q2 4 6 6m1 7l5-11l5 11m-1.4-3h-7.2"
                                />
                            </svg>
                            <p>
                                {{ configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig') }}
                            </p>
                        </button>
                        <button
                            class="respected-standard-button respected-black-bg-button respected-thin-button"
                            @click="$emit('save-changes')"
                        >
                            {{ $t('editor.done') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="mx-4">
                <metadata-content
                    :metadata="metadata"
                    :createNew="false"
                    @metadata-changed="(key: string, value: string) => $emit('metadata-changed', key, value)"
                    @image-changed="(event: Event, type: string) => $emit('image-changed', event, type)"
                    @image-source-changed="(event: Event, type: string) => $emit('image-source-changed', event, type)"
                    @logo-removed="$emit('logo-removed')"
                    @background-removed="$emit('background-removed')"
                ></metadata-content>
            </div>
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
    @Prop() configLang!: 'en' | 'fr';
}
</script>

<style lang="scss"></style>
