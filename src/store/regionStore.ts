import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegionProps } from "types/regions";

interface RegionStoreProps {
	regionList: RegionProps[];
	setRegionList: (newRegionList: RegionProps[]) => void;
}

const regionStore = create(
	persist<RegionStoreProps>(
		(set) => ({
			regionList: [],
			setRegionList: (newRegionList) =>
				set({ regionList: newRegionList }),
		}),
		{ name: "regionList" },
	),
);

export default regionStore;
