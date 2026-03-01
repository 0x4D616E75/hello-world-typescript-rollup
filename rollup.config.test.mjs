import multiInput from "rollup-plugin-multi-input";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const externals = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
]);

export default {
  input: "./src/**/*.spec.ts",
  external: (id) => id.startsWith("node:") || externals.has(id),
  plugins: [multiInput(), typescript()],
  output: [
    {
      dir: "./tests",
      format: "cjs",
      sourcemap: true,
    },
  ],
};
