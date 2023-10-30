import type { NextPage } from "next";
import tw from "twin.macro";
import MainSvg from "@public/images/main.svg";
import { Grid, Paper } from "@mui/material";
import Searchbar from "@components/main/SearchBar";
import { useRouter } from "next/router";
import { experimentalStyled as styled } from "@mui/material/styles";
import { countinents } from "@statics/region";
import { useState } from "react";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { SantiagoGet } from "lib/fetchData";

// React.ComponentType<React.SVGProps<SVGSVGElement>>
type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

export default function MainPage({ props }) {
	console.log(props);
	const router = useRouter();

	const Item = styled(Paper)(({ theme }) => ({
		// background image 삽입
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		width: 200,
		height: 186,
		padding: theme.spacing(9),
		justifyContent: "center",
		textAlign: "center",
	}));

	const [searchTerm, setSearchTerm] = useState<string>("");

	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		console.log("너는?", searchTerm);
		if (searchTerm) {
			router.push({
				pathname: "/magazines",
				query: {
					regin_id: searchTerm,
					query_type: "hot",
					base: 0,
					limit: 8,
				},
			});
		}
		setSearchTerm("");
	};

	const continentClick = (item: string) => {
		let contient = item.toLowerCase().replace(/ /g, "_");
		router.push({
			pathname: "/magazines",
			query: {
				continent: contient,
				query_type: "hot",
				base: 0,
				limit: 8,
			},
		});
	};

	return (
		<>
			<div tw="w-full">
				<div tw="text-white absolute top-36 left-16 z-1 font-serif text-center pt-20">
					<div tw="font-light text-[28px]">
						Share your story with people all around the world from
						Santiago.
						<br />
						Santiago will translate your writing into various
						languages and distribute it worldwide
						<br /> Let your words spread a cross the globe
					</div>
					<div tw="pt-8 text-[36px]">
						Expand your reputation worldwide.
					</div>
					<div tw="pt-40 [text-shadow:_0px_0px_1px_#D4D4D4]">
						Find out how to earn money with Santiago!
						<ArrowCircleRightTwoToneIcon tw="ml-2" />
					</div>
				</div>
				<div tw="relative">
					<MainSvg />
				</div>
				<div tw="mt-10 mb-16">
					<Searchbar onSubmit={searchSubmit} />
				</div>
				{/* 대륙파트 */}
				<div tw="w-[67%] mx-auto pb-[130px]">
					<Grid container spacing={2}>
						{countinents.map((item, index) => (
							<Grid item xs={4} md={3} key={index}>
								<Item
									onClick={(e) => {
										e.preventDefault();
										continentClick(item as string);
									}}
									sx={{ cursor: "pointer" }}>
									{item}
								</Item>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</>
	);
}

// 왜 undefined 뜨지??
// export async function getStaticProps() {
// 	// const regions =await data.map((item,index)=>item)

// 	const regions = await SantiagoGet("regions");

// 	return {
// 		props: {
// 			regions
// 		},
// 		revalidate: 20,
// 	};
// }
