import TimeUnitDropDown from "@components/post/statistics/TimeUnitDropDown";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { CalendarWrapper } from "@utils/Calendar";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import tw from "twin.macro";
import moment from "moment";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TypeToggleButtonGroup from "@components/post/statistics/ToggleButtonGroup";

export default function Statistics() {
	const [date, setDate] = useState<string>();
	const [timeUnit, setTimeUnit] = useState("Daily");
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState("total_views");
	const [typeText, setTypeText] = useState("Total Views");

	useEffect(() => {
		if (!date) setDate(new Date().toLocaleDateString());
	});

	const selectTypeText = (
		event: React.MouseEvent<HTMLElement>,
		newType: string | null,
	) => {
		if (newType == "picture") {
			setTypeText("Picture Likes");
			setType("picture");
		} else if (newType == "writing") {
			setTypeText("Writing Likes");
			setType("writing");
		} else {
			setTypeText("Total Views");
			setType("total_views");
		}
	};

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
	);

	const label_x = [
		"1월",
		"2월",
		"3월",
		"4월",
		"5월",
		"6월",
		"7월",
		"8월",
		"9월",
		"10월",
		"11월",
		"12월",
	];
	const data_y = [7, 2, 4, 9, 10, 4, 0, 0, 0, 3, 0, 2];

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
	};

	const data = {
		labels: label_x,
		datasets: [
			{
				label: "none",
				data: data_y,
				borderColor: "rgb(5,195,182)",
				backgroundColor: "rgb(5,195,182)",
			},
		],
	};

	return (
		<>
			<div tw="w-[60%] mx-auto flex flex-col justify-center">
				<div tw="h-[56px]" />
				<div tw="flex justify-between">
					<div tw="relative">
						<TimeUnitDropDown
							timeUnit={timeUnit}
							setTimeUnit={setTimeUnit}
						/>
					</div>
					<div tw="relative w-[500px] flex justify-center">
						<div
							tw="text-[18px] text-[#404040] hover:cursor-pointer font-semibold flex"
							onClick={() => {
								isOpen ? setIsOpen(false) : setIsOpen(true);
							}}>
							{date ? moment(date).format("YYYY.MM.DD") : null}
							<div tw="w-[4px]" />
							<CalendarTodayOutlined />
						</div>
						<CalendarWrapper isOpen={isOpen}>
							<Calendar
								onChange={(e) => {
									if (e) {
										setDate(e.toString());
										setIsOpen(false);
									}
								}}
								value={date}
								tw="bg-white"
							/>
						</CalendarWrapper>
					</div>
					<div tw="w-[1px]" />
				</div>
				<div tw="h-[64px]" />
				<div tw="h-[54px] flex justify-between">
					<div>
						<TypeToggleButtonGroup
							type={type}
							setTextType={selectTypeText}
						/>
					</div>
					<div tw="flex place-items-end">
						<div tw="text-[12px] text-[#828282]">
							{typeText}
							<div tw="h-[4px]" />
						</div>
						<div tw="w-[12px]" />
						<div tw="text-[28px] text-[#05C3B6] font-bold">128</div>
					</div>
				</div>
				<div tw="h-[20px]" />
				<div>
					<Line options={options} data={data} />
				</div>
			</div>
		</>
	);
}
