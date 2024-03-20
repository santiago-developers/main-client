import tw, { styled } from "twin.macro";
import React, { useEffect, useState } from "react";
import { MintButton, MintButtonFilled } from "@utils/MintButton";
import { SantiagoImagePost, SantiagoPutWithAutorization } from "lib/fetchData";
import Image from "next/image";
import RegionDropDown from "@components/userInfo/regionDropBox";
import { Wrapper } from "@utils/ModalWrapper";
import { UserInfoProps } from "types/user";
import myInfoStore from "store/myInfoStore";

type Props = {
	setOpenModal(item: boolean): void;
} & Pick<UserInfoProps, "name" | "region" | "imageUrl">;

type ImageProps = {
	url: string;
	id: string;
};

export const EditModal = ({ name, region, imageUrl, setOpenModal }: Props) => {
	const { id } = myInfoStore();
	useEffect(() => {
		setMyRegin(region.name_en);
		document.body.style.cssText = `
      	position: fixed; 
      	top: -${window.scrollY}px;
      	overflow-y: scroll;
      	width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = "";
			window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
		};
	}, []);

	const [editName, setEditName] = useState(name);
	const [regionId, setRegionId] = useState("");
	const [myRegion, setMyRegin] = useState("");
	const searchSubmit = (selectedRegionId: string) => {
		setRegionId(selectedRegionId);
	};

	const [imagePreview, setImagePreview] = useState("/images/defaultUser.svg");
	const [fileData, setFileData] = useState<File>();
	const addPreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const file = e.target.files[0];
			setFileData(file);
			if (file) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				await new Promise((resolve) => {
					reader.onload = () => {
						setImagePreview(reader.result as string);
						resolve(null);
					};
				});
			}
		}
	};

	const handleEdit = async () => {
		if (fileData) {
			const formData = new FormData();
			formData.append("file", fileData);
			const imgData: ImageProps = await SantiagoImagePost(formData);
			const dto = {
				name: editName || name,
				regionId: regionId || region.regionId,
				imageId: imgData.id,
			};
			console.log(dto);
			await SantiagoPutWithAutorization(`users/${id}`, dto);
			alert("Your profile is saved");
			setOpenModal(false);
		}
	};

	return (
		<Wrapper>
			<Box>
				<h1>Profile information</h1>
				<div>
					<div tw="w-full text-left mb-2">Photo</div>
					<div tw="w-full flex gap-5 justify-center items-center">
						<div tw="relative w-[80px] h-[80px] border border-[#70686880] rounded-full overflow-hidden">
							<input
								style={{ display: "none" }}
								id="imageInput"
								name="image"
								type="file"
								accept=".png, .jpeg, .jpg"
								onChange={(e) => addPreviewImage(e)}
							/>
							<Image
								priority
								src={imageUrl || imagePreview}
								alt="profile_image"
								fill
								style={{
									objectFit: "cover",
								}}
							/>
						</div>
						<div tw="flex flex-col text-left">
							<div tw="flex gap-4">
								<button tw="text-mint">
									<label htmlFor="imageInput">Update</label>
								</button>
								<button
									tw="text-red-600"
									onClick={() =>
										setImagePreview(
											"/images/defaultUser.svg",
										)
									}>
									Remove
								</button>
							</div>
							<p>
								Recommended: Squre JPG, PNG, at least 1,000
								pixels <br /> per side.
							</p>
						</div>
					</div>
				</div>
				{/* TODO name, regionId, imageId, */}
				<div tw="w-full text-left">
					<div tw="mb-3">Name*</div>
					<input
						id="name"
						type="text"
						placeholder="Please type your name"
						value={editName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEditName(e.target.value)
						}
					/>
					<Divider tw="mt-2" />
					<div tw="mt-7 mb-3">Region</div>
					<div tw="z-50">
						<RegionDropDown
							myRegion={myRegion}
							onSubmit={searchSubmit}
						/>
					</div>
					<Divider />
				</div>
				<div tw="flex gap-4">
					<MintButton
						onClick={(e) => {
							e.stopPropagation();
							setOpenModal(false);
						}}>
						Cancel
					</MintButton>
					<MintButtonFilled onClick={handleEdit}>
						Save
					</MintButtonFilled>
				</div>
			</Box>
		</Wrapper>
	);
};

const Box = styled.div`
	box-shadow: 0px 0px 7px 0px #50505040;
	width: 480px;
	height: 540px;
	display: flex;
	gap: 40px;
	position: absolute;
	top: calc(50% - 98px);
	left: 50%;
	transform: translate(-50%, -50%);
	flex-direction: column;
	text-align: center;
	align-items: center;
	background-color: white;
	padding: 20px 25px;
	color: #4a4747;
	h1 {
		font-weight: 600;
		font-size: 20px;
	}
	button {
		height: 2.6875rem;
		cursor: pointer;
	}
	p {
		color: #a3a3a3;
		font-size: 13px;
	}
	div {
		font-size: 15px;
	}
	input {
		padding-left: 8px;
	}
`;
const Divider = styled.div`
	border: 0.5px solid #ddd;
	margin-left: 8px;
	margin-right: 8px;
`;
