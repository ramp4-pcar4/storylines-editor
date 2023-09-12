import { VuePapaParse } from 'vue-papa-parse';
import { RouteLocationNormalized } from 'vue-router';
import { MessageInstance } from 'vue-m-message';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $papa: VuePapaParse;
        $route: RouteLocationNormalized;
        $message: MessageInstance;
    }
}
