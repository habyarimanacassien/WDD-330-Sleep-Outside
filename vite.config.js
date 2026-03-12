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
      name: "copy-static-folders-to-dist",
      closeBundle() {
        const jsonFrom = resolve(__dirname, "src/json");
        const jsonTo = resolve(__dirname, "dist/json");

        const imagesFrom = resolve(__dirname, "src/images");
        const imagesTo = resolve(__dirname, "dist/images");

        if (existsSync(jsonFrom)) {
          cpSync(jsonFrom, jsonTo, { recursive: true });
        }

        if (existsSync(imagesFrom)) {
          cpSync(imagesFrom, imagesTo, { recursive: true });
        }
      },
    },
  ],
});