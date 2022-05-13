export function getUniqueItems<T extends Record<string, any>>(
  items: T[],
  key: keyof T,
): Array<T> {
  const dedupe: Record<any, T> = {};

  items.forEach((item) => {
    if (dedupe[key]) return;
    dedupe[item[key]] = item;
  });

  return Object.values(dedupe);
}
