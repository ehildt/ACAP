import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      sonarjs,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['dist', '.husky', '.gitlab', '.vscode', 'node_modules', '.json'],
    rules: {
      'prettier/prettier': ['warn', { usePrettierrc: true }],
      'sort-imports': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
    },
  },
];
