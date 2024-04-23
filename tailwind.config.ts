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
				xs: "0.6rem",
				sm: "0.75rem",
				base: "1rem",
				"2xl": "1.8rem",
			},
			colors: {
				mint: "#05C3B6",
				sgray: "#A3A3A3",
				darkGray: "#525252",
			},
		},
	},
	plugins: [],
};
export default config;
