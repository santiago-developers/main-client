import { Grid, Paper } from "@mui/material";
import { regions } from "@statics/region";
import React from "react";
import tw from "twin.macro";
import { experimentalStyled as styled } from "@mui/material/styles";

const CountryModal = ({ isOpen }) => {
	const style = {
		position: "absolute" as "absolute",
		top: 130,
		right: 240,
		width: 628,
		padding: 4,
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
		// border: "0.5px solid black",
	};

	const Item = styled(Paper)(({ theme }) => ({
		// background image 삽입
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		height: 124,
		padding: theme.spacing(5),
		justifyContent: "center",
		textAlign: "center",
		fontSize: "12px",
	}));

	return (
		<Paper sx={style}>
			<Grid container spacing={2}>
				{regions.map((item, index) => (
					<Grid item xs={4} md={3} key={index}>
						<Item>
							<button>{item}</button>
						</Item>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};

export default CountryModal;
