import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import PhotoSvg from "@public/images/photo.svg";
import WritingSvg from "@public/images/writing.svg";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { SantiagoGet } from "lib/fetchData";
import { MagazineProps } from "types/magazines";

type MagazinesProps = {
	selectedType: string;
	regionId: string;
	searchTerm: string;
};

const Magazines = ({ selectedType, regionId, searchTerm }: MagazinesProps) => {
	const [magazines, setMagazines] = useState([]);
	const getData = async () => {
		const query_type = selectedType.toLowerCase().replace(/ /g, "-");
		const magazineList: string[] = await SantiagoGet(
			`magazines?${regionId ? `region_id=${regionId}&` : ""}query_type=${
				query_type || "hot"
			}&base=0&limit=9${searchTerm ? `&search=${searchTerm}` : ""}`,
		);
		setMagazines(magazineList.data);
	};

	useEffect(() => {
		getData();
	}, [selectedType, regionId, searchTerm]);

	return (
		<div tw="self-start w-full grid grid-cols-3 gap-10 pr-8">
			{magazines.map((item: MagazineProps) => (
				<div
					tw="w-[220px] h-[290px] flex flex-col items-center justify-between mb-3"
					key={item.id}>
					{/* writer정보 */}
					<div tw=" w-full h-[30px] flex justify-between">
						<div tw="flex">
							<Image
								src={
									item.writer.imageUrl ||
									"/images/defaultUser.svg"
								}
								alt="profile"
								width={30}
								height={30}
							/>
							<div tw="flex flex-col justify-center pl-2">
								<span tw="text-sm">{item.writer.name}</span>
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
					<Link href={`/post/${item.id}`}>
						<div tw="relative w-[220px] h-[218px] rounded-2xl my-1 overflow-hidden">
							<Image
								src={item.imageUrl || "/images/post.svg"}
								alt="postImage"
								fill
								
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="text-overflow" tw="w-full">
							{item.title}
						</div>
						<div tw="w-full text-xs text-[#A3A3A3]">
							{dayjs(item.createdAt).format("MMM DD, YYYY")}
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default Magazines;
