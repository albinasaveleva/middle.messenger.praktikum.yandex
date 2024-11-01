import parsel from "@typescript-eslint/parser";
import eslintPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
    ignores: [
      "/node_modules",
      "/github",
      "/dist"
    ],
    languageOptions: {
      parser: parsel
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
  }
];
