import { useProductStore } from './productStore';
import { useLockStore } from './lockStore';
import { useStateStore } from './stateStore';
import Message from 'vue-m-message';
import { useI18n } from 'vue-i18n';

import { defineStore } from 'pinia';

import { vfm } from '../plugins/vfm/index';
import router from '../router';

interface EditorState {
    loadExisting: boolean;
    reloadExisting: boolean;
    sessionExpired: boolean;
    editingMetadata: boolean;
    changeUuid: string;
    error: boolean;
    warning: 'none' | 'uuid' | 'rename' | 'blank' | 'badChar' | 'uuidNotFound';
    loadStatus: 'waiting' | 'loading' | 'loaded';
    // Debounce timer used for updateSaveStatus only.
    // IMPORTANT: Avoid using stateStore's handlePotentialChange() directly, this timer may cause issues with change detection and saving to the configs variable.
    // Instead, ALWAYS call either updateSaveStatus() (if in metadata-editor) or emit the 'save-status' event instead!
    debounceTimer: null;
    editorSaving: boolean;
    editorUnsavedChanges: boolean;
    configLang: 'en' | 'fr';
    i18n: any;
    controller: any;
    editorComponent: null | InstanceType<any>; // required to save current slide's changes upon session timeout
    currentSlide: Slide | string;
}

export const useEditorStore = defineStore('editor', {
    state: (): EditorState => ({
        loadExisting: false,
        reloadExisting: false,
        sessionExpired: false,
        editingMetadata: false,
        changeUuid: '',
        error: false,
        warning: 'none' as 'none' | 'uuid' | 'rename' | 'blank' | 'badChar' | 'uuidNotFound',
        loadStatus: 'waiting' as 'waiting' | 'loading' | 'loaded',
        // Debounce timer used for updateSaveStatus only.
        // IMPORTANT: Avoid using stateStore's handlePotentialChange() directly, this timer may cause issues with change detection and saving to the configs variable.
        // Instead, ALWAYS call either updateSaveStatus() (if in metadata-editor) or emit the 'save-status' event instead!
        debounceTimer: null,
        editorSaving: false,
        editorUnsavedChanges: false,
        configLang: 'en',
        i18n: useI18n(),
        controller: new AbortController(),
        editorComponent: null as null | InstanceType<any>, // required to save current slide's changes upon session timeout
        currentSlide: '' as Slide | string
    }),
    getters: {
        /**
         * If a language is provided, use that. Otherwise use the current configuration language.
         */
        oppositeLang: (state) => {
            return state.configLang === 'en' ? 'fr' : 'en';
        }
    },
    actions: {
        changeLang(lang: string): void {
            this.configLang = lang;
        },
        registerEditorComponent(component: InstanceType<any>) {
            this.editorComponent = component;
        },
        /**
         * Language toggle.
         */
        async swapLang(): Promise<void> {
            console.log(' ');
            console.log('swapLang()');
            const productStore = useProductStore();
            await productStore.saveMetadata(false, true);
            this.configLang = this.oppositeLang;
            if (!productStore.configs[this.configLang]) {
                await productStore.generateNewConfig(false);
            }
            this.configLang = this.oppositeLang;
            productStore.loadConfig(productStore.configs[this.configLang]);
        },
        /**
         * Update the unsaved changes value to the payload.
         * Debounced to prevent being called too often.
         */
        // TODO: do we need to be calling this function when updating the metadata for a new project? We get an "undefined is not valid JSON"
        // error each time changes are detected
        updateSaveStatus(payload: boolean | undefined, origin?: string): void {
            console.log(' ');
            console.log('updateSaveStatus()');
            const stateStore = useStateStore();
            const productStore = useProductStore();

            if (this.debounceTimer) clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                const enConfig = JSON.parse(JSON.stringify(productStore.configs.en));
                const frConfig = JSON.parse(JSON.stringify(productStore.configs.fr));

                stateStore.handlePotentialChange(
                    {
                        en: enConfig,
                        fr: frConfig
                    },
                    origin
                );
            }, 300);
        },

        handleSessionTimeout(): void {
            const lockStore = useLockStore();
            const productStore = useProductStore();

            // We prompt the user to extend the session when session warn minutes have passed.
            const warnTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_WARN) : 5;
            const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
            const timeBuffer = isFirefox ? 2000 : 0;
            lockStore.confirmationTimeout = setTimeout(
                () => {
                    console.log('confirmation timeout');
                    // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                    document.onmousemove = () => undefined;
                    document.onkeydown = () => undefined;
                    vfm.open(`confirm-extend-session-editor`);
                    lockStore.broadcast?.postMessage({ action: 'confirm', value: lockStore.timeRemaining });
                },
                lockStore.timeRemaining * 1000 - warnTime * 60 * 1000 + timeBuffer
            );
            // After the timer has run out, if the session was not extended, go back to the landing page (which will unlock the storyline).
            lockStore.endTimeout = setTimeout(
                () => {
                    console.log('endtimeout');
                    // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                    document.onmousemove = () => undefined;
                    document.onkeydown = () => undefined;
                    this.sessionExpired = true;
                    vfm.close('confirm-extend-session-editor');
                    if (router.currentRoute.value.name === 'editor') {
                        this.editorComponent.saveChanges();
                    } else {
                        productStore.generateConfig();
                    }
                },
                lockStore.timeRemaining * 1000 + 1000 + timeBuffer
            );

            // Now add event listeners to detect for inactivity.
            document.onmousemove = () => this.extendSession();
            document.onkeydown = () => this.extendSession();
        },

        extendSession(showPopup?: boolean): void {
            const lockStore = useLockStore();
            // Clear any lingering timers
            clearTimeout(lockStore.endTimeout);
            clearTimeout(lockStore.confirmationTimeout);
            if (showPopup) {
                Message.success(this.i18n.t('editor.session.extended'));
                lockStore.broadcast?.postMessage({ action: 'extend' });
            }
            // If the user wants to extend the timer, this method will reset the time remaining.
            lockStore.resetSession();
            // We need to call this method again because we need to keep checking that the time has not run out.
            this.handleSessionTimeout();
        },

        clearData(): void {
            console.log(' ');
            console.log('editorStore - clearData()');
            this.changeUuid = '';
            this.error = false;
            this.warning = 'none';
            this.loadStatus = 'waiting';
            this.loadExisting = false;
            this.reloadExisting = false;
            this.editorSaving = false;
            this.editorUnsavedChanges = false;
            this.debounceTimer = null;
            this.sessionExpired = false;
            this.currentSlide = '';
            this.editingMetadata = false;
        },

        /**
         * Ensure that `uuid` is a case-sensitive match with the product's uuid on the server
         */
        correctUuid(): Promise<void> {
            console.log(' ');
            console.log('correctUuid()');

            return new Promise((resolve, reject) => {
                const productStore = useProductStore();
                const lockStore = useLockStore();

                const configFileNames = Object.keys(productStore.configFileStructure.zip.files).filter(
                    (key) => key.includes('.json') && !key.includes('/')
                );
                if (configFileNames.length > 0) {
                    const productUuid = configFileNames[0].substring(0, configFileNames[0].lastIndexOf('_')); // Case-sensitive UUID of product on server
                    // Only update uuid if its the same as on the server, just with incorrect letter case
                    if (
                        productUuid !== productStore.uuid &&
                        productUuid.toLowerCase() === productStore.uuid.toLowerCase()
                    ) {
                        lockStore
                            .transferLock(productUuid)
                            .then(() => {
                                productStore.uuid = productUuid;
                                productStore.configFileStructure.uuid = productUuid;
                                productStore.loadConfig().then(resolve).catch(reject);
                            })
                            .catch((err) => {
                                Message.error(this.i18n.t('editor.editMetadata.message.error.unauthorized'));
                                console.error(err);
                                this.error = true;
                                this.loadStatus = 'waiting';
                                productStore.clearConfig();
                                reject();
                            });
                    } else {
                        productStore.loadConfig().then(resolve).catch(reject);
                    }
                } else {
                    productStore.loadConfig().then(resolve).catch(reject);
                }
            });
        }
    }
});
