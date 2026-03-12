import { resolve } from "path";
import { defineConfig } from "vite";
import { cpSync, existsSync } from "fs";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html",
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html",
        ),
      },
    },
  },

  plugins: [
    {
      name: "copy-json-to-dist",
      closeBundle() {
        const from = resolve(__dirname, "src/json");
        const to = resolve(__dirname, "dist/json");

        if (existsSync(from)) {
          cpSync(from, to, { recursive: true });
        }
      },
    },
  ],
});