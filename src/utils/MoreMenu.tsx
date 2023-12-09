import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportModal from "@components/post/ReportModal";
import Link from "next/link";
import { SantiagoDelete } from "lib/fetchData";

type MoreMenuTypeProp = {
	moreMenuType: boolean;
	magazineId: string |undefined;
};

const MoreMenu = ({ moreMenuType, magazineId }: MoreMenuTypeProp) => {
	const [openModal, setOpenModal] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		// const fetchData = async () =>
		// 	await SantiagoDelete(`magazines/${magazineId}`);
		// fetchData();
		alert("This post is deleted");
		history.back()
	};

	const handleReport = () => {
		setOpenModal(true);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				{moreMenuType ? (
					<div>
						<Link href={`/post/${magazineId}/edit`}>
							<MenuItem sx={{ color: "#A3A3A3" }}>
								edit
							</MenuItem>
						</Link>
						<Link href={`/post/${magazineId}/htmlEdit`}>
							<MenuItem
								sx={{color: "#A3A3A3" }}>
								html edit
							</MenuItem>
						</Link>
						<Link href={`/post/${magazineId}/statistics`}>
							<MenuItem
								sx={{color: "#A3A3A3" }}>
								statistics
							</MenuItem>
						</Link>
						<MenuItem
							sx={{color: "#A3A3A3" }}
							onClick={handleDelete}>
							delete
						</MenuItem>
					</div>
				) : (
					<MenuItem
						sx={{color: "#A3A3A3" }}
						onClick={handleReport}>
						report
					</MenuItem>
				)}
			</Menu>
			{openModal && (
				<ReportModal
					setOpenModal={setOpenModal}
					magazineId={magazineId}
				/>
			)}
		</div>
	);
};
export default MoreMenu;
