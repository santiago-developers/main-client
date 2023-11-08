import { Divider } from "@mui/material";
import QuillEditer from "@utils/QuillEditer";
import "react-quill/dist/quill.snow.css";
import tw from "twin.macro";
import CountryModal from "@components/post/publish/CountryModal";
import { useState } from "react";

const PostPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div tw="h-screen bg-[#FAFAFA] flex justify-center items-center">
			<div tw="w-[866px] h-full bg-white p-10">
				<div>
					<input
						placeholder="Please enter your title"
						tw="text-2xl pb-2"
					/>
				</div>
				<Divider />
				<div tw="text-sm flex justify-between my-4">
					<input placeholder="Please enter your tag" />
					<button onClick={openCountry}>Select a country</button>
					{isOpen && (
						<CountryModal isOpen={isOpen} setIsOpen={setIsOpen} />
					)}
				</div>
				<QuillEditer />
			</div>
		</div>
	);
};

export default PostPage;
