<template>
    <div v-if="helpSection.drawn">
        <div>
            <button
                type="button"
                class="help-section-header flex items-center px-25 hover:bg-gray-200 cursor-pointer select-none h-full w-full"
                @click="$emit('expand')"
                :content="$t(helpSection.expanded ? 'help.section.collapse' : 'help.section.expand')"
                v-tippy="{ placement: 'top-end', hideOnClick: false }"
            >
                <!-- name -->
                <span class="text-xl text-left flex-grow">{{ helpSection.header }}</span>

                <!-- dropdown icon -->
                <div class="dropdown-icon" :class="{ 'transform -rotate-180': helpSection.expanded }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </div>
            </button>
            <transition name="help-item" mode="out-in">
                <div
                    v-show="helpSection.expanded"
                    v-html="helpSection.info"
                    class="ramp-markdown section-body px-10 overflow-hidden"
                ></div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
export default class HelpSectionV extends Vue {
    @Prop() helpSection!: {
        header: string;
        info: string;
        drawn: boolean;
        expanded: boolean;
    };
}
</script>
<style lang="scss" scoped>
.ramp-markdown :not(table, td, img) {
    all: revert;
}

.help-section-header {
    padding: 10px 15px !important;
    margin: 0px !important;
}

.help-section-header .dropdown-icon {
    transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);
}

.help-item-leave-active,
.help-item-enter-active {
    transition: all 0.3s;
}

.help-item-enter-active {
    transition-delay: 0.1s;
}

.help-item-leave-to,
.help-item-enter {
    @apply max-h-0 opacity-0;
}
</style>
