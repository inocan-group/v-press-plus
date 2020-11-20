import { redBright, red } from "chalk";

export function Debug(offset: string) {
  return (...args: any[]) => {
    const [type, subType] = [
      redBright(offset.split(":").slice(0, 1).pop()),
      red(offset.split(":").slice(1).join(":")),
    ];
    console.error(`${type}:${subType} -> `, ...args);
  };
}
