import LogoSvg from "@public/images/logo.svg";
import Link from "next/link";
import tw from "twin.macro";
import { useEffect, type PropsWithChildren, useState } from "react";
import { MintButton } from "@utils/MintButton";
import UserFrame from "@utils/UserFrame";
import myInfoStore from "store/myInfoStore";
import { useRouter } from "next/router";
import HeaderDropdown from "./\bHeaderDropDown";

const SantiagoHeader: React.FunctionComponent<PropsWithChildren> = () => {
	const router = useRouter();
	const { id, name, imageUrl, region } = myInfoStore();
	const [myId, setMyId] = useState("");
	const [myName, setMyName] = useState("");
	const [myImageUrl, setMyImageUrl] = useState<string | null>("");
	const [myRegion, setMyRegion] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setMyId(id);
			setMyImageUrl(imageUrl);
			setMyName(name);
			setMyRegion(region ? region.name_en : "earth");
		}
	}, [id, imageUrl, name, region]);

	useEffect(() => {
		if (!id) {
			setMyId("");
		}
	}, [id]);

	return (
		<>
			<header tw="w-full h-[98px] flex items-center justify-between px-16 bg-white fixed top-0 z-10">
				<Link href="/">
					<LogoSvg tw="w-[131px] cursor-pointer" />
				</Link>
				{myId == "" ? (
					<button>
						<Link
							href="/auth/sign-in"
							tw="cursor-pointer"
							prefetch={true}>
							Sign in
						</Link>
					</button>
				) : (
					<>
						<div tw="flex gap-5">
							{router.pathname !== "/write" &&
								router.pathname !== "/post/[id]/edit" && (
									<MintButton>
										<Link
											href="/write"
											tw="text-mint cursor-pointer">
											Write
										</Link>
									</MintButton>
								)}
							<div tw="relative">
								<div tw="cursor-pointer" onClick={handleToggle}>
									<UserFrame
										name={myName}
										imageUrl={myImageUrl}
										regionName={myRegion}
									/>
								</div>
								{isOpen && (
									<HeaderDropdown
										id={id}
										isOpen={isOpen}
										setIsOpen={setIsOpen}
									/>
								)}
							</div>
						</div>
					</>
				)}
			</header>
		</>
	);
};

export default SantiagoHeader;
