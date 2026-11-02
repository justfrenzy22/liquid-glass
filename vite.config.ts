import { defineConfig } from "vite";
export default defineConfig({
  root: "tests/fixtures/consumer",
  build: {
    outDir: "../../../.artifacts/consumer-build", emptyOutDir: true,
    rolldownOptions: {
      onwarn(warning, handler) {
        // This test fixture is entirely client-side; RSC directives stay in library dist.
        if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) return;
        handler(warning);
      },
    },
  },
  server: { strictPort: true },
});
