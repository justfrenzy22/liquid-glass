import { build } from "esbuild";
import { mkdir, rm, readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = path.resolve(root, "dist");
if (path.dirname(dist) !== root || path.basename(dist) !== "dist") throw new Error("Unsafe build destination");
console.log(`Building library into ${dist}`);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
const foundations = ["liquid-glass.module.css", "optical-controls.module.css", "containers.module.css"];
const styles = [...foundations, ...(await readdir(path.join(root, "src/components"))).filter((name) => name.endsWith(".css") && !foundations.includes(name)).sort()];
await writeFile(path.join(root, "src/styles.ts"), [
  'import "./tailwind-theme.css";', 'import "./base.css";', 'import "./theme.css";', ...styles.map((name) => `import "./components/${name}";`), "",
].join("\n"));
await build({
  absWorkingDir: root,
  entryPoints: { index: "src/index.ts", heroui: "src/heroui.ts", native: "src/native.ts", styles: "src/styles.ts" },
  outdir: dist,
  bundle: true,
  splitting: true,
  format: "esm",
  platform: "browser",
  packages: "external",
  plugins: [{
    name: "tailwind-css-modules",
    setup(builder) {
      builder.onLoad({ filter: /\.css$/ }, async ({ path: filename }) => {
        const source = await readFile(filename, "utf8");
        const result = await postcss([tailwindcss({ base: root, optimize: false })]).process(source, { from: filename });
        const module = filename.endsWith(".module.css");
        if (module || !filename.endsWith("tailwind-theme.css")) {
          const layer = postcss.atRule({ name: "layer", params: module ? "components" : filename.endsWith("base.css") ? "base" : "theme" });
          for (const node of [...result.root.nodes]) {
            // Property registrations must remain at stylesheet scope.
            if (node.type === "atrule" && ["property", "charset"].includes(node.name)) continue;
            layer.append(node);
          }
          result.root.append(layer);
        }
        return { contents: result.root.toString(), loader: module ? "local-css" : "css", resolveDir: path.dirname(filename) };
      });
    },
  }],
  jsx: "automatic",
  target: ["es2020"],
  banner: { js: '"use client";' },
  sourcemap: true,
  legalComments: "eof",
  logOverride: { "ignored-directives": "silent" },
  logLevel: "info",
});
// Browser consumers get CSS automatically; Node SSR uses the CSS-free entries.
for (const entry of ["index", "heroui", "native"]) {
  await writeFile(path.join(dist, `${entry}.browser.js`), `"use client";\nimport "./styles.css";\nexport * from "./${entry}.js";\n`);
}
await writeFile(path.join(dist, "tokens.css"), `@layer theme {\n${await readFile(path.join(root, "src/theme.css"), "utf8")}\n}\n`);
await copyFile(path.join(root, "src/tailwind-integration.css"), path.join(dist, "tailwind.css"));
execFileSync(process.execPath, [path.join(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.build.json"], { cwd: root, stdio: "inherit" });
