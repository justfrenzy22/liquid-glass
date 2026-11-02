import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  use: { baseURL: "http://127.0.0.1:4173" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "webkit-desktop", use: { browserName: "webkit" } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"], browserName: "webkit" } },
  ],
  webServer: { command: "npm run dev", url: "http://127.0.0.1:4173", reuseExistingServer: false },
});
