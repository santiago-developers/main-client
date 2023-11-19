import Searchbar from "@components/main/searchBar";
import { RegionProps } from "types/regions";
import { useState } from "react";
import { useRouter } from "next/router";
import { SantiagoGet } from "lib/fetchData";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import tw from "twin.macro";
import DefautUserSvg from "@public/images/defaultUser.svg";
import HotSvg from "@public/images/magazines/hot.svg";
import RecentSvg from "@public/images/magazines/recent.svg";
import BPicturesSvg from "@public/images/magazines/bPictures.svg";
import BWritingsSvg from "@public/images/magazines/bWritings.svg";
import PhotoSvg from "@public/images/photo.svg";
import WritingSvg from "@public/images/writing.svg";
import LineSvg from "@public/images/line.svg";
import BestList from "@components/magazines/BestList";
import Image from "next/image";
import regionsStore from "store/regionsStore";
import dayjs from "dayjs";
import Link from "next/link";

export default function MagazineListPage({
	magazines,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	console.log(magazines);
	const { regions } = regionsStore();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		const regionsId = regions
			.map((item: RegionProps) => item)
			.find((item: RegionProps) => item.name_en === "France");

		if (searchTerm) {
			router.push({
				pathname: "/magazines",
				query: {
					regin_id: regionsId.regionId,
					query_type: "hot",
					base: 0,
					limit: 8,
				},
			});
		}
		setSearchTerm("");
	};

	const searchType = ["Hot", "Recent", "Best Pictures", "Best Writings"];

	const [selectedType, setSelectedType] = useState<string>("Hot");

	const handleSearchType = (type: string) => {
		// alert(`${type}`);
		setSelectedType(type);
	};

	return (
		<div tw="flex flex-col items-center mb-20">
			<div tw="relative w-full pt-10">
				<Searchbar onSubmit={searchSubmit} />
				<button tw="absolute bottom-0 right-72 w-[134px] h-[38px] rounded bg-[#D9D9D9] text-white">
					South Korea
				</button>
			</div>
			<div tw="flex items-center justify-center gap-32 text-center mt-10 mb-14 text-sm">
				{searchType.map((item, index) => (
					<span
						tw="flex flex-col items-center gap-4 cursor-pointer"
						key={index}
						onClick={() => handleSearchType(item)}
						className={
							selectedType === item ? "svgActive" : "svgBasic"
						}>
						{item === "Hot" && (
							<HotSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Recent" && (
							<RecentSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Best Pictures" && (
							<BPicturesSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Best Writings" && (
							<BWritingsSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item}
					</span>
				))}
			</div>
			<div tw="w-[1021px] flex justify-center items-center gap-10">
				{/* magazinelist component로 빼기 */}
				<div tw="w-full grid grid-cols-3 gap-10 pr-8">
					{magazines.data.map((item) => (
						<div
							tw="w-[220px] h-[290px] flex flex-col items-center justify-between"
							key={item.id}>
							{/* writer정보 */}
							<div tw=" w-full h-[30px] flex justify-between">
								<div tw="flex">
									<DefautUserSvg tw="w-[30px] h-[30px]" />
									<div tw="flex flex-col justify-center pl-2">
										<span tw="text-sm">
											{item.writer.name}
										</span>
										<span tw="text-xs">
											{item.writer.region.name_en}
										</span>
									</div>
								</div>
								<div tw="place-self-end flex items-center gap-1 text-sm">
									<PhotoSvg tw="w-[12px] h-[12px]" />
									{item.photoLikeCount}
									<WritingSvg tw="w-[12px] h-[12px]" />
									{item.writingLikeCount}
								</div>
							</div>
							{/* img */}
							<Link href={`/post/${item.id}`}>
								<div tw="relative w-[220px] h-[218px] bg-gray-100 rounded-2xl my-1">
									<Image
										src={
											item.imageUrl || "/images/post.svg"
										}
										alt="postImage"
										fill
									/>
								</div>
								<div tw="w-full break-words">{item.title}</div>
								<div tw="w-full text-xs text-[#A3A3A3]">
									{dayjs(item.createdAt).format(
										"MMM DD, YYYY",
									)}
								</div>
							</Link>
						</div>
					))}
				</div>
				<LineSvg />
				{/* best들 */}
				<div tw="flex flex-col gap-16">
					<BestList />
				</div>
			</div>
		</div>
	);
}

export const getStaticProps = (async () => {
	const magazines = await SantiagoGet("magazines");

	return {
		props: {
			magazines,
		},
	};
}) satisfies GetStaticProps<{
	magazines: string[];
}>;
