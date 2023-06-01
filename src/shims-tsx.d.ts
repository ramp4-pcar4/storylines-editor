import Vue, { VNode } from 'vue';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }

    interface Window {
        config: string;
        configname: string;
        props: any;
    }

    const RAMP: any;

    const highed: {
        ready(callback: () => void): void;
        ModalEditor: any;
    };
}
