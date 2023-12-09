import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SantiagoDelete } from "lib/fetchData";
import ReportModal from "../ReportModal";

type CommentMoreMenuProps = {
	commentType: boolean;
	replyId: string;
	onSelectCommentIdx: (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
	) => void;
	magazineId: string | undefined;
};

const CommentMoreMenu = ({
	commentType,
	replyId,
	onSelectCommentIdx,
	magazineId,
}: CommentMoreMenuProps) => {
	const [openModal, setOpenModal] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		onSelectCommentIdx();
	};

	const handleDelete = () => {
		const fetchData = async () =>
			await SantiagoDelete(`magazines/{magazineId}/replies/${replyId}`);
		fetchData();
		alert("This comment is deleted");
	};

	const handleReport = () => {
		setOpenModal(true);
	};

	return (
		<>
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
					{commentType ? (
						<>
							<MenuItem
								sx={{ fontSize: 13, color: "#A3A3A3" }}
								onClick={handleEdit}>
								edit
							</MenuItem>
							<MenuItem
								sx={{ fontSize: 13, color: "#A3A3A3" }}
								onClick={handleDelete}>
								delete
							</MenuItem>
						</>
					) : (
						<MenuItem
							sx={{ fontSize: 13, color: "#A3A3A3" }}
							onClick={handleReport}>
							report
						</MenuItem>
					)}
				</Menu>
			</div>
			{openModal && (
				<ReportModal
					setOpenModal={setOpenModal}
					magazineId={magazineId}
					replyId={replyId}
				/>
			)}
		</>
	);
};
export default CommentMoreMenu;
