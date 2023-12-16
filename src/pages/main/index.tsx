import tw from "twin.macro";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import MainSvg from "@public/images/main.svg";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { SantiagoGet } from "lib/fetchData";
import { RegionProps, Regions } from "types/regions";
import Continent from "@components/main/Continent";
import regionStore from "store/regionStore";
import Searchbar from "@components/main/searchBar";

export default function MainPage({
	regions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		const searchedRegion = regions.data
			.map((item: RegionProps) => item)
			.find((item) => item.name_en === searchTerm);
		if (searchedRegion) {
			router.push({
				pathname: "/magazineList",
				query: {
					region_id: searchedRegion.regionId,
					title: searchedRegion.name_en
				},
			});
		} else {
			alert("You have no result. Try Again");
		}
		setSearchTerm("");
	};

	return (
		<>
			<div tw="w-full flex flex-col justify-center items-center relative">
				<div tw="text-white absolute top-20 left-auto z-1 font-serif text-center pt-20">
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
					<div
						tw="m-auto max-w-max mt-40 [text-shadow:_0px_0px_1px_#D4D4D4] cursor-pointer"
						onClick={() => router.push("/plans")}>
						Find out how to earn money with Santiago!
						<ArrowCircleRightTwoToneIcon tw="ml-2" />
					</div>
				</div>
				<div tw="relative">
					<MainSvg />
				</div>
				<div tw="mt-10 mb-20">
					<Searchbar onSubmit={searchSubmit} regions={regions.data} />
				</div>
				<div tw="w-[831px] pb-[130px]">
					<Continent />
				</div>
			</div>
		</>
	);
}

export const getStaticProps = (async () => {
	const regions = await SantiagoGet<Regions>("regions");
	regionStore.setState({ regionList: regions.data });

	return {
		props: {
			regions,
		},
	};
}) satisfies GetStaticProps<{
	regions: Regions;
}>;
