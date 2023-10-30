import { Grid, Paper } from "@mui/material";
import { countinents } from "@statics/region";
import React from "react";
import tw from "twin.macro";
import { experimentalStyled as styled } from "@mui/material/styles";

const CountryModal = ({ isOpen, setIsOpen }) => {
	const style = {
		position: "absolute" as "absolute",
		top: 250,
		right: 240,
		width: 820,
		padding: 4,
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
		// border: "0.5px solid black",
	};

	const Item = styled(Paper)(({ theme }) => ({
		// background image 삽입
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		height: 150,
		padding: theme.spacing(7),
		justifyContent: "center",
		textAlign: "center",
		fontSize: "16px",
	}));

	const chooseCountry = () => {
		setIsOpen(false);
	};

	return (
		<Paper sx={style}>
			<Grid container spacing={2}>
				{countinents.map((item, index) => (
					<Grid item xs={4} md={3} key={index}>
						<Item>
							<button onClick={chooseCountry}>{item}</button>
						</Item>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};

export default CountryModal;
