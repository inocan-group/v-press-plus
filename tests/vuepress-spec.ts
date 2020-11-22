import { existsSync } from 'fs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { join } from 'path';

const t = suite('vuepress plugin');

const main = join(process.cwd(), 'dist/cjs/index.js');
const mainMin = join(process.cwd(), 'dist/cjs/index.min.js');

t('entry points are available', () => {
  assert.ok(existsSync(main));
  assert.ok(existsSync(mainMin));
});

t('main entry point is correct plugin function', () => {
  const plugin = require(main);
  assert.type(plugin, 'function');
  assert.ok(plugin.toString().includes('(options'), 'options param seems to be missing');
  assert.ok(plugin.toString().includes('extendMarkdown: md'), 'extendMarkdown handler is missing');
});

t.run();
