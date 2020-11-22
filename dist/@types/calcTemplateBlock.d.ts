/**
 * Identifies the start and end line numbers for a `<template> ... </template>` block
 */
export declare function calcTemplateBlock(content: string, openTag: string, startLine: number): [start: number, end: number];
