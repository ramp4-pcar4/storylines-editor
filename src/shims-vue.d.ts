declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*lang.csv' {
    const content: { key: string; enValue: string; enValid: string; frValue: string; frValid: string }[];
    export default content;
}

declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/lang/en-US';
declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module 'ramp-storylines_demo-scenarios-pcar';
declare module 'ramp-config-editor_editeur-config-pcar';
declare module 'vue-m-message';
declare module 'vue3-json-editor';
declare module 'highcharts-vue';
declare module 'vue-tippy';
declare module 'vue-accessible-color-picker';
