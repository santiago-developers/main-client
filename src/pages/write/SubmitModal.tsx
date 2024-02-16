import Tag from "@components/write/Tag";
import { SantiagoImagePost, SantiagoPostWithAutorization } from "lib/fetchData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	setOpenModal(item: boolean): void;
	setRegionId(item: string): void;
	setTags(item: string[]): void;
	setTitle(item: string): void;
	setImgUrlId(item: string): void;
	writeInfo: {
		title: string;
		content: string;
		regionId: string;
		tags: string[];
		language: string;
		imageUrlIds: string[];
	};
};

type ImageProps = {
	url: string;
	id: string;
};

const SubmitModal = ({ writeInfo, setRegionId, setOpenModal,setTitle,setTags,setImgUrlId }: Props) => {
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
		input {
			border-bottom: 1px solid grey;
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

	const [file, setFile] =useState();
	const onUpload = (e: any) => {
		const file = e.target.files[0];
		setFile(file)
		const reader = new FileReader();
		reader.readAsDataURL(file);
		return new Promise<void>((resolve) => {
			reader.onload = () => {
				setImageSrc(reader.result || null); // 파일의 컨텐츠
				resolve();
			};
		});
	};
	// const {
	// 	title,
	// 	content,
	// 	regionId,
	// 	userId,
	// 	tags,
	// 	language,
	// 	imageUrlIds,
	// }=writeInfo

	const handleSubmit = () => {
		const fetchData = async () => {
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const imgData:ImageProps = await SantiagoImagePost(formData);
				setImgUrlId(imgData?.id)
			}

			const writing = await SantiagoPostWithAutorization(
				"magazines",
				writeInfo,
			);
			console.log(writing)
		};
		fetchData();
		setRegionId("");
		setImgUrlId("");
		alert("Your story is published successfully");
		// router.push("/profile");
	};

	return (
		<Wrapper>
			<Box>
				<h1>Story Preview</h1>
				<div tw="flex justify-center items-center text-center gap-20">
					<div tw="flex flex-col gap-8 text-lg">
						<input
							id="title"
							name="title"
							type="text"
							value={writeInfo.title}
							tw="text-2xl"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Tag tags={writeInfo.tags} setTags={setTags} />

						<input id="tag" name="tag" type="text" value={writeInfo.tags.map((tag)=>tag)} />
					</div>
					<ImgContainer>
						<label htmlFor="image">대표 이미지</label>
						<input
							id="image"
							name="image"
							type="file"
							accept="image/*"
							hidden
							onChange={(e) => onUpload(e)}
						/>
						<div tw="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fafafa]">
							{imageSrc && (
								<img
									src={imageSrc}
									alt="preview-img"
									width={"100%"}
								/>
							)}
						</div>
					</ImgContainer>
				</div>
				<div tw="flex gap-6 mt-20">
					<button onClick={() => setOpenModal(false)}>Cancel</button>
					<button tw="bg-mint" onClick={handleSubmit}>
						Publish
					</button>
				</div>
			</Box>
		</Wrapper>
	);
};

export default SubmitModal;
