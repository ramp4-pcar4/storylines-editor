import { RouteLocationNormalized } from 'vue-router';
import { Pinia } from 'pinia';
import type { Vfm } from 'vue-final-modal';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $route: RouteLocationNormalized;
        $pinia: Pinia;
        $vfm: Vfm
    }
}
