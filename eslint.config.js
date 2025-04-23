// eslint.config.js
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const commonRules = {
    semi: ['error', 'always'],
    'no-duplicate-imports': 'error',
    'no-unused-vars': [
        'error',
        {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
        },
    ],
};

export default defineConfig([
    {
        name: 'nextjs-reference-js',
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...commonRules,
        },
    },
    {
        name: 'nextjs-reference-typescript',
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: globals.browser,
        },
        plugins: {
            '@next/next': nextPlugin,
            '@typescript-eslint': tseslintPlugin,
        },
        rules: {
            ...tseslintPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...commonRules,
            // Disable base rule in favor of TS rule
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/strict-boolean-expressions': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',

            eqeqeq: ['error', 'always'],
            'no-console': 'warn',
            'object-shorthand': ['error', 'always'],
            'prefer-const': 'error',
            'no-var': 'error',
            'sort-imports': [
                'warn',
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                },
            ],
        },
    },
    {
        files: ['eslint.config.js'],
        rules: {
            quotes: 'off',
        },
    },
    {
        ignores: [
            'build/**/*',
            'node_modules/**/*',
            'dist/**/*',
            'out/**/*',
            'coverage/**/*',
            'next.config.js',
            '.next/**/*',
        ],
    },
]);
