<template>
    <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
        <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
            <h2 slot="header" class="text-xl font-semibold">{{ $t('audio.editor.header') }}</h2>
            <div class="flex flex-row gap-2">
                <!-- ENG/FR config toggle -->
                <button
                    class="respected-standard-button respected-gray-border-button respected-thin-button"
                    @click="onBack"
                    tabindex="0"
                >
                    {{ $t('dynamic.back') }}
                </button>
                <button class="respected-standard-button respected-black-bg-button respected-thin-button" @click="onOk">
                    {{ $t('editor.slideshow.label.add') }}
                </button>
            </div>
        </div>
    </div>
    <div class="mx-4">
        <h1>This is the editor for the gallery widget.</h1>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { useProductStore } from '@/stores/productStore';

export default class GalleryWidgetV extends Vue {
    productStore = useProductStore();

    onOk(): void {
        this.$emit('ok');
    }

    onCancel(): void {
        this.$emit('cancel');
    }

    onBack(): void {
        this.$emit('back');
    }
}
</script>
