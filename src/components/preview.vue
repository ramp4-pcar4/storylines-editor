<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
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
                    <span class="inline-block">{{ lang === 'en' ? $t('editor.lang.fr') : $t('editor.lang.en') }}</span>
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
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { ConfigFileStructure, StoryRampConfig } from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { AxiosError } from 'axios';

import JSZip from 'jszip';
import axios from 'axios';

@Options({
    components: {
        spinner: VueSpinnerOval
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
    configs: {
        [key: string]: StoryRampConfig | undefined;
    } = { en: undefined, fr: undefined };

    created(): void {
        this.uid = this.$route.params.uid as string;
        this.lang = this.$route.params.lang as string;

        // if config file structure passed from session (from main editor page)
        if (window.props) {
            this.config = JSON.parse(JSON.stringify(window.props.configs[this.lang]));
            this.configs = window.props.configs;
            this.configFileStructure = window.props.configFileStructure;
            this.loadStatus = 'loaded';
        } else {
            this.savedProduct = true;
            // attempt to fetch saved config file from the server (TODO: setup as express route?)
            fetch(this.apiUrl + `/retrieve/${this.uid}`).then((res: Response) => {
                if (res.status === 404) {
                    console.error(`There does not exist a saved product with UID ${this.uid}.`);
                    // redirect to canada.ca 404 page on invalid URL params
                    // window.location.href = 'https://www.canada.ca/errors/404.html';
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
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

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
        line-height: 1.5;
        border-bottom: 0px;
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
