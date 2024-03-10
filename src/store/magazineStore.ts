import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MagazineStoreProps {
	sorting: string;
	searchTerm: string;
	submitType: string;
	userSearchTerm: string;
	setSorting: (newSorting: string) => void;
	setSearchTerm: (newSearchTerm: string) => void;
	setSubmitType: (newSubmitType: string) => void;
	setUserSearchTerm: (newUserSearchTerm: string) => void;
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
			setUserSearchTerm: (newUserSearchTerm) =>
				set({ userSearchTerm: newUserSearchTerm }),
		}),
		{ name: "magazine" },
	),
);

export default magazineStore;
