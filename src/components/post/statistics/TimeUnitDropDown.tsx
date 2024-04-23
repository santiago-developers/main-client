import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import tw from "twin.macro";

interface Props {
	setTimeUnit: (newTimeUnit: string | null) => void;
	timeUnit: string;
}

export default function TimeUnitDropDown({ setTimeUnit, timeUnit }: Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		open ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<div tw="border rounded-xl absolute">
				<Button
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
					sx={{
						color: "grey",
						pl: 2,
					}}
					style={{
						width: 96,
						height: 26,
						textTransform: "none",
						justifyContent: "center",
						fontSize: "1rem",
						backgroundColor: "transparent",
					}}
					fullWidth>
					{timeUnit}
					{open ? <ArrowDropUp /> : <ArrowDropDown />}
				</Button>
				{open ? (
					<div tw="text-sgray text-center hover:cursor-pointer">
						{timeUnit !== "Daily" ? (
							<div
								onClick={(e) => {
									e.preventDefault();
									setTimeUnit("Daily");
									setAnchorEl(null);
								}}>
								Daily
							</div>
						) : null}
						{timeUnit !== "Monthly" ? (
							<div
								onClick={(e) => {
									e.preventDefault();
									setTimeUnit("Monthly");
									setAnchorEl(null);
								}}>
								Monthly
							</div>
						) : null}
						{timeUnit !== "Annual" ? (
							<div
								onClick={(e) => {
									e.preventDefault();
									setTimeUnit("Annual");
									setAnchorEl(null);
								}}>
								Annual
							</div>
						) : null}
						<div tw="h-1" />
					</div>
				) : null}
			</div>
		</>
	);
}
