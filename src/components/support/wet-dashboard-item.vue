<template>
    <div
        class="WETitem flex justify-center items-center p-2 m-2 cursor-pointer"
        tabindex="1"
        @click="insertText"
        @keydown.enter="insertText"
    >
        <!-- Displays the component name within the component itself, the preventDefault ensures buttons don't act like buttons when clicked -->
        <div v-html="component.html.replace('$$$selected$$$', component.name)" @click="(e) => e.preventDefault()"></div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = defineProps<{
    editor: MDEditor;
    component: WETComponentObject;
    context?: string;
}>();

// =========================================
// Definitions

interface MDEditor {
    insert(
        callback: (selected: string) => {
            text: string;
            selected: string;
        }
    ): void;
}
interface WETComponentObject {
    name: string;
    html: string;
}

const { t } = useI18n();

// =========================================
// Watchers

// =========================================
// Lifecycle functions

// =========================================
// Component functions

function insertText() {
    props.editor.insert((selected: string) => {
        const content = selected || t('editor.enterText');

        // Scroll back up to the text editor so the user can see that the component has been added.
        (props.editor as any).$el.parentElement.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });

        return {
            text: props.component.html.replace('$$$selected$$$', content), // replace $$$selected$$$ in the template with the selected or default text
            selected: content
        };
    });
}

// =========================================
// Component exposes
</script>

<style scoped lang="scss">
.WETitem {
    width: 300px;
    height: 125px;
    border: 1px solid #eee;
}
</style>
