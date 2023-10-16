import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				serif: ["var(--source_Serif_4)"],
				noto: ["var(--noto_Sans)"],
			},
			fontSize: {
				xs: "0.5rem",
				sm: "0.75rem",
				base: "1rem",
				// xl: "1.25rem",
				"2xl": "1.8rem",
				// "3xl": "1.953rem",
				// "4xl": "2.441rem",
				// "5xl": "3.052rem",
			},
		},
	},
	plugins: [],
};
export default config;
