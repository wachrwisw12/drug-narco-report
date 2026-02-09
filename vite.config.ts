import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/drugnarco/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      scope: "/drugnarco/",
      base: "/drugnarco/",

      manifest: {
        id: "/drugnarco/",
        name: "แจ้งข้อมูลยาเสพติด",
        short_name: "drug-naco",
        description: "Drug Narco Reporting System",

        start_url: "/drugnarco/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1976d2",

        icons: [
          {
            src: "/drugnarco/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/drugnarco/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "/drugnarco/screenshots/mobile.png",
            sizes: "390x844",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "../drugnarco/dist",
    emptyOutDir: true,
  },
});
