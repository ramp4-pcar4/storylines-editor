import Vue from 'vue';
import StoryRampV from '@/components/story/story-ramp.vue';
import Router, { Route } from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: StoryRampV
    },
    {
        path: '/:uid',
        component: StoryRampV
    },
    {
        path: '/:lang/:uid',
        component: StoryRampV
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
