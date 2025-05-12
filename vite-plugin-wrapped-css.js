// Plugin to add additional css file wrapped in #app selector. Used to override WET styling applied to RESPECT instance
export default function viteWrappedCssPlugin() {
    return {
        name: 'vite-plugin-wrapped-css',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            // Find the main CSS file in the bundle
            const cssAssets = Object.keys(bundle).filter((key) => key.endsWith('.css'));

            for (const cssAsset of cssAssets) {
                if (cssAsset.startsWith('assets/main-') || cssAsset.startsWith('style') || cssAsset === 'index.css') {
                    const originalCss = bundle[cssAsset].source;
                    const fileName = cssAsset.replace('.css', '-wrapped.css');

                    // Create wrapped version by prefixing all selectors with #app
                    let wrappedCss = `#app {${originalCss}}`;

                    // Add the wrapped CSS as a new file in the bundle
                    this.emitFile({
                        type: 'asset',
                        fileName,
                        source: wrappedCss
                    });

                    // Find and modify HTML files to include the wrapped CSS
                    Object.keys(bundle)
                        .filter((key) => key.endsWith('.html'))
                        .forEach((htmlFile) => {
                            const html = bundle[htmlFile];
                            const newLink = `<link rel="stylesheet" crossorigin href="./${fileName}">`;
                            html.source = html.source.replace('</head>', `  ${newLink}\n  </head>`);
                        });
                }
            }
        }
    };
}
