import { Divider } from "@mui/material";
import QuillEditer from "@utils/QuillEditer";
import tw from "twin.macro";
import CountryModal from "@utils/CountryModal";
import { useEffect, useState } from "react";
import { SantiagoGet, SantiagoPutWithAutorization } from "lib/fetchData";
import { useRouter } from "next/router";
import myInfoStore from "store/myInfoStore";
import { MagazineProps } from "types/magazines";
import regionStore from "store/regionStore";;
import { MintButtonFilledForHeader } from "@utils/MintButton";

// type MagazineProps = {
// 	magazineId: string;
// 	title: string;
// 	content: string;
// 	tags: TagProps[];
// };

type TagProps = {
	tagId: string;
	tag: string;
};

const EditPage = () => {
	const router = useRouter();
	const { id } = myInfoStore();
	const { regionList } = regionStore();
	const magazineId = router.query.id;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	// const [postRegionId, setPostRegionId] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);
	const [editedtags, setEditedTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState<string>("");
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");

	const fetchData = async () => {
		const post: MagazineProps = await SantiagoGet(
			`magazines/${magazineId}`,
		);
		setTitle(post.title);
		setContent(post.content);
		// setPostRegionId(post.regionId);

		const regionName = regionList
			.map((item) => item)
			.filter((item) => item.regionId === post.regionId);
		setSelectedRegion(regionName[0].name_en);
		const tag = post.tags?.map((item: TagProps) => "#" + item.tag);
		setTags(tag);
	};

	useEffect(() => {
		if (!id) {
			router.push("/auth/sign-in");
		}
		if (!magazineId) {
			history.back();
		}
		fetchData();
	}, []);

	const handleTagRemove = (removedTag: string) => {
		const updatedTags = tags.filter((tag: string) => tag !== removedTag);
		setTags(updatedTags);
	};

	const handleTagAdd = () => {
		if (tagInput.trim() !== "") {
			setEditedTags([...editedtags, tagInput.trim()]);
			setTagInput("");
		}
	};
	const handleEditedTagRemove = (removedTag: string) => {
		const updatedTags = editedtags.filter(
			(tag: string) => tag !== removedTag,
		);
		setEditedTags(updatedTags);
	};

	const editSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const totalTags = [...tags, ...editedtags];
		const dto = {
			title,
			content,
			regionId: postRegionId,
			tags: totalTags,
		};
		console.log("dto", dto);

		const fetchData = async () =>await SantiagoPutWithAutorization(`magazines/${magazineId}`, dto);
		fetchData();
		if (!fetchData.data) {
			alert("Try Again");
			return;
		}
		alert("Your story is edited successfully");
		// router.push("/profile");
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
					<div tw="flex items-center">
						<div>
							{tags &&
								tags.map((tag, index) => (
									<span
										tw="max-w-max bg-[#F5F5F5] text-[#A3A3A3] rounded-xl px-3 py-1 mr-2"
										key={index}>
										{tag}
										<button
											onClick={() =>
												handleTagRemove(tag)
											}>
											X
										</button>
									</span>
								))}
						</div>
						{editedtags &&
							editedtags.map((tag, index) => (
								<span
									tw="max-w-max bg-[#F5F5F5] text-[#A3A3A3] rounded-xl px-3 py-1 mr-2"
									key={index}>
									#{tag}
									<button
										onClick={() =>
											handleEditedTagRemove(tag)
										}>
										X
									</button>
								</span>
							))}
						<div tw="flex">
							#
							<input
								tw="w-full"
								placeholder="Please enter your tag"
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
							/>
							<button
								tw="w-20 border rounded-xl border-mint"
								onClick={(e) => {
									e.preventDefault();
									handleTagAdd();
								}}>
								add tag
							</button>
						</div>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							openCountry();
						}}>
						{selectedRegion}
					</button>
					{isOpen && (
						<CountryModal
							setIsOpen={setIsOpen}
							setSelectedRegion={setSelectedRegion}
							setPostRegionId={setPostRegionId}
						/>
					)}
				</div>
				<div tw="min-h-[100vh] max-h-max">
					<QuillEditer
						value={content}
						setContent={setContent}
					/>
				</div>
			</div>
			<MintButtonFilledForHeader onClick={editSubmit}>Edit</MintButtonFilledForHeader>
		</div>
	);
};

export default EditPage;
