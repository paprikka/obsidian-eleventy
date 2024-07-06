import directoryTree from "directory-tree";
import path from "path";

/**
 * Creates a file index grouped by file name from a FileTree object.
 * @param {Object} fileTree - The FileTree object to process.
 * @returns {Object} An index object with file names as keys and arrays of file paths as values.
 */
function createFileIndex(fileTree) {
  // Initialize the index object
  const index = {};

  // Helper function to recursively traverse the FileTree
  function traverse(node) {
    // If the node has children, it's a folder; recurse through its children
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    } else {
      // If the node doesn't have children, it's a file; add it to the index
      if (!index[node.name]) {
        index[node.name] = [];
      }
      index[node.name].push(node.path);
    }
  }

  // Start traversing from the root of the FileTree
  traverse(fileTree);

  return index;
}

export const getResourceIndex = (root) => {
  const fullTree = directoryTree(root);
  return createFileIndex(fullTree);
};

const getRelativePath = (from, to) => path.relative(path.dirname(from), to);

export const linkMatchesPath = (
  fromFileAbsolutePath,
  candidateAbsolutePath,
  linkText, // can be '.', absolute path or relative path
) => {
  // Handle special cases
  if (linkText === "." || linkText === "") {
    return fromFileAbsolutePath === candidateAbsolutePath;
  }

  // Check if linkText is an absolute path
  if (path.isAbsolute(linkText)) {
    return linkText === candidateAbsolutePath;
  }

  // Handle relative paths
  const fromDir = path.dirname(fromFileAbsolutePath);
  const resolvedPath = path.resolve(fromDir, linkText);
  return resolvedPath === candidateAbsolutePath;
};

const normalizeLink = (link, fallbackExt) => {
  const filename = link.split(/[#^]/)[0].trim();
  if (
    !fallbackExt ||
    filename.toLowerCase().endsWith(fallbackExt.toLowerCase())
  )
    return filename;
  return `${filename}${fallbackExt}`;
};

export const resolveLink = (from, link, resourceIndex, ext) => {
  const linkNormalised = normalizeLink(link, ext);
  const filename = path.basename(linkNormalised);
  const candidates = resourceIndex[filename];

  if (!candidates) {
    // console.log(`Missing file: ${linkNormalised}`);
    // console.table({ from, link, linkNormalised, ext });
    return null;
  }

  let result = null;

  if (candidates.length === 1) {
    const [candidate] = candidates;
    const relativePath = getRelativePath(from, candidate);
    return relativePath === "" ? "." : relativePath;
  }

  for (let candidate of candidates) {
    const isMatch = linkMatchesPath(from, candidate, linkNormalised);
    if (!isMatch) continue;

    const relativePath = getRelativePath(from, candidate);
    result = relativePath === "" ? "." : relativePath;
    break;
  }

  return result;
};

export const resourcePathToLink = (path) => path.replace(".md", "");
