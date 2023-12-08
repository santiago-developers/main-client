import tw from "twin.macro";
import { Paper } from "@mui/material";
import {  useState } from "react";
import { CommentProps } from "types/magazines";
import Comment from "./Comment";

type CommentListProp = {
	magazineId: string | undefined;
	// commentList:string[];
};

const CommentList = ({ magazineId,commentList }: CommentListProp) => {
	const [selectedCommentIdx, setSelectedCommentIdx] = useState<
		number | undefined
	>(undefined);

	// TODO 이거 테스트
	// FIXME 이것도 테스트

	return (
		<>
			<Paper style={{ padding: "20px 0px 20px 20px", fontSize: 14}}>
				<div tw="relative h-[410px] overflow-y-scroll">
				{commentList?.map(
					(item: CommentProps, index) =>
					!item.parentId && (
						<Comment
								key={item.id}
								magazineId={magazineId}
								comment={item}
								index={index}
								setSelectedCommentIdx={setSelectedCommentIdx}
								isSelected={
									selectedCommentIdx === index ? true : false
								}
								commentList={commentList}
								/>
								),
								)}
								</div>
			</Paper>
		</>
	);
};

export default CommentList;
