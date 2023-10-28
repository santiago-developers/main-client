import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";

const UserFrame = () => {
	return (
		<div tw="flex">
			<DefautUserSvg tw="w-[36px] h-[36px]" />
			<div tw="flex flex-col pl-3">
				<span tw="text-[14px]">Michel</span>
				<span tw="text-sm">South Korea</span>
			</div>
		</div>
	);
};

export default UserFrame;
