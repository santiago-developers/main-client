import React from "react";
import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { countinents, mainCountries } from "@statics/continents";
import { useRouter } from "next/router";
import { MainCountriesProps } from "types/regions";
import Image from "next/image";

const Continent = () => {
	const Item = styled(Paper)(({ theme }) => ({
		width: 179,
		height: 170,
		padding: theme.spacing(7),
		justifyContent: "center",
		textAlign: "center",
		textShadow: "0px 0px 5px #FFF",
		fontWeight: 700,
		color: "black",
	}));

	const router = useRouter();

	const handleContinent = (item: string) => {
		let continent = item.toLowerCase().replace(/ /g, "_");
		router.push({
			pathname: "/magazineList",
			query: {
				continent: continent,
				title: item,
			},
		});
	};

	const handleMainCountries = (item: MainCountriesProps) => {
		router.push({
			pathname: "/magazineList",
			query: {
				region_id: item.regionId,
				title: item.name,
			},
		});
	};

	return (
		<>
			<Grid container spacing={3}>
				{countinents.map((item, index) => (
					<Grid item md={3} key={index}>
						<Item
							onClick={(e) => {
								e.preventDefault();
								handleContinent(item as string);
							}}
							sx={{
								cursor: "pointer",
								position: "relative",
								bgcolor: "transparent",
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
									zIndex: "-1",
								}}
							/>
							{item}
						</Item>
					</Grid>
				))}
				{mainCountries.map((item, index) => (
					<Grid item md={3} key={index}>
						<Item
							onClick={(e) => {
								e.preventDefault();
								handleMainCountries(item);
							}}
							sx={{
								cursor: "pointer",
								position: "relative",
								bgcolor: "transparent",
							}}>
							<Image
								src={`/images/continent/${item.name
									.toLowerCase()
									.replace(/ /g, "_")}.svg`}
								alt={item.name}
								fill
								sizes="100vw"
								style={{
									objectFit: "cover",
									zIndex: "-1",
								}}
							/>
							{item.name}
						</Item>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default Continent;
