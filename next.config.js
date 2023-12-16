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
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "santiago-user.s3.ap-northeast-2.amazonaws.com",
				pathname: "/**",
			},
		],
	},
	typescript: {    // !! WARN !!    // Dangerously allow production builds to successfully complete even if    // your project has type errors.    // !! WARN !!    
		ignoreBuildErrors: true,
	  },
});
