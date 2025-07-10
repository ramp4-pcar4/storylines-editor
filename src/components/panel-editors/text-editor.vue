<template>
    <div class="flex flex-col mt-4">
        <label class="respected-standard-label" for="panelTitle">{{ $t('editor.slides.panel.title') }}</label>
        <input class="respected-standard-input" type="text" id="panelTitle" v-model="panel.title" />
        <div class="respected-standard-label text-left mt-4 mb-1">{{ $t('editor.slides.panel.body') }}</div>
        <div
            :style="{ border: '1px solid #a1a1a1', zIndex: isFullScreen ? 150 : 0 }"
            class="text-editor-container rounded-md p-1 shadow-md"
        >
            <v-md-editor
                v-model="panel.content"
                height="400px"
                :left-toolbar="toolbarOptions"
                :toolbar="toolbar"
                @fullscreen-change="onFullscreenChange"
            ></v-md-editor>
        </div>
        <!-- WET Component Dashboard. Only accessible if using the Canada.ca template. -->
        <div id="WETDashboard" class="WETDashboard relative p-2 my-10 rounded-sm" v-if="wetComponentsVisible">
            <span class="font-bold text-2xl">{{ $t('editor.wetDashboard.title') }}</span>
            <section class="my-2">
                <p v-html="$t('editor.wetDashboard.info')"></p>
            </section>

            <ul class="list-unstyled p-5">
                <li v-for="(section, idx) in components[pageLang].sections" :key="idx">
                    <details>
                        <summary class="font-bold text-xl">{{ section.section }}</summary>
                        <div class="flex flex-row flex-wrap">
                            <wet-item
                                v-for="component in section.children"
                                :key="component.name"
                                :component="component"
                                :editor="editor"
                            />
                        </div>
                    </details>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';
import { TextPanel } from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';
import WETDashboardItemV from '../support/wet-dashboard-item.vue';
import WETComponents from '../support/wet-component-templates.json';

interface MDEditor {
    insert(callback: (selected: string) => { text: string; selected: string }): void;
}
interface WETComponentsObject {
    [key: string]: {
        sections: { section: string; children: { name: string; html: string }[] }[];
    };
}

@Options({
    components: {
        'wet-item': WETDashboardItemV
    }
})
export default class TextEditorV extends Vue {
    @Prop() panel!: TextPanel;
    @Prop({ default: false }) centerSlide!: boolean;
    @Prop({ default: false }) dynamicSelected!: boolean;
    @Prop() lang!: string;

    wetComponentsVisible = false;
    editor: MDEditor = {} as MDEditor;
    components: WETComponentsObject = WETComponents;
    pageLang = window.location.href.includes('index-ca-en') ? 'en' : 'fr'; // this is only used if `index-ca` is already in the URL.

    @Watch('panel.content', { deep: true })
    onContentChanged() {
        this.$emit('slide-edit');
    }

    // Detecting whether the text editor is in fullscreen mode
    isFullScreen = false;
    onFullscreenChange(isFullScreen: boolean) {
        this.isFullScreen = isFullScreen;
    }

    // A ridiculous workaround to make the toolbar buttons (and the preview) in the md-editor tabbable.
    // Hopefully a better solution can be found eventually.
    makeTextEditorElementsTabbable() {
        // Make preview tabbable
        const preview = this.$el.querySelector('.v-md-editor__preview-wrapper') as HTMLElement;
        if (preview) {
            preview.setAttribute('tabindex', '0');
        }

        // Allow tabbing out of the text editor area
        // TODO: Need two tabs to get into the preview (scrollable area). Can definitely be improved.
        const patchCodeMirrorTabBehavior = (): void => {
            // Find the actual CodeMirror instance (it's on the .CodeMirror class div)
            const cmWrapper = this.$el.querySelector('.CodeMirror') as any;
            if (!cmWrapper || !cmWrapper.CodeMirror) return;

            const cm = cmWrapper.CodeMirror;

            // Define the key behavior
            cm.setOption('extraKeys', {
                Tab: (_cm: any) => {
                    this.moveFocus(1);
                },
                'Shift-Tab': (_cm: any) => {
                    this.moveFocus(-1);
                }
            });
        };
        patchCodeMirrorTabBehavior();

        const toolbar = this.$el.querySelector('.v-md-editor__toolbar');
        if (!toolbar) return;

        const makeButtonInteractive = (el: HTMLElement) => {
            el.setAttribute('tabindex', '0');

            if (!el.dataset.keyboardEnabled) {
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();

                        // Close any previously-opened menus first, with exceptions
                        const openToggles = toolbar.querySelectorAll('.v-md-editor__toolbar-item--active');
                        openToggles.forEach((openEl: HTMLElement) => {
                            // skip the element we're about to open
                            if (openEl === el) return;

                            // ...and skip any "menus" (e.g. markdown preview) from the buttons inside the right toolbar
                            // (they live under the UL[disabled-mens], or equivalently `.v-md-editor__toolbar-right`)
                            if (openEl.closest('.v-md-editor__toolbar-right')) return;

                            // otherwise, close it
                            openEl.click();
                        });

                        // Now open this one
                        el.click();

                        // If it has a submenu, focus its first item after a delay
                        const menu = el.querySelector('.v-md-editor__menu');
                        if (menu) {
                            setTimeout(() => {
                                const firstItem = menu.querySelector('.v-md-editor__menu-item');
                                (firstItem as HTMLElement).focus();
                            }, 100);
                        }
                    }
                });
                el.dataset.keyboardEnabled = 'true';
            }
        };

        const makeDropdownItemsInteractive = () => {
            const items = toolbar.querySelectorAll('.v-md-editor__menu-item');
            items.forEach((item: HTMLElement) => {
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'menuitem');

                if (!item.dataset.keyboardEnabled) {
                    item.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            item.click();
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const next = item.nextElementSibling;
                            if (next?.classList.contains('v-md-editor__menu-item')) {
                                (next as HTMLElement).focus();
                            }
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prev = item.previousElementSibling;
                            if (prev?.classList.contains('v-md-editor__menu-item')) {
                                (prev as HTMLElement).focus();
                            }
                        } else if (e.key === 'Escape') {
                            // Return focus to the dropdown toggle
                            (item.closest('.v-md-editor__toolbar-item') as HTMLElement).focus();
                        }
                    });
                    item.dataset.keyboardEnabled = 'true';
                }
            });
        };

        const patchEverything = () => {
            const buttons = toolbar.querySelectorAll('[role="button"], button, .v-md-editor__toolbar-item');
            buttons.forEach(makeButtonInteractive);
            makeDropdownItemsInteractive();
        };

        const observer = new MutationObserver(patchEverything);

        observer.observe(toolbar, {
            childList: true,
            subtree: true
        });

        patchEverything();
    }

    // TODO: May not play well with tabbing to preview (currently have bespoke code for that elsewhere). Maybe combine?
    moveFocus(direction: number): void {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        const focusables = Array.from(document.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
            (el) => el.offsetParent !== null && !el.hasAttribute('disabled')
        );

        const current = document.activeElement as HTMLElement;
        const index = focusables.indexOf(current);
        if (index === -1) return;

        const next = focusables[index + direction];
        if (next) {
            next.focus();
        }
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
        },
        wetToolbar: {
            title: 'WET Components',
            text: this.pageLang === 'en' ? 'Components' : 'Composantes',
            action: (editor: MDEditor): void => {
                this.wetComponentsVisible = !this.wetComponentsVisible;

                if (this.wetComponentsVisible) {
                    // Hate using setTimeout, but it seems to be necessary for this scroll to work.
                    setTimeout(() => {
                        document
                            .getElementById('WETDashboard')
                            ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }, 100);
                }

                if (editor !== undefined) {
                    this.editor = editor;
                }
            }
        }
    };

    toolbarOptions = `undo redo clear | h bold italic strikethrough quote subsuper fontSize | ul ol table hr | addLink image code ${
        window.location.href.includes('index-ca') ? '| wetToolbar' : ''
    } | save`;

    toolbarTooltipAdjust(toggle: HTMLElement): void {
        const slideEditor = document.querySelector('#slideEditor') as HTMLElement;
        const scrollbarVisible =
            slideEditor.scrollHeight > slideEditor.clientHeight ||
            document.documentElement.scrollHeight > document.documentElement.clientHeight;
        const toggleToRightBorder = slideEditor.getBoundingClientRect().right - toggle.getBoundingClientRect().right;
        const scrollbarOffset = document.documentElement.clientWidth * 1.3 * 0.01;
        // limit the right position of the toggle's tooltip if the toggle is sufficiently close to the right
        // border of the screen (only when scrollbar is visible)
        if (scrollbarVisible && toggleToRightBorder <= 90) {
            (toggle.children[0] as HTMLElement).style.right = `${Math.max(
                Math.min(-40, -toggleToRightBorder + scrollbarOffset),
                -65
            )}px`;
        } else {
            (toggle.children[0] as HTMLElement).style.right = `${-toggleToRightBorder}px`;
        }
    }

    mounted(): void {
        applyTextAlign(this.panel, this.centerSlide, this.dynamicSelected);

        const rightToolbarToggles = Array.from(
            document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
        );
        rightToolbarToggles.forEach((toggle) => {
            toggle.addEventListener('mouseover', () => {
                this.toolbarTooltipAdjust(toggle as HTMLElement);
            });
        });

        this.makeTextEditorElementsTabbable();

        // selects the <textarea> and adds label attribute dynamically
        this.$nextTick(() => {
            const textarea = this.$el.querySelector('.CodeMirror textarea');
            if (textarea) {
                textarea.setAttribute('aria-label', this.$t('editor.slides.panel.textEntry'));
            }
        });
    }

    unmounted(): void {
        const rightToolbarToggles = Array.from(
            document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
        );
        rightToolbarToggles.forEach((toggle) => {
            toggle.removeEventListener('mouseover', () => {
                this.toolbarTooltipAdjust(toggle as HTMLElement);
            });
        });
    }
}
</script>

<style lang="scss" scoped>
.text-editor-container:has(:focus-within) {
    outline: 2px solid royalblue;
    z-index: 2;
    outline-offset: 2px;
    transition-duration: 0.075s;
}

:deep(.v-md-editor__toolbar-right-wrapper) {
    background-color: #f3f4f6;
    border-radius: 3px;
}

:deep(.v-md-editor__toolbar-right) {
    gap: 2px;
    justify-content: center !important;
    padding-top: 3px !important;
    padding-bottom: 3px !important;
    width: fit-content !important;
}

:deep(.v-md-editor__toolbar-item:hover) {
    background-color: #d1d5db !important;
}

:deep(.v-md-editor__toolbar-item--active) {
    background-color: #c0c6cc !important;
}

label {
    text-align: left !important;
}

.WETDashboard {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

:deep(.v-md-icon-preview) {
    margin-left: 4px;
}

:deep(.v-md-editor-preview) {
    position: relative;
}

:deep(.CodeMirror-linenumber) {
    color: #383838;
}

:deep(.cm-header) {
    color: blue !important;
}
</style>
