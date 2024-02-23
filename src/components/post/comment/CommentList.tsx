import tw from "twin.macro";
import { Paper } from "@mui/material";
import { useState } from "react";
import { CommentProps } from "types/magazines";
import Comment from "./Comment";

type CommentListProp = {
	magazineId: string | undefined;
	commentList: CommentProps[] | undefined;
	setCommentList: React.Dispatch<
		React.SetStateAction<CommentProps[] | undefined>
	>;
	setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};

const CommentList = ({
	magazineId,
	commentList,
	setCommentList,
	setCommentCount,
}: CommentListProp) => {
	const [selectedCommentIdx, setSelectedCommentIdx] = useState<
		number | undefined
	>(undefined);

	return (
		<>
			<Paper style={{ padding: "20px 0px 20px 20px", fontSize: 14 }}>
				<div
					tw="relative h-[410px] overflow-y-scroll"
					className="customScrollbar">
					{commentList
						?.sort((a, b) => {
							return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
						})
						.map(
							(item: CommentProps, index) =>
								!item.parentId && (
									<Comment
										key={item.id}
										magazineId={magazineId}
										comment={item}
										index={index}
										setSelectedCommentIdx={
											setSelectedCommentIdx
										}
										isSelected={
											selectedCommentIdx === index
												? true
												: false
										}
										commentList={commentList}
										setCommentList={setCommentList}
										setCommentCount={setCommentCount}
									/>
								),
						)}
				</div>
			</Paper>
		</>
	);
};

export default CommentList;
