/** @type {import('next').NextConfig} */
const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
	webpack: (config) => {
		// @svgr/webpack loader 설정
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.tsx?$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
});
// const withTwin = require("./withTwin");

// /** @type {import('next').NextConfig} */
// const nextConfig = withTwin({
// 	reactStrictMode: true,
// });

// module.exports = nextConfig;
