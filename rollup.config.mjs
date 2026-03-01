import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const externals = new Set(Object.keys(packageJson.dependencies || {}));

export default {
  input: "./src/index.ts",
  external: (id) => id.startsWith("node:") || externals.has(id),
  plugins: [typescript(), terser()],
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
};
