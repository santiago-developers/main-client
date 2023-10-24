import tw from "twin.macro";
import { Grid, Paper } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";

const CommentInput = () => {
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
							width="100%"></input>
					</Grid>
					<Grid item>
						<button tw="text-sm px-1 mr-2">Cancel</button>
						<button tw="border border-mint rounded-full text-mint text-sm px-1">
							Respond
						</button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CommentInput;
