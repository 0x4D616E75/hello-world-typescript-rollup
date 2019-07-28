// rollup.config.js
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-typescript';

const packageJson = require('./package.json');

export default {
  input: './src/**/*.spec.ts',
  external: [
    Object.keys(packageJson.dependencies) || {},
    Object.keys(packageJson.devDependencies) || {}
  ],
  plugins: [
    multiInput(),
    typescript()
  ],
  output: [
    {
      dir: './tests',
      format: 'cjs',
      sourcemap: true
    }
  ]
}