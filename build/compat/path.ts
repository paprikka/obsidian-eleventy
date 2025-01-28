export const join = (...paths: string[]): string => {
  return paths.join('/').replace(/\/+/g, '/');
};

export const relative = (from: string, to: string): string => {
  const fromParts = from.split('/').filter(Boolean);
  const toParts = to.split('/').filter(Boolean);

  let commonParts = 0;
  for (let i = 0; i < Math.min(fromParts.length, toParts.length); i++) {
    if (fromParts[i] !== toParts[i]) break;
    commonParts++;
  }

  const upCount = fromParts.length - commonParts;
  const relativeParts = [...Array(upCount).fill('..'), ...toParts.slice(commonParts)];
  return relativeParts.join('/') || '.';
};

export const dirname = (path: string): string => {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/') || '.';
};

export const basename = (path: string): string => {
  const parts = path.split('/');
  return parts[parts.length - 1] || '';
}; 