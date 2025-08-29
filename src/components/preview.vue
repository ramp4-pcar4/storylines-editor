<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div>
        <div v-if="loadStatus === 'loading'">
            <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
                <VueSpinnerOval size="120px" color="#009cd1" style="margin: 0 auto"></VueSpinnerOval>
            </div>
        </div>

        <div v-else-if="loadStatus === 'loaded'">
            <div class="storyramp-app bg-white" v-if="config !== undefined">
                <header
                    id="story-header"
                    class="story-header sticky top-0 flex border-b border-black bg-gray-200 py-2 justify-between h-16"
                >
                    <storylines-mobile-toc
                        class="mobile-menu"
                        :active-chapter-index="activeChapterIndex"
                        :return-to-top="config.returnTop ?? true"
                        :plugin="true"
                        :customToc="config.tableOfContents"
                        :lang="lang"
                        :slides="config.slides"
                    />
                    <div class="w-mobile-full truncate">
                        <span class="font-semibold text-lg m-1 ml-2">{{ config.title }}</span>
                    </div>

                    <button
                        @click="changeLang"
                        class="respected-standard-button respected-black-bg-button max-h-[40px]"
                        style="margin-right: 0.5rem"
                    >
                        <span class="inline-block">{{
                            lang === 'en'
                                ? $t('editor.lang.fr', 1, { locale: 'fr' })
                                : $t('editor.lang.en', 1, { locale: 'en' })
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
                <div class="footer-padding" v-if="footerPadding" :style="footerPaddingStyle"></div>
            </div>
        </div>
        <div v-else></div>
    </div>
    <div>
        <ConfirmationModalV
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

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeMount, onMounted, ref } from 'vue';
import Message from 'vue-m-message';
import { ConfigFileStructure, StoryRampConfig } from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { AxiosError } from 'axios';

import { useI18n } from 'vue-i18n';

import JSZip from 'jszip';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useLockStore } from '@/stores/lockStore';
import ConfirmationModalV from './support/confirmation-modal.vue';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

// =========================================
// Definitions

const config = ref<StoryRampConfig | undefined>(undefined);
const configFileStructure = ref<ConfigFileStructure | undefined>(undefined);
const savedProduct = ref(false);
const loadStatus = ref('loading');
const footerPadding = computed(
    () => !window.location.href.includes('index-ca-en.html') && !window.location.href.includes('index-ca-fr.html')
);
const lastSlideHeight = ref(0);
const footerPaddingStyle = computed(() => {
    measure();
    const h = `calc(100dvh - ${lastSlideHeight.value + extraHeight.value}px)`;
    return { height: h };
});
const activeChapterIndex = ref(-1);
const lang = ref('en');
const headerHeight = ref(0);
const uid = ref('');
const apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';
const broadcast = ref<BroadcastChannel | undefined>(undefined);
const configs = ref<{
    [key: string]: StoryRampConfig | undefined;
}>({ en: undefined, fr: undefined });
const lockStore = useLockStore();
const confirmationTimeout = ref<NodeJS.Timeout | undefined>(undefined); // the timer to show the session extension confirmation modal
const totalTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_END) : 30;
const localStorageKey = 'preview-broadcast-channel';
const extraHeight = ref(0);

const { $route, $router, $vfm, $i18n, $forceUpdate } = getCurrentInstance()!.proxy!;

const { t } = useI18n();

// =========================================
// Watchers

// =========================================
// Lifecycle functions

onBeforeMount(() => {
    // When new tab is created, and another preview tab already has a BC, this will trigger its event listener, which
    // closes its BC. If no other preview with a BC exists, this will do nothing
    localStorage.removeItem(localStorageKey);
});

onMounted(async () => {
    window.addEventListener('resize', measure);
    uid.value = $route.params.uid as string;
    lang.value = $route.params.lang as string;
    const lockStore = useLockStore();

    // if config file structure passed from session (from main editor page)
    if (window.props) {
        config.value = JSON.parse(JSON.stringify(window.props.configs[lang.value]));
        configs.value = window.props.configs;
        configFileStructure.value = window.props.configFileStructure;
        // This broadcast channel will be used to communicate regarding sessions with the main editor tab
        broadcast.value = new BroadcastChannel(window.props.secret);
        localStorage.setItem(localStorageKey, 'true');

        broadcast.value.onmessage = (e) => {
            const msg = e.data;
            if (msg.action === 'confirm') {
                // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
                // main tab says show confirmation modal
                lockStore.resetSession(msg.value);
                $vfm.open(`confirm-extend-session-preview`);
            } else if (msg.action === 'close') {
                // main tab says close modal
                $vfm.close(`confirm-extend-session-preview`);
            } else if (msg.action === 'extend') {
                // main tab says extend the session
                Message.success(t('editor.session.extended'));
                $vfm.close(`confirm-extend-session-preview`);
                // Now add back event listeners to detect inactivity
                document.onmousemove = () => extendSession();
                document.onkeydown = () => extendSession();
            } else if (msg.action === 'saving') {
                // main editor tab is saving
                // disable session extend on activity
                $vfm.close(`confirm-extend-session-preview`);
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
            } else if (msg.action === 'saved') {
                // main editor tab is done saving
                // re-enable session extend on activity
                document.onmousemove = () => extendSession();
                document.onkeydown = () => extendSession();
            } else {
                // main tab says end the session
                // we display the toast to say the session has ended in the other tab
                // but keep showing the preview since technically that does not require any locks
                $vfm.close('confirm-extend-session-preview');
                Message.error(t('editor.session.ended'));
                // Remove inactivity listeners since session has expired.
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
            }
        };
        const minsRemaining = window.props.timeRemaining / 60;
        const warnMins = 3; // import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_WARN) : 5;
        if (minsRemaining <= warnMins) {
            // Preview tab was opened with < the amount of time remaining in a session timeout that we have to show the warning
            // Therefore, display warning immediately and do not track activity.
            document.onmousemove = () => undefined;
            document.onkeydown = () => undefined;
            lockStore.resetSession(minsRemaining * 60);
            $vfm.open(`confirm-extend-session-preview`);
        } else {
            // Extend the session in the main editor tab if the user does something in the preview tab
            document.onmousemove = () => extendSession();
            document.onkeydown = () => extendSession();
        }
        // Link stylesheets from the config, if any
        if (config.value?.stylesheets) {
            addStylesheets(config.value.stylesheets);
        }
        loadStatus.value = 'loaded';
        window.addEventListener('beforeunload', removeLocalStorageKey);
        window.addEventListener('storage', (event) => {
            if (event.key === localStorageKey) {
                broadcast.value?.close();
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
            }
        });
    } else {
        savedProduct.value = true;
        const userStore = useUserStore();
        await userStore.fetchUserProfile();
        const user = userStore.userProfile.userName;
        // attempt to fetch saved config file from the server (TODO: setup as express route?)
        fetch(apiUrl + `/retrieve/${uid.value}/latest`, {
            headers: { user, preview: 'true' } as HeadersInit
        }).then((res: Response) => {
            if (res.status === 404) {
                Message.error(t('editor.warning.uuidNotFound', { uuid: uid.value }));
                console.error(`There does not exist a saved product with UID ${uid.value}.`);
                // redirect to canada.ca 404 page on invalid URL params
                // window.location.href = 'https://www.canada.ca/errors/404.html';
                loadStatus.value = 'error';
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
                        const enFile = configZip.file(`${uid.value}_en.json`);
                        const frFile = configZip.file(`${uid.value}_fr.json`);
                        enFile?.async('string').then((res: string) => {
                            configs.value['en'] = JSON.parse(res);
                        });
                        frFile?.async('string').then((res: string) => {
                            configs.value['fr'] = JSON.parse(res);
                        });

                        configFileStructure.value = {
                            uuid: uid.value,
                            zip: configZip,
                            configs: configs.value as unknown as { [key: string]: StoryRampConfig },
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

                        const configFile = configZip.file(`${uid.value}_${lang.value}.json`);
                        configFile?.async('string').then((configContent: string) => {
                            const conf = JSON.parse(configContent) as StoryRampConfig;
                            config.value = conf;
                            loadStatus.value = 'loaded';
                            document.title = config.value.title + ' - Canada.ca';
                            // Link stylesheets from the config, if any
                            if (config.value.stylesheets) {
                                addStylesheets(config.value.stylesheets);
                            }
                        });
                    });
                });
            }

            fetch(apiUrl + `/retrieveMessages`).then((res: any) => {
                axios
                    .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                        messages: res.data?.messages
                    })
                    .catch((error: AxiosError) => console.log(error.response || error));
            });
        });
    }

    // Purge undefined slides from configs
    if (config.value) {
        config.value.slides = config.value.slides.filter((slide) => slide && Object.keys(slide).length);
    }
    if (configs.value['en']) {
        configs.value['en'].slides = configs.value['en'].slides.filter((slide) => slide && Object.keys(slide).length);
    }
    if (configs.value['fr']) {
        configs.value['fr'].slides = configs.value['fr'].slides.filter((slide) => slide && Object.keys(slide).length);
    }

    // set page lang
    const html = document.documentElement;
    html.setAttribute('lang', lang.value);
    $i18n.locale = lang.value;
});

// =========================================
// Component functions

function measure(): void {
    const nav = document.getElementById('h-navbar');
    const header = document.getElementById('story-header');
    extraHeight.value = nav ? nav.offsetHeight : 0; //horizontal navbar
    extraHeight.value += header ? header.offsetHeight : 0; //header
    console.log(extraHeight.value);
    extraHeight.value += 40 + 56 + 60 - 20; //bottom padding of story, context in footer, date modified, some extra padding
}

function extendSession(showPopup?: boolean): void {
    // Only send message to other BroadcastChannel if preview is connected to editor
    if (!savedProduct.value) {
        broadcast.value?.postMessage({ action: 'extend', showPopup });
    }
}

function removeLocalStorageKey() {
    localStorage.removeItem(localStorageKey);
}

function beforeDestroy() {
    window.removeEventListener('beforeunload', removeLocalStorageKey);
}

function addStylesheets(paths: string[]): void {
    paths.forEach(async (path) => {
        const filePath = path.split('/').slice(1).join('/');
        const styleFile = configFileStructure.value?.zip.file(filePath);
        if (styleFile) {
            const styles = await styleFile.async('text');
            const styleEl = document.createElement('style');
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }
    });
}

// reload preview page with FR config
function changeLang(): void {
    broadcast.value?.close();
    document.onmousemove = () => undefined;
    document.onkeydown = () => undefined;
    const newLang = lang.value === 'en' ? 'fr' : 'en';
    const routeData = $router.resolve({
        name: 'preview',
        params: { lang: newLang, uid: uid.value }
    });
    const secret = window.props?.secret;
    const timeRemaining = window.props?.timeRemaining;

    // update window props on refresh (to prevent having to fetch from server again)
    const refreshTab = window.open(routeData.href, '_self');
    (refreshTab as Window).props = {
        configs: configs.value,
        configFileStructure: configFileStructure.value,
        secret,
        timeRemaining
    };
    $forceUpdate();
}

function updateActiveIndex(idx: number): void {
    activeChapterIndex.value = idx;
    // determine header height
    const headerH = document.getElementById('story-header');
    if (headerH) {
        headerHeight.value = headerH.clientHeight;
    }
    const slides = document.querySelectorAll('.story-slide');
    const lastSlide = slides[slides.length - 1] as HTMLElement;
    if (lastSlide) {
        lastSlideHeight.value = lastSlide.offsetHeight;
    }
}

// =========================================
// Component exposes
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

@media screen and (min-width: 641px) {
    .mobile-menu {
        display: none !important;
    }
}
</style>
