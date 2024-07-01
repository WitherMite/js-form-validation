import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      sourceType: "module",
    },
  },
  {
    files: ["webpack.*.*"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
      },
      sourceType: "commonjs",
    },
  },
  {
    ignores: ["dist/"],
  },
];
