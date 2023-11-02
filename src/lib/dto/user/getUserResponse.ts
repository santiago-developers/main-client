import { RegionResponse } from "../region/region";

export interface GetUserResponse {
    id: string;
    name: string;
    imageUrl: string | null;
    followerCount: number;
    followingCount: number;
    photoScore: number;
    writingScore: number;
    region: RegionResponse
}