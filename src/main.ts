import './router/componentHooks';
import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import './style.css';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import hljs from 'highlight.js';

VueMarkdownEditor.lang.use('en-US', enUS);
VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs
});

import { i18n } from './lang';
import VueTippy from 'vue-tippy';
import HighchartsVue from 'highcharts-vue';
import VuePapaParse from 'vue-papa-parse';
import VueFullScreen from 'vue-fullscreen';
// @ts-expect-error: module does not have TS support :(
import VueModal from 'vue2-modal';

// TODO: resolve/replace this dependency
// import Message from 'vue-m-message';
// import 'vue-m-message/dist/index.css';

// TODO: import storylines viewer as plugin once a Vue 3 version is published

const app = createApp(App);

app.use(router)
    .use(i18n)
    .use(VueTippy, {
        directive: 'tippy',
        component: 'tippy'
    })
    .use(VueMarkdownEditor)
    .use(HighchartsVue)
    .use(VuePapaParse)
    .use(VueFullScreen)
    .use(VueModal);

app.mount('#app');
