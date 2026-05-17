import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stripTypeScriptTypes } from "node:module";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, "..");
const distDir = join(projectRoot, "dist");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

copyFileSync(join(projectRoot, "index.html"), join(distDir, "index.html"));
copyFileSync(join(projectRoot, "src", "styles.css"), join(distDir, "styles.css"));

const input = readFileSync(join(projectRoot, "src", "main.ts"), "utf8");
const output = stripTypeScriptTypes(input, {
  sourceUrl: "src/main.ts",
});

writeFileSync(join(distDir, "main.js"), output, "utf8");
