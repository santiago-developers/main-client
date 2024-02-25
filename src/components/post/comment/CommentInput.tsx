import tw from "twin.macro";
import { Grid, Paper } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";
import { useState } from "react";
import { SantiagoPostWithAutorization } from "lib/fetchData";
import myInfoStore from "store/myInfoStore";
import { useRouter } from "next/router";
import { CreateReplyRequestDto } from "lib/dto/reply/CreateReplyRequestDto";
import { CreateReplyResponseDto } from "lib/dto/reply/CreateReplyResponseDto";
import { CommentProps } from "types/magazines";

type CommentInputProp = {
	magazineId: string | undefined;
	parentId: string | null;
	setOpen(item: boolean): void;
	addOneForCommentList: (newComment: CommentProps) => void;
};

const CommentInput = ({
	magazineId,
	parentId,
	setOpen,
	addOneForCommentList,
}: CommentInputProp) => {
	const { id } = myInfoStore();
	const [content, setContent] = useState("");
	const router = useRouter();
	const handleCommentSubmit = () => {
		const dto: CreateReplyRequestDto = {
			content,
			userId: id,
			parentId: parentId,
		};
		const fetchData = async () => {
			await SantiagoPostWithAutorization<
				CreateReplyRequestDto,
				CreateReplyResponseDto
			>(`magazines/${magazineId}/replies`, dto).then((data) => {
				addOneForCommentList(data as CommentProps);
			});
			alert("댓글이 등록되었습니다.");
		};
		fetchData();
		setContent("");
	};

	const handleClose = () => {
		setOpen(!open);
	};

	return (
		<div tw="py-4">
			<Paper
				style={{
					paddingLeft: "18px",
					paddingRight: "18px",
					fontSize: 14,
				}}>
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item style={{ display: "flex" }}>
						<DefautUserSvg tw="w-[20px] h-[20px]" />
					</Grid>
					<Grid item xs>
						<textarea
							id="comment"
							placeholder="Add a comment..."
							tw="w-full h-full resize-none focus:outline-none"
							rows={1}
							maxLength={200}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<button tw="text-sm px-1 mr-2" onClick={handleClose}>
							Cancel
						</button>
						<button
							tw="border border-mint rounded-full text-mint text-sm px-1.5"
							onClick={
								id != ""
									? handleCommentSubmit
									: () => {
											router.push("/auth/sign-in");
									  }
							}>
							Respond
						</button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CommentInput;
