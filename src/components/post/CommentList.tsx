import { Paper } from "@mui/material";
import HeartSvg from "@public/images/heart.svg";
import tw from "twin.macro";
import { SantiagoGet, SantiagoPut } from "lib/fetchData";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { CommentProps } from "types/magazines";
import Comment from "./Comment";

type CommentListProp = {
	magazineId: string | undefined;
};

const CommentList = ({ magazineId }: CommentListProp) => {
	const [comments, setComments] = useState([]);
	const [selectedCommentIdx, setSelectedCommentIdx] = useState<number | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			const result = await SantiagoGet(
				`magazines/${magazineId}/replies?base=0&limit=5`,
			);
			setComments(result.data);
		};
		fetchData();
	}, [comments]);
	
	return (
		<>
			<Paper style={{ padding: "30px 20px", fontSize: 14 }}>
				{comments?.map((item: CommentProps, index) => (
						<Comment key={item.id} magazineId={magazineId} comment={item} index={index} setSelectedCommentIdx={setSelectedCommentIdx} isSelected={selectedCommentIdx === index ? true :false}/>
				))}
				{/* <Grid container wrap="nowrap" spacing={2}>
					<Grid item style={{ display: "flex" }}>
						<DefautUserSvg tw="w-[30px] h-[30px]" />
						<div tw="pl-3">
							<span tw="text-sm">Michel</span>
							<br />
							<span tw="text-xs">korea</span>
						</div>
					</Grid>
					<Grid justifyContent="left" item xs zeroMinWidth>
						<p style={{ textAlign: "left" }}>
							mauris mi vehicula urna, nec feugiat quam lectus
							vitae ex. mauris mi vehicula urna, nec feugiat quam
							lectus vitae ex. mauris mi vehicula urna, nec
							feugiat quam lectus vitae ex. mauris mi vehicula
							urna, nec feugiat quam lectus
						</p>
						<p
							style={{
								textAlign: "left",
								color: "#A3A3A3",
								fontSize: 11,
							}}>
							2023.01.02
							<button tw="text-mint pl-4">reply</button>
						</p>
					</Grid>
					<Grid item>
						<IconButton color="error" size="small">
							❤
						</IconButton>
						7
						<div tw="pt-4 content-end">
							<MoreMenu moreMenuType="comment" />
						</div>
					</Grid> 
				</Grid> */}
			</Paper>
		</>
	);
};

export default CommentList;
