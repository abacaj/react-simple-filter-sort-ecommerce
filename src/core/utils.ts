export function getUniqueValues<T, V>(items: V[], key: keyof V): Array<T> {
  const set: Set<T> = new Set();

  items.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v: T) => set.add(v));
    } else {
      set.add(value as unknown as T);
    }
  });

  return Array.from(set);
}
