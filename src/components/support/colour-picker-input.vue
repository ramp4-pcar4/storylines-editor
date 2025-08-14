<template>
    <div class="flex flex-col items-start relative">
        <div class="respected-standard-input flex flex-col p-0 w-full">
            <div class="flex">
                <div
                    @click="togglePicker"
                    @keypress.enter="togglePicker"
                    :style="{ 'background-color': selectedColour }"
                    :class="!disabled ? 'cursor-pointer' : ''"
                    class="flex flex-1 rounded w-10"
                    :tabindex="!disabled ? 0 : -1"
                    v-tippy="{
                        delay: '200',
                        placement: 'top',
                        content: !disabled
                            ? isOpen
                                ? $t('editor.colourPicker.close')
                                : $t('editor.colourPicker.open')
                            : '',
                        animateFill: true
                    }"
                >
                    <span v-if="isOpen" class="text-white mx-auto self-center font-bold mix-blend-difference">X</span>
                </div>
                <input
                    :disabled="disabled"
                    class="text-center py-2 rounded ml-1 hover:bg-gray-100"
                    :aria-label="name"
                    :value="selectedColour"
                    @input="(evt) => (selectedColour = (evt.target as HTMLInputElement).value)"
                />
            </div>
            <ColorPicker
                v-if="isOpen"
                :color="value"
                alpha-channel="hide"
                :visible-formats="['hex']"
                default-format="hex"
                @color-change="(evt: any) => (selectedColour = evt.cssColor)"
            >
                <template #copy-button></template>
            </ColorPicker>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue-accessible-color-picker';
import { onBeforeMount, ref, watch } from 'vue';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = withDefaults(
    defineProps<{
        value?: string;
        name: string;
        disabled?: boolean;
    }>(),
    { value: '#000000' }
);

const emit = defineEmits(['change']);

// =========================================
// Definitions

const isOpen = ref(false);
const selectedColour = ref('');

// =========================================
// Watchers

watch(selectedColour, () => {
    // If the value didn't change, don't fire the event.
    if (props.value === selectedColour.value) return;

    emit('change', {
        target: {
            name: props.name,
            value: selectedColour.value
        }
    });
});

// =========================================
// Lifecycle functions

onBeforeMount(() => {
    selectedColour.value = props.value;
});

// =========================================
// Component functions

/**
 * If component is enabled, toggle the colour picker visibility.
 */
function togglePicker(): void {
    if (!props.disabled) isOpen.value = !isOpen.value;
}

// =========================================
// Component exposes
</script>

<style scoped lang="scss">
:deep(.vacp-color-inputs),
:deep(.vacp-copy-button),
:deep(.vacp-range-input-label-text--hue) {
    display: none;
}
</style>
