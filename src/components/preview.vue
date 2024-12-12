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
                    secs: lockStore.timeRemaining - Math.floor(lockStore.timeRemaining / 60) * 60
                })
            "
            :messageClass="'text-lg'"
            @ok="extendSession()"
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
import { RouteLocationNormalized } from 'vue-router';

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
    endTimeout: NodeJS.Timeout | undefined = undefined; // the timer to kill the session due to timeout

    handleSessionTimeout(): void {
        // Clear any lingering timers
        clearTimeout(this.endTimeout);
        clearTimeout(this.confirmationTimeout);
        // We prompt the user to extend the session when session warn minutes have passed.
        const warnTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_WARN) : 5;
        this.confirmationTimeout = setTimeout(() => {
            this.$vfm.open(`confirm-extend-session-preview`);
        }, this.lockStore.timeRemaining * 1000 - warnTime * 60 * 1000);
        // After the timer has run out, if the session was not extended, go back to the landing page (which will unlock the storyline).
        this.endTimeout = setTimeout(() => {
            this.$vfm.close('confirm-extend-session-preview');
            this.$router.push({ name: 'home' });
        }, this.lockStore.timeRemaining * 1000 + 1000);
    }

    extendSession(overrideTime?: number, firstLoad?: boolean): void {
        if (!this.savedProduct) {
            this.broadcast?.postMessage({ action: 'extend' });
            return;
        }
        if (!firstLoad) {
            Message.success(this.$t('editor.session.extended'));
        }
        // If the user wants to extend the timer, this method will reset the time remaining.
        this.lockStore.resetSession(overrideTime);
        // We need to call this method again because we need to keep checking that the time has not run out.
        this.handleSessionTimeout();
    }

    async created() {
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
                    // main tab says show confirmation modal
                    this.$vfm.open(`confirm-extend-session-preview`);
                    this.lockStore.resetSession(msg.value);
                } else if (msg.action === 'close') {
                    // main tab says close modal
                    this.$vfm.close(`confirm-extend-session-preview`);
                } else if (msg.action === 'extend') {
                    // main tab says extend the session
                    Message.success(this.$t('editor.session.extended'));
                    this.$vfm.close(`confirm-extend-session-preview`);
                } else {
                    // main tab says end the session
                    this.$vfm.close('confirm-extend-session-preview');
                    this.$router.push({ name: 'homeExpired' });
                }
            };
            this.broadcast.postMessage({ message: 'Hello from the preview tab!' });
            this.loadStatus = 'loaded';
        } else {
            this.savedProduct = true;
            const userStore = useUserStore();
            await userStore.fetchUserProfile();
            const user = userStore.userProfile.userName;
            // Attempt to "lock" the storyline for this user so that other users
            // cannot access it concurrently.
            lockStore
                .lockStoryline(this.uid)
                .then(() => {
                    // attempt to fetch saved config file from the server (TODO: setup as express route?)
                    fetch(this.apiUrl + `/retrieve/${this.uid}/latest`, {
                        headers: { user, secret: lockStore.secret }
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
                                        // Extend the session on load
                                        this.extendSession(undefined, true);
                                        document.title = this.config.title + ' - Canada.ca';
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
                })
                .catch(() => {
                    // Storyline is being accessed by another user.
                    // Display error toast and redirect to home page after a small delay.
                    this.loadStatus = 'error';
                    Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    setTimeout(() => {
                        this.$router.push({ name: 'homeExpired' });
                    }, 2000);
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

    beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: (cont?: boolean) => void): void {
        this.lockStore.unlockStoryline();
        clearTimeout(this.confirmationTimeout);
        clearTimeout(this.endTimeout);
        next();
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
