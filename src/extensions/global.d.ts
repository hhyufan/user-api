declare global {
  interface Object {
    print(): this;
    sanitize(
      callback: (
        entry: [string, any],
        index: number,
        entries: [string, any][],
      ) => Promise<[string, any] | undefined>,
    ): Promise<{ [key: string]: string }>;
  }
}

// 这行代码确保这个文件被当作模块处理
export {};
