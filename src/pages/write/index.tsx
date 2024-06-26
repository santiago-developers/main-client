import { ChangeEvent, useEffect } from "react";
import tw from "twin.macro";
import { Divider } from "@mui/material";
import CountryModal from "@utils/CountryModal";
import { useState } from "react";
import QuillEditer from "@utils/QuillEditer";
import writeStore from "store/writeStore";
import myInfoStore from "store/myInfoStore";
import Tag from "@components/write/Tag";
import { MintButtonFilledForHeader } from "@utils/MintButton";
import SubmitModal from "../../components/write/SubmitModal";
// import { useRouter } from "next/router";

const WritePage = () => {
	const style: React.CSSProperties = {
		position: "absolute",
		top: 250,
		right: 240,
		width: 650,
		margin: "0 auto",
		zIndex: 1,
		boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)",
		backgroundColor: "white",
	};
	// const router = useRouter();

	const { id } = myInfoStore();
	// 추후 authentication 설정 필요
	// if (!id) {
	// 	router.push("/auth/sign-in");
	// }
	const { regionId, setRegionId } = writeStore();
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");

	const [isOpen, setIsOpen] = useState(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [tags, setTags] = useState<string[]>([]);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	let locale;

	const writeInfo = {
		title,
		content,
		regionId,
		userId: id,
		tags,
		imageUrlIds: [""],
		language: "",
	};

	useEffect(() => {
		locale = navigator.language;
		writeInfo.language = locale;
	}, []);

	const [openModal, setOpenModal] = useState(false);
	const handleSubmitModal = () => {
		if (!writeInfo.title) {
			alert("Title is missing");
			return;
		}
		if (writeInfo.content == "<p><br></p>") {
			alert("Content is missing");
			return;
		}
		if (!writeInfo.regionId) {
			alert("Please select a region");
			return;
		}
		setOpenModal(true);
	};

	return (
		<div tw="min-h-screen bg-[#FAFAFA] flex justify-center">
			<div tw="w-[866px] h-full bg-white p-10">
				<div tw="w-full">
					<input
						placeholder="Please enter your title"
						tw="text-2xl pb-2 w-full"
						value={title}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
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
				<MintButtonFilledForHeader onClick={handleSubmitModal}>
					Publish
				</MintButtonFilledForHeader>
				{openModal && (
					<SubmitModal
						writeInfo={writeInfo}
						setRegionId={setRegionId}
						setOpenModal={setOpenModal}
						submitType="upload"
						magazineId={undefined}
						imageUrl={undefined}
					/>
				)}
			</div>
		</div>
	);
};

export default WritePage;
