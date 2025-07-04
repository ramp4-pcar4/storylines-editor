import { RouteLocationNormalized, Router } from 'vue-router';
import { Pinia } from 'pinia';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $route: RouteLocationNormalized;
        $router: Router;
        $pinia: Pinia;
        $t: typeof import('vue-i18n')['t'];
    }
}
