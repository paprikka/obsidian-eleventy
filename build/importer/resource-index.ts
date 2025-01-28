import directoryTree from "directory-tree";
import path from "path";

type FileTree = {
  name: string;
  path: string;
  children?: FileTree[];
};

export type ResourceIndex = {
  [key: string]: string[];
};

/**
 * Creates a file index grouped by file name from a FileTree object.
 */
function createFileIndex(fileTree: FileTree): ResourceIndex {
  // Initialize the index object
  const index: ResourceIndex = {};

  // Helper function to recursively traverse the FileTree
  function traverse(node: FileTree): void {
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

export const getResourceIndex = (root: string): ResourceIndex => {
  const fullTree = directoryTree(root);
  if (!fullTree) {
    console.log(`Directory ${root} does not exist`);
    return {};
  }
  return createFileIndex(fullTree as FileTree);
};

const getRelativePath = (from: string, to: string): string => 
  path.relative(path.dirname(from), to);

export const linkMatchesPath = (
  fromFileAbsolutePath: string,
  candidateAbsolutePath: string,
  linkText: string, // can be '.', absolute path or relative path
): boolean => {
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

const normalizeLink = (link: string, fallbackExt?: string): string => {
  const filename = link.split(/[#^]/)[0].trim();
  if (
    !fallbackExt ||
    filename.toLowerCase().endsWith(fallbackExt.toLowerCase())
  )
    return filename;
  return `${filename}${fallbackExt}`;
};

export const resolveLink = (
  from: string,
  link: string,
  resourceIndex: ResourceIndex,
  ext?: string
): string | null => {
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

export const resourcePathToLink = (path: string): string => path.replace(".md", "");
