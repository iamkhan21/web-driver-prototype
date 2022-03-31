import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  manifest: {
    name: "Driver App",
    short_name: "Driver App",
    description: "Web version of driver app",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicons/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/favicons/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "/favicons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaOptions),
    Unocss({
      presets: [presetUno()],
    }),
  ],
});
