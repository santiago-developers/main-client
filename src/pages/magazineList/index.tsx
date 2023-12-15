import { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import HotSvg from "@public/images/magazines/hot.svg";
import RecentSvg from "@public/images/magazines/recent.svg";
import BPicturesSvg from "@public/images/magazines/bPictures.svg";
import BWritingsSvg from "@public/images/magazines/bWritings.svg";
import LineSvg from "@public/images/line.svg";
import BestList from "@components/magazineList/BestList";
import CountryModal from "@utils/CountryModal";
import Magazines from "@components/magazineList/Magazines";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import writeStore from "store/writeStore";
import { Paper } from "@mui/material";

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
	const [title, setTitle] = useState("");
	const [continent, setContinent] = useState("");
	const regionIdFromMain = router.query.region_id;
	const continentFromMain = router.query.continent;
	const titleFromMain = router.query.title;

	useState(() => {
		setTitle(titleFromMain);
		setContinent(continentFromMain);
	}, []);

	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchSubmit = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		setTitle(searchTerm);
	};
	const searchType = ["Hot", "Recent", "Best Pictures", "Best Writing"];
	const [selectedType, setSelectedType] = useState<string>("Hot");
	const handleSearchType = (type: string) => {
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
						{item === "Hot" && (
							<HotSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Recent" && (
							<RecentSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Best Pictures" && (
							<BPicturesSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item === "Best Writing" && (
							<BWritingsSvg
								className={
									selectedType === item
										? "svgActive"
										: "svgBasic"
								}
							/>
						)}
						{item}
					</span>
				))}
			</div>
			<div tw="w-[1021px] flex justify-center gap-10">
				<Magazines
					selectedType={selectedType}
					regionIdFromMain={regionIdFromMain}
					searchTerm={searchTerm}
					continent={continent}
					setContinent={setContinent}
					setSearchTerm={setSearchTerm}
				/>
				<LineSvg />
				{/* best들 */}
				<div tw="flex flex-col gap-16">
					<BestList />
				</div>
			</div>
		</div>
	);
}
