import { RouteLocationNormalized } from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $route: RouteLocationNormalized;
    }
}
