import { VuePapaParse } from 'vue-papa-parse';
import { RouteLocationNormalized } from 'vue-router';
import { Modals } from 'vue2-modal';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $papa: VuePapaParse;
        $route: RouteLocationNormalized;
        $modals: Modals;
    }
}
