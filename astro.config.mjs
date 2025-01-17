// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	integrations: [db(), tailwind()],
	output: "server",
	adapter: vercel(),
});
