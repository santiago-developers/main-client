import "@styles/globals.css";
import "@styles/quill.css";
import type { AppProps } from "next/app";
import { Noto_Sans, Source_Serif_4 } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import SantiagoLayout from "@components/layout/SantiagoLayout";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	display: "swap",
	weight: ["500", "400", "300"],
});

const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "300"],
	variable: "--source_Serif_4",
});

export const cls = (...classnames: string[]) => {
	return classnames.join(" ");
};

// <className={`${notoSans.variable} font-serif`}>
export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={cls(notoSans.className, sourceSerif.variable)}>
			<CssBaseline />
			<SantiagoLayout>
				<Component {...pageProps} />
			</SantiagoLayout>
		</main>
	);
}
