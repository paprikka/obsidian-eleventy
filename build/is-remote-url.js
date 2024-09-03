export const isRemoteUrl = (url) => {
  return url.startsWith("http://") || url.startsWith("https://");
};
