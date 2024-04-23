import tw from "twin.macro";
import { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { SantiagoGet, SantiagoGetWithAuthorization } from "lib/fetchData";
import { CommentProps } from "types/magazines";

type CommentWrapProp = {
	magazineId: string | undefined;
};

const CommentWrap = ({ magazineId }: CommentWrapProp) => {
	const [openComment, setOpenComment] = useState(false);
	const handleComment = () => {
		setOpenComment(!openComment);
	};
	const [commentList, setCommentList] = useState<CommentProps[] | undefined>(
		[],
	);
	const [commentCount, setCommentCount] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			const result = await SantiagoGetWithAuthorization(
				`magazines/${magazineId}/replies?base=0&limit=20`,
			);
			setCommentList(result.data);
			setCommentCount(result.total);
		};
		fetchData();
	}, []);

	const addOneForCommentList = (newComment : CommentProps) => {
		setCommentList([...commentList as CommentProps[], newComment]);
		setCommentCount(commentCount + 1);
	}

	return (
		<>
			<div tw="text-sm">
				<ChatBubbleOutlineIcon tw="text-[16px] mr-2" />
				{commentCount}
				<button
					tw="border border-mint rounded-full text-mint pr-2 ml-4"
					onClick={handleComment}>
					{openComment ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
					Open Comment
				</button>
			</div>
			<div>
				{openComment && (
					<>
						<CommentInput
							magazineId={magazineId}
							addOneForCommentList={addOneForCommentList}
						/>
						<CommentList
							magazineId={magazineId}
							commentList={commentList}
							setCommentList={setCommentList}
							setCommentCount={setCommentCount}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default CommentWrap;
