export function exclude<T extends object, K extends keyof T>(
  obj: T,
  mutation = true,
  ...keys: K[]
): typeof mutation extends true ? T : Omit<T, K> {
  const deleteKeys = (obj: T, keyList: K[]) => keyList.forEach((k) => delete obj[k]);
  if (mutation) {
    deleteKeys(obj, keys);
    return obj;
  } else {
    const copy = { ...obj };
    deleteKeys(copy, keys);
    return copy;
  }
}
