import Vue from 'vue';
import StoryRampV from '@/components/story/story-ramp.vue';
import Router from 'vue-router';

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
    routes: routes
});
