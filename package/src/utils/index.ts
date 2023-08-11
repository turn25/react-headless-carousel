export const removeKeys = <T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K>
) => {
  if (Array.isArray(obj)) return obj.map((item) => removeKeys(item, keys));

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((previousValue, key) => {
      return keys.includes(key as K)
        ? previousValue
        : { ...previousValue, [key]: removeKeys(obj[key], keys) };
    }, {});
  }

  return obj;
};
