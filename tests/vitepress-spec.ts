import { existsSync } from 'fs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { join } from 'path';

const t = suite('vitepress plugin');

const esModule = join(process.cwd(), './dist/vitepress/index.js');

t('entry points available', () => {
  assert.ok(existsSync(esModule));
});

t('module entry point exposes "htmlBlock" on root import', async () => {
  const root = await import(esModule);
  assert.ok(root.htmlBlock);
  assert.type(root.htmlBlock, 'function');
  assert.type(root.htmlBlock(), 'function');
});

t('module entry point exposes "markdown" on root import', async () => {
  const root = await import(esModule);
  assert.ok(root.markdown);
  assert.type(root.markdown, 'object');
  assert.type(root.markdown.config, 'function');
});

t.run();
