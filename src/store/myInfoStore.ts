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
	languagesSubcribed:string[];
	region: RegionResponse | null;

	setId: (newId: string) => void;
	setName: (newName: string) => void;
	setImageUrl: (newImageUrl: string | null) => void;
	setFollowerCount: (newFollowerCount: number) => void;
	setFollowingCount: (newFollowingCount: number) => void;
	setPhotoScore: (newPhotoScore: number) => void;
	setWritingScore: (newWritingScore: number) => void;
	setLanguagesSubcribed:(newLanguagesSubcribed: string[])=>void;
	imageStore : (newRegion: RegionResponse) => void;

	reset: () => void;
}


const myInfoStore = create(persist<MyInfo>((set) => ({
	id: "",
	name: "",
	imageUrl: null,
	followerCount: 0,
	followingCount: 0,
	photoScore: 0,
	writingScore: 0,
	languagesSubcribed:[],
	region: null,

	setId: (newId) => set({ id: newId }),
	setName: (newName) => set({ name: newName }),
	setImageUrl: (newImageUrl) => set({ imageUrl: newImageUrl }),
	setFollowerCount: (count) => set({ followerCount: count }),
	setFollowingCount: (count) => set({ followingCount: count }),
	setPhotoScore: (score) => set({ photoScore: score }),
	setWritingScore: (score) => set({ writingScore: score }),
	setLanguagesSubcribed:(language)=> set({languagesSubcribed:language}),
	setRegion: (region) => set({ region }),
	reset: () =>
		set({
			id: "",
			name: "",
			imageUrl: null,
			followerCount: 0,
			followingCount: 0,
			photoScore: 0,
			writingScore: 0,
			languagesSubcribed:[],
			region: null,
		}),
}), {name: 'my-info'}));

export default myInfoStore;
