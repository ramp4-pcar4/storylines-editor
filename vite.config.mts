import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dsv from '@rollup/plugin-dsv';
// import VitePluginI18n from './scripts/vite-plugin-i18n';
import path from 'path';

export default defineConfig({
    plugins: [vue(), dsv()],
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        target: 'esnext'
    },
    server: {
        open: '/#/en/editor'
    }
});
