import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";
import { useState } from "react";

type Props = {
	// the outside components only needs to know if the searchbar form has been submitted
	onSubmit(searchTerm: string): void;
	// add inputProps so that we can listen to onFocus / onBlur events if needed
	inputProps: InputBaseProps;
};
const Searchbar = (props: Props) => {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		// We use the Paper component since it already contains the style that we want.
		<Paper
			component="form"
			elevation={3}
			sx={{
				display: "flex",
				alignItems: "center",
				mx: 44,
				py: 0.5,
				//클릭시
				boxShadow: "0px 0px 9px 3px rgba(0, 0, 0, 0.25)",
			}}
			onSubmit={(e) => {
				e.preventDefault();
				props.onSubmit((searchTerm as string) ?? "");
			}}>
			{/* Input base contains the fewest styles possible so it's perfect for creating custom components like these */}
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Where to go.."
				inputProps={{ "aria-label": "search" }}
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				{...props.inputProps}
			/>
			<IconButton type="submit">
				<SearchOutlined />
			</IconButton>
		</Paper>
	);
};
export default Searchbar;
