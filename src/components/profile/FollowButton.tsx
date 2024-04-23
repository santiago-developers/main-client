import tw from "twin.macro";
import { useEffect, useState } from "react";
import { SantiagoDelete, SantiagoGet, SantiagoPostNoRes } from "lib/fetchData";
import myInfoStore from "store/myInfoStore";

type Props = {
	userId: string;
};

const FollowButton = ({ userId }: Props) => {
	const { id } = myInfoStore();
	const [followed, setFollowed] = useState(false);

	useEffect(() => {
		const getFollowers = async () => {
			const data = await SantiagoGet(`users/${id}/followings`);
			setFollowed(data?.data?.some((user) => user?.userId === userId));
		};
		getFollowers();
	}, [userId]);

	const fetchFollow = async () => {
		await SantiagoPostNoRes(`users/${id}/followings/add`, {
			userId,
		});
	};
	const deleteFollow = async () => {
		await SantiagoDelete(`users/${id}/followings/${userId}`);
	};

	const handleFollow = () => {
		if (!followed) {
			try {
				fetchFollow();
				setFollowed(true);
			} catch (err) {
				alert("Try Again");
			}
		} else {
			try {
				deleteFollow();
				setFollowed(false);
			} catch (err) {
				alert("Try Again");
			}
		}
	};

	return (
		<button tw="text-mint w-[72px]" onClick={handleFollow}>
			{followed ? "Following" : "Follow"}
		</button>
	);
};

export default FollowButton;
