import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins:
        mode === "production"
            ? [
              vue({
                template: {
                  compilerOptions: {
                    isCustomElement: (tag) => ["VueToast"].includes(tag),
                  },
                },
              }),
            ]
            : [vue({})],
    build: {
      outDir: "dist",
      lib: {
        entry: resolve("src/index.ts"),
        name: "index",
        // the proper extensions will be added
        fileName: "index",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  });
};
