import { RegionResponse } from "lib/dto/region/region";

export interface UserInfoProps {
	id: string;
	name: string;
	imageUrl: string | null;
	followerCount: number;
	followingCount: number;
	photoScore: number;
	writingScore: number;
	region: RegionResponse;
	languagesSubcribed: {
		id: string;
		name: string;
	};
}
