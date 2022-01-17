import { VuePapaParse } from 'vue-papa-parse';
import { Route } from 'vue-router';

declare module 'vue/types/vue' {
    interface Vue {
        $papa: VuePapaParse;
        $route: Route;
    }
}
