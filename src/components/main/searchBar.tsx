import tw from "twin.macro";
import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import RegionSearch from "./RegionSearch";
import regionStore from "store/regionStore";

type SearchbarProps = {
	onSubmit(searchTerm: string): void;
	regions:RegionsProps[];
};

type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

const Searchbar = (props: SearchbarProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredList, setfilteredList] = useState<string[]>([]);
	const [regionsList, setRegionsList] = useState<string[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const{setRegionList}= regionStore();
	
	useEffect(() => {
		const regionsName = props.regions.map((item: RegionsProps) => item.name_en);
		setRegionsList(regionsName);
		setRegionList(props.regions)
	}, [props.regions]);

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
		setfilteredList(filteredRegion);
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
					regionsList={filteredList}
					onSubmit={props.onSubmit}
				/>
			)}
		</>
	);
};
export default Searchbar;
