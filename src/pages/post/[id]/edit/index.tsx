import { Divider } from "@mui/material";
import QuillEditer from "@utils/QuillEditer";
import tw from "twin.macro";
import CountryModal from "@utils/CountryModal";
import { useEffect, useState } from "react";
import { SantiagoGet, SantiagoPutWithAutorization } from "lib/fetchData";
import { useRouter } from "next/router";
import myInfoStore from "store/myInfoStore";
import { MagazineProps } from "types/magazines";
import regionStore from "store/regionStore";
import { MintButtonFilledForHeader } from "@utils/MintButton";
import Tag from "@components/write/Tag";
import writeStore from "store/writeStore";
import SubmitModal from "@pages/write/SubmitModal";

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
	const { regionId, setRegionId } = writeStore();
	const { regionList } = regionStore();
	const magazineId = router.query.id?.toString();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const openCountry = () => {
		setIsOpen(!isOpen);
	};

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [postRegionId, setPostRegionId] = useState<string>("");
	const [tags, setTags] = useState<string[]>([""]);
	const [selectedRegion, setSelectedRegion] =
		useState<string>("Select a country");
	const [prevImageUrl, setprevImageUrl] = useState<string>("");

	const fetchData = async () => {
		const post: MagazineProps = await SantiagoGet(
			`magazines/${magazineId}`,
		);
		setTitle(post.title);
		setContent(post.content);
		setPostRegionId(post.regionId);
		setprevImageUrl(post.imageUrls[0]?.url);
		const regionName = regionList
			.map((item) => item)
			.filter((item) => item.regionId === post.regionId);
		setSelectedRegion(regionName[0].name_en);
		if (post.tags) {
			const tag = post.tags?.map((item: TagProps) => item.tag);
			setTags(tag);
		}
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

	const editInfo = {
		title,
		content,
		regionId: regionId || postRegionId,
		tags: tags,
		imageUrlIds: [prevImageUrl],
	};
	
	const [openModal, setOpenModal] = useState(false);
	const handleEditSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!editInfo.title) {
			alert("Title is missing");
			return;
		}
		if (editInfo.content == "<p><br></p>") {
			alert("Content is missing");
			return;
		}
		if (!editInfo.regionId) {
			alert("Please select a region");
			return;
		}
		console.log("sending",editInfo);
		setOpenModal(true);
		

		// const fetchData = async () =>
		// 	await SantiagoPutWithAutorization(`magazines/${magazineId}`, dto);
		// fetchData();
		// if (!fetchData.data) {
		// 	alert("Try Again");
		// 	return;
		// }
		// alert("Your story is edited successfully");
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
						<Tag tags={tags} setTags={setTags} />
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							openCountry();
						}}>
						{selectedRegion}
					</button>
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
			</div>
			<MintButtonFilledForHeader onClick={handleEditSubmit}>
				Edit
			</MintButtonFilledForHeader>
			{openModal && (
				<SubmitModal
					writeInfo={editInfo}
					setRegionId={setRegionId}
					setOpenModal={setOpenModal}
					magazineId={magazineId}
				/>
			)}
		</div>
	);
};

export default EditPage;
