import { Vue } from 'vue-class-component';

// register router hooks
Vue.registerHooks(['beforeRouterEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);
