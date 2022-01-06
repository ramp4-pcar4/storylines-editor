declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'vue/types/vue' {
    import { VuePapaParse } from 'vue-papa-parse';
    interface Vue {
        $papa: VuePapaParse;
    }
}

declare module 'vue-scrollama';
declare module 'vue-tippy';
declare module 'vue-progressive-image';
declare module 'hooper';
declare module 'vue-papa-parse';
