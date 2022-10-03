import './router/componentHooks';
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import './style.css';

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

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    i18n,
    router
}).$mount('#app');
