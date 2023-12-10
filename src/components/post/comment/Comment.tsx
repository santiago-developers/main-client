import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import Image from "next/image";
import HeartSvg from "@public/images/heart.svg";
import { Divider, Grid } from "@mui/material";
import dayjs from "dayjs";
import CommentMoreMenu from "./CommentMoreMenu";
import { CommentProps } from "types/magazines";
import myInfoStore from "store/myInfoStore";
import { SantiagoDeletetNoRes, SantiagoPostNoRes,SantiagoPutWithAutorization } from "lib/fetchData";
import ReplyComment from "./ReplyComment";

type CommentComponentProps = {
	magazineId: string | undefined;
	comment: CommentProps;
	index: number;
	setSelectedCommentIdx: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	isSelected: boolean;
	commentList: CommentProps[];
};

const Comment = ({
	magazineId,
	comment,
	index,
	setSelectedCommentIdx,
	isSelected,
	commentList,
}: CommentComponentProps) => {
	const { id } = myInfoStore();
	const replyId = comment.id;
	const [editedContent, setEditedContent] = useState(comment.content);

	const onSelectCommentIdx = (e: React.MouseEvent<HTMLButtonElement>) => {
		setSelectedCommentIdx(index);
	};

	const handleEdit = async () => {
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

	const handleClose = () => {
		// setOpen(!open);
	};

	const [like, setLike]=useState(false)
	const handleLike = async()=>{
		if(like){
			const fetchData = async()=>{
				await SantiagoPostNoRes(`magazines/${magazineId}/replies/${replyId}/like`)
			}
			fetchData()
		}else{
			// const fetchData = async()=>{
				// 	await SantiagoDeletetNoRes(`magazines/${magazineId}/replies/${replyId}/like`)
				// }
				// fetchData()
				// setLike(false)
			}
			setLike(!like)
		console.log(like);
	}

	useEffect(()=>{

	},[editedContent])

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
					{isSelected ? (
				<Grid justifyContent="left" item xs>
						<textarea
							id="commentEdit"
							autoFocus
							tw=" w-full h-full resize-none block w-full border rounded focus:outline-[#D4D4D4] p-1"
							rows={1}
							maxLength={200}
							placeholder="Editing... "
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
							/>
							</Grid>
					) : (
						<Grid justifyContent="left" item xs>
							<p style={{ textAlign: "left" }}>
								{comment.content}
							</p>
							<p
								style={{
									textAlign: "left",
									color: "#A3A3A3",
									fontSize: 11,
									marginTop:5,
								}}>
								{dayjs(comment.createdAt).format(
									"MMM DD, YYYY",
								)}
								<button
									tw="text-mint pl-4"
									onClick={handleReply}>
									reply
								</button>
							</p>
							</Grid>
					)}
					{isSelected ? (
				<Grid item>
					
							<button
								tw="border border-mint rounded-full text-mint text-sm px-1.5 content-end"
								onClick={handleEdit}>
								Upload
							</button>
							<button
								tw="block text-sm px-1 mr-2 mt-5"
								onClick={handleClose}>
								Cancel
							</button>
					
						</Grid>
					) : (
						<Grid item>
							<div tw="flex items-center justify-center gap-1">
								<HeartSvg fill={`${like ? "#E84033":"#A3A3A3"}`} onClick={(e)=> {e.stopPropagation();
								handleLike();}} tw="cursor-pointer"/>
								<span tw="text-xs">{comment.likeCount}</span>
							</div>
							<div tw="content-end mt-1">
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
					)}
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
			<Divider variant="fullWidth" style={{ marginBottom: "10px" }} />
		</div>
	);
};

export default Comment;
