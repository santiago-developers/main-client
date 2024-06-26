import tw from "twin.macro";
import { useState } from "react";
import { useRouter } from "next/router";
import MoreMenu from "@utils/MoreMenu";
import dayjs from "dayjs";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from "next";
import { SantiagoGet, SantiagoPostWithAutorization } from "lib/fetchData";
import { IMagazine, TagProps } from "types/magazines";
import Dompurify from "dompurify";
import CommentWrap from "@components/post/comment/CommentWrap";
import myInfoStore from "store/myInfoStore";
import HeadMeta from "@components/meta/HeadMeta";
import Link from "next/link";
import { Avatar } from "@mui/material";
import Loading from "@pages/loading";

export default function PostPage({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	const { id } = myInfoStore();

	const currentUrl =
		typeof window !== "undefined"
			? window.location.origin + router.asPath
			: "";

	const {
		magazineId,
		title,
		content,
		photoLikeCount,
		writingLikeCount,
		createdAt,
		writer,
		tags,
	}: IMagazine = post;

	const [newPhotoLikeCount, setPhotoLikeCount] = useState(photoLikeCount);
	const [newWritingLikeCount, setWritingLikeCount] =
		useState(writingLikeCount);

	if (router.isFallback) {
		return <Loading />;
	}

	const handleLike = (type: string) => {
		if (!id) {
			alert("Login in necessary");
			return;
		}
		const fetchData = async () => {
			const res: { photoLikeCount: number; writingLikeCount: number } =
				await SantiagoPostWithAutorization(
					`magazines/${magazineId}/likes?type=${type}`,
				);
			if (res) {
				if (type === "photo") {
					setPhotoLikeCount(res.photoLikeCount);
				} else {
					setWritingLikeCount(res.writingLikeCount);
				}
			}
		};
		fetchData();
	};

	return (
		<>
			<HeadMeta
				title={title}
				description={content}
				url={currentUrl}
				imageUrl={null}
			/>
			<div tw="w-[60%] h-full mb-10 mx-auto flex flex-col justify-center">
				<div tw="pt-6 text-2xl font-bold">{title}</div>
				<div tw="mt-4 text-sm flex justify-between">
					<div tw="flex justify-center items-center">
						<span tw="flex justify-center items-center">
							<Tooltip
								title="I like this photo"
								placement="top"
								arrow>
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										handleLike("photo");
									}}>
									<PhotoCameraBackOutlinedIcon
										sx={{ fontSize: "medium" }}
									/>
								</IconButton>
							</Tooltip>
							{newPhotoLikeCount}
						</span>
						<span tw="flex justify-center items-center">
							<Tooltip
								title="I like this writing"
								placement="top"
								arrow>
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										handleLike("writing");
									}}>
									<ArticleOutlinedIcon
										sx={{ fontSize: "medium" }}
									/>
								</IconButton>
							</Tooltip>
							{newWritingLikeCount}
						</span>
						<span tw="text-[#A3A3A3] pl-4">
							{dayjs(createdAt).format("MMM DD, YYYY")}
						</span>
					</div>
					<MoreMenu
						moreMenuType={writer.userId === id ? true : false}
						magazineId={magazineId}
					/>
				</div>
				<Link href={`/profile/${writer.userId}`}>
					<div tw="flex pl-2 mt-2 cursor-pointer">
						<Avatar
							src={writer.imageUrl || "../images/defaultUser.svg"}
							sx={{ width: 36, height: 36 }}
						/>
						<div tw="flex flex-col justify-center pl-4 mb-12">
							<span tw="text-sm">{writer.name}</span>
							<span tw="text-xs">{writer.region.name_en}</span>
						</div>
					</div>
				</Link>
				{process.browser && (
					<div
						tw="pt-4 leading-9"
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
				<div>
					<CommentWrap magazineId={magazineId} />
				</div>
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [{ params: { id: "2cb781b8-f545-403f-a8bb-b9062ee112be" } }],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = (async (context) => {
	const { params } = context;
	const magazineId = params?.id;
	const post = await SantiagoGet<IMagazine>(`magazines/${magazineId}`);
	if (!post) {
		return { notFound: true };
	}
	return {
		props: {
			post,
		},
	};
}) satisfies GetStaticProps<{
	post: IMagazine;
}>;
