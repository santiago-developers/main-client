import React from "react";
import { Divider, Paper } from "@mui/material";
import tw from "twin.macro";
import CountryModal from "@components/post/publish/CountryModal";
import { useState } from "react";
import { SantiagoPost } from "lib/fetchData";
import QuillEditer from "@utils/QuillEditer";
import writeStore from "store/writeStore";

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
	// 추후 authentication 설정 필요
	const { imageIds, regionId } = writeStore();
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");

	const [isOpen, setIsOpen] = useState(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && tagInput.trim() !== "") {
			setTags([...tags, tagInput.trim()]);
			setTagInput("");
		}
	};
	const handleTagRemove = (removedTag: string) => {
		const updatedTags = tags.filter((tag: string) => tag !== removedTag);
		setTags(updatedTags);
	};

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const handleSubmit = () => {
		const dto = {
			title,
			content,
			regionId,
			userId: "e400750b-cd1d-4b21-bdb0-0111c813757b",
			tags,
			language: "korean",
			imageUrlIds: imageIds,
		};
		console.log(dto);
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://3.34.114.67:11009/magazines",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							// Add any other headers if needed
						},
						body: JSON.stringify(dto),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				console.log("Response data:", data);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		fetchData();
		// SantiagoPost2("magazines", dto);
	};

	return (
		<div tw="h-screen bg-[#FAFAFA] flex justify-center items-center">
			<div tw=" w-[866px] h-full bg-white p-10">
				<div>
					<input
						placeholder="Please enter your title"
						tw="text-2xl pb-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<Divider />
				<div tw="text-sm flex justify-between my-4">
					<div>
						{tags.map((tag, index) => (
							<span
								tw="max-w-max bg-[#F5F5F5] text-[#A3A3A3] rounded-xl px-3 py-1 mr-2"
								key={index}>
								{tag}
								<button onClick={() => handleTagRemove(tag)}>
									X
								</button>
							</span>
						))}
						#
						<input
							placeholder="Please enter your tag"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<button onClick={openCountry}>{selectedRegion}</button>
					{isOpen && (
						<Paper sx={style}>
							<CountryModal
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								setSelectedRegion={setSelectedRegion}
							/>
						</Paper>
					)}
				</div>

				<QuillEditer
					value={content}
					setContent={setContent}
					tw="bg-red-500"
				/>
				<button
					tw="absolute top-0 right-56 m-10 z-10 font-bold"
					onClick={handleSubmit}>
					Publish
				</button>
			</div>
		</div>
	);
};

export default WritePage;
