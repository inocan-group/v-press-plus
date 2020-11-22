import { color } from './colorize';

export function Debug(offset: string) {
  return (...args: any[]) => {
    const [type, subType] = [
      color.red(offset.split(':').slice(0, 1).pop()),
      color.magenta(offset.split(':').slice(1).join(':')),
    ];
    if (process.env.DEBUG?.includes('v-press-plus')) {
      console.error(`${type}${color.yellow(':')}${subType}${color.yellow('->')} `, ...args);
    }
  };
}
