import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/", "dist/", "build/", "data/postgres/"],  // Agora usa "ignores"
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Sem JSX ou TSX
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
