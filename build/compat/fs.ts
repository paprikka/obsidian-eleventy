// Deno compatibility layer for Node.js fs.promises
export const promises = {
  readFile: async (path: string | URL, options?: string | { encoding?: string; flag?: string }): Promise<string> => {
    if (typeof options === 'string') {
      const decoder = new TextDecoder(options);
      const data = await Deno.readFile(path);
      return decoder.decode(data);
    }
    const decoder = new TextDecoder(options?.encoding);
    const data = await Deno.readFile(path);
    return decoder.decode(data);
  },

  writeFile: async (path: string | URL, data: string | Uint8Array, options?: string | { encoding?: string; flag?: string }): Promise<void> => {
    if (typeof data === 'string') {
      const encoder = new TextEncoder();
      await Deno.writeFile(path, encoder.encode(data));
    } else {
      await Deno.writeFile(path, data);
    }
  },

  mkdir: async (path: string | URL, options?: { recursive?: boolean }): Promise<void> => {
    await Deno.mkdir(path, { recursive: options?.recursive });
  },

  copyFile: async (src: string | URL, dest: string | URL): Promise<void> => {
    await Deno.copyFile(src, dest);
  }
}; 