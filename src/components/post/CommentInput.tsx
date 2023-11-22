import tw from "twin.macro";
import { Grid, Paper } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";
import { useState } from "react";
import { SantiagoPostWithAutorization } from "lib/fetchData";
import myInfoStore from "store/myInfoStore";

type CommentInputProp = {
	magazineId: string | undefined;
};

const CommentInput = ({ magazineId }: CommentInputProp) => {
	const { id } = myInfoStore();
	const [content, setContent] = useState("");

	const handleCommentSubmit = () => {
		const dto = {
			content,
			userId: id,
			parentId: "",
		};
		const fetchData = async () => {
			await SantiagoPostWithAutorization(
				`magazines/${magazineId}/replies`,
				dto,
			);
		};
		fetchData();
		alert("댓글이 등록되었습니다.");
		setContent("");
	};

	return (
		<div tw="py-4">
			<Paper style={{ padding: "10px 18px", fontSize: 14 }}>
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item style={{ display: "flex" }}>
						<DefautUserSvg tw="w-[20px] h-[20px]" />
					</Grid>
					<Grid item xs>
						<input
							placeholder="Add a comment..."
							width="100%"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<button tw="text-sm px-1 mr-2">Cancel</button>
						<button
							tw="border border-mint rounded-full text-mint text-sm px-1"
							onClick={handleCommentSubmit}>
							Respond
						</button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CommentInput;
