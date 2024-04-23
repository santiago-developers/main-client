import tw from "twin.macro";
import Custom404Emogi from "@public/images/404.svg";
import { MintButton, MintButtonFilled } from "@utils/MintButton";
import Link from "next/link";

export default function Custom404() {
	return (
		<div tw="w-full grid place-items-center">
			<div tw="h-16" />
			<Custom404Emogi />
			<div tw="flex gap-4">
				<MintButton onClick={() => window.location.reload()}>
					Refresh Page
				</MintButton>
				<Link href="/main">
					<MintButtonFilled>Home</MintButtonFilled>
				</Link>
			</div>
		</div>
	);
}
