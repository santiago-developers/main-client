import React from "react";
import { Divider, Paper } from "@mui/material";
import tw from "twin.macro";
import CountryModal from "@utils/CountryModal";
import { useState } from "react";
import { SantiagoPostWithAutorization } from "lib/fetchData";
import QuillEditer from "@utils/QuillEditer";
import writeStore from "store/writeStore";
import myInfoStore from "store/myInfoStore";
import { useRouter } from "next/navigation";
import Tag from "@components/write/Tag";
import { MintButtonFilledForHeader } from "@utils/MintButton";

const WritePage = () => {
	const style = {
		position: "absolute",
		top: 250,
		right: 240,
		width: 820,
		padding: 4,
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
	};
	const router = useRouter();

	const { id } = myInfoStore();
	// 추후 authentication 설정 필요
	const { imageIds, regionId, setImageId, setRegionId } = writeStore();
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");

	const [isOpen, setIsOpen] = useState(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [tags, setTags] = useState<string[]>([]);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const handleSubmit = () => {
		let locale = navigator.language || navigator.userLanguage;
		const dto = {
			title,
			content,
			regionId,
			userId: id,
			tags,
			language: locale,
			imageUrlIds: imageIds,
		};
		const fetchData = async () =>
			await SantiagoPostWithAutorization("magazines", dto);

		fetchData();
		if (!fetchData.data) {
			alert("Try Again");
			return;
		}
		setRegionId("");
		setImageId([]);
		alert("Your story is published successfully");
		router.push("/profile");
	};

	return (
		<div tw="min-h-screen bg-[#FAFAFA] flex justify-center">
			<div tw="w-[866px] h-full bg-white p-10">
				<div tw="w-full">
					<input
						placeholder="Please enter your title"
						tw="text-2xl pb-2 w-full"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<Divider />
				<div tw="text-sm flex justify-between my-4">
					<Tag tags={tags} setTags={setTags} />
					<button onClick={openCountry}>{selectedRegion}</button>
					{isOpen && (
						<Paper sx={style}>
							<CountryModal
								setIsOpen={setIsOpen}
								setSelectedRegion={setSelectedRegion}
							/>
						</Paper>
					)}
				</div>
				<div tw="min-h-[100vh] max-h-max">
					<QuillEditer value={content} setContent={setContent} />
				</div>
				<MintButtonFilledForHeader
					onClick={handleSubmit}>
					Publish
				</MintButtonFilledForHeader>
			</div>
		</div>
	);
};

export default WritePage;
