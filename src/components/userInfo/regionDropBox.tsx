import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SantiagoGet } from "lib/fetchData";
import { MenuList } from "@mui/material";

type RegionDropBoxProps = {
	onSubmit(regionId: string): void;
};

type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

interface RegionInterface {
	id: string;
	regionName: string;
}

export default function RegionDropDown({ onSubmit }: RegionDropBoxProps) {
	const [regionsList, setRegionsList] = React.useState<RegionInterface[]>([]);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const fetchData = async () => {
		const regions = await SantiagoGet("regions");
		return regions.data.map((item: RegionsProps) => {
			return { id: item.regionId, regionName: item.name_en };
		});
	};

	React.useEffect(() => {
		fetchData().then((data) => {
			setRegionsList(data);
		});
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [regionName, setRegionName] = React.useState(
		"Select your nationality",
	);

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				sx={{
					color: "grey",
				}}
				style={{
					textTransform: "none",
					justifyContent: "flex-start",
					fontSize: "1rem",
					backgroundColor: "transparent",
				}}
				fullWidth>
				{regionName}
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				style={{
					maxHeight: "310px",
				}}
				MenuListProps={{
					style: { width: "320px" },
					"aria-labelledby": "basic-button",
				}}>
				{regionsList.map((item, index) => (
					<MenuList
						key={index}
						sx={{
							borderBottom: "0.5px solid #D4D4D4",
							width: "full",
						}}>
						<MenuItem
							onClick={(e) => {
								e.preventDefault();
								onSubmit(item.id);
								setAnchorEl(null);
								setRegionName(item.regionName);
							}}>
							{item.regionName}
						</MenuItem>
					</MenuList>
				))}
			</Menu>
		</div>
	);
}
