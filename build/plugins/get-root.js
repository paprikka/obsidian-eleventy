import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dir = __dirname;

while (!existsSync(join(dir, "package.json"))) {
  const parentDir = resolve(dir, "..");
  if (parentDir === dir) break; // Stop if we reach the root directory
  dir = parentDir;
}

export const projectRootDir = dir;
