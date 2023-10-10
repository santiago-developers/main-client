import type { NextPage } from "next";
import LogoSvg from "@public/images/logo.svg";
import tw from "twin.macro";
import MainSvg from "@public/images/main.svg";
import MainBottomSvg from "@public/images/mainBottom.svg";
import { Grid, Paper } from "@mui/material";
import Searchbar from "@components/searchBar";
import { useRouter } from "next/router";
import { experimentalStyled as styled } from "@mui/material/styles";

// React.ComponentType<React.SVGProps<SVGSVGElement>>

const MainPage: NextPage = () => {
	const router = useRouter();

	const regions: string[] = [
		"All",
		"Europe",
		"Northeast Asia",
		"North America",
		"Africa",
		"Oceania",
		"Southeast Asia",
		"South America",
		"Korea",
		"Japan",
		"Spain",
		"France",
	];

	const Item = styled(Paper)(({ theme }) => ({
		// background image 삽입
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		width: 200,
		height: 186,
		padding: theme.spacing(9),
		justifyContent: "center",
		textAlign: "center",
	}));

	return (
		<div tw="w-full">
			<main tw="h-[98px] flex justify-center items-center bg-[#FAFAFA]">
				<LogoSvg tw="w-[131px]" />
				<div>
					<button>Post</button>
					{/* <Image src={} /> */}
				</div>
			</main>
			<div tw="font-serif text-center pt-20">
				<div tw="font-light text-[28px]">
					Share your story with people all around the world from
					Santiago.
					<br />
					Santiago will translate your writing into various languages
					and distribute it worldwide
					<br /> Let your words spread a cross the globe
				</div>
				<div tw="p-4 text-[36px]">
					Expand your reputation worldwide.
				</div>
			</div>
			<div tw="relative">
				<MainSvg />
				<MainBottomSvg tw="absolute bottom-0 right-0" />
			</div>
			<div tw="mt-10 mb-16">
				{/* 타이핑 시, 검색창 밑으로 해당하는 국가가 리스트 형식으로 나타납니다. */}
				<Searchbar
					onSubmit={(searchTerm: string) => {
						// when the user submits the form, we only modify the router query parameters
						// 각 나라별 magazine page로 이동
						router.push({
							query: {
								search: searchTerm,
							},
						});
					}}
					inputProps={{}}
				/>
			</div>
			<div tw="w-[67%]">
				<Grid container spacing={2}>
					{regions.map((item, index) => (
						<Grid item xs={3} key={index}>
							<Item>{item}</Item>
						</Grid>
					))}
				</Grid>
			</div>

			<footer tw="w-full h-[126px] mt-[130px] flex items-center bg-[#FAFAFA] text-gray-800">
				<div tw="text-[11px] text-center font-medium">
					<div>
						<a href="">산티아고 이용약관</a> |{" "}
						<a href="">개인정보처리방침</a>
					</div>
					<div>
						공식 이메일 : {""}
						<a href="mailto:santiagohelp@gmail.com">
							santiagohelp@gmail.com
						</a>
						<a href="">인스타그램</a> | <a href="">틱톡</a>
					</div>
					<p>Copyright © 2023 - Santiago</p>
					<LogoSvg tw="w-[80px] mt-4" />
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
