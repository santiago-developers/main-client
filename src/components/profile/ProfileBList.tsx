import tw from "twin.macro";
import { SantiagoGet } from "lib/fetchData";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import BWritingsSvg from "@public/images/profileBwritings.svg";
import BPicturesSvg from "@public/images/profileBPictures.svg";
import myInfoStore from "store/myInfoStore";

type ProfileBListProps = {
	id: string;
	title: string;
	imageUrl: string | null;
};

const ProfileBList = () => {
	const { id } = myInfoStore();
	const bestList = ["Best Pictures", "Best Writings"];
	const [bWritings, setBWritings] = useState([]);
	const [bPictures, setBPictures] = useState([]);

	const fetchData = async (id: string) => {
		const bWritingsList = await SantiagoGet(
			`magazines?query_type=best-writing&base=0&limit=5&user_id=${id}`,
		);
		const bPicturesList = await SantiagoGet(
			`magazines?query_type=best-picture&base=0&limit=5&user_id=${id}`,
		);
		setBWritings(bWritingsList.data);
		setBPictures(bPicturesList.data);
	};

	useEffect(() => {
		fetchData(id);
	}, []);

	const fetchDataList = [bWritings, bPictures];

	return (
		<>
			{bestList.map((item, index) => (
				<div tw="text-[14px]" key={index}>
					<div tw="whitespace-nowrap flex gap-4 mb-2 mt-10  items-center">
						{index == 0 && <BWritingsSvg />}
						{index == 1 && <BPicturesSvg />}
						<span>{item}</span>
					</div>
					{fetchDataList[index].map(
						(item: ProfileBListProps, index) => (
							<div tw="flex items-center gap-4 pb-5" key={index}>
								{index + 1}
								<Image
									src={
										item.imageUrl ||
										"images/defaultUser.svg"
									}
									alt="userImage"
									width={24.5}
									height={24.5}
								/>
								{item.title}
							</div>
						),
					)}
				</div>
			))}
		</>
	);
};

export default ProfileBList;