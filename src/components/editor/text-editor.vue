<template>
    <div class="flex flex-col mt-4">
        <label class="text-left">Title:</label>
        <input type="text" v-model="panel.title" />
        <label class="text-left mt-2">Body:</label>
        <v-md-editor
            v-model="panel.content"
            height="400px"
            left-toolbar="undo redo clear | h bold italic strikethrough quote subsuper | ul ol table hr | addLink image code | save"
            :toolbar="toolbar"
        ></v-md-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class TextEditorV extends Vue {
    @Prop() panel!: any;

    toolbar = {
        subsuper: {
            title: 'Superscript/Subscript',
            text: 'T',
            menus: [
                {
                    name: 'Superscript',
                    text: 'Superscript',
                    action(editor: any) {
                        editor.insert((selected: string) => {
                            const content = selected || ``;

                            return {
                                text: `<sup>${content}</sup>`,
                                selected: selected
                            };
                        });
                    }
                },
                {
                    name: 'Subscript',
                    text: 'Subscript',
                    action(editor: any) {
                        editor.insert((selected: string) => {
                            const content = selected || ``;

                            return {
                                text: `<sub>${content}</sub>`,
                                selected: selected
                            };
                        });
                    }
                }
            ]
        },
        addLink: {
            title: 'Insert Link',
            icon: 'v-md-icon-link',
            menus: [
                {
                    name: 'Add External Link (New Tab)',
                    text: 'Add External Link (New Tab)',
                    action(editor: any) {
                        editor.insert((selected: string) => {
                            const content = selected || ``;

                            return {
                                text: `[${content}](http://)`,
                                selected: selected
                            };
                        });
                    }
                },
                {
                    name: 'Add External Link (Same Tab)',
                    text: 'Add External Link (Same Tab)',
                    action(editor: any) {
                        editor.insert((selected: string) => {
                            const content = selected || ``;

                            return {
                                text: `<a href='http://' target='_self'>${content}</a>`,
                                selected: selected
                            };
                        });
                    }
                },
                {
                    name: 'Add Dynamic Link',
                    text: 'Add Dynamic Link',
                    action(editor: any) {
                        editor.insert((selected: string) => {
                            const content = selected || ``;

                            return {
                                text: `<a panel='panel-id-here'>${content}</a>`,
                                selected: selected
                            };
                        });
                    }
                }
            ]
        }
    };
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}
</style>
