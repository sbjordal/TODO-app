import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // vi tester service-lag
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/app": path.resolve(__dirname, "./app"),
      "@/app/lib": path.resolve(__dirname, "./app/lib"),
    },
  },
});
