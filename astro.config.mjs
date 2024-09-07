import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import playformCompress from "@playform/compress";

import cloudflare from "@astrojs/cloudflare";


// https://astro.build/config
export default defineConfig({
  site: "https://pavitra-pheres.pages.dev/",
  integrations: [tailwind(), react(), mdx(), sitemap(), robotsTxt(), playformCompress({
    JavaScript: true,
    HTML: true,
    CSS: true,
    SVG: true,
    Files: true,
    Images: true
  })],
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough"
  }),

  vite: {
    ssr: {
      external: ['node:buffer'],
    },
  },
  
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  }
});