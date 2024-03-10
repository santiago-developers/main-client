export class CreateReplyRequestDto {
	content: string;
	userId: string;
	parentId: string | null;
	constructor(content: string, userId: string, parentId: string | null) {
		this.content = content;
		this.userId = userId;
		this.parentId = parentId;
	}
}
