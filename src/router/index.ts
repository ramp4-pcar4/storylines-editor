import LandingV from '@/components/editor/landing.vue';
import MetadataEditorV from '@/components/editor/metadata-editor.vue';
import StoryPreviewV from '@/components/editor/preview.vue';
import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';

const routes = [
    {
        path: '/:lang/editor',
        name: 'home',
        component: LandingV,
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor/:uid',
        redirect: '/:lang/editor-metadata/:uid'
    },
    {
        path: '/:lang/editor-metadata',
        name: 'metadata',
        component: MetadataEditorV,
        props: true,
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor-metadata/:uid',
        component: MetadataEditorV,
        props: true,
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor-main/:uid',
        name: 'editor',
        component: MetadataEditorV,
        props: true,
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor-preview',
        component: StoryPreviewV,
        name: 'preview',
        props: true,
        meta: { title: 'story.window.title' }
    },
    {
        path: '/:lang/editor-preview/:uid',
        component: StoryPreviewV,
        meta: { title: 'story.window.title' }
    }
];

const router = createRouter({
    routes: routes,
    // TODO: change to history mode for nicer URLs (eliminating middle hash) see #100
    history: createWebHashHistory(),
    scrollBehavior: function (to: RouteLocationNormalized) {
        if (to.hash) {
            return {
                selector: decodeURIComponent(to.hash),
                behavior: 'smooth'
            };
        }
    }
});

export default router;
