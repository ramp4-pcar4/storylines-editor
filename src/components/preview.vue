<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div>
        <div v-if="loadStatus === 'loading'">
            <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
                <spinner size="120px" color="#009cd1" style="margin: 0 auto"></spinner>
            </div>
        </div>

        <div v-else-if="loadStatus === 'loaded'">
            <div class="storyramp-app bg-white" v-if="config !== undefined">
                <header
                    id="story-header"
                    class="story-header sticky top-0 flex border-b border-black bg-gray-200 py-2 px-2 justify-between"
                >
                    <div class="w-mobile-full truncate">
                        <span class="font-semibold text-lg m-1">{{ config.title }}</span>
                    </div>

                    <button @click="changeLang" class="editor-button bg-black text-white hover:bg-gray-900">
                        <span class="inline-block">{{
                            lang === 'en' ? $t('editor.lang.fr') : $t('editor.lang.en')
                        }}</span>
                    </button>
                </header>

                <storylines-intro :config="config.introSlide" :configFileStructure="configFileStructure" />

                <div class="w-full mx-auto pb-10" id="story">
                    <storylines-content
                        :config="config"
                        :configFileStructure="configFileStructure"
                        :lang="lang"
                        :plugin="true"
                        :headerHeight="headerHeight"
                        @step="updateActiveIndex"
                    />
                </div>

                <footer class="p-8 pt-2 text-right text-sm">
                    Context:
                    <a class="text-blue-700 font-semibold" :href="config.contextLink" target="_NEW">{{
                        config.contextLabel
                    }}</a>
                    |
                    <a
                        href="https://github.com/ramp4-pcar4/storylines-editor"
                        target="_NEW"
                        class="font-semibold text-blue-700"
                        >ramp4-pcar4/storylines-editor</a
                    >
                </footer>

                <div class="storyramp-modified" v-if="config.dateModified">
                    {{ $t('story.date') }}
                    {{ config.dateModified }}
                </div>
            </div>
        </div>
        <div v-else></div>
    </div>
    <div>
        <confirmation-modal
            :name="`confirm-extend-session-preview`"
            :message="
                $t('editor.extendSession', {
                    mins: Math.floor(lockStore.timeRemaining / 60),
                    secs: lockStore.timeRemaining - Math.floor(lockStore.timeRemaining / 60) * 60,
                    totalMins: totalTime
                })
            "
            :messageClass="'text-lg'"
            @ok="extendSession(true)"
        />
    </div>
</template>

<script lang="ts">
import Message from 'vue-m-message';
import { Options, Vue } from 'vue-property-decorator';
import { ConfigFileStructure, StoryRampConfig } from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { AxiosError } from 'axios';

import JSZip from 'jszip';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useLockStore } from '@/stores/lockStore';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Options({
    components: {
        spinner: VueSpinnerOval,
        'confirmation-modal': ConfirmationModalV
    }
})
export default class StoryPreviewV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    configFileStructure: ConfigFileStructure | undefined = undefined;
    savedProduct = false;
    loadStatus = 'loading';
    activeChapterIndex = -1;
    lang = 'en';
    headerHeight = 0;
    uid = '';
    apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';
    broadcast: BroadcastChannel | undefined = undefined;
    configs: {
        [key: string]: StoryRampConfig | undefined;
    } = { en: undefined, fr: undefined };
    lockStore = useLockStore();
    confirmationTimeout: NodeJS.Timeout | undefined = undefined; // the timer to show the session extension confirmation modal
    totalTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_END) : 30;

    extendSession(showPopup?: boolean): void {
        if (!this.savedProduct) {
            this.broadcast?.postMessage({ action: 'extend', showPopup });
        }
    }

    async mounted() {
        this.uid = this.$route.params.uid as string;
        this.lang = this.$route.params.lang as string;
        const lockStore = useLockStore();

        // if config file structure passed from session (from main editor page)
        if (window.props) {
            this.config = JSON.parse(JSON.stringify(window.props.configs[this.lang]));
            this.configs = window.props.configs;
            this.configFileStructure = window.props.configFileStructure;
            // this broadcast channel will be used to communicate regarding sessions with the main editor tab
            this.broadcast = new BroadcastChannel(window.props.secret);
            this.broadcast.onmessage = (e) => {
                const msg = e.data;
                if (msg.action === 'confirm') {
                    // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                    document.onmousemove = () => undefined;
                    document.onkeydown = () => undefined;
                    // main tab says show confirmation modal
                    this.lockStore.resetSession(msg.value);
                    this.$vfm.open(`confirm-extend-session-preview`);
                } else if (msg.action === 'close') {
                    // main tab says close modal
                    this.$vfm.close(`confirm-extend-session-preview`);
                } else if (msg.action === 'extend') {
                    // main tab says extend the session
                    Message.success(this.$t('editor.session.extended'));
                    this.$vfm.close(`confirm-extend-session-preview`);
                    // Now add back event listeners to detect inactivity
                    document.onmousemove = () => this.extendSession();
                    document.onkeydown = () => this.extendSession();
                } else if (msg.action === 'saving') {
                    // main editor tab is saving
                    // disable session extend on activity
                    this.$vfm.close(`confirm-extend-session-preview`);
                    document.onmousemove = () => undefined;
                    document.onkeydown = () => undefined;
                } else if (msg.action === 'saved') {
                    // main editor tab is done saving
                    // re-enable session extend on activity
                    document.onmousemove = () => this.extendSession();
                    document.onkeydown = () => this.extendSession();
                } else {
                    // main tab says end the session
                    // we display the toast to say the session has ended in the other tab
                    // but keep showing the preview since technically that does not require any locks
                    this.$vfm.close('confirm-extend-session-preview');
                    Message.error(this.$t('editor.session.ended'));
                    // Remove inactivity listeners since session has expired.
                    document.onmousemove = () => undefined;
                    document.onkeydown = () => undefined;
                }
            };
            const minsRemaining = window.props.timeRemaining / 60;
            const warnMins = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_WARN) : 5;
            if (minsRemaining <= warnMins) {
                // Preview tab was opened with < the amount of time remaining in a session timeout that we have to show the warning
                // Therefore, display warning immediately and do not track activity.
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
                this.lockStore.resetSession(minsRemaining * 60);
                this.$vfm.open(`confirm-extend-session-preview`);
            } else {
                // Extend the session in the main editor tab if the user does something in the preview tab
                document.onmousemove = () => this.extendSession();
                document.onkeydown = () => this.extendSession();
            }
            // Link stylesheets from the config, if any
            if (this.config.stylesheets) {
                this.addStylesheets(this.config.stylesheets);
            }
            this.loadStatus = 'loaded';
        } else {
            this.savedProduct = true;
            const userStore = useUserStore();
            await userStore.fetchUserProfile();
            const user = userStore.userProfile.userName;
            // attempt to fetch saved config file from the server (TODO: setup as express route?)
            fetch(this.apiUrl + `/retrieve/${this.uid}/latest`, {
                headers: { user, preview: true }
            }).then((res: Response) => {
                if (res.status === 404) {
                    Message.error(this.$t('editor.warning.uuidNotFound', { uuid: this.uid }));
                    console.error(`There does not exist a saved product with UID ${this.uid}.`);
                    // redirect to canada.ca 404 page on invalid URL params
                    // window.location.href = 'https://www.canada.ca/errors/404.html';
                    this.loadStatus = 'error';
                    // Unlock the storyline if load fails.
                    lockStore.unlockStoryline();
                } else {
                    const configZip = new JSZip();
                    // Files retrieved. Convert them into a JSZip object.
                    res.blob().then((file: Blob) => {
                        configZip.loadAsync(file).then(() => {
                            const assetsFolder = configZip.folder('assets');
                            const chartsFolder = configZip.folder('charts');
                            const rampConfigFolder = configZip.folder('ramp-config');

                            // save EN and FR storylines configurations (for lang switching)
                            const enFile = configZip.file(`${this.uid}_en.json`);
                            const frFile = configZip.file(`${this.uid}_fr.json`);
                            enFile?.async('string').then((res: string) => {
                                this.configs['en'] = JSON.parse(res);
                            });
                            frFile?.async('string').then((res: string) => {
                                this.configs['fr'] = JSON.parse(res);
                            });

                            this.configFileStructure = {
                                uuid: this.uid,
                                zip: configZip,
                                configs: this.configs as unknown as { [key: string]: StoryRampConfig },
                                assets: {
                                    en: (assetsFolder as JSZip).folder('en') as JSZip,
                                    fr: (assetsFolder as JSZip).folder('fr') as JSZip
                                },
                                charts: {
                                    en: (chartsFolder as JSZip).folder('en') as JSZip,
                                    fr: (chartsFolder as JSZip).folder('fr') as JSZip
                                },
                                rampConfig: rampConfigFolder as JSZip
                            };

                            const configFile = configZip.file(`${this.uid}_${this.lang}.json`);
                            configFile?.async('string').then((configContent: string) => {
                                const config = JSON.parse(configContent) as StoryRampConfig;
                                this.config = config;
                                this.loadStatus = 'loaded';
                                document.title = this.config.title + ' - Canada.ca';
                                // Link stylesheets from the config, if any
                                if (this.config.stylesheets) {
                                    this.addStylesheets(this.config.stylesheets);
                                }
                            });
                        });
                    });
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fetch(this.apiUrl + `/retrieveMessages`).then((res: any) => {
                    axios
                        .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                            messages: res.data.messages
                        })
                        .catch((error: AxiosError) => console.log(error.response || error));
                });
            });
        }

        // Purge undefined slides from configs
        if (this.config) {
            this.config.slides = this.config.slides.filter((slide) => slide && Object.keys(slide).length);
        }
        if (this.configs['en']) {
            this.configs['en'].slides = this.configs['en'].slides.filter((slide) => slide && Object.keys(slide).length);
        }
        if (this.configs['fr']) {
            this.configs['fr'].slides = this.configs['fr'].slides.filter((slide) => slide && Object.keys(slide).length);
        }

        // set page lang
        const html = document.documentElement;
        html.setAttribute('lang', this.lang);
        this.$i18n.locale = this.lang;
    }

    addStylesheets(paths: string[]): void {
        paths.forEach(async (path) => {
            const filePath = path.split('/').slice(1).join('/');
            const styleFile = this.configFileStructure.zip.file(filePath);
            if (styleFile) {
                const styles = await styleFile.async('text');
                const styleEl = document.createElement('style');
                styleEl.textContent = styles;
                document.head.appendChild(styleEl);
            }
        });
    }

    // reload preview page with FR config
    changeLang(): void {
        const newLang = this.lang === 'en' ? 'fr' : 'en';
        const routeData = this.$router.resolve({
            name: 'preview',
            params: { lang: newLang, uid: this.uid }
        });

        // update window props on refresh (to prevent having to fetch from server again)
        const refreshTab = window.open(routeData.href, '_self');
        (refreshTab as Window).props = {
            configs: this.configs,
            configFileStructure: this.configFileStructure
        };
        this.$forceUpdate();
    }

    updateActiveIndex(idx: number): void {
        this.activeChapterIndex = idx;
        // determine header height
        const headerH = document.getElementById('story-header');
        if (headerH) {
            this.headerHeight = headerH.clientHeight;
        }
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', system-ui, ui-sans-serif, Tahoma, Geneva, Verdana, sans-serif;

.storyramp-app {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.3;
        border-bottom: 0px;
        margin-bottom: 3px;
    }

    .story-header {
        z-index: 60;
    }

    .storyramp-modified {
        max-width: 1536px;
        margin: 0 auto;
        padding-left: 15px;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    .prose a {
        font-weight: bold;
    }

    .prose a:not([panel])::after {
        content: url('../assets/popout.svg');
    }

    .w-mobile-full {
        width: 80%;
    }
}

@media screen and (max-width: 640px) {
    .w-mobile-full {
        width: 100% !important;
    }
}
</style>
