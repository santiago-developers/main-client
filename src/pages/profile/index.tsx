import tw from "twin.macro";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import Magazines from "@components/magazineList/Magazines";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RedPlus from "@public/images/redPlus.svg";
import ProfileBList from "@components/profile/ProfileBList";
import myInfoStore from "store/myInfoStore";
import Link from "next/link";
import FollowModal from "@components/profile/FollowModal";
import { useRouter } from "next/router";
import { SantiagoGet } from "lib/fetchData";
import { RegionResponse } from "lib/dto/region/region";
import { LanguageDto } from "lib/dto/user/LanguageDto";

type UserInfoProps = {
	id?: string;
	name: string;
	imageUrl: string | null;
	followerCount: number;
	followingCount: number;
	photoScore: number;
	writingScore: number;
	region: RegionResponse | null;
	languagesSubcribed: LanguageDto[];
};

const ProfilePage = () => {
	const router = useRouter();
	const userIdFrom: string | undefined = router.query.user_id;
	const { id } = myInfoStore();
	const [userInfo, setUserInfo] = useState<UserInfoProps>([]);

	const getData = async (dataType: string) => {
		const data = await SantiagoGet(`users/${dataType}`);
		setUserInfo(data);
	};

	useEffect(() => {
		if (userIdFrom === id || !userIdFrom) {
			getData(id);
		} else {
			getData(userIdFrom);
		}
		if (!id) {
			history.back();
		}
	}, [userIdFrom]);

	const {
		name,
		imageUrl,
		followerCount,
		followingCount,
		photoScore,
		writingScore,
		languagesSubcribed,
		region,
	} = userInfo;

	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	const [open, setIsOpen] = useState(false);
	const [followType, setFollowType] = useState("");
	const handleFollowModal = (type: string) => {
		setFollowType(type);
		setIsOpen(!open);
	};

	return (
		<div tw="w-full flex mt-10 mx-20 mb-20 gap-20 justify-center">
			<div>
				<div tw=" w-full flex justify-between text-[#525252]">
					<div tw="flex gap-3">
						<Image
							src={imageUrl || "/images/defaultUser.svg"}
							alt="profile"
							width={64}
							height={64}
						/>
						<div tw="flex flex-col justify-center pl-2">
							<span tw="text-[24px]">{name}</span>
							<span tw="text-[18px]">{region?.name_en}</span>
						</div>
						<button tw="text-mint">
							{userIdFrom === id || !userIdFrom
								? "edit "
								: "Follow"}
						</button>
					</div>
				</div>
				<div tw="relative flex flex-col px-4 mt-5 gap-2 text-[18px]">
					{open && (
						<FollowModal
							userId={
								userIdFrom === id || !userIdFrom
									? id
									: userIdFrom
							}
							followType={followType}
							setIsOpen={setIsOpen}
						/>
					)}
					<div tw="flex justify-between">
						<span>followers</span>
						<span
							tw="cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								handleFollowModal("followers");
							}}>
							{followerCount}
						</span>
					</div>
					<div tw="flex justify-between mb-3">
						<span>following</span>
						<span
							tw="cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								handleFollowModal("followings");
							}}>
							{followingCount}
						</span>
					</div>
					{userIdFrom === id || !userIdFrom ? (
						<>
							<div>Language Packs</div>
							<div tw="flex items-center gap-2.5">
								{languagesSubcribed?.map((item, index) => (
									<span
										tw="bg-[#F5F5F5] rounded-lg px-2 py-1.5 max-w-max text-black text-[16px]"
										key={index}>
										{item}
									</span>
								))}
								<Link href="/plans">
									<RedPlus tw="cursor-pointer" />
								</Link>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
				<div tw="mt-16 mb-7 text-[#737373]">
					<div tw="flex justify-between my-3">
						<span>🏞️ Picture Score</span>
						<span>{photoScore} points</span>
					</div>
					<div tw="flex justify-between">
						<span>✒️ Writing Score</span>
						<span>{writingScore} points</span>
					</div>
				</div>
				<ProfileBList
					id={userIdFrom === id || !userIdFrom ? id : userIdFrom}
				/>
			</div>
			<div tw="flex flex-col gap-36 items-center">
				<MagazineSearchBar onSubmit={searchSubmit} />
				<Magazines
					selectedType="recent"
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					user_id={userIdFrom === id || !userIdFrom ? id : userIdFrom}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
