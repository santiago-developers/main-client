import { ArrowRight } from "@mui/icons-material";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import { SantiagoPost } from "lib/fetchData";
import { useState } from "react";
import tw from "twin.macro";
import { SignUpRequest } from "lib/dto/signUp/signUpRequest";
import { SignInResponse } from "lib/dto/signIn/signInResponse";
import { useRouter } from "next/router";
import RegionDropDown from "@components/userInfo/regionDropBox";

export default function SignUp() {
	const emailFormat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	const regexPw =
		/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,20}$|^(?=.*[a-zA-Z])(?=.*\d)(?!.*[@#$%^&+=!]).{8,20}$/;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordToConfirm, setPasswordToConfirm] = useState("");
	const [isCheckedAgreement1, setIsCheckedAgreement1] = useState(false);
	const [isCheckedAgreement2, setIsCheckedAgreement2] = useState(false);
	const [isCheckedAgreement3, setIsCheckedAgreement3] = useState(false);
	const [regionId, setRegionId] = useState<string>("");
	const router = useRouter();

	const searchSubmit = (selectedRegionId: string) => {
		setRegionId(selectedRegionId);
	};

	const confirm = () => {
		if (
			emailFormat.test(email) &&
			isCheckedAgreement1 &&
			isCheckedAgreement2 &&
			password == passwordToConfirm &&
			regionId
		) {
			const dto = new SignUpRequest(
				email,
				password,
				null,
				isCheckedAgreement3,
				regionId,
			);
			SantiagoPost<SignUpRequest, SignInResponse>("users", dto).then(
				(data) => {
					if (data.userId) {
						router.push("/auth/sign-in");
					} else {
						alert("Registration failed");
					}
				},
			);
		} else {
			alert("Please complete registration form.");
		}
	};

	return (
		<>
			<div tw="w-[336px] h-full m-auto">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px] font-serif">Sign up</div>
					<div tw="h-[56px]" />
					<div tw="m-auto">
						<TextField
							id="email"
							variant="outlined"
							placeholder="Please enter your email"
							fullWidth
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div tw="h-[26px]" />
					<div tw="m-auto">
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
						<div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							{password != "" ? (
								regexPw.test(password) ? (
									<div>Properly formed password </div>
								) : (
									<div tw="text-[#EB4335]">
										Badly formed password{" "}
									</div>
								)
							) : (
								" "
							)}
						</div>
						<div tw="h-[8px]" />
						<TextField
							id="confirm-password"
							variant="outlined"
							placeholder="Please enter your password again"
							fullWidth
							type="password"
							onChange={(event) =>
								setPasswordToConfirm(event.target.value)
							}
						/>
						<div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							{passwordToConfirm != "" ? (
								password == passwordToConfirm ? (
									<div>The password matches</div>
								) : (
									<div tw="text-[#EB4335]">
										The password doesn&#8216;t match
									</div>
								)
							) : (
								""
							)}
						</div>
					</div>
					<div tw="h-[20px]" />
					<div tw="relative">
						{/*<RegionDropBox onSubmit={searchSubmit} regionName={regionName}/>*/}
						<RegionDropDown onSubmit={searchSubmit} />
					</div>
					<div tw="h-[20px]" />
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
