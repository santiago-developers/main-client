import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WriteStoreProps {
	regionId: string;
	setRegionId: (newRegionId: string) => void;
}

const writeStore = create(
	persist<WriteStoreProps>(
		(set) => ({
			regionId: "",
			setRegionId: (newRegionId) => set({ regionId: newRegionId }),
		}),
		{ name: "write" },
	),
);

export default writeStore;
