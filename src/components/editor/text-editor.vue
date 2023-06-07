<template>
    <div class="flex flex-col mt-4">
        <label class="text-left">Panel title:</label>
        <input type="text" v-model="panel.title" />
        <label class="text-left mt-2">Panel body:</label>
        <v-md-editor
            v-model="panel.content"
            height="400px"
            left-toolbar="undo redo clear | h bold italic strikethrough quote subsuper | ul ol table hr | addLink image code | save"
            :toolbar="toolbar"
            :disabled-menus="[]"
            @upload-image="handleUploadImage"
        ></v-md-editor>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ConfigFileStructure, TextPanel } from '@/definitions';

interface MDEditor {
    insert(callback: (selected: string) => { text: string; selected: string }): void;
}

@Component({
    components: {}
})
export default class TextEditorV extends Vue {
    @Prop() panel!: TextPanel;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;

    toolbar = {
        subsuper: {
            title: 'Superscript/Subscript',
            text: 'T',
            menus: [
                {
                    name: 'Superscript',
                    text: 'Superscript',
                    action(editor: MDEditor): void {
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
                    action(editor: MDEditor): void {
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
                    action(editor: MDEditor): void {
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
                    action(editor: MDEditor): void {
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
                    action(editor: MDEditor): void {
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

    handleUploadImage(event: any, insertImage: any, files: File[]) {
        const file = files[0];
        // Get the files and upload them to the file server, then insert the corresponding content into the editor
        this.configFileStructure.assets[this.lang].file(file.name, file);

        // Here is just an example
        insertImage({
            url: `/${this.configFileStructure.uuid}/assets/${this.lang}/${file.name}`,
            desc: file.name
        });
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}
</style>
