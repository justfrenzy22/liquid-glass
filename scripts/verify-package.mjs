import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
const root = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const archive = path.join(root, ".artifacts", `justfrenzy22-liquid-glass-${manifest.version}.tgz`);
const digest = createHash("sha256").update(await readFile(archive)).digest("hex").slice(0, 12);
const consumer = path.join(tmpdir(), "liquid-glass-consumers", digest);
await mkdir(consumer, { recursive: true });
await writeFile(path.join(consumer, "package.json"), JSON.stringify({ name: "archive-consumer", private: true, type: "module", dependencies: {
  "@justfrenzy22/liquid-glass": `file:${archive.replaceAll("\\", "/")}`, react: "19.2.8", "react-dom": "19.2.8",
} }, null, 2));
execFileSync(process.execPath, [process.env.npm_execpath, "install", "--ignore-scripts", "--prefer-offline", "--no-audit", "--no-fund"], { cwd: consumer, stdio: "inherit" });
await writeFile(path.join(consumer, "verify.mjs"), `
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { GlassButton } from '@justfrenzy22/liquid-glass';
import { LiquidButton } from '@justfrenzy22/liquid-glass/heroui';
const require = createRequire(import.meta.url);
const libraryRequire = createRequire(import.meta.resolve('@justfrenzy22/liquid-glass/package.json'));
const heroRequire = createRequire(libraryRequire.resolve('@heroui/react'));
for (const name of ['react', 'react-aria-components', 'react-aria', 'react-stately']) {
  assert.equal(libraryRequire.resolve(name), heroRequire.resolve(name), name + ' must resolve to the same peer for library and HeroUI');
}
const html = renderToString(React.createElement(React.Fragment, null, React.createElement(GlassButton,null,'Native'), React.createElement(LiquidButton,{appearance:'normal'},'HeroUI')));
assert.match(html,/Native/); assert.match(html,/HeroUI/);
assert.ok(readFileSync(new URL(import.meta.resolve('@justfrenzy22/liquid-glass/styles.css')),'utf8').includes('backdrop-filter'));
console.log('Packed archive imports, SSR, shared React/Aria peer resolution and CSS export verified.');
`);
execFileSync(process.execPath, ["verify.mjs"], { cwd: consumer, stdio: "inherit" });
