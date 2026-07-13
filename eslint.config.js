import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'ios/**',
      'electron/**',
      'node_modules/**',
      'vite.config.ts',
      'capacitor.config.ts',
      'eslint.config.js',
      'scripts/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'eqeqeq': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'curly': ['error', 'multi'],
      'no-unreachable': 'error',
      'no-fallthrough': 'error',
      
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],

      'unicorn/prefer-ternary': 'error',

      'no-duplicate-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-empty': 'off',
      'no-useless-assignment': 'off',
    },
  }
);
