import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WriteStoreProps {
	imageIds: string[];
	regionId: string;
	setImageId: (newIds: string[]) => void;
	setRegionId: (newRegionId: string) => void;
}

const writeStore = create(
	persist<WriteStoreProps>(
		(set) => ({
			imageIds: [],
			regionId: "",
			setImageId: (newIds) => set({ imageIds: newIds }),
			setRegionId: (newRegionId) => set({ regionId: newRegionId }),
		}),
		{ name: "image" },
	),
);

export default writeStore;
