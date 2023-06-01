import { VuePapaParse } from 'vue-papa-parse';
import { Route } from 'vue-router';
import { Modals } from 'vue2-modal';

declare module 'vue/types/vue' {
    interface Vue {
        $papa: VuePapaParse;
        $route: Route;
        $modals: Modals;
    }
}
