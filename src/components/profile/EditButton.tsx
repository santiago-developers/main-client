import tw from "twin.macro";
import { useState } from "react";
import { EditModal } from "./EditModal";
import { UserInfoProps } from "types/user";

type Props = {
	onUpdateProfile(): void;
} & Pick<UserInfoProps, "name" | "region" | "imageUrl">;

const EditButton = ({ name, region, imageUrl, onUpdateProfile }: Props) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div tw="text-mint cursor-pointer" onClick={() => setOpenModal(true)}>
			edit
			{openModal && (
				<EditModal
					setOpenModal={setOpenModal}
					name={name}
					region={region}
					imageUrl={imageUrl}
					onUpdateProfile={onUpdateProfile}
				/>
			)}
		</div>
	);
};

export default EditButton;
