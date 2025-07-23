import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import vueEslintParser from 'vue-eslint-parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 2020,
                sourceType: 'module',
                extraFileExtensions: ['.vue']
            },
            globals: {
                RAMP: 'readonly'
            }
        },
        plugins: {
            vue: eslintPluginVue,
            '@typescript-eslint': typescriptEslint,
            prettier: eslintPluginPrettier
        },
        rules: {
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-this-alias': 'off'
        }
    },
    prettierConfig
];
