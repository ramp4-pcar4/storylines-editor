const crypto = require('crypto');

/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
    crypto.createHash('md4');
} catch (e) {
    console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
    const origCreateHash = crypto.createHash;
    crypto.createHash = (alg, opts) => {
        return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
    };
}

const path = require('path');

module.exports = {
    pages: {
        index: {
            entry: './src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'RAMP Storylines'
        },
        indexCanadaEn: {
            entry: './src/main.ts',
            template: 'public/index-ca-en.html',
            filename: 'index-ca-en.html',
            title: 'RAMP Storylines'
        },
        indexCanadaFr: {
            entry: './src/main.ts',
            template: 'public/index-ca-fr.html',
            filename: 'index-ca-fr.html',
            title: 'Scenarios de PCAR'
        }
    },
    publicPath: '',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/')
            }
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule('lint')
            .test(/lang\.csv$/)
            .use('eslint')
            .loader('dsv-loader')
            .end();

        config.module
            .rule('html')
            .test(/(.)*.(html)$/)
            .use('html-loader')
            .loader('html-loader')
            .end();

        config.module
            .rule('cjs')
            .test(/\.cjs$/)
            .include.add(/node_modules/)
            .end()
            .use('babel-loader')
            .loader('babel-loader');
    }
};
