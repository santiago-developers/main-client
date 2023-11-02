import { TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import SocialSignInDivider from "@public/images/socialSignInDivider.svg";
import FacebookLogo from "@public/images/facebookLogo.svg";
import AppleLogo from "@public/images/appleLogo.svg";
import GoogleLogo from "@public/images/googleLogo.svg";
import tw from "twin.macro";
import { useState } from "react";
import Link from "next/link";
import { SantiagoGet, SantiagoPost } from "lib/fetchData";
import { SignInRequest } from "lib/dto/signIn/signInRequest";
import { SignInResponse } from "lib/dto/signIn/signInResponse";
import { useRouter } from "next/router";
import { GetUserResponse } from "lib/dto/user/getUserResponse";
import myInfoStore from "store/myInfoStore";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const {
		setId,
		setName,
		setImageUrl,
		setFollowerCount,
		setFollowingCount,
		setPhotoScore,
		setWritingScore,
		setRegion,
	} = myInfoStore();

	const storeMyInfo = async (userId: string) => {
		const myInfo = await SantiagoGet<GetUserResponse>(`users/${userId}`);
		setId(myInfo.id);
		setName(myInfo.name);
		setImageUrl(myInfo.imageUrl);
		setFollowerCount(myInfo.followerCount);
		setFollowingCount(myInfo.followingCount);
		setPhotoScore(myInfo.photoScore);
		setWritingScore(myInfo.writingScore);
		setRegion(myInfo.region);
	};

	const signIn = async () => {
		const dto = new SignInRequest(email, password, null);
		SantiagoPost<SignInRequest, SignInResponse>("auth/sign-in", dto)
			.then((data) => {
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				storeMyInfo(data.userId).then(() => {
					router.push("/main"); //TODO: 이전 페이지로 이동하기 (뒤로 돌아가기 아님)
				});
			})
			.catch(() =>
				alert(
					"Please make sure you entered your email and password correctly.",
				),
			);
	};

	return (
		<>
			<div tw="w-[336px] h-[75vh] m-auto grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px]">Sign in</div>
					<div tw="h-[66px]" />
					<div tw="m-auto">
						<TextField
							id="email"
							variant="outlined"
							placeholder="Please enter your email"
							fullWidth
							onChange={(event) => setEmail(event.target.value)}
						/>
						<div tw="h-[8px]" />
						<TextField
							id="password"
							variant="outlined"
							placeholder="Please enter your password"
							fullWidth
							type="password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</div>
					<div tw="h-[36px]" />
					<div tw="m-auto">
						<MintButton
							tw="w-full h-[40px] bg-[#05C3B6] text-white font-medium"
							onClick={signIn}>
							Sign in with email
						</MintButton>
						<div tw="h-[8px]" />
						<Link href="/sign-up" tw="text-mint">
							<MintButton tw="w-full h-[40px] font-medium">
								Sign up with email
							</MintButton>
						</Link>
					</div>
					<div tw="h-[36px]" />
					<SocialSignInDivider />
					<div tw="h-[16px]" />
					<div tw="flex justify-center">
						<GoogleLogo />
						<FacebookLogo />
						<AppleLogo />
					</div>
				</div>
			</div>
		</>
	);
}
