import React, { useEffect, useState } from "react";
import tw from "twin.macro";

type TagComponentProps ={
	tags: string[];
	setTags(tags:string[]):void;
}

const Tag = ({ tags, setTags}:TagComponentProps) => {
	const [tagInput, setTagInput] = useState<string>("");
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
	useEffect(()=>{

	},[tags])

	return (
		<div>
			{tags?.map((tag, index) => (
				<span
					tw="max-w-max bg-[#F5F5F5] text-[#A3A3A3] rounded-xl px-3 py-1 mr-2"
					key={index}>
					{tag}
					<button onClick={() => handleTagRemove(tag)}>X</button>
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
	);
};

export default Tag;
