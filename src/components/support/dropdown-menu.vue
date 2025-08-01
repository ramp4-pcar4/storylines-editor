<template>
    <div ref="el">
        <button
            type="button"
            class="text-gray-500 hover:text-black dropdown-button"
            @click="toggleDropdown"
            :content="tooltip"
            :aria-label="ariaLabel ? String(ariaLabel) : String(tooltip)"
            v-tippy="{
                placement: tooltipPlacement,
                appendTo: 'parent',
                trigger: 'manual',
                delay: '200',
                touch: ['hold', 500]
            }"
            ref="dropdownTrigger"
        >
            <slot name="header"></slot>
        </button>
        <div
            v-show="open"
            @click="
                popper.update();
                open = false;
            "
            class="rv-dropdown shadow-md border border-gray:200 py-1 bg-white rounded z-10"
            :class="{ 'text-center': centered }"
            ref="dropdown"
        >
            <slot v-bind:close="() => (open = !open)"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { createPopper, detectOverflow } from '@popperjs/core';
import type { Modifier, Placement, State } from '@popperjs/core';

const open = ref<boolean>(false);
const popper = ref<any>(null);
const watchers = reactive<Array<Function>>([]);

const el = ref();
const dropdown = ref<HTMLElement>();
const dropdownTrigger = ref<Element>();

const props = defineProps({
    position: {
        type: String,
        default: 'top-start'
    },
    popperOptions: {
        type: Object,
        default() {
            return {};
        }
    },
    tooltip: { type: String },
    tooltipPlacement: { type: String, default: 'bottom' },
    tooltipPlacementAlt: { type: String, default: 'top' },
    centered: { type: Boolean, default: true },
    ariaLabel: { type: String }
});

watchers.push(
    watch(open, () => {
        popper.value.update();
    })
);

const toggleDropdown = () => {
    open.value = !open.value;
    (dropdownTrigger.value as any)._tippy.hide();
};

const focusDropdownTrigger = () => {
    (dropdownTrigger.value as any)._tippy.setProps({
        placement: open.value ? props.tooltipPlacementAlt : props.tooltipPlacement
    });
    (dropdownTrigger.value as any)._tippy.show();
};

const blurDropdownTrigger = () => {
    (dropdownTrigger.value as any)._tippy.hide();
};

onMounted(() => {
    window.addEventListener(
        'click',
        (event) => {
            if (!el.value || !el.value.contains(event.target)) {
                open.value = false;
            }
        },
        { capture: true }
    );

    window.addEventListener('blur', () => {
        open.value = false;
    });

    window.addEventListener('focusin', (event) => {
        if (!el.value || !el.value.contains(event.target)) {
            open.value = false;
        }
    });

    dropdownTrigger.value!.addEventListener('focus', focusDropdownTrigger);
    dropdownTrigger.value!.addEventListener('blur', blurDropdownTrigger);
    dropdownTrigger.value!.addEventListener('mouseover', focusDropdownTrigger);
    dropdownTrigger.value!.addEventListener('mouseleave', blurDropdownTrigger);

    // nextTick should prevent any race conditions by letting the child elements render before trying to place them using popper
    nextTick(() => {
        const overflowScrollModifier: Modifier<'overflowScroll', {}> = {
            name: 'overflowScroll',
            enabled: true,
            phase: 'main',
            fn({ state }: { state: State }) {
                const { bottom } = detectOverflow(state);

                if (bottom > 0) {
                    state.styles.popper.overflowY = bottom > 100 ? 'auto' : undefined;
                    state.styles.popper.overflowX = 'hidden';
                    state.styles.popper.height = `${state.rects.popper.height - bottom - 8}px`;
                } else {
                    state.styles.popper.height = 'auto';
                }
            }
        };

        if (dropdownTrigger.value && dropdown.value) {
            popper.value = createPopper(dropdownTrigger.value as Element, dropdown.value as HTMLElement, {
                placement: (props.position || 'bottom') as Placement,
                modifiers: [
                    overflowScrollModifier,
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 5]
                        }
                    }
                ],
                ...props.popperOptions
            });
        }
    });
});

onBeforeUnmount(() => {
    watchers.forEach((unwatch) => unwatch());

    window.removeEventListener(
        'click',
        (event) => {
            if (!el.value || !el.value.contains(event.target)) {
                open.value = false;
            }
        },
        { capture: true }
    );

    window.removeEventListener('blur', () => {
        open.value = false;
    });

    window.removeEventListener('focusin', (event) => {
        if (!el.value || !el.value.contains(event.target)) {
            open.value = false;
        }
    });

    dropdownTrigger.value!.removeEventListener('focus', focusDropdownTrigger);
    dropdownTrigger.value!.removeEventListener('blur', blurDropdownTrigger);
    dropdownTrigger.value!.removeEventListener('mouseover', focusDropdownTrigger);
    dropdownTrigger.value!.removeEventListener('mouseleave', blurDropdownTrigger);

    open.value = false;
});
</script>

<style lang="scss">
.rv-dropdown > * {
    padding: 0.5rem 1rem;
    display: block !important;
    text-decoration: none !important;
}

.rv-dropdown > :not(.disabled) {
    color: #2d3748 !important;
}

.rv-dropdown > *:hover:not(.disabled) {
    background-color: #eee;
}

.dropdown-button {
    border-radius: 3px;
}
</style>
