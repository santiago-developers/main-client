import tw from "twin.macro";
import React, { useState } from "react";
import { EditModal } from "./EditModal";
import { UserInfoProps } from "types/user";

type Props = Pick<UserInfoProps, "name" | "region" | "imageUrl">;

const EditButton = ({ name, region, imageUrl }: Props) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<button tw="text-mint" onClick={() => setOpenModal(true)}>
			edit
			{openModal && (
				<EditModal
					setOpenModal={setOpenModal}
					name={name}
					region={region}
					imageUrl={imageUrl}
				/>
			)}
		</button>
	);
};

export default EditButton;
