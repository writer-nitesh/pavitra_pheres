/** @type {import('tailwindcss').Config} */

import { color } from "./src/application.json";
import typography from '@tailwindcss/typography'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundColor: {
				primary: color.primary,
				secondary: color.secondary,
				accent: color.accent,
			},
			border: {
				primary: color.primary,
				secondary: color.secondary,
				accent: color.accent
			},
			colors: {
				primary: color.primary,
				secondary: color.secondary,
				accent: color.accent
			}
		},
	},
	plugins: [
		typography
	],
}
