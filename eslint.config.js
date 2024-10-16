import js from "@eslint/js";
import parsel from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
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
      typescript
    },
  }
];