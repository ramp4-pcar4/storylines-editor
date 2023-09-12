import { createApp } from 'vue';
import App from './app.vue';

import './router/componentHooks';
import router from './router';
import './style.css';
import { i18n } from './lang';

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

import { createVfm } from 'vue-final-modal';
const vfm = createVfm();

import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import HighchartsVue from 'highcharts-vue';
import VuePapaParse from 'vue-papa-parse';
import VueFullScreen from 'vue-fullscreen';
import Message from 'vue-m-message';
import 'vue-m-message/dist/style.css';

// TODO: import storylines viewer as plugin once a Vue 3 version is published

const app = createApp(App);

app.use(router)
    .use(i18n)
    .use(VueTippy, {
        directive: 'tippy',
        component: 'tippy'
    })
    .use(HighchartsVue)
    .use(Message)
    .use(VueFullScreen)
    .use(VueMarkdownEditor)
    .use(vfm)
    .use(VuePapaParse);

app.mount('#app');
