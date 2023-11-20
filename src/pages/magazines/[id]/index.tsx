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

type MagazineProps = {
	magazineId: string;
	title: string;
	content: string;
	createdAt: string;
	photoLikeCount: number;
	writingLikeCount: number;
	writer: WriterProps;
	tags: TagProps;
};

type WriterProps = {
	id: string;
	imageUrl: string;
	name: string;
	region: RegionProps;
};

type RegionProps = {
	name_en: string;
};

type TagProps = {
	tagId: string;
	tag: string;
};

export default function PostPage({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const {
		magazineId,
		title,
		content,
		createdAt,
		photoLikeCount,
		writingLikeCount,
		writer,
		tags,
	}: MagazineProps = post;
	console.log("포스트", post);
	const formatDate = dayjs(createdAt).format("MMM DD, YYYY");

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
					<span tw="text-[#A3A3A3] pl-4">{formatDate}</span>
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
			<div tw="flex">
				<PostSvg width="750" />
			</div>
			<div tw="py-10 leading-9">{content}</div>
			<div tw="flex gap-3 font-bold mb-14">
				{tags.map((item: TagProps, _i) => (
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

// 메거진 리스트 페이지 생성 먼저
export async function getStaticPaths() {
	const posts = await SantiagoGet(
		"magazines?query_type=hot&base=0&limit=100",
	);

	const paths = posts.map((post) => ({
		params: { id: post.id },
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const post = await SantiagoGet(`magazines/${params.id}`);

	return {
		props: {
			post,
		},
		revalidate: 10,
	};
}
