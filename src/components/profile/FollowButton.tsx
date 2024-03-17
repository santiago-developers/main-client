import tw from "twin.macro";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	SantiagoDelete,
	SantiagoGet,
	SantiagoPostWithAutorization,
} from "lib/fetchData";
import { useMutation } from "@tanstack/react-query";
import { UserInfoProps } from "types/user";
import myInfoStore from "store/myInfoStore";

type Props = {
	userInfo: UserInfoProps;
	userId: string;
};

const FollowButton = ({ userInfo, userId }: Props) => {
	const { imageUrl, name, region } = userInfo;
	const { id } = myInfoStore();

	let followed = false;
	const getFollowers = async () => {
		const data = await SantiagoGet(`users/${id}/followings`);
		followed = data?.data?.some((user) => user.userId === userId);
		console.log(followed);
	};
	const fetchData = async () => {
		await SantiagoPostWithAutorization(`/users/${id}/followings/add`, {
			userId,
		});
	};
	useEffect(() => {
		getFollowers();
	}, []);

	const DeleteData = async () => {
		await SantiagoDelete(`/users/${id}/followings/${userId}`);
	};

	const follow = useMutation({
		mutationFn: () => {
			return fetchData();
		},
		onMutate: () => {},
		onError() {},
	});
	const unfollow = useMutation({
		mutationFn: () => {
			return DeleteData();
		},
		onMutate: () => {},
		onError() {},
	});
	// 팔로우안한 상대: Follow, 팔로우한 상대 : Follwing
	const handleFollow = () => {
		if (followed) {
			unfollow.mutate();
		} else {
			follow.mutate();
		}
	};
	return (
		<button tw="text-mint" onClick={handleFollow}>
			{followed ? "Following" : "Follow"}
		</button>
	);
};

export default FollowButton;
