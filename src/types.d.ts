import { RouteLocationNormalized, Router } from 'vue-router';
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
        $router: Router;
        $pinia: Pinia;
        $t: (typeof import('vue-i18n'))['t'];
        $vfm: Vfm;
        $i18n: import('vue-1i8n')['I18n'];
    }
}
