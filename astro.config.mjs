import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import playformCompress from "@playform/compress";

import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://pavitra-pheres.vercel.app/",
  integrations: [tailwind(), react(), mdx(), sitemap(), robotsTxt(), playformCompress({
    JavaScript: true,
    HTML: true,
    CSS: true,
    SVG: true,
    Files: true,
    Images: true
  })],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  vite: {
    ssr: {
      noExternal: 'cookie'
    }
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  }
});