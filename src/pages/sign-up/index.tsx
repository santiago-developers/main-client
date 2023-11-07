import { ArrowRight } from "@mui/icons-material";
import {
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { MintButton } from "@utils/MintButton";
import CheckIcon from "@public/images/checkIcon.svg";
import { SendVerificationNumberRequest } from "lib/dto/auth/sendVerificationNumberRequest";
import { SendVerificationNumberResponse } from "lib/dto/auth/sendVerificationNumberResponse";
import { VerifyVerificationNumberRequest } from "lib/dto/auth/verifyVerificationNumberRequest";
import { SantiagoPost } from "lib/fetchData";
import { useState } from "react";
import tw from "twin.macro";
import { SignUpRequest } from "lib/dto/signUp/signUpRequest";
import { SignInResponse } from "lib/dto/signIn/signInResponse";
import { useRouter } from "next/router";
import RegionDropBox from "@components/userInfo/regionDropBox";

export default function SignUp() {
	const emailFormat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	const regexPw =
		/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,20}$|^(?=.*[a-zA-Z])(?=.*\d)(?!.*[@#$%^&+=!]).{8,20}$/;
	const [email, setEmail] = useState("");
	const [verificationNumber, setVerificationNumber] = useState("");
	const [verifiedEmail, setVerifiedEmail] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [isSendEmail, setIsSendEmail] = useState(false);
	const [isClickedButton2, setIsClickedButton2] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordToConfirm, setPasswordToConfirm] = useState("");
	const [isCheckedAgreement1, setIsCheckedAgreement1] = useState(false);
	const [isCheckedAgreement2, setIsCheckedAgreement2] = useState(false);
	const [isCheckedAgreement3, setIsCheckedAgreement3] = useState(false);
	const [regionId, setRegionId] = useState<string>("");
	const [regionName, setRegionName] = useState("");
	const router = useRouter();

	const sendVerificationNumber = () => {
		if (!emailFormat.test(email)) {
			alert("Please make sure you entered your email correctly");
		} else {
			const dto = new SendVerificationNumberRequest(email);
			SantiagoPost<
				SendVerificationNumberRequest,
				SendVerificationNumberResponse
			>(
				"auth/verification_numbers/receive",
				dto,
			).then((data) => {
				if (data.isSuccess) {
					alert("The verification number has been sent");
					setVerifiedEmail(email);
					setIsSendEmail(true);
				} else {
					alert("Email already registered.");
				}
			});
		}
	};

	const verify = () => {
		const dto = new VerifyVerificationNumberRequest(
			verifiedEmail,
			verificationNumber,
		);
		SantiagoPost<
			VerifyVerificationNumberRequest,
			SendVerificationNumberResponse
		>("auth/verification_numbers/verify", dto).then((data) => {
			if (data.isSuccess) {
				setIsVerified(true);
				alert("Verification completed");
			} else {
				alert(
					"Verification failed. Please make sure you entered your verification number correctly",
				);
			}
		});
		setIsClickedButton2(true);
	};

	const searchSubmit = (selectedRegionId: string, selectedRegionName: string) => {
		setRegionId(selectedRegionId);
		setRegionName(selectedRegionName);
	};

	const confirm = () => {
		if (
			isVerified &&
			isCheckedAgreement1 &&
			isCheckedAgreement2 &&
			password == passwordToConfirm
			&& regionId
		) {
			const dto = new SignUpRequest(
				verifiedEmail,
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
							InputProps={
								isSendEmail
									? {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														edge="end">
														<CheckIcon />
													</IconButton>
												</InputAdornment>
											),
									  }
									: undefined
							}
						/>
						<div tw="flex justify-between items-center px-[16px] pt-[4px]">
							<div tw="text-sm text-[#05C3B6] hover:cursor-default">
								Click to get a verification number{" "}
								<ArrowRight />
							</div>
							<button
								tw="text-sm text-[#FFFFFF] bg-[#05C3B6] px-[8px] rounded-md"
								onClick={sendVerificationNumber}>
								send
							</button>
						</div>
						<div tw="h-[8px]" />
						<TextField
							id="verification-number"
							variant="outlined"
							placeholder="Please enter a verification number"
							fullWidth
							onChange={(event) =>
								setVerificationNumber(event.target.value)
							}
							InputProps={
								isVerified
									? {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														edge="end">
														<CheckIcon />
													</IconButton>
												</InputAdornment>
											),
									  }
									: undefined
							}
						/>
						<div tw="flex justify-between items-center px-[16px] pt-[4px]">
							<div tw="text-sm text-[#49454F] hover:cursor-default">
								{isClickedButton2 ? (
									isVerified ? (
										"Verification completed"
									) : (
										<div tw="text-[#EB4335]">
											Verification failed
										</div>
									)
								) : null}
							</div>
							<button
								tw="text-sm text-[#FFFFFF] bg-[#05C3B6] px-[6px] rounded-md"
								onClick={verify}>
								verify
							</button>
						</div>
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
										The password doesn't match
									</div>
								)
							) : (
								""
							)}
						</div>
					</div>
					<div tw="h-[26px]" />
					<RegionDropBox onSubmit={searchSubmit} regionName={regionName}/>
					<div tw="h-[26px]" />
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
