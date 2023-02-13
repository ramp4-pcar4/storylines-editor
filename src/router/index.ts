import Vue from 'vue';
import StoryV from '@/components/story/story.vue';
import LandingV from '@/components/editor/landing.vue';
import EditorV from '@/components/editor/editor.vue';
import Router, { Route } from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: StoryV
    },
    {
        path: '/:lang/editor',
        name: 'home',
        component: LandingV
    },
    {
        path: '/:lang/editor-metadata',
        name: 'metadata',
        component: EditorV,
        props: true
    },
    {
        path: '/:lang/editor/:uid',
        name: 'editor',
        component: EditorV
    },
    {
        path: '/:uid',
        component: StoryV
    },
    {
        path: '/:lang/:uid',
        component: StoryV
    }
];

export default new Router({
    routes: routes,
    // mode: 'history', // TODO: uncomment to change to history mode for nicer URLs (eliminating middle hash) see #100
    scrollBehavior: function (to: Route) {
        if (to.hash) {
            return {
                selector: decodeURIComponent(to.hash),
                behavior: 'smooth'
            };
        }
    }
});
