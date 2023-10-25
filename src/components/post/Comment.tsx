import { Button, Divider, Grid, IconButton, Paper } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";
import MoreMenu from "@utils/MoreMenu";
import CommentInput from "./CommentInput";

const Comment = () => {
	return (
		<>
			<Paper style={{ padding: "30px 20px", fontSize: 14 }}>
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
				<Divider variant="fullWidth" style={{ margin: "30px 0" }} />
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
