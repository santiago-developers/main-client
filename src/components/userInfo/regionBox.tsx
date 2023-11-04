import { ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import tw from "twin.macro";

type RegionBoxProps = {
	regionsList: RegionInterface[];
	onSubmit(regionId: string, regionName: string): void;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

interface RegionInterface {
    id: string;
    regionName: string;
}

const RegionBox = ({ regionsList, onSubmit, setOpen}: RegionBoxProps) => {
    const onClick = () => {
        setOpen(false);
    }
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
									onSubmit(item.id, item.regionName as string);
								}}>
								<MenuItem onClick={onClick}>
									<ListItemText>{item.regionName}</ListItemText>
								</MenuItem>
							</MenuList>
						))}
					</>
				)}
			</Paper>
		</div>
	);
};
export default RegionBox;
