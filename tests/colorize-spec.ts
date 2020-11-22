import { suite } from 'uvu';
// import * as assert from 'uvu/assert';
// import { join } from 'path';
import { color, italicize, underline, strikethrough, format } from '../src/colorize';

const t = suite('colorize');

t('foreground', () => {
  console.log('starting ' + color.red('testing', c => c.green) + ' and then back');
  console.log(`${color.brightRed('hello')}:${color.red('there')}`);

  console.log(
    `italicize ${italicize('this')} but not after; ${underline('underlined')}, ${strikethrough(
      'strikethrough',
    )}, and then back`,
  );

  const foo = format('foo').withColor(fg => fg.green);
});

t.run();
