import tw from "twin.macro";
import DefautUserSvg from "@public/images/defaultUser.svg";
import BPhotographersSvg from "@public/images/magazines/bPhotographers.svg";
import BWritersSvg from "@public/images/magazines/bWriters.svg";
import BFanaticsSvg from "@public/images/magazines/bFanatics.svg";
import { SantiagoGet } from "lib/fetchData";
import { useEffect } from 'react';
import { useState } from 'react';

const BestList = () => {
	const bestList = ["Best Photographers", "Best Writers", "Best Fanatics"];

	const [bWriters, setBWriters] =useState<string>([]);
	const [bPhotographers, setBPhotographers] =useState<string>([]);
	const [bFanatics, setBFanatics] =useState<string>([]);

	const fetchData = async () => {
		const bestList = await SantiagoGet("users");
		console.log(bestList);
	};

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	return (
		<>
			{bestList.map((item, index) => (
				<div tw="text-[14px]" key={index}>
					<div tw="whitespace-nowrap flex gap-4 pb-2 font-bold ">
						{item === "Best Photographers" && <BPhotographersSvg />}
						{item === "Best Writers" && <BWritersSvg />}
						{item === "Best Fanatics" && <BFanaticsSvg />}
						<span>{item}</span>
					</div>
					{Array.from({ length: 5 }, (_, index) => (
						<div tw="flex items-center gap-4 pb-5" key={index}>
							{index + 1}
							<DefautUserSvg tw="w-[24.5px] h-[24.5px]" />
							David
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default BestList;
