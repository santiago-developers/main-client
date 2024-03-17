import React, { useState } from "react";
import tw from "twin.macro";

const EditButton = () => {
    const [editModal, setEditModal] = useState(false);
	return <button tw="text-mint">edit</button>;
};

export default EditButton;
