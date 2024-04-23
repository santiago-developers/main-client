import tw from "twin.macro";
import Image from "next/image";
import { IMagazine } from "types/magazines";
import PhotoSvg from "@public/images/photo.svg";
import WritingSvg from "@public/images/writing.svg";
import dayjs from "dayjs";
import Link from "next/link";
import { Avatar } from "@mui/material";

type Props = {
	item: IMagazine;
};

const Magazine = ({ item }: Props) => {
	return (
		<>
			<div tw="w-[220px] h-[290px] flex flex-col items-center justify-between mb-3">
				<div tw=" w-full h-[30px] flex justify-between">
					<div tw="flex">
						<Avatar
							src={
								item.writer.imageUrl ||
								"/images/defaultUser.svg"
							}
							sx={{ width: 30, height: 30 }}
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
							priority={true}
							src={
								item.imageUrl
									? item.imageUrl
									: "/images/post.svg"
							}
							alt="postImage"
							fill
							style={{
								objectFit: "cover",
								width: "100%",
								height: "100%",
							}}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div className="text-overflow" tw="w-[220px]">
						{item.title}
					</div>
					<div tw="w-full text-xs text-sgray">
						{dayjs(item.createdAt).format("MMM DD, YYYY")}
					</div>
				</Link>
			</div>
		</>
	);
};

Magazine.displayName = "Magazine";

export default Magazine;
