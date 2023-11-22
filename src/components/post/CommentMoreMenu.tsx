import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/router";
import { SantiagoDelete, SantiagoPut } from "lib/fetchData";

type MoreMenuType = {
	post: string[];
	comment: string[];
	report: stirng[];
};

const moreMenu: MoreMenuType = {
	post: ["report", "edit", "html edit", "statistics", "delete"],
	comment: ["edit", "delete", "report"],
	report: ["report"]
};

const CommentMoreMenu = ({
	moreMenuType,
	replyId,
	magazineId,
	setOpenEdit,
}) => {
	const router = useRouter();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (item: string) => {
		let type = item.target.innerText;

		if (type === "delete") {
			const fetchData = async () =>
				await SantiagoDelete(
					`magazines/{magazineId}/replies/${replyId}`,
				);
			fetchData();
		} else if (type === "edit") {
			setOpenEdit(true);
			// const fetchData = async () =>
			// 	await SantiagoPut(
			// 		`magazines/${magazineId}/replies/${replyId}`, {content}
			// 	);
			// fetchData();
		}
		setAnchorEl(null);
	};

	// useEffect(()=>{

	// },[])

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				{moreMenu[moreMenuType].map((option) => 
				 (
						<MenuItem
							key={option}
							sx={{ fontSize: 13, color: "#A3A3A3" }}
							selected={option === "Pyxis"}
							onClick={handleClose}
							>
							{option}
						</MenuItem>
					)
				)}
			</Menu>
		</div>
	);
};
export default CommentMoreMenu;
