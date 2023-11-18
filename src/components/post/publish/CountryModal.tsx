import { Grid, Paper } from "@mui/material";
import { countinents } from "@statics/region";
import React, { useState } from "react";
import tw from "twin.macro";
import { experimentalStyled as styled } from "@mui/material/styles";
import writeStore from "store/writeStore";
import regionsStore from "store/regionsStore";
import { RegionProps } from "types/regions";

const CountryModal = ({ isOpen, setIsOpen, setSelectedRegion }) => {
	const style = {
		position: "absolute" as "absolute",
		top: 250,
		right: 240,
		width: 820,
		padding: 4,
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
		// border: "0.5px solid black",
	};

	const Item = styled(Paper)(({ theme }) => ({
		// background image 삽입
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		height: 150,
		padding: theme.spacing(7),
		justifyContent: "center",
		textAlign: "center",
		fontSize: "16px",
	}));

	const { regions } = regionsStore();
	const { setRegionId } = writeStore();
	const [regionsName, setRegionNames] = useState<string[]>([]);

	const regionClick = (item: string) => {
		const continent = item.toLowerCase().replace(/ /g, "_");
		const regionAllNames = regions
			.map((item) => item)
			.map((item) => item.name_en);
		const regionNames = regions
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
		setSelectedRegion(selectedName);
		const region = regions
			.map((item) => item)
			.find((item) => item.name_en === selectedName);
		setRegionId(region.regionId)
		setIsOpen(!open);
	};

	return (
		<Paper sx={style}>
			<Grid container spacing={2}>
				{countinents.map((item, index) => (
					<Grid item xs={4} md={3} key={index}>
						<Item
							onClick={(e) => {
								e.preventDefault();
								regionClick(item as string);
							}}>
							{item}
						</Item>
					</Grid>
				))}
				<div tw="w-full ml-4 bg-red-400"></div>
				{regionsName.map((item, index) => (
					<span
						tw="bg-[#F5F5F5] max-w-max px-6 py-2 rounded-lg text-[16px] ml-4 mt-2"
						key={index}
						onClick={(e) => {
							e.preventDefault();
							handleRegionClick(item as string);
						}}>
						{item}
					</span>
				))}
			</Grid>
		</Paper>
	);
};

export default CountryModal;
