import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dsv from '@rollup/plugin-dsv';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteWrappedCssPlugin from './vite-plugin-wrapped-css';

export default defineConfig({
    plugins: [
        vue(),
        dsv(),
        viteWrappedCssPlugin(),
        viteStaticCopy({
            targets: [
                { src: 'scripts/*', dest: './scripts' },
                { src: 'help', dest: './' }
            ]
        })
    ],
    define: {
        'process.env': process.env
    },
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: '/index.html',
                en: '/index-ca-en.html',
                fr: '/index-ca-fr.html'
            }
        },
        target: 'esnext'
    },
    server: {
        open: '/'
    }
});
