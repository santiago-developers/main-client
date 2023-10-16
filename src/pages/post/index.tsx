import Box from "@mui/joy/Box";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import Warning from "@mui/icons-material/Warning";
import { NextPage } from "next";
import tw from "twin.macro";

const PostPage: NextPage = () => {
	return (
		<div tw="w-[80%] mx-auto flex flex-col justify-center items-center text-center">
			<h1>contents페이지</h1>
			<div tw="w-[80%] text-2xl font-bold">제목</div>
			<div tw="text-sm self-start">
				<Box sx={{ display: "flex", gap: 3 }}>
					<Badge badgeContent={4}>
						<Typography fontSize="xl">🛍</Typography>
					</Badge>
					<Badge badgeContent="❕">
						<Typography fontSize="xl">🔔</Typography>
					</Badge>
					<Badge
						variant="plain"
						color="danger"
						badgeContent={<Warning />}>
						<Typography fontSize="xl">🪫</Typography>
					</Badge>
				</Box>
				좋아요, 아이콘, 날짜,{" "}
			</div>
			<div tw="text-sm self-end">report, edit, ...</div>
			<div tw="self-start">글쓴이 정보</div>
			<div>글내용</div>
			<div>태그 내용</div>
			<div>댓글</div>
		</div>
	);
};
export default PostPage;
