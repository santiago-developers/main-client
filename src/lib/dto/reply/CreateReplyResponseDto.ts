import { RegionResponse } from "../region/region";

export class CreateReplyResponseDto {
	id: string;
	content: string;
	createdAt: string;
	likeCount: number;
	didILike: boolean;
	parentId: string | null;
	writer: {
		userId: string;
		name: string;
		region: RegionResponse;
		imageUrl: string;
	};

	constructor(
		id: string,
		content: string,
		createdAt: string,
		likeCount: number,
		didILike: boolean,
		parentId: string | null,
		writer: any,
	) {
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
		this.likeCount = likeCount;
		this.didILike = didILike;
		this.parentId = parentId;
		this.writer = writer;
	}
}
