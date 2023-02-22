import './router/componentHooks';
import Vue from 'vue';
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
Vue.use(VueMarkdownEditor);

import { i18n } from './lang';
import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

import HighchartsVue from 'highcharts-vue';
Vue.use(HighchartsVue);

import VuePapaParse from 'vue-papa-parse';
Vue.use(VuePapaParse);

import VueProgressiveImage from 'vue-progressive-image';
Vue.use(VueProgressiveImage);

import VueFullScreen from 'vue-fullscreen';
Vue.use(VueFullScreen);

// @ts-expect-error: module does not have TS support :(
import VueModal from 'vue2-modal';
Vue.use(VueModal);

import Message from 'vue-m-message';
import 'vue-m-message/dist/index.css';
Vue.use(Message);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    i18n,
    router
}).$mount('#app');
