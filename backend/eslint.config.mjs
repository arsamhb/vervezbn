import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Ignoring any type errors
    '@typescript-eslint/no-unused-vars': 'off', // Ignoring unused variables
    '@typescript-eslint/no-var-requires': 'off', // Ignoring require statements not part of import
    'prefer-const': 'off', // Ignoring const usage preference
  }
});
