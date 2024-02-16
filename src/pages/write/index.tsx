import React from "react";
import { Divider } from "@mui/material";
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
import SubmitModal from "./SubmitModal";

const WritePage = () => {
	const style = {
		position: "absolute",
		top: 250,
		right: 240,
		width: 650,
		margin: "0 auto",
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
		backgroundColor: "white",
	};
	const router = useRouter();

	const { id } = myInfoStore();
	// 추후 authentication 설정 필요
	const {regionId, setRegionId } = writeStore();
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");

	const [isOpen, setIsOpen] = useState(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [tags, setTags] = useState<string[]>([]);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [imgUrlId, setImgUrlId] = useState<string>("");

	let locale = navigator.language || navigator.userLanguage;
	const writeInfo = {
		title,
		content,
		regionId,
		userId: id,
		tags,
		language: locale,
		imageUrlIds: [imgUrlId],
	};
	const [openModal, setOpenModal] = useState(false)

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
						<div style={style}>
							<CountryModal
								setIsOpen={setIsOpen}
								setSelectedRegion={setSelectedRegion}
							/>
						</div>
					)}
				</div>
				<div tw="min-h-[100vh] max-h-max">
					<QuillEditer value={content} setContent={setContent} />
				</div>
				<MintButtonFilledForHeader onClick={handleSubmit}>
					Publish
				</MintButtonFilledForHeader>
				<SubmitModal writeInfo={writeInfo} setRegionId={setRegionId} setOpenModal={setOpenModal} setTags={setTags} setTitle={setTitle} setImgUrlId={setImgUrlId}
				/>
			</div>
		</div>
	);
};

export default WritePage;
