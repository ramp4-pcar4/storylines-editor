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

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

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

export default class WETDashboardItemV extends Vue {
    @Prop() editor!: MDEditor;
    @Prop() component!: WETComponentObject;
    @Prop() context!: string;

    insertText() {
        this.editor.insert((selected: string) => {
            const content = selected || this.$t('editor.enterText');

            // Scroll back up to the text editor so the user can see that the component has been added.
            (this.editor as any).$el.parentElement.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });

            return {
                text: this.component.html.replace('$$$selected$$$', content), // replace $$$selected$$$ in the template with the selected or default text
                selected: content
            };
        });
    }
}
</script>

<style scoped lang="scss">
.WETitem {
    width: 300px;
    height: 125px;
    border: 1px solid #eee;
}
</style>
