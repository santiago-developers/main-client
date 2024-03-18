import tw, { styled } from "twin.macro";
import React from "react";
import { MintButton, MintButtonFilled } from "@utils/MintButton";
import { SantiagoPutWithAutorization } from "lib/fetchData";
import Image from "next/image";

type Props = {
	setOpenModal(item: boolean): void;
};

export const EditModal = ({ setOpenModal }: Props) => {
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
		width: 480px;
		height: 500px;
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
		}
		p {
			color: #a3a3a3;
			font-size: 13px;
		}
		div {
			font-size: 15px;
		}
	`;
	const Divider = styled.div`
		border: 0.5px solid #ddd;
		margin-top: 2px;
	`;

	const handleEdit = () => {
		const dto = {
			name,
			regionId,
			imageId,
		};
		const fetchData = async () => {
			await SantiagoPutWithAutorization(`users/${userId}`, dto);
		};
		fetchData();
		alert("Your profile is saved");
		setOpenModal(false);
	};

	return (
		<Wrapper>
			<Box>
				<h1>Profile information</h1>
				<div>
					<div tw="w-full text-left mb-2">Photo</div>
					<div tw="w-full flex gap-5 justify-center items-center">
						<div tw="border border-[#70686880] rounded-full">
							<Image
								src={"/images/defaultUser.svg"}
								alt="profile"
								width={80}
								height={80}
							/>
						</div>
						<div tw="flex flex-col text-left">
							<div tw="flex gap-4">
								<button tw="text-mint">Update</button>
								<button tw="text-red-600">Remove</button>
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
					<input type="text" value="marais" />
					<Divider />
					<div tw="mt-7 mb-3">Region</div>
					<Divider />
				</div>
				<div tw="flex gap-4">
					<MintButton onClick={() => setOpenModal(false)}>
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
