import { LanguageDto } from "@pages/plans";
import { RegionResponse } from "lib/dto/region/region";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MyInfo {
	id: string;
	name: string;
	imageUrl: string | null;
	followerCount: number;
	followingCount: number;
	photoScore: number;
	writingScore: number;
	region: RegionResponse | null;
	languagesSubcribed: LanguageDto[];
	allowedLanguageCount: number;

	setId: (newId: string) => void;
	setName: (newName: string) => void;
	setImageUrl: (newImageUrl: string | null) => void;
	setFollowerCount: (newFollowerCount: number) => void;
	setFollowingCount: (newFollowingCount: number) => void;
	setPhotoScore: (newPhotoScore: number) => void;
	setWritingScore: (newWritingScore: number) => void;
	setRegion: (newRegion: RegionResponse) => void;
	setLanguagesSubcribed: (newLanguages: LanguageDto[]) => void;
	setAllowedLanguageCount: (newAllowedLanguageCount: number) => void;
	imageStore: (newRegion: RegionResponse) => void;
	reset: () => void;
}

const myInfoStore = create(
	persist<MyInfo>(
		(set) => ({
			id: "",
			name: "",
			imageUrl: null,
			followerCount: 0,
			followingCount: 0,
			photoScore: 0,
			writingScore: 0,
			region: null,
			languagesSubcribed: [],
			allowedLanguageCount: -1,

			setId: (newId) => set({ id: newId }),
			setName: (newName) => set({ name: newName }),
			setImageUrl: (newImageUrl) => set({ imageUrl: newImageUrl }),
			setFollowerCount: (count) => set({ followerCount: count }),
			setFollowingCount: (count) => set({ followingCount: count }),
			setPhotoScore: (score) => set({ photoScore: score }),
			setWritingScore: (score) => set({ writingScore: score }),
			setRegion: (newRegion) => set({ region: newRegion }),
			setLanguagesSubcribed: (newLanguages) =>
				set({ languagesSubcribed: newLanguages }),
			setAllowedLanguageCount: (newAllowedLanguageCount) =>
				set({ allowedLanguageCount: newAllowedLanguageCount }),
			reset: () =>
				set({
					id: "",
					name: "",
					imageUrl: null,
					followerCount: 0,
					followingCount: 0,
					photoScore: 0,
					writingScore: 0,
					region: null,
					allowedLanguageCount: -1,
					languagesSubcribed: [],
				}),
		}),
		{ name: "my-info" },
	),
);

export default myInfoStore;
