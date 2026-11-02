import { defineConfig } from "vite";
export default defineConfig({
  root: "playground",
  build: {
    outDir: "../playground-dist", emptyOutDir: true,
    rolldownOptions: {
      onwarn(warning, handler) {
        // This playground is entirely client-side; RSC directives stay in library dist.
        if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) return;
        handler(warning);
      },
    },
  },
  server: { strictPort: true },
});
