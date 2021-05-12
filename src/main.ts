import Vue from 'vue';
import App from './app.vue';
import './style.css';

import VueSmoothScroll from 'vue2-smooth-scroll';
Vue.use(VueSmoothScroll);

import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

import ImageGraphicV from '@/components/image-graphic.vue';
Vue.component('ImageGraphicV', ImageGraphicV);

import MapGraphicV from '@/components/map-graphic.vue';
Vue.component('MapGraphicV', MapGraphicV);

import HooperGraphicV from '@/components/hooper-graphic.vue';
Vue.component('HooperGraphicV', HooperGraphicV);

import VueProgressiveImage from 'vue-progressive-image';
Vue.use(VueProgressiveImage);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App)
}).$mount('#app');
