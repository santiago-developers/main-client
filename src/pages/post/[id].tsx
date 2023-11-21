import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import tw from "twin.macro";
import DefautUserSvg from "@public/images/defaultUser.svg";
import PostSvg from "@public/images/post.svg";
import MoreMenu from "@utils/MoreMenu";
import dayjs from "dayjs";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Comment from "@components/post/Comment";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import CommentInput from "@components/post/CommentInput";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { SantiagoGet } from "lib/fetchData";
import { MagazineProps, TagProps } from "types/magazines";
import Image from "next/image";
import Dompurify from "dompurify";

export default function PostPage({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	if (!post) {
		return <p>Loading...</p>;
	}
	const {
		magazineId,
		title,
		content,
		createdAt,
		photoLikeCount,
		writingLikeCount,
		writer,
		tags,
		imageUrl,
	}: MagazineProps = post;

	console.log(imageUrl);

	return (
		<div tw="w-[60%] mx-auto flex flex-col justify-center">
			<div tw="pt-6 text-2xl font-bold">{title}</div>
			<div tw="mt-4 text-sm flex justify-between">
				<div tw="flex justify-center items-center">
					<span>
						<Tooltip
							title="I like this photo"
							placement="top"
							arrow>
							<IconButton>
								<PhotoCameraBackOutlinedIcon
									sx={{ fontSize: "medium" }}
								/>
							</IconButton>
						</Tooltip>
						{writingLikeCount}
					</span>
					<span tw="">
						<Tooltip
							title="I like this writing"
							placement="top"
							arrow>
							<IconButton>
								<ArticleOutlinedIcon
									sx={{ fontSize: "medium" }}
								/>
							</IconButton>
						</Tooltip>
						{photoLikeCount}
					</span>
					<span tw="text-[#A3A3A3] pl-4">
						{dayjs(createdAt).format("MMM DD, YYYY")}
					</span>
				</div>
				<MoreMenu moreMenuType="post" />
			</div>
			<div tw="flex">
				<DefautUserSvg tw="w-[30px] h-[30px]" />
				<div tw="flex flex-col justify-center pl-4 pb-12">
					<span tw="text-sm">{writer.name}</span>
					<span tw="text-xs">{writer.region.name_en}</span>
				</div>
			</div>
			{process.browser && (
				<div
					tw="py-10 leading-9"
					dangerouslySetInnerHTML={{
						__html: Dompurify.sanitize(String(content)),
					}}
				/>
			)}
			<div tw="flex gap-3 font-bold mb-14">
				{tags?.map((item: TagProps) => (
					<div key={item.tagId}> #{item.tag}</div>
				))}
			</div>
			<div tw="text-sm">
				<ChatBubbleOutlineIcon tw="text-[16px] mr-2" />4
				<button tw="border border-mint rounded-full text-mint pr-2 ml-4">
					<ArrowDropDownIcon />
					Open Comment
				</button>
			</div>
			<div>
				<CommentInput />
				<Comment />
			</div>
		</div>
	);
}

export const getStaticPaths = async () => {
	return {
		paths: [{ params: { id: "1번" } }],
		fallback: true,
	};
};

export const getStaticProps = (async (context) => {
	const { params } = context;
	const magazineId = params.id;
	console.log(params);
	const post = await SantiagoGet<MagazineProps>(`magazines/${magazineId}`);
	if (!post) {
		return { notFound: true };
	}
	return {
		props: {
			post,
		},
	};
}) satisfies GetStaticProps<{
	post: MagazineProps;
}>;
