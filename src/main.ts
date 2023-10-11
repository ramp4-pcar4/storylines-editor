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
import 'vue-final-modal/dist/style.css';

import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';

import HighchartsVue from 'highcharts-vue';
import Message from 'vue-m-message';
import 'vue-m-message/dist/style.css';

import StorylinesViewer from 'ramp-storylines';
import 'ramp-storylines/dist/storylines-viewer.css';

const app = createApp(App);

app.use(router)
    .use(i18n)
    .use(VueTippy, {
        directive: 'tippy',
        component: 'tippy'
    })
    .use(HighchartsVue)
    .use(Message)
    .use(StorylinesViewer)
    .use(VueMarkdownEditor)
    .use(vfm);

app.mount('#app');
