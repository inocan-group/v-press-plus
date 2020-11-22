import { Debug } from "./debug";

let debug = Debug("v-press-plus:calcTemplateBlock");

/**
 * Identifies the start and end line numbers for a `<template> ... </template>` block
 */
export function calcTemplateBlock(
  content: string,
  openTag: string,
  startLine: number
): [start: number, end: number] {
  const lines = content.split("\n");
  const start = lines.findIndex((l) => l.includes(openTag)) + startLine + 1;
  const end = lines.slice(start - startLine).findIndex((l) => l.includes("</template")) + start + 1;
  debug(`Evaluating template block: `, {
    lines: `${startLine} to ${startLine + lines.length}`,
    openTag,
    start,
    end,
  });
  return [start, end];
}
