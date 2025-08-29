<template>
    <VueFinalModal
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
    </VueFinalModal>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = defineProps<{
    name: string;
    message: string;
    messageClass?: string;
}>();

const emit = defineEmits(['ok', 'Cancel']);

// =========================================
// Definitions

const { $vfm } = getCurrentInstance()!.proxy!;

// =========================================
// Watchers

// =========================================
// Lifecycle functions

// =========================================
// Component functions

function onOk(): void {
    emit('ok');
    $vfm.close(props.name);
}

function onCancel(): void {
    emit('Cancel');
    $vfm.close(props.name);
}

// =========================================
// Component exposes
</script>

<style scoped lang="css"></style>
