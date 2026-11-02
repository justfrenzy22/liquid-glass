import { build } from "esbuild";
import { mkdir, rm, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = path.resolve(root, "dist");
if (path.dirname(dist) !== root || path.basename(dist) !== "dist") throw new Error("Unsafe build destination");
console.log(`Building library into ${dist}`);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
const foundations = ["liquid-glass.module.css", "optical-controls.module.css", "containers.module.css"];
const styles = [...foundations, ...(await readdir(path.join(root, "src/components"))).filter((name) => name.endsWith(".css") && !foundations.includes(name)).sort()];
await writeFile(path.join(root, "src/styles.ts"), [
  'import "./base.css";', ...styles.map((name) => `import "./components/${name}";`), "",
].join("\n"));
await build({
  absWorkingDir: root,
  entryPoints: { index: "src/index.ts", heroui: "src/heroui.ts", styles: "src/styles.ts" },
  outdir: dist,
  bundle: true,
  splitting: true,
  format: "esm",
  platform: "browser",
  packages: "external",
  jsx: "automatic",
  target: ["es2020"],
  banner: { js: '"use client";' },
  sourcemap: true,
  legalComments: "eof",
  logOverride: { "ignored-directives": "silent" },
  logLevel: "info",
});
execFileSync(process.execPath, [path.join(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.build.json"], { cwd: root, stdio: "inherit" });
