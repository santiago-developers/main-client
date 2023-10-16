import { SearchOutlined } from "@mui/icons-material";
import {
	Divider,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Paper,
} from "@mui/material";

type Props = {
	regionsList: [];
};

const RegionSearch = ({ regionsList }: Props) => {
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				mx: 44,
				// py: 0.5,
				color: "#A3A3A3",
				// fontSize: "0.875rem",

				//클릭시
				// boxShadow: "0px 0px 9px 3px rgba(0, 0, 0, 0.25)",
			}}>
			{regionsList.map((item, index) => (
				<MenuList
					key={index}
					sx={{ borderBottom: "0.5px solid #D4D4D4" }}>
					<MenuItem>
						<SearchOutlined />
						<ListItemText>{item}</ListItemText>
					</MenuItem>
				</MenuList>
			))}
			<MenuItem sx={{ py: 3, bgcolor: "#D4D4D4" }}> </MenuItem>
		</Paper>
	);
};
export default RegionSearch;
