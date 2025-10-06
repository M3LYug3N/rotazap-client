import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../.eslint-heavy-imports.json");
const sizeThreshold = 20 * 1024; // 20 KB

const scanDirs = [
  path.resolve(__dirname, "../app/components"),
  path.resolve(__dirname, "../app/features")
];

function normalizeToAlias(filePath) {
  const relativePath = path.relative(path.resolve(__dirname, "../"), filePath);
  return `@/${relativePath.replace(/\\/g, "/").replace(/\.tsx$/, "")}`;
}

function findFiles(dir, collected = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, collected);
    } else if (entry.name.endsWith(".tsx")) {
      const stats = fs.statSync(fullPath);
      if (stats.size > sizeThreshold) {
        const aliasedPath = normalizeToAlias(fullPath);
        collected.push({
          name: aliasedPath,
          message: `Этот компонент >50KB — импортируй через dynamic()`
        });
        console.log(`✔ ${aliasedPath} — ${Math.round(stats.size / 1024)} KB`);
      } else {
        console.log(
          `· Skipped ${entry.name} — ${Math.round(stats.size / 1024)} KB`
        );
      }
    }
  }
  return collected;
}

// Сканируем все директории
const allHeavy = scanDirs.flatMap(dir => findFiles(dir));

fs.writeFileSync(outputPath, JSON.stringify(allHeavy, null, 2), "utf-8");
console.log(`\n🔍 Found ${allHeavy.length} heavy components.\n`);
