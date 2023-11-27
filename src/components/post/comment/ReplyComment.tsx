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
import CommentInput from "./CommentInput";

type ReplyCommentProps = {
	magazineId: string | undefined;
	parentId: string | null;
	open: boolean;
	setOpen(item: boolean): void;
	index: number;
	setSelectedCommentIdx: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	isSelected: boolean;
};

const ReplyComment = ({
	magazineId,
	open,
	setOpen,
	parentId,
	commentList,
	setSelectedCommentIdx,
	isSelected,
}: ReplyCommentProps) => {
	const { id } = myInfoStore();
	const [editedContent, setEditedContent] = useState("");
	const onSelectCommentIdx = (
		e: React.MouseEvent<HTMLButtonElement>,
		index,
	) => {
		setSelectedCommentIdx(index);
	};

	const handleEdit = async (replyId: string) => {
		// await SantiagoPutWithAutorization(
		// 	`magazines/${magazineId}/replies/${replyId}`,
		// 	{ content: editedContent },
		// );
		// setSelectedCommentIdx(undefined);
	};

	const renderReplyComment = (parentId: string | null) =>
		commentList.map((comment: CommentProps, index) => (
			<>
				{comment.parentId === parentId && (
					<div>
						<Divider
							variant="fullWidth"
							style={{ margin: "10px 0" }}
						/>
						<Grid
							container
							wrap="nowrap"
							spacing={2}
							key={comment.id}>
							<Grid item>
								<div tw="flex items-center">
									<Image
										src={
											comment.writer.imageUrl ||
											"../images/defaultUser.svg"
										}
										alt="userImage"
										width={20}
										height={20}
									/>
									<div tw="pl-3">
										<span tw="text-sm">
											{comment.writer.name}
										</span>
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
										onChange={(e) =>
											setEditedContent(e.target.value)
										}
									/>
								) : (
									<p style={{ textAlign: "left" }}>
										{comment.content}
									</p>
								)}
								<p
									style={{
										textAlign: "left",
										color: "#A3A3A3",
										fontSize: 11,
									}}>
									{dayjs(comment.createdAt).format(
										"MMM DD, YYYY",
									)}
									{isSelected && (
										<button
											tw="text-mint pl-4"
											onClick={handleEdit(comment.id)}>
											edit
										</button>
									)}
								</p>
							</Grid>
							<Grid item>
								<div tw="flex items-center justify-center gap-1">
									<HeartSvg fill="#A3A3A3" />
									<span tw="text-xs">
										{comment.likeCount}
									</span>
								</div>
								<div tw="content-end">
									<CommentMoreMenu
										moreMenuType={
											comment.writer.userId === id
												? "comment"
												: "report"
										}
										replyId={comment.id}
										onSelectCommentIdx={onSelectCommentIdx}
									/>
								</div>
							</Grid>
						</Grid>
					</div>
				)}
			</>
		));

	return (
		<div tw="ml-10">
			{renderReplyComment(parentId)}
			{open && (
				<>
					<CommentInput
						magazineId={magazineId}
						parentId={parentId}
						setOpen={setOpen}
					/>
				</>
			)}
		</div>
	);
};

export default ReplyComment;
