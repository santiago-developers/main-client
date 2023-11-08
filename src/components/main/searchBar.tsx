import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import tw from "twin.macro";
import RegionSearch from "./RegionSearch";
import { SantiagoGet } from "lib/fetchData";

type SearchbarProps = {
	onSubmit(searchTerm: string): void;
};

type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

const Searchbar = (props: SearchbarProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [names, setNames] = useState<string[]>([]);
	const [regionsList, setRegionsList] = useState<string[]>(names);
	const [open, setOpen] = useState<boolean>(false);

	const fetchData = async () => {
		const regions = await SantiagoGet("regions");
		const regionsName = regions.data.map(
			(item: RegionsProps) => item.name_en,
		);
		setNames(regionsName);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value.trim() === "") {
			setOpen(false);
		} else {
			setOpen(true);
		}

		const filteredRegion = names.filter((item: string) =>
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
