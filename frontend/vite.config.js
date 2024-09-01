import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "/index.html",
    },
  },
  base: "/",
  server: {
    port: 3000,
  },
});
