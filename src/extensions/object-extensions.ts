Object.prototype.sanitize = async function (
  callback: (
    entry: [string, any],
    index: number,
    entries: [string, any][],
  ) => Promise<[string, string] | undefined>,
): Promise<{ [key: string]: string }> {
  const entries = Object.entries(this as { [key: string]: any });
  const sanitizedEntries: [string, any][] = [];

  if (typeof callback === 'function') {
    for (const [index, [key, value]] of entries.entries()) {
      const newValue = await callback([key, value], index, entries); // 这里的 this 可以直接使用
      if (newValue !== undefined) {
        sanitizedEntries.push(newValue);
      }
    }
  }

  // 合并原始条目和新条目，避免重复键
  return Object.fromEntries([
    ...sanitizedEntries,
    ...entries.filter(
      ([key]) => !sanitizedEntries.some(([newKey]) => newKey === key),
    ),
  ]);
};
