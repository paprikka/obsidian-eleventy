type AbsoluteUrlFn = (url: string) => string;

export const makeAbsoluteUrl = (rootUrl: string): AbsoluteUrlFn => {
  return function absoluteUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    try {
      const absoluteUrl = new URL(url, rootUrl).href;
      return absoluteUrl;
    } catch (error) {
      console.log(`[absolute-url] invalid URL: for ${url} and root ${rootUrl}`);
      throw error;
    }
  };
};
