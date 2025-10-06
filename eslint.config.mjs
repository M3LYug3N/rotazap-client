import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import path from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import fs from "fs";

// Для поддержки __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let heavyImports = [];

// Создаем FlatCompat для адаптации правил из eslintrc формата
const compat = new FlatCompat({
  baseDirectory: __dirname // Указываем базовую директорию
});

// Поиск тяжелых компонентов
try {
  heavyImports = JSON.parse(
    fs.readFileSync("./.eslint-heavy-imports.json", "utf-8")
  );
} catch (err) {
  console.warn(
    "[eslint] Внимание: не найден .eslint-heavy-imports.json — запусти `npm run check:heavy`"
  );
}

const eslintConfig = [
  {
    ignores: ["node_modules", "dist", ".next"] // Игнорируем ненужные директории
  },
  {
    // Линтинг всех JS/TS файлов
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier,
      boundaries,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    settings: {
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
        {
          mode: "full",
          type: "common",
          pattern: ["app/common/**/*"]
        },
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
        {
          mode: "full",
          type: "neverImport",
          pattern: ["app/tasks/**/*"]
        },
        {
          mode: "full",
          type: "ignored",
          pattern: ["app/tmp/**/*", "app/tests/**/*", "app/devtools/**/*"]
        },
        {
          mode: "full",
          type: "group",
          pattern: ["app/\\(main\\)/**/*"]
        }
      ],
      "boundaries/rules": [
        {
          from: "group",
          allow: ["feature", "shared", "common"]
        }
      ]
    },

    rules: {
      /* semi: ["error", "always"],
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true }
      ], */
      "prettier/prettier": ["error", { endOfLine: "auto" }], // Настройки Prettier
      "boundaries/no-unknown": ["error"], // Запрет на использование неизвестных элементов
      "boundaries/no-unknown-files": ["error"], // Запрет на использование неизвестных файлов
      "react/jsx-indent": ["error", 2, { indentLogicalExpressions: true }], // Отступы в JSX
      "react/self-closing-comp": ["error", { component: true, html: true }], // Закрывающие теги для компонентов
      "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }], // Пробелы перед закрывающим тегом в JSX
      "arrow-body-style": ["error", "as-needed"], // Стиль стрелочных функций
      "@typescript-eslint/no-unused-vars": "warn", // Предупреждение о неиспользуемых переменных
      "@typescript-eslint/no-explicit-any": "off", // Запрет использования any
      "comma-spacing": ["error", { before: false, after: true }], // Пробелы после запятой
      "arrow-spacing": ["error", { before: true, after: true }], // Пробелы вокруг стрелок
      "space-infix-ops": "error", // Пробелы вокруг операторов
      "keyword-spacing": ["error", { before: true, after: true }], // Пробелы вокруг ключевых слов
      "no-restricted-imports": [
        // Запрет на импорт из определенных модулей
        "warn",
        {
          paths: heavyImports
        }
      ]
    }
  },
  // Добавляем конфигурацию Next.js через FlatCompat
  ...compat.extends("next/core-web-vitals")
];

export default eslintConfig;
