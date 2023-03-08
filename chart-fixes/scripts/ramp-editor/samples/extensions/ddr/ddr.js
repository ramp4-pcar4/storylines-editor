setTimeout(() => {
    // add translations
    api.addTranslations('ddrlabel', ['DDR', 'DDR']);
    api.addTranslations('ddrtooltip', ['DDR Publishing Process', 'Processus de publication DDR']);

    // add function to scope
    const path = url.substring(0, url.lastIndexOf('/'));
    scope.ddr = () => {
        api.setExtensionDialog(`<md-dialog aria-label="{{ \'extensions.ddrtooltip\' | translate }}" class="av-extent-dialog">
                <av-content-panel close-panel="self.close()"
                        title-style="title" title-value="{{ \'extensions.ddrtooltip\' | translate }}">
                    <av-frame html="${path}/frame-ddr.html"></av-frame>
                </av-content-panel>
            </md-dialog>`, 'av-ddr-button');
    }

    // add button to the interface
    api.addButton('ddr()', 'ddrlabel', 'ddrtooltip', 'av-ddr-button');
}, 2000);
