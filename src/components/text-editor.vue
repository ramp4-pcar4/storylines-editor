<template>
    <div class="flex flex-col mt-4">
        <label class="editor-label" for="panelTitle">{{ $t('editor.slides.panel.title') }}</label>
        <input class="editor-input" type="text" id="panelTitle" v-model="panel.title" />
        <div class="editor-label text-left mt-4 mb-1">{{ $t('editor.slides.panel.body') }}</div>
        <v-md-editor
            v-model="panel.content"
            height="400px"
            left-toolbar="undo redo clear | h bold italic strikethrough quote subsuper fontSize | ul ol table hr | addLink image code | save"
            :toolbar="toolbar"
        ></v-md-editor>
    </div>
</template>

<script lang="ts">
import { Prop, Vue, Watch } from 'vue-property-decorator';
import { TextPanel } from '@/definitions';

interface MDEditor {
    insert(callback: (selected: string) => { text: string; selected: string }): void;
}

export default class TextEditorV extends Vue {
    @Prop() panel!: TextPanel;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;

    @Watch('panel.content', { deep: true })
    onContentChanged() {
        this.$emit('slide-edit');
    }

    // Default font size is 16, so it's skipped here
    fontSizes = [5, 5.5, 6.5, 7.5, 8, 9, 10, 10.5, 11, 12, 14, 18, 20, 22, 24, 26, 28, 36, 48, 72];

    // Minor issue when selecting content after clicking a toolbar item: it will always select the first instance of the content string.
    // For example, if your text is "span", changing font size while selecting it won't select <span style...>SPAN</span> afterward, but <SPAN style...>span</span>.
    // The default (module-provided) toolbar items have the same issue (try the content "*" for Bold).
    toolbar = {
        fontSize: {
            title: 'Font Size',
            text: 'Aa',
            menus: {
                itemWidth: '42px',
                rowNum: 10,
                items: this.fontSizes.map((fontSize) => {
                    return {
                        name: `${fontSize}`,
                        text: `${fontSize}`,
                        action(editor: MDEditor): void {
                            editor.insert((selected: string) => {
                                const content = selected || `resize`;

                                const finalText = content
                                    .split('\n')
                                    .map((paragraph) => {
                                        if (!paragraph) {
                                            return '';
                                        } else if (
                                            paragraph.charAt(0) === '|' || // table
                                            paragraph.charAt(0) === '!' || // image
                                            paragraph.charAt(0) === '`' || // code block
                                            paragraph === '------------------------------------'
                                        ) {
                                            return paragraph;
                                        } else {
                                            return `<span style="font-size:${fontSize}px;">${paragraph}</span>`;
                                        }
                                    })
                                    .join('\n');

                                return {
                                    text: finalText,
                                    selected: content
                                };
                            });
                        }
                    };
                })
            }
        },
        subsuper: {
            title: 'Superscript/Subscript',
            text: 'T',
            menus: [
                {
                    name: 'Superscript',
                    text: 'Superscript',
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || `superscript`;

                            return {
                                text: `<sup>${content}</sup>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: 'Subscript',
                    text: 'Subscript',
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || `subscript`;

                            return {
                                text: `<sub>${content}</sub>`,
                                selected: content
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
                            const content = selected || `link text`;

                            return {
                                text: `<a href='http://' target='_blank'>${content}</a>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: 'Add External Link (Same Tab)',
                    text: 'Add External Link (Same Tab)',
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || `link text`;

                            return {
                                text: `<a href='http://' target='_self'>${content}</a>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: 'Add Dynamic Link',
                    text: 'Add Dynamic Link',
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || `link text`;

                            return {
                                text: `<a panel='panel-id-here'>${content}</a>`,
                                selected: content
                            };
                        });
                    }
                }
            ]
        }
    };

    toolbarTooltipAdjust(toggle): void {
        const slideEditor = document.querySelector('#slideEditor');
        const scrollbarVisible =
            slideEditor.scrollHeight > slideEditor.clientHeight ||
            document.documentElement.scrollHeight > document.documentElement.clientHeight;
        const toggleToRightBorder = slideEditor.getBoundingClientRect().right - toggle.getBoundingClientRect().right;
        const scrollbarOffset = document.documentElement.clientWidth * 1.3 * 0.01;
        // limit the right position of the toggle's tooltip if the toggle is sufficiently close to the right
        // border of the screen (only when scrollbar is visible)
        if (scrollbarVisible && toggleToRightBorder <= 90) {
            toggle.children[0].style.right = `${Math.max(
                Math.min(-40, -toggleToRightBorder + scrollbarOffset),
                -65
            )}px`;
        } else {
            toggle.children[0].style.right = `${-toggleToRightBorder}px`;
        }
    }

    mounted(): void {
        if (this.centerSlide && this.dynamicSelected) {
            this.panel.customStyles += 'text-align: left !important;';
        } else if (!this.centerSlide && this.dynamicSelected) {
            this.panel.customStyles = (this.panel.customStyles || '').replace('text-align: left !important;', '');
        }

        const rightToolbarToggles = Array.from(
            document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
        );
        rightToolbarToggles.forEach((toggle) => {
            toggle.addEventListener('mouseover', () => {
                this.toolbarTooltipAdjust(toggle);
            });
        });
    }

    unmounted(): void {
        const rightToolbarToggles = Array.from(
            document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
        );
        rightToolbarToggles.forEach((toggle) => {
            toggle.removeEventListener('mouseover', () => {
                this.toolbarTooltipAdjust(toggle);
            });
        });
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}
:deep(.v-md-icon-link::before) {
    content: '\1F517';
}
:deep(.v-md-editor__tooltip) {
    text-wrap: wrap;
    overflow-wrap: break-word;
}

:deep(.v-md-editor__toolbar-right > .v-md-editor__toolbar-item > .v-md-editor__tooltip) {
    max-width: 80px;
}

:deep(.v-md-editor__toolbar-right) {
    padding-right: 20px;
}

:deep(.v-md-icon-preview) {
    margin-left: 4px;
}
</style>
