export default {
    env: {
    browser: true,
    es2021: true,
    },
    extends: [
    'eslint:recommended',
      'plugin:prettier/recommended', // Integra o Prettier
    ],
    parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    },
    rules: {
    'prettier/prettier': ['error', {
        semi: true,
        singleQuote: false,
        trailingComma: 'es5',
        tabWidth: 2,
        useTabs: false,
    }],
    },
};
