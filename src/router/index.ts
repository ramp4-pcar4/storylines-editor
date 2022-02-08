import Vue from 'vue';
import StoryV from '@/components/story/story.vue';
import Router, { Route } from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: StoryV
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
                selector: to.hash,
                behavior: 'smooth'
            };
        }
    }
});
