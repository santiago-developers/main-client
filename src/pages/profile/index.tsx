import tw from "twin.macro";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import Magazines from "@components/magazineList/Magazines";
import React, { useState } from "react";
import writeStore from "store/writeStore";
import Image from "next/image";
import RedPlus from "@public/images/redPlus.svg";
import ProfileBList from "@components/profile/ProfileBList";

const ProfilePage = () => {
	const { regionId } = writeStore();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	const [selectedType, setSelectedType] = useState<string>("Hot");
	const handleSearchType = (type: string) => {
		setSelectedType(type);
	};

	return (
		<div tw="w-full flex mx-20 mb-20 gap-20 justify-center">
			<div>
				<div tw=" w-full flex justify-between text-[#525252]">
					<div tw="flex gap-3">
						<Image
							// src={
							// 	item.writer.imageUrl ||
							// 	"/images/defaultUser.svg"
							// }
							src={"/images/defaultUser.svg"}
							alt="profile"
							width={64}
							height={64}
						/>
						<div tw="flex flex-col justify-center pl-2">
							<span tw="text-[24px]">
								Marais
								{/* {item.writer.name} */}
							</span>
							<span tw="text-[18px]">
								{/* {item.writer.region.name_en} */}
								South korea
							</span>
						</div>
						<button tw="text-mint">edit</button>
					</div>
				</div>
				<div tw="flex flex-col px-4 mt-5 gap-2 text-[18px]">
					<div tw="flex justify-between">
						<span>followers</span>
						<span>10</span>
					</div>
					<div tw="flex justify-between mb-3">
						<span>following</span>
						<span>10</span>
					</div>
					<div>Language Packs</div>
					<div tw="flex items-center gap-2.5">
						<span tw="bg-[#F5F5F5] rounded-lg px-2 py-1.5 max-w-max text-black text-[16px]">
							Korean
						</span>
						<RedPlus />
					</div>
				</div>
				<div tw="mt-16 mb-7 text-[#737373]">
					<div tw="flex justify-between my-3">
						<span>🏞️ Picture Score</span>
						<span>365 points</span>
					</div>
					<div tw="flex justify-between">
						<span>✒️ Writing Score</span>
						<span>365 points</span>
					</div>
				</div>
				<ProfileBList />
			</div>
			<div tw="flex flex-col gap-36 items-center">
				<MagazineSearchBar onSubmit={searchSubmit} />
				<Magazines
					selectedType={selectedType}
					regionId={regionId}
					searchTerm={searchTerm}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
