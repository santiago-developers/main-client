import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";
import LoadingModal from "@components/profile/LoadingModal";
import LeftProfile from "@components/profile/LeftProfile";
import RightProfile from "@components/profile/RightProfile";

const ProfilePage = () => {
	const router = useRouter();
	const [loadingModal, setLoadingModal] = useState(false);

	useEffect(() => {
		if (router.query.from == "write") {
			setLoadingModal(true);
		}
	}, []);

	return (
		<div tw="w-full flex mt-10 mx-20 mb-20 gap-20 justify-center">
			<LeftProfile />
			<RightProfile />
			{loadingModal && <LoadingModal setLoadingModal={setLoadingModal} />}
		</div>
	);
};

export default ProfilePage;
