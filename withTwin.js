const path = require("path");

const includedDirs = [path.resolve(__dirname, "src")];

module.exports = function withTwin(nextConfig) {
	return {
		...nextConfig,
		webpack(config, options) {
			const { dev } = options;
			config.module = config.module || {};
			config.module.rules = config.module.rules || [];

			//  설정
			config.module.rules.push({
				test: /\.(tsx|ts)$/,
				include: includedDirs,
				use: [
					{
						loader: "babel-loader",
						options: {
							sourceMaps: dev,
							presets: [
								[
									"@babel/preset-react",
									{
										runtime: "automatic",
										importSource: "@emotion/react",
									},
								],
							],
							plugins: [
								require.resolve("babel-plugin-macros"),
								require.resolve("@emotion/babel-plugin"),
								[
									require.resolve(
										"@babel/plugin-syntax-typescript",
									),
									{ isTSX: true },
								],
							],
						},
					},
				],
			});

			return nextConfig.webpack(config, options);
		},
	};
};
