import { RouteLocationNormalized } from 'vue-router';
import { Pinia } from 'pinia';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $route: RouteLocationNormalized;
        $pinia: Pinia;
    }
}
