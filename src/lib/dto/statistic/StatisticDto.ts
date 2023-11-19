export class StatisticDto {
	constructor(
		totalViewCount: number,
		totalPhotoLikeCount: number,
        totalWritingLikeCount: number,
		viewCount: { date: string; count: number }[],
        photoLikeCount: { date: string; count: number }[],
        writingLikeCount : { date: string; count: number }[]
	) {
		this.totalViewCount = totalViewCount;
        this.totalPhotoLikeCount = totalPhotoLikeCount;
        this.totalWritingLikeCount = totalWritingLikeCount;
		this.viewCount = viewCount;
        this.photoLikeCount = photoLikeCount;
        this.writingLikeCount = writingLikeCount;
	}

	totalViewCount: number;
	viewCount: {
		date: string;
		count: number;
	}[];
	totalPhotoLikeCount: number;
	photoLikeCount: {
		date: string;
		count: number;
	}[];

	totalWritingLikeCount: number;

	writingLikeCount: {
		date: string;
		count: number;
	}[];
}
