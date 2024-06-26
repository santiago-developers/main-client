import tw, { styled } from "twin.macro";
import { SantiagoGet } from "lib/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RegionProps } from "types/regions";
import Link from "next/link";

type UserProps = {
	userId: string;
	name: string;
	region: RegionProps[];
	imageUrl: string;
};

type FollowModalProps = {
	userId: string;
	setIsOpen(value: boolean): void;
	followType: string;
};

const FollowModal = ({ userId, setIsOpen, followType }: FollowModalProps) => {
	const [followList, setFollowList] = useState<UserProps[]>([]);

	const fetchData = async (userId: string, followType: string) => {
		const data = await SantiagoGet(`users/${userId}/${followType}`);
		setFollowList(data.data);
	};

	useEffect(() => {
		fetchData(userId, followType);
	}, []);

	return (
		<Wrapper>
			{followList.length === 0 ? (
				<p tw="text-center py-20">no followers</p>
			) : (
				followList.map((item: UserProps, index) => (
					<div key={item.userId} onClick={() => setIsOpen(false)}>
						<Link href={`/profile/${item.userId}`}>
							<div tw="flex items-center gap-4 pb-5">
								{index + 1}
								<Image
									src={
										item.imageUrl ||
										"/images/defaultUser.svg"
									}
									alt="userImage"
									width={24.5}
									height={24.5}
								/>
								<span tw="overflow-hidden whitespace-nowrap text-ellipsis w-full">
									{item.name}
								</span>
							</div>
						</Link>
					</div>
				))
			)}
		</Wrapper>
	);
};

export default FollowModal;

const Wrapper = styled.div`
	position: absolute;
	top: 4;
	left: 93%;
	width: 232px;
	height: 220px;
	background-color: white;
	border: 1px solid #d4d4d4;
	border-radius: 15px;
	padding: 8px 24px;
	z-index: 999;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;
