export type MagazineProps = {
	id?: string;
	magazineId?: string;
	title: string;
	content: string;
	createdAt: string;
	photoLikeCount: number;
	writingLikeCount: number;
	writer: WriterProps;
	tags?: TagProps[];
	imageUrl?: string;
};

export type WriterProps = {
	id: string;
	imageUrl?: string;
	name: string;
	region: RegionProps;
};

export type RegionProps = {
	name_en: string;
};

export type TagProps = {
	tagId: string;
	tag: string;
};
