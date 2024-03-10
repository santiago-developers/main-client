import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import LineSvg from "@public/images/line.svg";
import BestList from "@components/magazineList/BestList";
import CountryModal from "@utils/CountryModal";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import { Paper } from "@mui/material";
import SvgIcon from "../../components/magazineList/SvgIcon";
import magazineStore from "store/magazineStore";
import MagazineProvider from "@components/magazineList/MagazineProvider";

export default function MagazineListPage() {
	const style = {
		position: "absolute",
		top: 100,
		right: 0,
		width: 640,
		padding: 4,
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
	};

	const router = useRouter();
	const { submitType, setSorting, setSearchTerm, setSubmitType } =
		magazineStore();
	const [title, setTitle] = useState("");
	const titleFromMain = router.query.title as string | "";

	useState(() => {
		setTitle(titleFromMain);
	}, []);

	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		setTitle(searchTerm);
		setSubmitType("searchTerm");
	};

	const searchType = ["Hot", "Recent", "Best Pictures", "Best Writing"];
	const [selectedType, setSelectedType] = useState<string>("Hot");

	useEffect(() => {
		setSelectedType("Hot");
		setSorting("hot");
	}, [submitType]);

	const handleSearchType = (type: string) => {
		const query_type = type.toLowerCase().replace(/ /g, "-");
		setSorting(query_type);
		setSelectedType(type);
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div tw="flex flex-col items-center mb-20">
			<h1 tw="text-4xl font-bold">{title}</h1>
			<div tw="relative flex gap-2 pt-10">
				<MagazineSearchBar onSubmit={searchSubmit} />
				<button
					tw=" w-[134px] h-[38px] rounded bg-[#D9D9D9] text-white text-sm"
					onClick={openCountry}>
					Select a Country
				</button>
				{isOpen && (
					<Paper sx={style}>
						<CountryModal
							setIsOpen={setIsOpen}
							setTitle={setTitle}
						/>
					</Paper>
				)}
			</div>
			<div tw="flex items-center justify-center gap-32 text-center mt-10 mb-14 text-sm">
				{searchType.map((item, index) => (
					<span
						tw="flex flex-col items-center gap-4 cursor-pointer"
						key={index}
						onClick={() => handleSearchType(item)}
						className={
							selectedType === item ? "svgActive" : "svgBasic"
						}>
						<SvgIcon type={item} isActive={selectedType === item} />
						{item}
					</span>
				))}
			</div>
			<div tw="w-[1021px] flex justify-center gap-10">
				<MagazineProvider />
				<LineSvg />
				<div tw="flex flex-col gap-16">
					<BestList />
				</div>
			</div>
		</div>
	);
}
