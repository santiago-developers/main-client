import tw from "twin.macro";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import Magazines from "@components/magazineList/Magazines";
import React, { useState } from "react";
import Image from "next/image";
import RedPlus from "@public/images/redPlus.svg";
import ProfileBList from "@components/profile/ProfileBList";
import myInfoStore from "store/myInfoStore";
import Link from "next/link";
import FollowModal from "@components/profile/FollowModal";

const ProfilePage = () => {
	const {
		id,
		name,
		imageUrl,
		followerCount,
		followingCount,
		photoScore,
		writingScore,
		languagesSubcribed,
		region,
	} = myInfoStore();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	const [open, setIsOpen]=useState(false);
	const [followType, setFollowType]=useState("")
	const handleFollowModal =(type:string)=>{
		setFollowType(type)
		setIsOpen(!open)
	}

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
						<button tw="text-mint">edit</button>
					</div>
				</div>
				<div tw="relative flex flex-col px-4 mt-5 gap-2 text-[18px]">
					{open && <FollowModal userId={id} followType={followType} setIsOpen={setIsOpen}/> }
					<div tw="flex justify-between" >
						<span>followers</span>
						<span tw="cursor-pointer" onClick={(e)=> {e.stopPropagation();
						handleFollowModal("followers");
						}}>{followerCount}</span>
					</div>
					<div tw="flex justify-between mb-3">
						<span>following</span>
						<span tw="cursor-pointer" onClick={(e)=> {e.stopPropagation();
						handleFollowModal("followings");
						}}>{followingCount}</span>
					</div>
					<div>Language Packs</div>
					<div tw="flex items-center gap-2.5">
						{languagesSubcribed?.map((item, index)=>(
							<span tw="bg-[#F5F5F5] rounded-lg px-2 py-1.5 max-w-max text-black text-[16px]" key={index}>
							{item}
						</span>
							))}
						<Link href="/plans">
							<RedPlus tw="cursor-pointer" />
						</Link>
					</div>
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
				<ProfileBList />
			</div>
			<div tw="flex flex-col gap-36 items-center">
				<MagazineSearchBar onSubmit={searchSubmit} />
				<Magazines
					selectedType="recent"
					regionId=""
					searchTerm={searchTerm}
					user_id={id}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
