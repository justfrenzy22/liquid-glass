import { mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
await mkdir(new URL("../.artifacts/", import.meta.url), { recursive: true });
execFileSync(process.execPath, [process.env.npm_execpath, "pack", "--pack-destination", ".artifacts"], { cwd: root, stdio: "inherit" });
