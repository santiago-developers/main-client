import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { countinents } from "@statics/region";
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
	const [searchTerm, setSearchTerm] = useState("");
	const [regionsId, setRegionsId] = useState("");
	const [names, setNames] = useState("");
	const [regionsList, setRegionsList] = useState(names);
	const [open, setOpen] = useState(false);

	const fetchData = async () => {
		const regions = await SantiagoGet("regions");
		const regionsName = regions.map(
			(item: RegionsProps, _i) => item.name_en,
		);
		setNames(regionsName);

		const regionsId = regions.map(
			(item: RegionsProps, _i) => item.regionId,
		);
		setRegionsId(regionsId);
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

		const filterdRegion = names.filter((item): string =>
			item.toLowerCase().includes(value.toLowerCase()),
		);
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
					props.onSubmit(searchTerm as string);
					alert("나는 searchbar submit");
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
