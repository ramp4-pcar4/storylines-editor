module.exports = {
    root: true,
    env: {
        node: true,
        es2022: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-this-alias': 'off'
    },
    globals: {
        RAMP: 'readonly',
        highed: 'readonly'
    }
};
