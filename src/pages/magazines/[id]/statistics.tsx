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
import { SantiagoGet } from "lib/fetchData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { StatisticDto } from "lib/dto/statistic/StatisticDto";
import { ParsedUrlQuery } from "querystring";
import { aggregateByMonth, formatDateToDayMonth } from "lib/formatDate";

export default function Statistics({
	statistic,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [selectedData, setSelectedData] = useState(statistic.viewCount);
	const [date, setDate] = useState<string>();
	const [timeUnit, setTimeUnit] = useState("Daily");
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState("total_views");
	const [totalCount, setTotalCount] = useState(statistic.totalViewCount);
	const [typeText, setTypeText] = useState("Total Views");
	const [labelX, setLabelX] = useState(
		statistic.viewCount.map((vc) => formatDateToDayMonth(vc.date)),
	);
	const [dataY, setDataY] = useState(
		statistic.viewCount.map((vc) => vc.count),
	);

	useEffect(() => {
		if (!date) setDate(new Date().toLocaleDateString());
	});

	const selectTypeText = (
		event: React.MouseEvent<HTMLElement>,
		newType: string | null,
	) => {
		if (newType == "picture") {
			setType("picture");
		} else if (newType == "writing") {
			setType("writing");
		} else {
			setType("total_views");
		}
	};

	const selectTimeUnit = (newTimeUnit: string | null) => {
		if (newTimeUnit == "Daily") {
			setTimeUnit("Daily");
		} else if (newTimeUnit == "Monthly") {
			setTimeUnit("Monthly");
		} else {
			setTimeUnit("Monthly");
		}
	};

	useEffect(() => {
		if (type == "picture") {
			setTypeText("Picture Likes");
			setTotalCount(statistic.totalPhotoLikeCount);
			timeUnit == "Daily"
				? setSelectedData(statistic.photoLikeCount)
				: setSelectedData(aggregateByMonth(statistic.photoLikeCount));
		} else if (type == "writing") {
			setTypeText("Writing Likes");
			setTotalCount(statistic.totalWritingLikeCount);
			timeUnit == "Daily"
				? setSelectedData(statistic.writingLikeCount)
				: setSelectedData(aggregateByMonth(statistic.writingLikeCount));
		} else {
			setTypeText("Total Views");
			setTotalCount(statistic.totalViewCount);
			timeUnit == "Daily"
				? setSelectedData(statistic.viewCount)
				: setSelectedData(aggregateByMonth(statistic.viewCount));
		}
	}, [timeUnit, type]);

	useEffect(() => {
		console.log(selectedData);
		if(timeUnit == "Daily") 
			setLabelX(selectedData.map((sd) => formatDateToDayMonth(sd.date)));
		else if(timeUnit == "Monthly")
			setLabelX(selectedData.map((sd) => sd.date));
		else	
			setLabelX(selectedData.map((sd) => sd.date));
		setDataY(selectedData.map((sd) => sd.count));
	}, [selectedData]);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
	);

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
		scale: {
			y: {
				min: 0,
				suggestedMax: 6,
			},
		},
	};

	const data = {
		labels: labelX,
		datasets: [
			{
				label: "none",
				data: dataY,
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
							setTimeUnit={selectTimeUnit}
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
						<div tw="text-[28px] text-[#05C3B6] font-bold">
							{totalCount}
						</div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const param = context.params as ParsedUrlQuery;
	const id = param.id as string;
	const statistic = await SantiagoGet<StatisticDto>(
		`magazines/${id}/statistics`,
	);

	return {
		props: {
			statistic,
		},
	};
}
