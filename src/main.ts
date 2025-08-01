import { createApp } from 'vue';
import App from './app.vue';
import { createPinia } from 'pinia';

import './router/componentHooks';
import router from './router';
import './style.css';
import './standard-components.css';
import { i18n } from './lang';

import 'ramp-pcar/dist/ramp.css';
import VueMarkdownEditor from './plugins/markdown-editor/index';

import { createVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css';
const vfm = createVfm();

import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';

import VuePapaParse from 'vue-papa-parse';
import HighchartsVue from 'highcharts-vue';
import Message from 'vue-m-message';
import 'vue-m-message/dist/style.css';

import ColorPicker from 'vue-accessible-color-picker';
import 'vue-accessible-color-picker/styles';

import StorylinesViewer from 'ramp-storylines_demo-scenarios-pcar';
import 'ramp-storylines_demo-scenarios-pcar/dist/style.css';

import HighchartsAccessibleConfigurationKit from 'highcharts-accessible-configuration-kit';
import 'highcharts-accessible-configuration-kit/dist/highcharts-accessible-configuration-kit.css';

import { FocusContainer, FocusItem, FocusList } from '@/directives/focus-list';
import { Truncate } from '@/directives/truncate/truncate';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(VueTippy, {
        directive: 'tippy',
        component: 'tippy'
    })
    .use(HighchartsAccessibleConfigurationKit)
    .use(HighchartsVue, { tagName: 'highchart' })
    .use(Message)
    .use(StorylinesViewer)
    .use(VueMarkdownEditor)
    .use(VuePapaParse)
    .use(ColorPicker)
    .use(vfm);

app.provide('$papa', app.config.globalProperties.$papa);

app.directive('focus-container', FocusContainer);
app.directive('focus-list', FocusList);
app.directive('focus-item', FocusItem);
app.directive('truncate', Truncate);
app.mount('#app');
