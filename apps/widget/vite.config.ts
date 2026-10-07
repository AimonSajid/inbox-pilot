import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3002,
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/main.ts",
      name: "InboxPilotWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
  },
});
