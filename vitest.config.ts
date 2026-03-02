import { defineConfig } from "vitest/config";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: "webdriverio",
      headless: true,
      instances: [
        {
          browser: "chrome",
          capabilities: {
            "goog:chromeOptions": {
              args: ["--use-gl=angle", "--use-angle=swiftshader"],
            },
          },
        },
      ],
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts"],
    },
  },
});
