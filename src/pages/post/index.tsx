import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import type { GetStaticProps, NextPage } from "next";
import myAxios from "@pages/api/axios";
import { useState, useEffect, use } from "react";
import tw from "twin.macro";
import DefautUserSvg from "@public/images/defaultUser.svg";
import PostSvg from "@public/images/post.svg";
import LongMenu from "@components/meun";
import dayjs from "dayjs";

type MagazineProps = {
	magazineId: string;
	title: string;
	content: string;
	createdAt: string;
	photoLikeCount: number;
	writingLikeCount: number;
	writer: WriterProps;
	tags: string[];
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

// SSG 적용
// page router 적용 x

export default function PostPage({ post }) {
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

	// const newFormat = dayjs("2021-02-03 12:12:10.000").format("YYYY-MM-DD");

	return (
		<div tw="w-[60%] mx-auto flex flex-col justify-center items-center ">
			<div tw="pt-6 text-2xl font-bold">{title}</div>
			<div tw="my-4 text-sm self-start flex">
				<Box sx={{ display: "flex", gap: 1 }}>
					<Typography fontSize="lg">📷{photoLikeCount}</Typography>
					<Typography fontSize="lg">📄{writingLikeCount}</Typography>
					{createdAt}
				</Box>
				<LongMenu />
			</div>
			<div tw="self-start flex">
				<DefautUserSvg />
				<div tw="flex flex-col justify-center pl-4 pb-12">
					<span tw="text-sm">{writer.name}</span>
					<span tw="text-xs">{writer.region.name_en}</span>
				</div>
			</div>
			<PostSvg />
			<div tw="pt-10 leading-9">{content}</div>
			태그
			{tags.map((item, _i) => (
				<div key={item.tagId}> #{item.tag}</div>
			))}
			<div>댓글</div>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch("http://3.34.114.67:11009/magazines/tesgt");
	// const res = await fetch(`http://3.34.114.67:11009/magazines/${magazineId}`);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const post = await res.json();
	return {
		props: {
			post,
		},
		revalidate: 10,
	};
}
