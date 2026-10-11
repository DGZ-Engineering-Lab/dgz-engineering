import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
    clearMocks: true,
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/data/**"],
      reporter: ["text", "lcov"],
    },
  },
});
