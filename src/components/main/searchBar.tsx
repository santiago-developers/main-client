import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import tw from "twin.macro";
import RegionSearch from "./RegionSearch";
import regionsStore from "store/regionsStore";

type SearchbarProps = {
	onSubmit(searchTerm: string): void;
};

type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

const Searchbar = (props: SearchbarProps) => {
	const { regions } = regionsStore();
	const [searchTerm, setSearchTerm] = useState<string>("");
	// const [names, setNames] = useState<string[]>([]);
	const [regionsList, setRegionsList] = useState<string[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const regionsName = regions.map((item: RegionsProps) => item.name_en);
		setRegionsList(regionsName);
	}, [regions]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value.trim() === "") {
			setOpen(false);
		} else {
			setOpen(true);
		}

		const filteredRegion = regionsList.filter((item: string) =>
			item.toLowerCase().includes(value.toLowerCase()),
		);
		setRegionsList(filteredRegion);
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
					width: 500,
					height: 38,
				}}
				onSubmit={(e) => {
					e.preventDefault();
					props.onSubmit(searchTerm as string);
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
			{open && (
				<RegionSearch
					regionsList={regionsList}
					onSubmit={props.onSubmit}
				/>
			)}
		</>
	);
};
export default Searchbar;
