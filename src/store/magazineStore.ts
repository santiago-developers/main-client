import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MagazineStoreProps {
	sorting: string;
	searchTerm: string;
	submitType: string;
	setSorting: (newSorting: string) => void;
	setSearchTerm: (newSearchTerm: string) => void;
	setSubmitType: (newSubmitType: string) => void;
}

const magazineStore = create(
	persist<MagazineStoreProps>(
		(set) => ({
			sorting: "hot",
			searchTerm: "",
			submitType: "region",
			setSorting: (newSorting) => set({ sorting: newSorting }),
			setSubmitType: (newSubmitType) =>
				set({ submitType: newSubmitType }),
			setSearchTerm: (newSearchTerm) =>
				set({ searchTerm: newSearchTerm }),
		}),
		{ name: "magazine" },
	),
);

export default magazineStore;
