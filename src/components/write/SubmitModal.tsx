import {
	SantiagoImagePost,
	SantiagoPostWithAutorization,
	SantiagoPutWithAutorization,
} from "lib/fetchData";
import { useRouter } from "next/router";
import React, { useState } from "react";
import tw, { styled } from "twin.macro";

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
	};
	submitType: string; //upload or update
	imageUrl: { id: string; url: string } | undefined;
};

type ImageProps = {
	url: string;
	id: string;
};

const SubmitModal = ({
	writeInfo,
	setRegionId,
	setOpenModal,
	magazineId,
	submitType,
	imageUrl,
}: Props) => {
	const Wrapper = styled.div`
		position: fixed;
		top: 98px;
		left: 0;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(5px);
		z-index: 9999999999;
	`;
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
		button {
			width: 5.9375rem;
			height: 2.6875rem;
			flex-shrink: 0;
			border-radius: 1.25rem;
			border: 1px solid #000;
		}
		div {
			word-wrap: break-word;
			text-overflow: ellipsis;
		}
	`;
	const ImgContainer = styled.div`
		width: 220px;
		height: 218px;
		background-color: #fafafa;
		position: relative;
		label {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			cursor: pointer;
		}
	`;
	const router = useRouter();

	const [imageSrc, setImageSrc]: any = useState(null);
	const [file, setFile] = useState();
	const onUpload = (e: any) => {
		const file = e.target.files[0];
		setFile(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		return new Promise<void>((resolve) => {
			reader.onload = () => {
				setImageSrc(reader.result || null);
				resolve();
			};
		});
	};

	const handleSubmit = async () => {
		let shouldReplace = false;
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
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
		console.log("submit", writeInfo);

		if (shouldReplace) {
			setRegionId("");
			alert("Your story is published successfully");
			router.replace("/profile");
			// alert("Your story is edited successfully");
			// router.replace(`/post/${magazineId}`);
		}
	};

	return (
		<Wrapper>
			<Box>
				<h1>Story Preview</h1>
				<div tw="w-full flex justify-center items-center text-center gap-20">
					<div tw="w-[450px] flex flex-col gap-8 text-lg text-left px-10">
						<div tw="w-full text-3xl">{writeInfo.title}</div>
						<div>{writeInfo.tags.map((tag) => ` #${tag}`)}</div>
					</div>
					<ImgContainer>
						<label htmlFor="image">
							Set a thumnail <br />
							in your story
						</label>
						<input
							id="image"
							name="image"
							type="file"
							accept="image/*"
							hidden
							onChange={(e) => onUpload(e)}
						/>
						<div tw="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fafafa]">
							{router.pathname === "/post/[id]/edit" ? (
								<>
									{writeInfo.imageUrlIds[0] && (
										<img
											src={
												imageSrc ||
												writeInfo.imageUrlIds[0]
											}
											alt="preview-img"
											width={"100%"}
										/>
									)}
								</>
							) : (
								<>
									{imageSrc && (
										<img
											src={imageSrc}
											alt="preview-img"
											width={"100%"}
										/>
									)}
								</>
							)}
						</div>
					</ImgContainer>
				</div>
				<div tw="flex gap-6 mt-20">
					<button onClick={() => setOpenModal(false)}>Cancel</button>
					<button tw="bg-mint" onClick={handleSubmit}>
						{router.pathname === "/post/[id]/edit"
							? "Edit"
							: "Publish"}
					</button>
				</div>
			</Box>
		</Wrapper>
	);
};

export default SubmitModal;
