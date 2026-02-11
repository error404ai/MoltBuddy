import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve as resolveTs } from "ts-node/esm";
import * as tsConfigPaths from "tsconfig-paths";

export { load, transformSource } from "ts-node/esm";

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, ctx, defaultResolve) {
  // Handle tsconfig path aliases
  const match = matchPath(specifier);
  if (match) {
    return resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve);
  }

  // Handle extensionless relative imports (e.g., "./User" → "./User.ts")
  if (specifier.startsWith(".") && !specifier.match(/\.\w+$/)) {
    const parentPath = ctx.parentURL ? fileURLToPath(ctx.parentURL) : undefined;
    if (parentPath) {
      const dir = parentPath.substring(0, parentPath.lastIndexOf("/"));
      const tsPath = `${dir}/${specifier.replace(/^\.\//, "")}.ts`;
      if (existsSync(tsPath)) {
        return resolveTs(pathToFileURL(tsPath).href, ctx, defaultResolve);
      }
    }
  }

  return resolveTs(specifier, ctx, defaultResolve);
}
