import React from "react";
import { Divider } from "@mui/material";
import tw from "twin.macro";
import CountryModal from "@components/post/publish/CountryModal";
import { useState } from "react";
import { SantiagoPost } from "lib/fetchData";
import QuillEditer from "@utils/QuillEditer";

const WritePage = () => {
	// 추후 authentication 설정 필요

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
	const [file, setFile] = useState<string>("");

	const handleSubmit = () => {
		const dto = {
			title,
			content,
			regionId: "0bcbbb91-89bd-48f7-9562-ec662b6fd3a2",
			userId: "e400750b-cd1d-4b21-bdb0-0111c813757b",
			tags: tags,
			language: "korean",
			imageUrlUIds: [],
		};
		console.log(dto);
		// SantiagoPost("magazines", dto);
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
					<button onClick={openCountry}>Select a country</button>
					{isOpen && (
						<CountryModal isOpen={isOpen} setIsOpen={setIsOpen} />
					)}
				</div>
				<QuillEditer value={content} setContent={setContent} />
				<button
					tw="absolute top-0 right-52 m-10 z-10 font-bold"
					onClick={handleSubmit}>
					Publish
				</button>
			</div>
		</div>
	);
};

export default WritePage;
