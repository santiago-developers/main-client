import LogoSvg from "@public/images/logo.svg";
import Link from "next/link";
import tw from "twin.macro";
import type { PropsWithChildren } from "react";
import { MintButton } from "@utils/MintButton";
import UserFrame from "@utils/UserFrame";

const SantiagoHeader: React.FunctionComponent<PropsWithChildren> = () => {
	return (
		<>
			<header tw="w-full h-[98px] flex items-center justify-between px-16 bg-white fixed top-0 z-1">
				<Link href="/">
					<LogoSvg tw="w-[131px]" />
				</Link>
				<div tw="flex gap-5">
					<MintButton>
						<Link href="/post/publish" tw="text-mint">
							Write
						</Link>
					</MintButton>
					<Link href="/profile">
						<UserFrame />
					</Link>
				</div>
			</header>
		</>
	);
};

export default SantiagoHeader;
