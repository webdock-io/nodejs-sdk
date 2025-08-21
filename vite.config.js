import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      entryRoot: "src",
      outDir: "dist",
      minify: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "WebdockSDK",
      fileName: (format) => {
        if (format === "es") return "index.mjs";
        if (format === "cjs") return "index.cjs";
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["fs", "path", "os", "crypto", "util", "events", "stream", "http", "https", "url"],
      output: [
        {
          format: "es",
          entryFileNames: "index.mjs",
          exports: "named",
        },
        {
          format: "cjs",
          entryFileNames: "index.cjs",
          exports: "named",
        },
      ],
    },
    target: "node16",
    minify: true,
    sourcemap: true,
     emptyOutDir: true, // Don't clear dist folder too aggressively
  },
});