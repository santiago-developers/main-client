import tw from "twin.macro";
import React, { useState } from "react";
import { EditModal } from "./EditModal";

const EditButton = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<button tw="text-mint" onClick={() => setOpenModal(true)}>
			edit
			{openModal && <EditModal setOpenModal={setOpenModal} />}
		</button>
	);
};

export default EditButton;
