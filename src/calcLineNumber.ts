/**
 * Calculates the line number where the passed in _tag_ can be found.
 *
 * @param tag     the tag/string you are looking for
 * @param content the corpus of what you are looking through
 * @param start   the starting line number
 */
export function calcLineNumber(tag: string, content: string, start: number) {
  let done = false;
  const block = content.split("\n").reduce((acc: string[], i) => {
    if (!i.includes(tag) && !done) acc.push(i);
    else done = true;

    return acc;
  }, []);
  return start + block.length + 1;
}
