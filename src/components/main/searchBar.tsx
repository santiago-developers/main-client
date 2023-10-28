import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";
import { useState } from "react";
import { regions } from "@statics/region";
import tw from "twin.macro";
import RegionSearch from "./RegionSearch";

type SearchbarProps = {
	onSubmit(searchTerm: string): void;
};

const Searchbar = (props: SearchbarProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [regionsList, setRegionsList] = useState(regions);
	const [open, setOpen] = useState(false);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value.trim() === "") {
			setOpen(false);
		} else {
			setOpen(true);
		}

		const filterdRegion = regions.filter((region) => {
			return region.toLowerCase().includes(value.toLowerCase());
		});
		setRegionsList(filterdRegion);
	};

	return (
		<>
			<Paper
				component="form"
				sx={{
					display: "flex",
					alignItems: "center",
					mx: 44,
					py: 0.5,
					borderTop: "0.5px solid #D4D4D4",
				}}
				onSubmit={(e) => {
					e.preventDefault();
					props.onSubmit((searchTerm as string) ?? "");
				}}>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Where to go..."
					inputProps={{ "aria-label": "search" }}
					value={searchTerm}
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
				/>
				<IconButton type="submit">
					<SearchOutlined />
				</IconButton>
			</Paper>
			{open && <RegionSearch regionsList={regionsList} />}
		</>
	);
};
export default Searchbar;
