import { TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import SocialSignInDivider from "@public/images/socialSignInDivider.svg"
import FacebookLogo from "@public/images/facebookLogo.svg"
import AppleLogo from "@public/images/appleLogo.svg"
import GoogleLogo from "@public/images/googleLogo.svg"
import tw from "twin.macro";

export default function SignIn() {
	return (
		<>
			<div tw="w-[336px] h-full m-auto">
				<div tw="w-full m-auto px-[8px]">
					<div tw="h-[66px]" />
					<div tw="text-center text-[30px]">Sign in</div>
					<div tw="h-[66px]" />
					<div tw="m-auto">
						<TextField
							id="email"
							variant="outlined"
							placeholder="Please enter your email"
							fullWidth
						/>
						<div tw="h-[8px]" />
						<TextField
							id="email"
							variant="outlined"
							placeholder="Please enter your password"
							fullWidth
						/>
					</div>
					<div tw="h-[36px]" />
					<div tw="m-auto">
						<MintButton tw="w-full h-[40px] bg-[#05C3B6] text-white font-medium">
							Sign in with email
						</MintButton>
						<div tw="h-[8px]" />
						<MintButton tw="w-full h-[40px] font-medium">
							Sign up with email
						</MintButton>
					</div>
					<div tw="h-[36px]" />
                    <SocialSignInDivider/>
                    <div tw="h-[16px]" />
                    <div tw="flex justify-center">
                        <GoogleLogo/>
                        <FacebookLogo/>
                        <AppleLogo/>
                    </div>
				</div>
			</div>
		</>
	);
}
