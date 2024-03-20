import { MintButton, MintButtonFilled } from "@utils/MintButton";
import { Wrapper } from "@utils/ModalWrapper";
import {
	SantiagoImagePost,
	SantiagoPostWithAutorization,
	SantiagoPutWithAutorization,
} from "lib/fetchData";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import tw, { styled } from "twin.macro";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

type Props = {
	setOpenModal(item: boolean): void;
	setRegionId(item: string): void;
	magazineId?: string;
	writeInfo: {
		title: string;
		content: string;
		regionId: string;
		tags: string[];
		language?: string;
		imageUrlIds?: string[];
		userId: string;
	};
	submitType: string; //upload or update
	imageUrl?: { id: string; url: string };
};

type ImageProps = {
	url: string;
	id: string;
};
// TODO 이미지미리보기 오류
const SubmitModal = ({
	writeInfo,
	setRegionId,
	setOpenModal,
	magazineId,
	submitType,
	imageUrl,
}: Props) => {
	const router = useRouter();
	const fileRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState(
		imageUrl?.url || "/images/post.svg",
	);
	const [fileData, setFileData] = useState<File>();
	const [imgLoaded, setImgLoaded] = useState(false);

	const addPreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const file = e.target.files[0];
			if (file) {
				setFileData(file);
				const reader = new FileReader();
				reader.readAsDataURL(file);
				await new Promise((resolve) => {
					reader.onload = () => {
						setImagePreview(reader.result as string);
						setImgLoaded(true);
						resolve(null);
					};
				});
			}
		}
	};

	const handleClick = () => {
		fileRef?.current?.click();
	};

	const handleSubmit = async () => {
		let shouldReplace = false;
		if (fileData) {
			const formData = new FormData();
			formData.append("file", fileData);
			const imgData: ImageProps = await SantiagoImagePost(formData);
			const newWriteInfo = {
				...writeInfo,
				imageUrlIds: [imgData.id],
			};
			const writing =
				submitType == "upload"
					? await SantiagoPostWithAutorization(
							"magazines",
							newWriteInfo,
					  )
					: await SantiagoPutWithAutorization(
							`magazines/${magazineId}`,
							newWriteInfo,
					  );
			shouldReplace = true;
		} else {
			const newWriteInfo = {
				...writeInfo,
				imageUrlIds: imageUrl ? [imageUrl.id] : [],
			};
			const writing =
				submitType == "upload"
					? await SantiagoPostWithAutorization(
							"magazines",
							newWriteInfo,
					  )
					: await SantiagoPutWithAutorization(
							`magazines/${magazineId}`,
							newWriteInfo,
					  );
			shouldReplace = true;
		}

		if (shouldReplace) {
			setRegionId("");
			alert("Your story is published successfully");
			// TODO query check 필요 /profile/[user_id] 사용중
			router.replace("/profile?from=write");
		}
	};

	return (
		<Wrapper>
			<Box>
				<h1>Story Preview</h1>
				<div tw="w-full flex justify-center items-center text-center gap-14">
					<div tw="w-[450px] flex flex-col gap-8 text-lg text-left px-10">
						<div tw="w-full text-3xl">{writeInfo.title}</div>
						<div>{writeInfo.tags.map((tag) => ` #${tag}`)}</div>
					</div>
					<RemoveCircleOutlinedIcon tw="z-50" />
					<div tw="pb-6">
						<ImgContainer>
							{!imgLoaded && (
								<label htmlFor="image">
									Set a thumnail <br />
									in your story
								</label>
							)}
							<input
								style={{ display: "none" }}
								id="image"
								name="image"
								type="file"
								accept=".png, .jpeg, .jpg"
								onChange={(e) => addPreviewImage(e)}
							/>
							{router.pathname === "/post/[id]/edit" ? (
								<Image
									src={imagePreview}
									alt="preview-img"
									fill
									style={{
										objectFit: "cover",
									}}
									onClick={handleClick}
								/>
							) : (
								<Image
									src={imagePreview}
									alt="preview-img"
									fill
									style={{
										objectFit: "cover",
									}}
									onClick={handleClick}
								/>
							)}
							{imgLoaded && (
								<div
									tw="absolute top-0 right-0 z-50 cursor-pointer"
									onClick={() => {
										setImagePreview("/images/post.svg");
										setImgLoaded(false);
									}}>
									<RemoveCircleOutlinedIcon />
								</div>
							)}
						</ImgContainer>
						<p>
							Recommended: Squre JPG, PNG,
							<br /> at least 1,000 pixels per side.
						</p>
					</div>
				</div>
				<div tw="flex gap-4">
					<MintButton
						onClick={(e) => {
							e.stopPropagation();
							setOpenModal(false);
						}}>
						Cancel
					</MintButton>
					<MintButtonFilled onClick={handleSubmit}>
						{router.pathname === "/post/[id]/edit"
							? "Edit"
							: "Publish"}
					</MintButtonFilled>
				</div>
			</Box>
		</Wrapper>
	);
};

export default SubmitModal;

const Box = styled.div`
	box-shadow: 0px 0px 7px 0px #50505040;
	width: 800px;
	height: 500px;
	display: flex;
	position: absolute;
	top: calc(50% - 98px);
	left: 50%;
	transform: translate(-50%, -50%);
	flex-direction: column;
	text-align: center;
	align-items: center;
	background-color: white;
	padding: 0 25px;
	h1 {
		font-weight: 700;
		font-size: 25px;
		margin-top: 50px;
		margin-bottom: 55px;
	}
	button:last-child {
		height: 2.6875rem;
	}
	div {
		word-wrap: break-word;
		text-overflow: ellipsis;
	}
	p {
		color: #a3a3a3;
		font-size: 13px;
		margin-top: 4px;
	}
`;
const ImgContainer = styled.div`
	width: 220px;
	height: 218px;
	/* background-color: #fafafa; */
	position: relative;
	overflow: hidden;
	label {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: end;
		width: 100%;
		height: 100%;
		cursor: pointer;
		z-index: 9;
		padding-bottom: 6px;
		color: #433e3e;
		font-weight: 600;
		font-size: 13px;
	}
`;
