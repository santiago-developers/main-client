import { countinents } from "@statics/continents";
import React, { useState } from "react";
import tw from "twin.macro";
import writeStore from "store/writeStore";
import regionsStore from "store/regionStore";
import Image from "next/image";

type ContryModalProps = {
	setIsOpen(value: boolean): void;
	setTitle?(value: string | undefined): void;
	setSelectedRegion?(value: string): void;
	// setPostRegionId?: React.Dispatch<React.SetStateAction<string>>;
};

const CountryModal = ({
	setIsOpen,
	setTitle,
	setSelectedRegion,
	// setPostRegionId,
}: ContryModalProps) => {
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
		if (setSelectedRegion) {
			setSelectedRegion(selectedName);
		}

		if (setTitle) {
			setTitle(selectedName);
		}
		const region = regionList
			?.map((item) => item)
			.find((item) => item.name_en === selectedName);
		console.log(region);

		setRegionId(region.regionId);
		// setPostRegionId(region.regionId);
		setIsOpen(!open);
	};

	return (
		<div tw="flex flex-col justify-center items-center h-full text-[12px] text-black">
			<div tw="w-[590px] min-h-[269px] grid grid-cols-4 gap-3 justify-center text-center items-center my-4">
				{countinents.map((item, index) => (
					<div
						key={index}
						tw="w-[138px] h-[132px] cursor-pointer text-center border border-[#D4D4D4] rounded-lg overflow-hidden"
						style={{
							textShadow: "0px 0px 5px #FFF",
							fontWeight: 700,
							color: "black",
							position: "relative",
							backgroundColor: "transparent",
						}}
						onClick={(e) => {
							e.preventDefault();
							regionClick(item as string);
						}}>
						<Image
							src={`/images/continent/${item
								.toLowerCase()
								.replace(/ /g, "_")}.svg`}
							alt={item}
							fill
							sizes="100vw"
							style={{
								objectFit: "cover",
							}}
						/>
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								zIndex: "1",
							}}>
							{item}
						</div>
					</div>
				))}
			</div>
			<div tw="w-[590px] flex flex-wrap gap-3 text-center items-center my-2">
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
