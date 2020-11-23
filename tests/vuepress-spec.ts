import { existsSync } from 'fs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { join } from 'path';

const t = suite('vuepress plugin');

const main = join(process.cwd(), './dist/vuepress/index.js');
const mainMin = join(process.cwd(), './dist/vuepress/index.min.js');

t('entry points are available', () => {
  assert.ok(existsSync(main));
  assert.ok(existsSync(mainMin));
});

t('main entry point is correct plugin function', () => {
  const plugin = require(main);
  assert.type(plugin, 'function', 'the plugin should be exposed as a function');
  assert.type(plugin(), 'object', `calling the plugin returns an object`);
  assert.equal(plugin().name, 'v-press-plus');
});

t.run();
