import "@styles/globals.css";
import "@styles/quill.css";
import type { AppProps } from "next/app";
import { Noto_Sans, Source_Serif_4 } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import SantiagoLayout from "@components/layout/SantiagoLayout";
import Head from "next/head";
import RQProvider from "lib/react_query/RQProvider";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	display: "swap",
	weight: ["500", "400", "300"],
	preload: true,
});

const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "300"],
	variable: "--source_Serif_4",
	preload: true,
});

export const cls = (...classnames: string[]) => {
	return classnames.join(" ");
};

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className={cls(notoSans.className, sourceSerif.variable)}>
			<CssBaseline />
			<RQProvider>
				<HydrationBoundary state={dehydratedState}>
					<SantiagoLayout>
						<Head>
							<title>Santiago</title>
							<meta
								property="og:title"
								content="Santiago"
								key="title"
							/>
							<link rel="icon" href="/images/favicon.svg" />
						</Head>
						<Component {...pageProps} />
					</SantiagoLayout>
				</HydrationBoundary>
			</RQProvider>
		</main>
	);
}
