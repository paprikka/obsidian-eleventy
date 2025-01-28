import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { existsSync } from "fs";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

let dir: string = __dirname;

while (!existsSync(join(dir, "package.json"))) {
  const parentDir: string = resolve(dir, "..");
  if (parentDir === dir) break; // Stop if we reach the root directory
  dir = parentDir;
}

export const projectRootDir: string = dir;
