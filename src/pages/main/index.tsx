import type { NextPage } from "next";
import LogoSvg from "@public/images/logo.svg";
import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";
import MainSvg from "@public/images/main.svg";
import MainBottomSvg from "@public/images/mainBottom.svg";
import { Grid, Paper } from "@mui/material";
import Searchbar from "@components/main/searchBar";
import { useRouter } from "next/router";
import { experimentalStyled as styled } from "@mui/material/styles";
import { regions } from "@statics/region";
import { useState, useRef } from "react";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";

// React.ComponentType<React.SVGProps<SVGSVGElement>>

const MainPage: NextPage = () => {
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

	const anchorEl = useRef<HTMLDivElement>(null);
	const [searchTerm, setSearchTerm] = useState("");

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
					{/* 타이핑 시, 검색창 밑으로 해당하는 국가가 리스트 형식으로 나타납니다. */}
					<Searchbar
						onSubmit={(searchTerm: string) => {
							// 각 나라별 magazine page로 이동
							router.push({
								query: {
									search: searchTerm,
								},
							});
							setSearchTerm(searchTerm);
						}}
						inputProps={
							{
								// onFocus: () => setOpen(true),
							}
						}
					/>
				</div>
				{/* 나라파트 */}
				<div tw="w-[67%] mx-auto">
					<Grid container spacing={2}>
						{regions.map((item, index) => (
							<Grid item xs={4} md={3} key={index}>
								<Item>{item}</Item>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</>
	);
};

export default MainPage;
