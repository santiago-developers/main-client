import tw from "twin.macro";
import BPhotographersSvg from "@public/images/magazines/bPhotographers.svg";
import BWritersSvg from "@public/images/magazines/bWriters.svg";
import BFanaticsSvg from "@public/images/magazines/bFanatics.svg";
import { SantiagoGet } from "lib/fetchData";
import { useEffect } from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";

type BestListProps = {
	id: string;
	name: string;
	imageUrl: string | null;
	region: string[];
};

const BestList = () => {
	const bestList = ["Best Photographers", "Best Writers", "Best Fanatics"];

	const [bWriters, setBWriters] = useState([]);
	const [bPhotographers, setBPhotographers] = useState([]);
	const [bFanatics, setBFanatics] = useState([]);

	const regionId = "0bcbbb91-89bd-48f7-9562-ec662b6fd3a2";
	const fetchData = async (regionId: string) => {
		const bWritersList = await SantiagoGet(
			`users?query_type=photoBest%20&region_id=${regionId}&base=0&limit=5`,
		);
		const bPhotographersList = await SantiagoGet(
			`users?query_type=writingBest%20&region_id=${regionId}&base=0&limit=5`,
		);
		const bFanaticsList = await SantiagoGet(
			`users?query_type=fanaticBest%20&region_id=${regionId}&base=0&limit=5`,
		);
		setBWriters(bWritersList.data);
		setBPhotographers(bPhotographersList.data);
		setBFanatics(bFanaticsList.data);
	};

	useEffect(() => {
		if (regionId) fetchData(regionId);
	}, [regionId]);

	const fetchDataList = [bWriters, bPhotographers, bFanatics];

	return (
		<>
			{bestList.map((item, index) => (
				<div tw="text-[14px]" key={index}>
					<div tw="whitespace-nowrap flex gap-4 pb-2 font-bold items-center">
						{index == 0 && <BPhotographersSvg />}
						{index == 1 && <BWritersSvg />}
						{index == 2 && <BFanaticsSvg />}
						<span>{item}</span>
					</div>
					{fetchDataList[index].map((item: BestListProps, index) => (
						<div tw="flex items-center gap-4 pb-4" key={index}>
							{index + 1}
							<Avatar
								src={item.imageUrl || "images/defaultUser.svg"}
								alt="userImage"
								sx={{ width: 25, height: 25 }}
							/>
							{item.name}
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default BestList;
