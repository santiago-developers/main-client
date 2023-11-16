import LogoSvg from "@public/images/logo.svg";
import Link from "next/link";
import tw from "twin.macro";
import { useEffect, type PropsWithChildren, useState } from "react";
import { MintButton } from "@utils/MintButton";
import UserFrame from "@utils/UserFrame";
import myInfoStore from "store/myInfoStore";

const SantiagoHeader: React.FunctionComponent<PropsWithChildren> = () => {
	const { id, name, imageUrl, region } = myInfoStore();
	const [myId, setMyId] = useState("");
	const [myName, setMyName] = useState("");
	const [myImageUrl, setMyImageUrl] = useState<string | null>("");
	const [myRegion, setMyRegion] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setMyId(id);
			setMyImageUrl(imageUrl);
			setMyName(name);
			setMyRegion(region ? region.name_en : "earth");
		}
	},[]);

	return (
		<>
			<header tw="w-full h-[98px] flex items-center justify-between px-16 bg-white fixed top-0 z-1">
				<Link href="/">
					<LogoSvg tw="w-[131px]" />
				</Link>
				{myId == "" ? (
					<>
						<Link href="/auth/sign-in">Sign in</Link>
					</>
				) : (
					<>
						<div tw="flex gap-5">
							<MintButton>
								<Link href="/write" tw="text-mint">
									Write
								</Link>
							</MintButton>
							<Link href="/profile">
								<UserFrame
									name={myName}
									imageUrl={myImageUrl}
									regionName={myRegion}
								/>
							</Link>
						</div>
					</>
				)}
			</header>
		</>
	);
};

export default SantiagoHeader;
