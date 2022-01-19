import './router/componentHooks';
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import './style.css';

import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

import HighchartsVue from 'highcharts-vue';
Vue.use(HighchartsVue);

import VuePapaParse from 'vue-papa-parse';
Vue.use(VuePapaParse);

import VueProgressiveImage from 'vue-progressive-image';
Vue.use(VueProgressiveImage);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router
}).$mount('#app');
