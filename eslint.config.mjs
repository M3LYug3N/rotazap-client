// eslint.config.mjs
import nextPluginRaw from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import boundaries from "eslint-plugin-boundaries";
import reactHooks from "eslint-plugin-react-hooks";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// normalize default export
const def = m => (m && m.default) || m;

// безопасная загрузка ESM/CJS плагина
function resolveModule(name) {
  try {
    return import.meta.resolve(name); // URL
  } catch {
    return require.resolve(name); // fs path
  }
}
async function tryLoad(name) {
  try {
    const spec = resolveModule(name);
    const href = spec.startsWith("file:") ? spec : pathToFileURL(spec).href;
    const mod = await import(href);
    return def(mod);
  } catch {
    return null;
  }
}

// jsx-a11y делаем опциональным
const jsxA11y = await tryLoad("eslint-plugin-jsx-a11y");
const nextPlugin = def(nextPluginRaw);

// тяжёлые импорты
let heavyImports = [];
try {
  heavyImports = JSON.parse(
    fs.readFileSync("./.eslint-heavy-imports.json", "utf-8")
  );
} catch {
  console.warn(
    "[eslint] Внимание: не найден .eslint-heavy-imports.json — запусти `bun run check:heavy`"
  );
}

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ["node_modules/", ".next/", "dist/", "coverage/"] },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
        // при необходимости type-aware правила:
        // project: ["./tsconfig.json"],
        // tsconfigRootDir: __dirname,
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier,
      react: reactPlugin,
      "react-hooks": reactHooks,
      ...(jsxA11y ? { "jsx-a11y": jsxA11y } : {}), // ← подключаем только если есть
      boundaries,
      "@next/next": nextPlugin
    },
    settings: {
      react: { version: "detect" },
      "boundaries/include": ["app/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "app/components/**/*",
            "app/data/**/*",
            "app/store/**/*",
            "app/hooks/**/*",
            "app/libs/**/*",
            "app/server/**/*",
            "app/styles/**/*",
            "app/api/**/*",
            "app/config/**/*",
            "app/utils/**/*"
          ]
        },
        { mode: "full", type: "common", pattern: ["app/common/**/*"] },
        {
          mode: "full",
          type: "routes",
          pattern: [
            "app/*/page.tsx",
            "app/*/layout.tsx",
            "app/*/error.tsx",
            "app/*/loading.tsx",
            "app/*/head.tsx",
            "app/*/*/page.tsx",
            "app/*/*/layout.tsx",
            "app/*/*/error.tsx",
            "app/*/*/loading.tsx",
            "app/*/*/head.tsx"
          ]
        },
        {
          mode: "full",
          type: "root",
          pattern: ["app/*", "app/*/*", "app/*/*/*"]
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["app/features/*/**"]
        },
        { mode: "full", type: "neverImport", pattern: ["app/tasks/**/*"] },
        {
          mode: "full",
          type: "ignored",
          pattern: ["app/tmp/**/*", "app/tests/**/*", "app/devtools/**/*"]
        },
        { mode: "full", type: "group", pattern: ["app/\\(main\\)/**/*"] }
      ],
      "boundaries/rules": [
        { from: "group", allow: ["feature", "shared", "common"] }
      ]
    },
    rules: {
      // Next.js (без eslint-config-next)
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/google-font-display": "off",
      "@next/next/no-img-element": "warn",
      "@next/next/no-page-custom-font": "off",

      // React / Hooks
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
      "react/jsx-indent": ["error", 2, { indentLogicalExpressions: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TS / стиль
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "comma-spacing": ["error", { before: false, after: true }],
      "arrow-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
      "keyword-spacing": ["error", { before: true, after: true }],

      // Boundaries
      "boundaries/no-unknown": "error",
      "boundaries/no-unknown-files": "error",

      // Prettier-как-правило
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // тяжёлые импорты
      "no-restricted-imports": ["warn", { paths: heavyImports }]
    }
  }
];
