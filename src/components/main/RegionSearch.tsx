import { SearchOutlined } from "@mui/icons-material";
import { ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import tw from "twin.macro";

type RegionSearchProps = {
	regionsList: string[];
	onSubmit(searchTerm: string): void;
};

const RegionSearch = ({ regionsList, onSubmit }: RegionSearchProps) => {
	return (
		<div tw="absolute w-full">
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					mx: 44,
					bgcolor: "white",
					color: "#A3A3A3",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
				}}>
				{!regionsList.length ? (
					<>
						<MenuItem>You have no search results.</MenuItem>
					</>
				) : (
					<>
						{regionsList.map((item, index) => (
							<MenuList
								key={index}
								sx={{ borderBottom: "0.5px solid #D4D4D4" }}
								onClick={(e) => {
									e.preventDefault();
									onSubmit(item as string);
								}}>
								<MenuItem>
									<SearchOutlined />
									<ListItemText>{item}</ListItemText>
								</MenuItem>
							</MenuList>
						))}
					</>
				)}
			</Paper>
		</div>
	);
};
export default RegionSearch;
