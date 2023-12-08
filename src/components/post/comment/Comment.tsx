import React, { useState } from "react";
import tw from "twin.macro";
import Image from "next/image";
import HeartSvg from "@public/images/heart.svg";
import { Divider, Grid } from "@mui/material";
import dayjs from "dayjs";
import CommentMoreMenu from "./CommentMoreMenu";
import { CommentProps } from "types/magazines";
import myInfoStore from "store/myInfoStore";
import { SantiagoPutWithAutorization } from "lib/fetchData";
import ReplyComment from "./ReplyComment";

type CommentComponentProps = {
	magazineId: string | undefined;
	comment: CommentProps;
	index: number;
	setSelectedCommentIdx: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	isSelected: boolean;
};

const Comment = ({
	magazineId,
	comment,
	index,
	setSelectedCommentIdx,
	isSelected,
	commentList
}: CommentComponentProps) => {
	const { id } = myInfoStore();
	const [editedContent, setEditedContent] = useState(comment.content);

	const onSelectCommentIdx = (e: React.MouseEvent<HTMLButtonElement>) => {
		setSelectedCommentIdx(index);
	};

	const handleEdit = async () => {
		const replyId = comment.id;
		await SantiagoPutWithAutorization(
			`magazines/${magazineId}/replies/${replyId}`,
			{ content: editedContent },
		);
		setSelectedCommentIdx(undefined);
	};

	const [open, setOpen] = useState(false);
	const handleReply = () => {
		setOpen(!open);
	};

	return (
		<div>
			<Grid container wrap="nowrap" spacing={2}>
				<Grid item>
					<div tw="flex items-center">
						<Image
							src={
								comment.writer.imageUrl ||
								"../images/defaultUser.svg"
							}
							alt="userImage"
							width={30}
							height={30}
						/>
						<div tw="pl-3">
							<span tw="text-sm">{comment.writer.name}</span>
							<br />
							<span tw="text-xs">
								{comment.writer.region.name_en}
							</span>
						</div>
					</div>
				</Grid>
				<Grid justifyContent="left" item xs>
					{isSelected ? (
						<input
							type="text"
							autoFocus
							tw="w-[100%]"
							placeholder="Editing... "
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
						/>
					) : (
						<p style={{ textAlign: "left" }}>{comment.content}</p>
					)}
					<p
						style={{
							textAlign: "left",
							color: "#A3A3A3",
							fontSize: 11,
						}}>
						{dayjs(comment.createdAt).format("MMM DD, YYYY")}
						{isSelected ? (
							<button tw="text-mint pl-4" onClick={handleEdit}>
								edit
							</button>
						) : (
							<button tw="text-mint pl-4" onClick={handleReply}>
								reply
							</button>
						)}
					</p>
				</Grid>
				<Grid item>
					<div tw="flex items-center justify-center gap-1">
						<HeartSvg fill="#A3A3A3" />
						<span tw="text-xs">{comment.likeCount}</span>
					</div>
					<div tw="content-end">
						<CommentMoreMenu
							commentType={
								comment.writer.userId === id
									? true
									: false
							}
							replyId={comment.id}
							onSelectCommentIdx={onSelectCommentIdx}
							magazineId={magazineId}
						/>
					</div>
				</Grid>
			</Grid>
			<ReplyComment
				magazineId={magazineId}
				open={open}
				setOpen={setOpen}
				parentId={comment.id}
				commentList={commentList}
				isSelected={isSelected}
				setSelectedCommentIdx={setSelectedCommentIdx}
				index={index}
			/>
			<Divider variant="fullWidth" style={{ margin: "10px 0" }} />
		</div>
	);
};

export default Comment;
