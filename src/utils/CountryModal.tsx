import { countinents } from "@statics/continents";
import React, { useState } from "react";
import tw from "twin.macro";
import writeStore from "store/writeStore";
import regionsStore from "store/regionStore";

type ContryModalProps = {
	setIsOpen(value: boolean): void;
	setTitle(value: string): void;
};

const CountryModal = ({ setIsOpen, setTitle }: ContryModalProps) => {
	const { regionList } = regionsStore();
	const { setRegionId } = writeStore();
	const [regionsName, setRegionNames] = useState<string[]>([]);

	const regionClick = (item: string) => {
		const continent = item.toLowerCase().replace(/ /g, "_");
		const regionAllNames = regionList
			.map((item) => item)
			.map((item) => item.name_en);
		const regionNames = regionList
			.map((item) => item)
			.filter((item) => item.continent === continent)
			.map((item) => item.name_en);
		if (continent === "all") {
			setRegionNames(regionAllNames);
		} else {
			setRegionNames(regionNames);
		}
	};

	const handleRegionClick = (selectedName: string) => {
		setTitle(selectedName)
		const region = regionList
			.map((item) => item)
			.find((item) => item.name_en === selectedName);
		setRegionId(region.regionId);
		setIsOpen(!open);
	};

	return (
		<div tw="w-full h-full text-[12px] text-black">
			<div tw="w-[590px] min-h-[269px] grid grid-cols-4 gap-3 justify-center text-center items-center">
				{countinents.map((item, index) => (
					<div
						key={index}
						tw="cursor-pointer text-center border border-[#D4D4D4] rounded-lg py-14"
						onClick={(e) => {
							e.preventDefault();
							regionClick(item as string);
						}}>
						{item}
					</div>
				))}
			</div>
			<div tw="w-[590px] flex flex-wrap gap-3 text-center items-center mt-2">
				{regionsName.map((item, index) => (
					<div
						tw="w-full bg-[#F5F5F5] max-w-max px-6 py-2 rounded-lg  cursor-pointer "
						key={index}
						onClick={(e) => {
							e.preventDefault();
							handleRegionClick(item as string);
						}}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default CountryModal;
