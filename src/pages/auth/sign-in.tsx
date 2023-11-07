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
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	OAuthProvider,
	UserCredential,
} from "firebase/auth";
import myInfoStore from "store/myInfoStore";
import { initFirebase } from "config/firebaseConfig";

export default function SignIn() {
	initFirebase();
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

	const loadUserInfo = (data: SignInResponse) => {
		localStorage.setItem("userId", data.userId);
		localStorage.setItem("accessToken", data.accessToken);
		localStorage.setItem("refreshToken", data.refreshToken);
		storeMyInfo(data.userId);
	};

	const handleSocialSignIn = async (result: UserCredential) => {
		const user = result.user;
		const dto = new SignInRequest(null, null, user.uid);
		SantiagoPost<SignInRequest, SignInResponse>("auth/sign-in", dto)
			.then((data) => loadUserInfo(data))
			.then(() => {
				router.push("/main"); //TODO: 이전 페이지로 이동하기 (뒤로 돌아가기 아님)
			})
			.catch(() => {
				localStorage.setItem("firebaseUID", user.uid);
				router.push("/sign-up/simple");
			});
	};

	const signIn = async () => {
		const dto = new SignInRequest(email, password, null);
		SantiagoPost<SignInRequest, SignInResponse>("auth/sign-in", dto)
			.then((data) => loadUserInfo(data))
			.then(() => {
				router.push("/main"); //TODO: 이전 페이지로 이동하기 (뒤로 돌아가기 아님)
			})
			.catch(() =>
				alert(
					"Please make sure you entered your email and password correctly.",
				),
			);
	};

	const signInWithGoogle = () => {
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => handleSocialSignIn(result))
			.catch(() => {
				alert("Failed in sign-in");
			});
	};

	const signInWithFaceBook = async () => {
		const auth = getAuth();
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => handleSocialSignIn(result))
			.catch(() => {
				alert("Failed in sign-in");
			});
	};

	const signInWithApple = async () => {
		const auth = getAuth();
		const provider = new OAuthProvider("apple.com");
		signInWithPopup(auth, provider)
			.then((result) => handleSocialSignIn(result))
			.catch(() => {
				alert("Failed in sign-in");
			});
	};

	return (
		<>
			<div tw="w-[336px] h-[75vh] m-auto grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px] font-serif">Sign in</div>
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
					<Link href="/auth/find-password1">
						<div tw="text-[12px] flex justify-center text-[#05C3B6]">
							Forgot your password?
						</div>
					</Link>
					<div tw="h-[24px]" />
					<SocialSignInDivider />
					<div tw="h-[16px]" />
					<div tw="flex justify-center">
						<div onClick={signInWithGoogle}>
							<GoogleLogo />
						</div>
						<div onClick={signInWithFaceBook}>
							<FacebookLogo />
						</div>
						<div onClick={signInWithApple}>
							<AppleLogo />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
