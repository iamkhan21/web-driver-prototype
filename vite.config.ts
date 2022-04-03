/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
// @ts-ignore
import path from "node:path";
// @ts-ignore
import tsconfig from "./tsconfig.json";

const themeColor = "#1976d2";

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ["images/*"],
  manifest: {
    name: "Driver App",
    short_name: "Driver App",
    description: "Web version of driver app",
    theme_color: themeColor,
    background_color: themeColor,
    display: "standalone",
    lang: "en",
    scope: "/",
    icons: [
      {
        src: "favicons/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "favicons/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
};

function handlePath(p) {
  return path.resolve(__dirname, p).replace(/([\\/])\*$/, "");
}

const aliases = Object.entries(tsconfig.compilerOptions.paths);
const aliasConfig = {};

for (const [configAlias, configPaths = []] of aliases) {
  const wpAlias = configAlias.replace(/([\\/])\*$/, "");
  aliasConfig[wpAlias] = (configPaths as string[]).map(handlePath);
}

const buildDate = new Date().toLocaleString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),
    VitePWA(pwaOptions),
    Unocss({
      presets: [presetUno()],
    }),
  ],
  resolve: {
    alias: {
      ...aliasConfig,
    },
  },
  define: {
    __BUILD_VERSION__: JSON.stringify(process.env.BUILD_ID || "1.1.1.1"),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
});
