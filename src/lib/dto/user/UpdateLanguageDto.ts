export class UpdateLanguageDto {
	isKoreanSelected: boolean;

	isChineseSelected: boolean;

	isJapaneseSelected: boolean;

	isEnglishSelected: boolean;

	isGermanSelected: boolean;

	isSpanishSelected: boolean;

	isItalianSelected: boolean;

	isFrenchSelected: boolean;

	constructor(
		isKoreanSelected: boolean,
		isChineseSelected: boolean,
		isJapaneseSelected: boolean,
		isEnglishSelected: boolean,
		isGermanSelected: boolean,
		isSpanishSelected: boolean,
		isItalianSelected: boolean,
		isFrenchSelected: boolean,
	) {
		this.isChineseSelected = isChineseSelected;
		this.isEnglishSelected = isEnglishSelected;
		this.isFrenchSelected = isFrenchSelected;
		this.isGermanSelected = isGermanSelected;
		this.isItalianSelected = isItalianSelected;
		this.isJapaneseSelected = isJapaneseSelected;
		this.isKoreanSelected = isKoreanSelected;
		this.isSpanishSelected = isSpanishSelected;
	}
}
