import RegionDropBox from "@components/userInfo/regionDropBox";
import RegionDropDown from "@components/userInfo/regionDropBox";
import { ArrowRight } from "@mui/icons-material";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import { SignInResponse } from "lib/dto/signIn/signInResponse";
import { SignUpRequest } from "lib/dto/signUp/signUpRequest";
import { GetUserResponse } from "lib/dto/user/getUserResponse";
import { SantiagoGet, SantiagoPost } from "lib/fetchData";
import { useRouter } from "next/router";
import { useState } from "react";
import myInfoStore from "store/myInfoStore";
import tw from "twin.macro";

export default function SimpleSignUp() {
	const [isCheckedAgreement1, setIsCheckedAgreement1] = useState(false);
	const [isCheckedAgreement2, setIsCheckedAgreement2] = useState(false);
	const [isCheckedAgreement3, setIsCheckedAgreement3] = useState(false);
	const [regionId, setRegionId] = useState<string>("");
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

	const confirm = () => {
		if (isCheckedAgreement1 && isCheckedAgreement2 && regionId) {
			const firebaseUID = localStorage.getItem("firebaseUID");
			const dto = new SignUpRequest(
				null,
				null,
				firebaseUID,
				isCheckedAgreement3,
				regionId,
			);
			SantiagoPost<SignUpRequest, SignInResponse>("users", dto)
				.then((data) => {
					if (data.userId) {
						loadUserInfo(data);
						router.push("/main"); //TODO: 이전 페이지로 이동하기 (뒤로 돌아가기 아님)
					}
				})
				.catch(() => alert("Failed in Sign in"));
		} else {
			alert("Please complete registration form.");
		}
	};

	const searchSubmit = (selectedRegionId: string) => {
		setRegionId(selectedRegionId);
	};

	return (
		<>
			<div tw="w-[336px] m-auto h-[75vh] grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px] font-serif">Sign up</div>
					<div tw="h-[56px]" />
					<div tw="m-auto">
						<div tw="flex justify-between items-center">
							<FormControlLabel
								control={
									<Checkbox
										size="medium"
										sx={{
											"&.Mui-checked": {
												color: "#05C3B6",
											},
										}}
										onChange={({ target: { checked } }) =>
											setIsCheckedAgreement1(checked)
										}
									/>
								}
								label={
									<p tw="text-[#404040] text-base">
										Agree to the terms and conditions
									</p>
								}
							/>
							<ArrowRight />
						</div>
						<div tw="h-[8px]" />
						<div tw="flex justify-between items-center">
							<FormControlLabel
								control={
									<Checkbox
										size="medium"
										sx={{
											"&.Mui-checked": {
												color: "#05C3B6",
											},
										}}
										onChange={({ target: { checked } }) =>
											setIsCheckedAgreement2(checked)
										}
									/>
								}
								label={
									<p tw="text-[#404040] text-base">
										Agree to the privacy policy
									</p>
								}
							/>
							<ArrowRight />
						</div>
						<div tw="h-[8px]" />
						<div tw="flex justify-between items-center">
							<FormControlLabel
								control={
									<Checkbox
										size="medium"
										sx={{
											"&.Mui-checked": {
												color: "#05C3B6",
											},
										}}
										onChange={({ target: { checked } }) =>
											setIsCheckedAgreement3(checked)
										}
									/>
								}
								label={
									<p tw="text-[#404040] text-base">
										Agree to personal information marketing
										use (option)
									</p>
								}
							/>
							<ArrowRight />
						</div>
						<div tw="h-[8px]" />
					</div>
					<div tw="h-[26px]" />
					<RegionDropDown onSubmit={searchSubmit} />
					<div tw="h-[36px]" />
					<MintButton
						tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]"
						onClick={confirm}>
						Confirm
					</MintButton>
					<div tw="h-[66px]" />
				</div>
			</div>
		</>
	);
}
