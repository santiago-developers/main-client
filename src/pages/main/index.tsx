import tw from "twin.macro";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import MainSvg from "@public/images/main.svg";
import { useRouter } from "next/router";
import { SantiagoGet } from "lib/fetchData";
import { RegionProps, Regions } from "types/regions";
import Continent from "@components/main/Continent";
import regionStore from "store/regionStore";
import Searchbar from "@components/main/searchBar";
import MainDescription from "@components/main/MainDescription";

export default function MainPage({
	regions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	const searchSubmit = (searchTerm: string) => {
		const searchedRegion = regions.data
			.map((item: RegionProps) => item)
			.find((item) => item.name_en === searchTerm);
		if (searchedRegion) {
			router.push({
				pathname: "/magazineList",
				query: {
					region_id: searchedRegion.regionId,
					title: searchedRegion.name_en,
				},
			});
		} else {
			alert("You have no result. Try Again");
		}
	};

	return (
		<>
			<div tw="w-full flex flex-col justify-center items-center relative">
				<MainDescription />
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
