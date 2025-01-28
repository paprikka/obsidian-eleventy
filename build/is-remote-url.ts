export const isRemoteUrl = (url: string): boolean => {
  return url.startsWith("http://") || url.startsWith("https://");
};
