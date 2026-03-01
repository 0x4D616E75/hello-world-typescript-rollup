import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { rollup } from 'rollup';

async function run() {
  const configArg = process.argv[2];
  if (!configArg) {
    throw new Error('Missing Rollup config path argument');
  }

  const configPath = resolve(process.cwd(), configArg);
  const loaded = await import(pathToFileURL(configPath).href);
  const configs = Array.isArray(loaded.default) ? loaded.default : [loaded.default];

  for (const config of configs) {
    const bundle = await rollup(config);
    const outputs = Array.isArray(config.output) ? config.output : [config.output];

    for (const output of outputs) {
      await bundle.write(output);
    }

    await bundle.close();
  }
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
