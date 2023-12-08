import tw from "twin.macro";
import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { SantiagoGet } from "lib/fetchData";
import { CommentProps } from "types/magazines";
import { PerfectScrollbar } from "tw-elements";

type CommentWrapProp = {
	magazineId: string | undefined;
};

const CommentWrap = ({ magazineId }: CommentWrapProp) => {
	const [openComment, setOpenComment] = useState(false);
	const handleComment = () => {
		setOpenComment(!openComment);
	};

	const [commentList, setCommentList] = useState<CommentProps | undefined>(
		[],
	);
	const [commentCount, setCommentCount] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			const result = await SantiagoGet(
				`magazines/${magazineId}/replies?base=0&limit=20`,
			);
			setCommentList(result.data);
			setCommentCount(result.total);
		};
		fetchData();
	}, []);



	const scrollColors = document.querySelector("#scroll-colors");
	const initScrollColors = new PerfectScrollbar(
		scrollColors,
		{},
		{
			railXColors:
				"group-[&.ps--active-x]/ps:!bg-[#90ee90] hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee]",
			railXThumbColors:
				"!bg-[#006400] group-hover/x:bg-[#999] group-focus/x:bg-[#999] group-[&.ps--clicking]/x:bg-[#999]",
			railYColors:
				"group-[&.ps--active-y]/ps:!bg-[#90ee90] hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee]",
			railYThumbColors:
				"!bg-[#006400] group-hover/y:bg-[#999] group-focus/y:bg-[#999] group-[&.ps--clicking]/y:bg-[#999]",
		},
	);

	return (
		<div 
		id="scroll-colors"
		tw="relative h-[410px] overflow-hidden ">
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
						<CommentInput magazineId={magazineId} />
						<CommentList
							magazineId={magazineId}
							commentList={commentList}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default CommentWrap;
