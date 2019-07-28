// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser"

export default {
  input: './src/index.ts',
  external: Object.keys(require('./package.json').dependencies) || {},
  plugins: [
    typescript(),
    terser()
  ],
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      sourcemap: true
    }
  ]
}