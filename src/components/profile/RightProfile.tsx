import { useEffect, useState } from "react";
import tw from "twin.macro";
import MagazineProvider from "@components/magazineList/MagazineProvider";
import MagazineSearchBar from "@components/magazineList/MagazineSearchBar";
import magazineStore from "store/magazineStore";

const RightProfile = () => {
	const { setUserSearchTerm, setSubmitType } = magazineStore();

	useEffect(() => {
		setSubmitType("user_id");
		setUserSearchTerm("");
	}, []);

	const [title, setTitle] = useState("");
	const searchSubmit = (searchTerm: string) => {
		setUserSearchTerm(searchTerm);
		setTitle(searchTerm);
	};

	return (
		<div tw="w-[772px] flex flex-col gap-20 items-center">
			<h1 tw="text-4xl font-bold">{title}</h1>
			<MagazineSearchBar onSubmit={searchSubmit} />
			<MagazineProvider />
		</div>
	);
};

export default RightProfile;
