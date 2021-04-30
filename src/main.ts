import Vue from 'vue';
import App from './app.vue';
import './style.css';

import ImageGraphicV from '@/components/image-graphic.vue';

Vue.config.productionTip = false;

Vue.component('ImageGraphicV', ImageGraphicV);

new Vue({
    render: (h) => h(App)
}).$mount('#app');
