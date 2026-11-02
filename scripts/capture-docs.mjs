import { chromium, webkit, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("..", import.meta.url));
const media = path.join(root, "docs", "media");
const frameDir = path.join(root, ".artifacts", `preview-frames-${Date.now()}`);
await mkdir(media, { recursive: true });
await mkdir(frameDir, { recursive: true });
const server = spawn(process.execPath, [path.join(root, "node_modules/vite/bin/vite.js"), "--host", "127.0.0.1", "--port", "4174", "--strictPort"], { cwd: root, stdio: "ignore", windowsHide: true });
const url = "http://127.0.0.1:4174";
const browsers = [];
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error("Preview server did not start; check port 4174");
    try { if ((await fetch(url)).ok) { ready = true; break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Preview server timed out");
  const chrome = await chromium.launch(); browsers.push(chrome);
  const desktop = await chrome.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  await desktop.goto(`${url}/?preview`);
  await desktop.locator('[data-glass-mode="refraction"]').first().waitFor();
  await desktop.locator("main").screenshot({ path: path.join(media, "preview-desktop.png") });
  const safari = await webkit.launch(); browsers.push(safari);
  const compatible = await safari.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  await compatible.goto(`${url}/?preview&mode=compatible`);
  await compatible.locator('[data-glass-mode="compatible"]').first().waitFor();
  await compatible.locator("main").screenshot({ path: path.join(media, "preview-safari.png") });
  const mobile = await safari.newPage({ ...devices["iPhone 13"], deviceScaleFactor: 1 });
  await mobile.goto(`${url}/?preview&mode=compatible`);
  await mobile.locator('[data-glass-mode="compatible"]').first().waitFor();
  if (await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error("Mobile preview overflows");
  await mobile.locator("main").screenshot({ path: path.join(media, "preview-mobile.png") });
  const motion = await chrome.newPage({ viewport: { width: 900, height: 350 }, deviceScaleFactor: 1 });
  await motion.goto(`${url}/?preview&motion`);
  await motion.locator('[data-glass-mode="refraction"]').first().waitFor();
  const capture = async () => motion.screenshot({ path: path.join(frameDir, `${String(frame++).padStart(3, "0")}.png`) });
  let frame = 0;
  for (let i = 0; i < 8; i++) await capture();
  const slider = motion.getByRole("slider", { name: "Drag the glass" });
  const bounds = await slider.boundingBox();
  if (!bounds) throw new Error("Slider is not visible");
  const y = bounds.y + bounds.height / 2;
  const x = (value) => bounds.x + bounds.width * value;
  await motion.mouse.move(x(.4), y);
  await motion.mouse.down();
  const initialValue = Number(await slider.inputValue());
  let maxValue = initialValue;
  for (const [start, end, count] of [[.4, .82, 15], [.82, .18, 20], [.18, .4, 12]]) {
    for (let i = 1; i <= count; i++) {
      await motion.mouse.move(x(start + (end - start) * i / count), y);
      maxValue = Math.max(maxValue, Number(await slider.inputValue()));
      await capture();
    }
  }
  await motion.mouse.up();
  if (maxValue - initialValue < 20) throw new Error("The capture did not record an actual slider drag");
  await motion.mouse.move(850, 320);
  for (let i = 0; i < 8; i++) await capture();
  execFileSync(process.env.PYTHON ?? (process.platform === "win32" ? "python" : "python3"), [path.join(root, "scripts/encode-preview.py"), frameDir, path.join(media, "slider-motion.gif")], { stdio: "inherit" });
  console.log("Captured desktop, Safari and mobile previews from public library exports.");
} finally {
  await Promise.all(browsers.map((browser) => browser.close()));
  server.kill();
}
