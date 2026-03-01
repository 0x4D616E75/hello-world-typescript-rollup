import typescript from "@rollup/plugin-typescript";
import { readFileSync, readdirSync } from "node:fs";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const externals = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
]);
const srcDir = new URL("./src/", import.meta.url);
const rootDir = fileURLToPath(new URL(".", import.meta.url));

function collectSpecEntries(dirUrl, entries = {}) {
  for (const entry of readdirSync(dirUrl, { withFileTypes: true })) {
    const entryUrl = new URL(
      `${entry.name}${entry.isDirectory() ? "/" : ""}`,
      dirUrl,
    );
    if (entry.isDirectory()) {
      collectSpecEntries(entryUrl, entries);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".spec.ts")) {
      const filePath = fileURLToPath(entryUrl);
      const relPath = relative(rootDir, filePath);
      const chunkName = relPath.replace(/^src\//, "").replace(/\.ts$/, "");
      entries[chunkName] = `./${relPath}`;
    }
  }

  return entries;
}

export default {
  input: collectSpecEntries(srcDir),
  external: (id) => id.startsWith("node:") || externals.has(id),
  plugins: [typescript()],
  output: [
    {
      dir: "./tests",
      format: "cjs",
      sourcemap: true,
    },
  ],
};
