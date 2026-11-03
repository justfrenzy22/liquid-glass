import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/postcss";
export default defineConfig({
  root: "tests/fixtures/consumer",
  css: { postcss: { plugins: [tailwindcss()] } },
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
