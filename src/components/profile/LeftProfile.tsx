import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import Link from "next/link";
import myInfoStore from "store/myInfoStore";
import { useRouter } from "next/router";
import FollowModal from "@components/profile/FollowModal";
import Image from "next/image";
import RedPlus from "@public/images/redPlus.svg";
import ProfileBList from "@components/profile/ProfileBList";
import { SantiagoGet } from "lib/fetchData";
import EditButton from "./EditButton";
import FollowButton from "./FollowButton";
import { UserInfoProps } from "types/user";

const LeftProfile = () => {
	const router = useRouter();
	const user_id = router.query.user_id as string;
	const { id } = myInfoStore();
	const [userInfo, setUserInfo] = useState<UserInfoProps>([]);
	const me = user_id === id || !user_id;

	const [open, setIsOpen] = useState(false);
	const [followType, setFollowType] = useState("");
	const handleFollowModal = (type: string) => {
		setFollowType(type);
		setIsOpen(!open);
	};
	const getData = async (user_id: string) => {
		const data = await SantiagoGet<UserInfoProps>(`users/${user_id}`);
		setUserInfo(data);
	};

	useEffect(() => {
		if (router.isReady) {
			getData(user_id);
		}
		// if (!user_id) {
		// 	router.replace("/auth/sign-in");
		// }
	}, [user_id]);

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

	const onUpdateProfile = () => {
		// getData(user_id);
		window.location.reload();
	};
	console.log(userInfo);
	console.log(user_id);

	return (
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
					{me ? (
						<EditButton
							name={name}
							region={region}
							imageUrl={imageUrl}
							onUpdateProfile={onUpdateProfile}
						/>
					) : (
						<FollowButton userId={user_id} />
					)}
				</div>
			</div>
			<div tw="relative flex flex-col px-4 mt-5 gap-2 text-[18px]">
				{open && (
					<FollowModal
						userId={me ? id : user_id}
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
				{me && (
					<>
						<div>Language Packs</div>
						<div tw="flex items-center gap-2.5">
							{languagesSubcribed?.map(
								(item: UserInfoProps["languagesSubcribed"]) => (
									<span
										tw="bg-[#F5F5F5] rounded-lg px-2 py-1.5 max-w-max text-black text-[16px]"
										key={item.id}>
										{item.name}
									</span>
								),
							)}
							<Link href="/plans">
								<RedPlus tw="cursor-pointer" />
							</Link>
						</div>
					</>
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
			{user_id && <ProfileBList id={user_id} />}
		</div>
	);
};

export default LeftProfile;
