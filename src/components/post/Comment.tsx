import { Divider, Grid, IconButton, Paper } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";
import HeartSvg from "@public/images/heart.svg";
import tw from "twin.macro";
import MoreMenu from "@utils/MoreMenu";
import { SantiagoGet } from "lib/fetchData";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import CommentMoreMenu from "./CommentMoreMenu";
import myInfoStore from "store/myInfoStore";
import { CommentProps } from "types/magazines";

type CommentListProp = {
	magazineId: string | undefined;
};


const Comment = ({ magazineId }: CommentListProp) => {
	const { id } = myInfoStore();
	const [openEdit, setOpenEdit] = useState(false);
	const [comments, setComments] = useState([]);
	const [editedContent, setEditedContent] = useState("");
	const [editedId, setEditedId] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const result = await SantiagoGet(
				`magazines/${magazineId}/replies?base=0&limit=5`,
			);
			setComments(result.data);
		};
		fetchData();
	}, []);
	// const commentId = comments?.map((item)=>item.id;

	// const isCommentUser = commentId === id;
	// console.log(isCommentUser);

	// const editeIndex =()=> {
	// 	let index =comments.map((item)=>{
	// 		if(item.id  === )
	// 	})
	// }

	return (
		<>
			<Paper style={{ padding: "30px 20px", fontSize: 14 }}>
				{comments?.map((item:CommentProps) => (
					<div key={item.id}>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid item>
								<div tw="flex items-center">
									<Image
										src={
											item.writer.imageUrl ||
											"../images/defaultUser.svg"
										}
										alt="userImage"
										width={30}
										height={30}
									/>
									<div tw="pl-3">
										<span tw="text-sm">
											{item.writer.name}
										</span>
										<br />
										<span tw="text-xs">
											{item.writer.region.name_en}
										</span>
									</div>
								</div>
							</Grid>
							<Grid justifyContent="left" item xs>
								{openEdit ? (
									<input
										placeholder="Edit a comment..."
										width="100%"
										value={editedContent}
										onChange={(e) =>
											setEditedContent(e.target.value)
										}
									/>
								) : (
									<p style={{ textAlign: "left" }}>
										{item.content}
									</p>
								)}
								<p
									style={{
										textAlign: "left",
										color: "#A3A3A3",
										fontSize: 11,
									}}>
									{dayjs(item.createdAt).format(
										"MMM DD, YYYY",
									)}
									<button tw="text-mint pl-4">reply</button>
								</p>
							</Grid>
							<Grid item>
								<div tw="flex items-center justify-center gap-1">
									<HeartSvg fill="#A3A3A3" />
									<span tw="text-xs">{item.likeCount}</span>
								</div>
								<div tw="content-end">
									<CommentMoreMenu
										moreMenuType={
											item.id === id
												? "comment"
												: "report"
										}
										replyId={item.id}
										magazineId={magazineId}
										setOpenEdit={setOpenEdit}
									/>
								</div>
							</Grid>
						</Grid>
						<Divider
							variant="fullWidth"
							style={{ margin: "10px 0" }}
						/>
					</div>
				))}
				<Grid container wrap="nowrap" spacing={2}>
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
				</Grid>
			</Paper>
		</>
	);
};

export default Comment;
