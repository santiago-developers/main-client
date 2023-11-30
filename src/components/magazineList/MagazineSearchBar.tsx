import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import tw from "twin.macro";

type SearchbarProps = {
	onSubmit(searchTerm: string): void;
};

const MagazineSearchBar = ({ onSubmit }: SearchbarProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const handleSearch = (value: string) => {
		setSearchTerm(value);	
	};

	return (
		<>
			<Paper
				component="form"
				sx={{
					display: "flex",
					alignItems: "center",
					py: 0.5,
					borderTop: "0.5px solid #D4D4D4",
					width: 500,
					height: 38,
				}}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(searchTerm as string);
				}}>
				<InputBase
					sx={{ ml: 4, flex: 1 }}
					placeholder="Please enter your search word.."
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
		</>
	);
};
export default MagazineSearchBar;
