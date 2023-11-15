import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
	type: string;
	setTextType: (
		event: React.MouseEvent<HTMLElement>,
		newType: string | null,
	) => void;
}

export default function TypeToggleButtonGroup({
	type,
	setTextType,
}: Props) {
	return (
		<>
			<ToggleButtonGroup
				value={type}
				exclusive
				onChange={setTextType}
				aria-label="text alignment">
				<ToggleButton
					value="total_views"
					aria-label="total_views"
					defaultChecked
					sx={{
						height: 20,
						fontSize: "12px",
						textTransform: "none",
						"&.Mui-selected, &.Mui-selected:hover": {
							backgroundColor: "#828282",
							color: "white",
						},
					}}>
					Total Views
				</ToggleButton>
				<ToggleButton
					value="picture"
					aria-label="picture"
					sx={{
						height: 20,
						fontSize: "12px",
						textTransform: "none",
						"&.Mui-selected, &.Mui-selected:hover": {
							backgroundColor: "#828282",
							color: "white",
						},
					}}>
					Picture
				</ToggleButton>
				<ToggleButton
					value="writing"
					aria-label="writing"
					sx={{
						height: 20,
						fontSize: "12px",
						textTransform: "none",
						"&.Mui-selected, &.Mui-selected:hover": {
							backgroundColor: "#828282",
							color: "white",
						},
					}}>
					Writing
				</ToggleButton>
			</ToggleButtonGroup>
		</>
	);
}
