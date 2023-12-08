import tw from "twin.macro";
import { Paper } from "@mui/material";
import { SantiagoGet } from "lib/fetchData";
import { useEffect, useState } from "react";
import { CommentProps } from "types/magazines";
import Comment from "./Comment";

type CommentListProp = {
	magazineId: string | undefined;
};

const CommentList = ({ magazineId }: CommentListProp) => {
	const [commentList, setCommentList] = useState([]);
	const [selectedCommentIdx, setSelectedCommentIdx] = useState<
		number | undefined
	>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			const result = await SantiagoGet(
				`magazines/${magazineId}/replies?base=0&limit=20`,
			);
			setCommentList(result.data);
		};
		fetchData();
	}, []);
	// TODO 이거 테스트
	// FIXME 이것도 테스트

	return (
		<>
			<Paper style={{ padding: "30px 20px", fontSize: 14 }}>
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
			</Paper>
		</>
	);
};

export default CommentList;
