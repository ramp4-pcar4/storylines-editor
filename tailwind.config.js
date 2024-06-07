const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, '$1')
        .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

module.exports = {
    purge: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/ramp-storylines_demo-scenarios-pcar/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/ramp-config-editor_editeur-config-pcar/**/*.{vue,js,ts,jsx,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                // full-screen height minus the sticky top header
                story: 'calc(100vh - 4rem)'
            },
            flex: {
                2: '2 2 0%'
            },
            maxHeight:{
                '60vh': '60vh'
            },
            maxWidth: {
                '8xl': '90rem',
                '9xl': '110rem'
            },
            colors: {
                'accent-blue': '#001A49',
                'accent-turquoise': '#00D2D3',
                'accent-orange': '#FF9F43'
            },
            typography: {
                // remove default margin from images to allow for better customization through the story config
                DEFAULT: {
                    css: {
                        img: ['disabled'],
                        'img:not(.story-graphic)': {
                            marginTop: em(32, 16),
                            marginBottom: em(32, 16)
                        },
                        a: {
                            '&:link': {
                                color: 'blue'
                            },

                            '&:visited': {
                                color: 'purple'
                            },

                            '&:hover': {
                                color: 'purple'
                            },

                            '&:active': {
                                color: 'blue'
                            }
                        }
                    }
                },
                sm: {
                    css: {
                        img: ['disabled'],
                        'img:not(.story-graphic)': {
                            marginTop: em(24, 14),
                            marginBottom: em(24, 14)
                        },
                        a: {
                            '&:link': {
                                color: 'blue'
                            },

                            '&:visited': {
                                color: 'purple'
                            },

                            '&:hover': {
                                color: 'purple'
                            },

                            '&:active': {
                                color: 'blue'
                            }
                        }
                    }
                },
                lg: {
                    css: {
                        img: ['disabled'],
                        'img:not(.story-graphic)': {
                            marginTop: em(32, 18),
                            marginBottom: em(32, 18)
                        },
                        a: {
                            '&:link': {
                                color: 'blue'
                            },

                            '&:visited': {
                                color: 'purple'
                            },

                            '&:hover': {
                                color: 'purple'
                            },

                            '&:active': {
                                color: 'blue'
                            }
                        }
                    }
                },
                xl: {
                    css: {
                        img: ['disabled'],
                        'img:not(.story-graphic)': {
                            marginTop: em(40, 20),
                            marginBottom: em(40, 20)
                        },
                        a: {
                            '&:link': {
                                color: 'blue'
                            },

                            '&:visited': {
                                color: 'purple'
                            },

                            '&:hover': {
                                color: 'purple'
                            },

                            '&:active': {
                                color: 'blue'
                            }
                        }
                    }
                },
                '2xl': {
                    css: {
                        img: ['disabled'],
                        'img:not(.story-graphic)': {
                            marginTop: em(48, 24),
                            marginBottom: em(48, 24)
                        },
                        a: {
                            '&:link': {
                                color: 'blue'
                            },

                            '&:visited': {
                                color: 'purple'
                            },

                            '&:hover': {
                                color: 'purple'
                            },

                            '&:active': {
                                color: 'blue'
                            }
                        }
                    }
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography')]
};
