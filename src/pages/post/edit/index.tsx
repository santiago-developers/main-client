import { Divider, tableHeadClasses } from "@mui/material";
import QuillEditer from "@utils/QuillEditer";
import "react-quill/dist/quill.snow.css";
import tw from "twin.macro";
import CountryModal from "@components/post/publish/CountryModal";
import { useEffect, useState } from "react";
import { SantiagoGet } from "lib/fetchData";

type MagazineProps = {
	magazineId: string;
	title: string;
	content: string;
	tags: TagProps[];
};

type TagProps = {
	tagId: string;
	tag: string;
};

const EditPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [editedPost, setEditedPost] = useState<MagazineProps>([]);
	const [title, setTitle] = useState<string>(editedPost.title);
	const [content, setContent] = useState<string>(editedPost.content);
	const [tags, setTags] = useState<string>("");

	const fetchData = async () => {
		const post = await SantiagoGet("magazines/tesgt");
		setEditedPost(post);
		const tag = editedPost.tags.map((item: TagProps) => "#" + item.tag);
		setTags(tag);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTitle(editedPost.title);
	}, [editedPost.title]);

	useEffect(() => {
		setContent(editedPost.content);
	}, [editedPost.content]);

	// console.log(editedPost.tags);

	// const tag = "paris";

	const editSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};
	return (
		<div tw="h-screen bg-[#FAFAFA] flex justify-center items-center">
			<form tw="w-[866px] h-full bg-white p-10 ">
				<div>
					<input
						placeholder="Please enter your title"
						tw="text-2xl pb-2 w-full"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<Divider />
				<div tw="text-sm flex justify-between my-4">
					<input
						tw="w-full"
						placeholder="Please enter your tag"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
					<button onClick={openCountry}>Select a country</button>
					{isOpen && (
						<CountryModal isOpen={isOpen} setIsOpen={setIsOpen} />
					)}
				</div>
				<QuillEditer
					value={content}
					// onChange={(e) => setContent(e.target.value)}
				/>
			</form>
			<button onSubmit={editSubmit}>Edit</button>
		</div>
	);
};

export default EditPage;