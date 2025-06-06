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
                    class="text-center py-2 rounded-r hover:bg-gray-100"
                    :aria-label="name"
                    :value="selectedColour"
                    @input="(evt) => selectedColour = (evt.target as HTMLInputElement).value"
                />
            </div>
            <ColorPicker
                v-if="isOpen"
                :color="value"
                alpha-channel="hide"
                :visible-formats="['hex']"
                default-format="hex"
                @color-change="(evt: any) => this.selectedColour = evt.cssColor"
            >
                <template #copy-button></template>
            </ColorPicker>
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue, Watch } from 'vue-property-decorator';

export default class LoadingPageV extends Vue {
    @Prop() value!: string;
    @Prop() name!: string;
    @Prop() disabled?: boolean;

    isOpen: boolean = false;
    selectedColour: string = '';

    beforeMount(): void {
        this.selectedColour = this.value;
    }

    /**
     * If component is enabled, toggle the colour picker visibility.
     */
    togglePicker(): void {
        if (!this.disabled) this.isOpen = !this.isOpen;
    }

    /**
     * Watches the selectedColour property and emits a change event when it changes. The event emitted mimics an "HTMLInputEvent" so that
     * we don't need to make any modifications to the `metadataChanged` event listener in `metadata-content.vue`.
     * @param evt a string representing the new colour value.
     */
    @Watch('selectedColour')
    colourChanged(evt: Event): void {
        // If the value didn't change, don't fire the event.
        if (this.value === this.selectedColour) return;

        this.$emit('change', {
            target: {
                name: this.name,
                value: this.selectedColour
            }
        });
    }
}
</script>

<style scoped lang="scss">
:deep(.vacp-color-inputs),
:deep(.vacp-copy-button),
:deep(.vacp-range-input-label-text--hue) {
    display: none;
}
</style>
