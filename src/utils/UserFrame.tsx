import { Avatar } from "@mui/material";
import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";

interface UserFrameInterface {
	name: string;
	regionName: string;
	imageUrl: string | null;
}

const UserFrame = ({ name, regionName, imageUrl }: UserFrameInterface) => {
	return (
		<div tw="flex">
			{imageUrl ? (
				<Avatar src={imageUrl} sx={{ width: 36, height: 36 }} />
			) : (
				<DefautUserSvg tw="w-[36px] h-[36px]" />
			)}
			<div tw="flex flex-col pl-3">
				<span tw="text-[14px]">{name}</span>
				<span tw="text-sm">{regionName}</span>
			</div>
		</div>
	);
};

export default UserFrame;
