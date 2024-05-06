import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/* 
'eslint:recommended',
'plugin:react/recommended',
'plugin:react/jsx-runtime',
'plugin:@typescript-eslint/eslint-recommended',
'plugin:@typescript-eslint/recommended',
'plugin:sonarjs/recommended',
'plugin:prettier/recommended',
'plugin:storybook/recommended', 
*/

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    ignores: ['dist', '.husky', '.gitlab', '.vscode', 'node_modules', '.json'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
