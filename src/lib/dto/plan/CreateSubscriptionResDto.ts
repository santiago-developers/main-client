export class CreateSubscriptionResDto {
    allowedLanguageCount: number;

    constructor(allowedLanguageCount: number) {
        this.allowedLanguageCount = allowedLanguageCount;
    }
}