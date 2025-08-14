<template>
    <div class="flex flex-col mt-4">
        <label class="respected-standard-label" for="panelTitle">{{ $t('editor.slides.panel.title') }}</label>
        <input class="respected-standard-input" type="text" id="panelTitle" v-model="panel.title" />
        <div class="respected-standard-label text-left mt-4 mb-1">{{ $t('editor.slides.panel.body') }}</div>
        <div
            :style="{ border: '1px solid #a1a1a1', zIndex: isFullScreen ? 150 : 0 }"
            class="text-editor-container rounded-md p-1 shadow-md"
        >
            <VueMarkdownEditor
                v-model="panel.content"
                height="400px"
                :left-toolbar="toolbarOptions"
                :toolbar="toolbar"
                @fullscreen-change="onFullscreenChange"
                ref="mdEditor"
            ></VueMarkdownEditor>
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
                            <WetDashboardItem
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

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import VueMarkdownEditor, { langMap } from '@/plugins/markdown-editor/index';
import { TextPanel } from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';
import WetDashboardItem from '../support/wet-dashboard-item.vue';
import WETComponents from '../support/wet-component-templates.json';
import DOMPurify from 'dompurify';
import tippy from 'tippy.js';

// Define interfaces
interface MDEditor {
    insert(callback: (selected: string) => { text: string; selected: string }): void;
}

interface WETComponentsObject {
    [key: string]: {
        sections: { section: string; children: { name: string; html: string }[] }[];
    };
}

// Set default values for optional props
const props = withDefaults(
    defineProps<{
        panel: TextPanel;
        centerSlide?: boolean;
        dynamicSelected?: boolean;
        lang?: string;
    }>(),
    {
        centerSlide: false,
        dynamicSelected: false
    }
);

const emit = defineEmits(['slide-edit']);

// Setup i18n
const { t, locale } = useI18n();

// Reactive state
const wetComponentsVisible = ref(false);
const editor = ref<MDEditor>({} as MDEditor);
const components = reactive<WETComponentsObject>(WETComponents);
const pageLang = ref(window.location.href.includes('index-ca-en') ? 'en' : 'fr');
const isFullScreen = ref(false);
const fontSizes = [5, 5.5, 6.5, 7.5, 8, 9, 10, 10.5, 11, 12, 14, 18, 20, 22, 24, 26, 28, 36, 48, 72];

// Watch panel.content
watch(
    () => props.panel.content,
    () => {
        emit('slide-edit');

        const currentLocale = locale.value === 'fr' ? 'fr-FR' : 'en-US';
        VueMarkdownEditor.lang.use(currentLocale, langMap[currentLocale]);
    },
    { deep: true, immediate: true }
);

// ==========================
// Functions

function onFullscreenChange(newVal: boolean) {
    isFullScreen.value = newVal;
}

function makeTextEditorElementsTabbable() {
    // Make preview tabbable
    const preview = document.querySelector('.v-md-editor__preview-wrapper') as HTMLElement;
    if (preview) {
        preview.setAttribute('tabindex', '0');
    }

    // Allow tabbing out of the text editor area
    const patchCodeMirrorTabBehavior = (): void => {
        // Find the actual CodeMirror instance (it's on the .CodeMirror class div)
        const cmWrapper = document.querySelector('.CodeMirror') as any;
        if (!cmWrapper || !cmWrapper.CodeMirror) return;

        const cm = cmWrapper.CodeMirror;

        // Define the key behavior
        cm.setOption('extraKeys', {
            Tab: (_cm: any) => {
                moveFocus(1);
            },
            'Shift-Tab': (_cm: any) => {
                moveFocus(-1);
            }
        });
    };
    patchCodeMirrorTabBehavior();

    const toolbar = document.querySelector('.v-md-editor__toolbar');
    if (!toolbar) return;

    const makeButtonInteractive = (el: HTMLElement) => {
        el.setAttribute('tabindex', '0');

        // Show tooltips for toolbar items when focused upon
        el.addEventListener('focus', () => {
            const tooltip = el.querySelector('.v-md-editor__tooltip') as HTMLElement;
            if (!tooltip) return;

            // for calculating tooltip position
            const rect = el.getBoundingClientRect();

            tooltip.style.left = '0px';
            tooltip.style.top = rect.height + 5 + 'px';
            tooltip.style.display = 'block';
        });

        // Hide tooltips when toolbar item loses focus
        el.addEventListener('blur', () => {
            const tooltip = el.querySelector('.v-md-editor__tooltip') as HTMLElement;
            if (!tooltip) return;
            tooltip.style.display = 'none';
        });

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

    // Allow tabbing for TOC area
    const initializeTOCTabbing = (tocContainer: HTMLElement | null) => {
        if (!tocContainer) return;

        tocContainer.setAttribute('tabindex', '0');
        tocContainer.dataset.keyboardEnabled = 'false';

        let tooltip: any = null;
        tocContainer.addEventListener('focus', () => {
            if (tocContainer.offsetWidth > 10) {
                tooltip ??= tippy(tocContainer, {
                    content: t('editor.slides.panel.toc'),
                    trigger: 'manual',
                    placement: 'top'
                });
                tooltip.show();
            }
        });

        tocContainer.addEventListener('keydown', (e: KeyboardEvent) => {
            if ((e.key === 'Enter' || e.key === ' ') && tocContainer.dataset.keyboardEnabled === 'false') {
                e.preventDefault();
                const tocItems = tocContainer.querySelectorAll<HTMLElement>('.v-md-editor__toc-nav-item');
                // Enable tabbing for each TOC item
                makeTOCItemsInteractive(tocItems);

                // Focus onto the first TOC item
                tocContainer.dataset.keyboardEnabled = 'true';
                (tocItems[0] as HTMLElement)?.focus();
            }
        });
        // Reset TOC items' tabbing state when focus leaves the TOC container
        tocContainer.addEventListener('focusout', (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget as HTMLElement | null;
            if (!relatedTarget || !tocContainer.contains(relatedTarget)) {
                const tocItems = tocContainer.querySelectorAll<HTMLElement>('.v-md-editor__toc-nav-item');
                tocItems.forEach((item) => {
                    item.removeAttribute('tabindex');
                    item.dataset.keyboardEnabled = '';
                });
                tocContainer.dataset.keyboardEnabled = 'false';
            }
            tooltip?.hide();
        });
    };

    const makeTOCItemsInteractive = (tocItems: NodeListOf<HTMLElement>) => {
        tocItems.forEach((item: HTMLElement) => {
            item.setAttribute('tabindex', '0');
            if (item.dataset.keyboardEnabled) return;

            item.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
            item.dataset.keyboardEnabled = 'true';
        });
    };

    const patchEverything = () => {
        const buttons = toolbar.querySelectorAll('[role="button"], button, .v-md-editor__toolbar-item');
        buttons.forEach(makeButtonInteractive);
        makeDropdownItemsInteractive();

        const tocContainer = document.querySelector('.v-md-editor__toc-nav');
        initializeTOCTabbing(tocContainer);
    };

    const observer = new MutationObserver(patchEverything);

    observer.observe(toolbar, {
        childList: true,
        subtree: true
    });

    patchEverything();
}

function moveFocus(direction: number): void {
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

const toolbar = computed(() => {
    return {
        fontSize: {
            title: t('editor.text.fontsize.title'),
            text: 'Aa',
            menus: {
                itemWidth: '42px',
                rowNum: 10,
                items: fontSizes.map((fontSize) => {
                    return {
                        name: `${fontSize}`,
                        text: `${fontSize}`,
                        action(editor: MDEditor): void {
                            editor.insert((selected: string) => {
                                const content = selected || t('editor.text.fontsize.resize');

                                const finalText = content
                                    .split('\n')
                                    .map((paragraph: any) => {
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
            title: t('editor.text.subsuper.title'),
            text: 'T',
            menus: [
                {
                    name: t('editor.text.superscript'),
                    text: t('editor.text.superscript'),
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || t('editor.text.superscript').toLowerCase();

                            return {
                                text: `<sup>${content}</sup>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: t('editor.text.subscript'),
                    text: t('editor.text.subscript'),
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || t('editor.text.subscript').toLowerCase();

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
            title: t('editor.text.addLink.title'),
            icon: 'v-md-icon-link',
            menus: [
                {
                    name: t('editor.text.addLink.external.newTab'),
                    text: t('editor.text.addLink.external.newTab'),
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || t('editor.text.addLink.text');

                            return {
                                text: `<a href='http://' target='_blank'>${content}</a>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: t('editor.text.addLink.external.sameTab'),
                    text: t('editor.text.addLink.external.sameTab'),
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || t('editor.text.addLink.text');

                            return {
                                text: `<a href='http://' target='_self'>${content}</a>`,
                                selected: content
                            };
                        });
                    }
                },
                {
                    name: t('editor.text.addLink.dynamic'),
                    text: t('editor.text.addLink.dynamic'),
                    action(editor: MDEditor): void {
                        editor.insert((selected: string) => {
                            const content = selected || t('editor.text.addLink.text');

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
            title: t('editor.text.wetToolbar.title'),
            text: t('editor.text.wetToolbar.text'),
            action: (mdEditor: MDEditor): void => {
                wetComponentsVisible.value = !wetComponentsVisible.value;

                if (wetComponentsVisible.value) {
                    // Hate using setTimeout, but it seems to be necessary for this scroll to work.
                    setTimeout(() => {
                        document
                            .getElementById('WETDashboard')
                            ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }, 100);
                }

                if (mdEditor !== undefined) {
                    editor.value = mdEditor;
                }
            }
        }
    };
});

const toolbarOptions = computed(
    () =>
        `undo redo clear | h bold italic strikethrough quote subsuper fontSize | ul ol table hr | addLink image code ${
            window.location.href.includes('index-ca') ? '| wetToolbar' : ''
        } | save`
);

function toolbarTooltipAdjust(toggle: HTMLElement): void {
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

function saveChanges() {
    props.panel.content = DOMPurify.sanitize(props.panel.content, {
        FORCE_BODY: true,
        ADD_TAGS: ['AudioPlayer'],
        ADD_ATTR: ['transcript']
    }).replaceAll('audioplayer', 'AudioPlayer');
}

// Lifecycle hooks
onMounted(() => {
    applyTextAlign(props.panel, props.centerSlide, props.dynamicSelected);

    const rightToolbarToggles = Array.from(
        document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
    );
    rightToolbarToggles.forEach((toggle) => {
        toggle.addEventListener('mouseover', () => {
            toolbarTooltipAdjust(toggle as HTMLElement);
        });
    });

    makeTextEditorElementsTabbable();

    // selects the <textarea> and adds label attribute dynamically
    nextTick(() => {
        const textarea = document.querySelector('.CodeMirror textarea');
        if (textarea) {
            textarea.setAttribute('aria-label', t('editor.slides.panel.textEntry'));
        }
    });
});

onUnmounted(() => {
    const rightToolbarToggles = Array.from(
        document.querySelectorAll('.v-md-editor__toolbar-right > .v-md-editor__toolbar-item')
    );
    rightToolbarToggles.forEach((toggle) => {
        toggle.removeEventListener('mouseover', () => {
            toolbarTooltipAdjust(toggle as HTMLElement);
        });
    });
});

// =========================================
// Component exposes

defineExpose({
    saveChanges
});
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

:deep(.v-md-editor__toc-nav) {
    padding-left: 0.3rem !important;
}

:deep(.v-md-editor__toc-nav-item:focus) {
    font-weight: bolder;
    outline: none;
}
</style>
