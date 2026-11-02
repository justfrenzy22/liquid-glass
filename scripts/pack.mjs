import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
// Build first, then package a consumer-only manifest without repository tooling.
execFileSync(process.execPath, [process.env.npm_execpath, "run", "build"], { cwd: root, stdio: "inherit" });
await mkdir(new URL("../.artifacts/", import.meta.url), { recursive: true });
const stage = await mkdtemp(new URL("../.artifacts/package-", import.meta.url));
const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
delete manifest.scripts;
delete manifest.devDependencies;
for (const file of manifest.files) {
  await cp(new URL(`../${file}`, import.meta.url), `${stage}/${file}`, { recursive: true });
}
await writeFile(`${stage}/package.json`, JSON.stringify(manifest, null, 2) + "\n");
execFileSync(process.execPath, [process.env.npm_execpath, "pack", stage, "--ignore-scripts", "--pack-destination", ".artifacts"], { cwd: root, stdio: "inherit" });
