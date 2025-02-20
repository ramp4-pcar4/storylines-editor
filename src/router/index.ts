import LandingV from '@/components/landing.vue';
import HomeV from '@/components/home.vue';
import MetadataEditorV from '@/components/metadata-editor.vue';
import StoryPreviewV from '@/components/preview.vue';
import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingV,
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor',
        name: 'home',
        component: HomeV,
        props: { sessionExpired: false },
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor',
        name: 'homeExpired',
        component: HomeV,
        props: { sessionExpired: true },
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor/:uid',
        redirect: (to: RouteLocationNormalized) => {
            return '/' + to.params.lang + '/editor-metadata/' + to.params.uid;
        }
    },
    {
        path: '/:lang/editor-metadata/:uid?',
        name: 'metadataExisting',
        component: MetadataEditorV,
        props: { editExisting: true },
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor-metadata',
        name: 'metadataNew',
        component: MetadataEditorV,
        props: { editExisting: false },
        meta: { title: 'editor.window.title' }
    },
    {
        path: '/:lang/editor-metadata/:uid',
        component: MetadataEditorV,
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
        path: '/:lang/editor-preview/:uid',
        component: StoryPreviewV,
        name: 'preview',
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
