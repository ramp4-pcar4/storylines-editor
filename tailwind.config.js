module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            maxWidth: {
                '8xl': '90rem',
                '9xl': '110rem'
            },
            colors: {
                'accent-blue': '#001A49',
                'accent-turquoise': '#00D2D3',
                'accent-orange': '#FF9F43'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography')]
};
