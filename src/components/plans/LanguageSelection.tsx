import { LanguageDto } from "lib/dto/user/LanguageDto";
import { UpdateLanguageDto } from "lib/dto/user/UpdateLanguageDto";
import { SantiagoPut } from "lib/fetchData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import myInfoStore from "store/myInfoStore";
import tw from "twin.macro";

interface Props {
	languages: { id: string; name: string }[];
	allowedCount: number;
	isNeedToUpdate: boolean;
	setIsNeedToUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function LanguageSelection({
	languages,
	allowedCount,
	isNeedToUpdate,
	setIsNeedToUpdate,
}: Props) {
	const [isKoreanSelected, setIsKoreanSelected] = useState(false);
	const [isEnglishSelected, setIsEnglishSelected] = useState(false);
	const [isSpanishSelected, setIsSpanishSelected] = useState(false);
	const [isChineseSelected, setIsChineseSelected] = useState(false);
	const [isGermanSelected, setIsGermanSelected] = useState(false);
	const [isItalianSelected, setIsItalianSelected] = useState(false);
	const [isJapaneseSelected, setIsJapaneseSelected] = useState(false);
	const [isFrenchSelected, setIsFrenchSelected] = useState(false);
	const [currentCount, setCurrentCount] = useState(languages.length);

	const { id, setLanguagesSubcribed } = myInfoStore();

	useEffect(() => {
		setIsFrenchSelected(
			languages.find((lang) => lang.name === "French") ? true : false,
		);
		setIsJapaneseSelected(
			languages.find((lang) => lang.name === "Japanese") ? true : false,
		);
		setIsItalianSelected(
			languages.find((lang) => lang.name === "Italian") ? true : false,
		);
		setIsGermanSelected(
			languages.find((lang) => lang.name === "German") ? true : false,
		);
		setIsChineseSelected(
			languages.find((lang) => lang.name === "Chinese") ? true : false,
		);
		setIsSpanishSelected(
			languages.find((lang) => lang.name === "Spanish") ? true : false,
		);
		setIsKoreanSelected(
			languages.find((lang) => lang.name === "Korean") ? true : false,
		);
		setIsEnglishSelected(
			languages.find((lang) => lang.name === "English") ? true : false,
		);
	}, [languages]);

	useEffect(() => {
		let count = 0;
		if (isChineseSelected) count++;
		if (isEnglishSelected) count++;
		if (isKoreanSelected) count++;
		if (isJapaneseSelected) count++;
		if (isFrenchSelected) count++;
		if (isItalianSelected) count++;
		if (isGermanSelected) count++;
		if (isSpanishSelected) count++;

		setCurrentCount(count);
	}, [
		isKoreanSelected,
		isEnglishSelected,
		isSpanishSelected,
		isChineseSelected,
		isGermanSelected,
		isItalianSelected,
		isJapaneseSelected,
		isFrenchSelected,
	]);

	const updateLanguage = () => {
		if (allowedCount === currentCount) {
			setIsNeedToUpdate(false);
			SantiagoPut<UpdateLanguageDto, LanguageDto[]>(
				`users/${id}/languages`,
				new UpdateLanguageDto(
					isKoreanSelected,
					isChineseSelected,
					isJapaneseSelected,
					isEnglishSelected,
					isGermanSelected,
					isSpanishSelected,
					isItalianSelected,
					isFrenchSelected,
				),
			).then((data)=>{
				setLanguagesSubcribed(data);
			});
		} else
			alert(
				`You need to select ${allowedCount} languages`,
			);
	}

	return (
		<>
			<div>
				<div tw="flex">
					<LanguageChip
						isSelected={isEnglishSelected}
						isNeedToUpdate={isNeedToUpdate}
						name="English"
						setIsSelected={setIsEnglishSelected}
					/>
					<LanguageChip
						isSelected={isGermanSelected}
						name="German"
						isNeedToUpdate={isNeedToUpdate}
						setIsSelected={setIsGermanSelected}
					/>
					<LanguageChip
						isNeedToUpdate={isNeedToUpdate}
						isSelected={isFrenchSelected}
						name="French"
						setIsSelected={setIsFrenchSelected}
					/>
					<LanguageChip
						isSelected={isSpanishSelected}
						isNeedToUpdate={isNeedToUpdate}
						name="Spanish"
						setIsSelected={setIsSpanishSelected}
					/>
					<LanguageChip
						isSelected={isItalianSelected}
						name="Italian"
						setIsSelected={setIsItalianSelected}
						isNeedToUpdate={isNeedToUpdate}
					/>
					<LanguageChip
						isSelected={isChineseSelected}
						name="Chinese"
						setIsSelected={setIsChineseSelected}
						isNeedToUpdate={isNeedToUpdate}
					/>
					<LanguageChip
						isSelected={isJapaneseSelected}
						name="Japanese"
						setIsSelected={setIsJapaneseSelected}
						isNeedToUpdate={isNeedToUpdate}
					/>
					<LanguageChip
						isSelected={isKoreanSelected}
						name="Korean"
						setIsSelected={setIsKoreanSelected}
						isNeedToUpdate={isNeedToUpdate}
					/>
				</div>
				<div tw="h-2" />
				{isNeedToUpdate ? (
					<div tw="flex justify-end items-center">
						<div tw="flex font-light text-[14px] text-[#79747E]">
							Please select your preferred language.
						</div>
						<div tw="w-2" />
						<button
							tw="p-2 text-[#000000] text-[10px] font-semibold rounded-full"
							onClick={updateLanguage}>
							Confirm
						</button>
					</div>
				) : null}
			</div>
		</>
	);
}

interface ChipProps {
	isSelected: boolean;
	isNeedToUpdate: boolean;
	setIsSelected: Dispatch<SetStateAction<boolean>>;
	name: string;
}

function LanguageChip({
	isSelected,
	name,
	setIsSelected,
	isNeedToUpdate,
}: ChipProps) {
	return (
		<>
			{isSelected ? (
				<>
					<div
						tw="py-[8px] px-[6.5px] bg-[#000000] text-[#FFFFFF] rounded-xl mx-2 hover:cursor-pointer"
						onClick={() => {
							if (isNeedToUpdate) {
								if (isSelected) setIsSelected(false);
								else setIsSelected(true);
							}
						}}>
						{name}
					</div>
				</>
			) : (
				<>
					<div
						tw="py-[8px] px-[6.5px] bg-[#F5F5F5] rounded-xl mx-2 hover:cursor-pointer"
						onClick={() => {
							if (isNeedToUpdate) {
								if (isSelected) setIsSelected(false);
								else setIsSelected(true);
							}
						}}>
						{name}
					</div>
				</>
			)}
		</>
	);
}
