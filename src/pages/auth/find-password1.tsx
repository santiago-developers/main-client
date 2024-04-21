import tw from "twin.macro";
import CheckIcon from "@public/images/checkIcon.svg";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import { ArrowRight } from "@mui/icons-material";
import { useState } from "react";
import { SantiagoPost } from "lib/fetchData";
import { SendVerificationNumberRequest } from "lib/dto/auth/sendVerificationNumberRequest";
import { SendVerificationNumberResponse } from "lib/dto/auth/sendVerificationNumberResponse";
import { VerifyVerificationNumberRequest } from "lib/dto/auth/verifyVerificationNumberRequest";
import { useRouter } from "next/router";

export default function FindPassword1() {
	const router = useRouter();
	const emailFormat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	const [email, setEmail] = useState("");
	const [verificationNumber, setVerificationNumber] = useState("");
	const [verifiedEmail, setVerifiedEmail] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [isSendEmail, setIsSendEmail] = useState(false);
	const [isClickedButton2, setIsClickedButton2] = useState(false);

	const sendVerificationNumber = () => {
		if (!emailFormat.test(email)) {
			alert("Please make sure you entered your email correctly");
		} else {
			const dto = new SendVerificationNumberRequest(email);
			SantiagoPost<
				SendVerificationNumberRequest,
				SendVerificationNumberResponse
			>(
				"auth/verification_numbers/receive?query-type=find-password",
				dto,
			).then((data) => {
				if (data.isSuccess) {
					alert("The verification number has been sent");
					setVerifiedEmail(email);
					setIsSendEmail(true);
				} else {
					alert("Please make sure you entered your email correctly");
				}
			});
		}
	};

	const verify = () => {
		setIsClickedButton2(true);
		const dto = new VerifyVerificationNumberRequest(
			verifiedEmail,
			verificationNumber,
		);
		SantiagoPost<
			VerifyVerificationNumberRequest,
			SendVerificationNumberResponse
		>("auth/verification_numbers/verify", dto).then((data) => {
			if (data.isSuccess) {
				alert("Verification completed");
				setIsVerified(true);
			} else {
				alert(
					"Verification failed. Please make sure you entered your verification number correctly",
				);
			}
		});
	};

	const confirm = () => {
		if (isVerified) {
			router.push(`/auth/find-password2?email=${verifiedEmail}`);
		} else {
			alert("Please verify your email.");
		}
	};
	return (
		<>
			<div tw="w-[336px] m-auto h-[75vh] grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px] font-serif">
						Find Password
					</div>
					<div tw="h-[36px]" />
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
						<div tw="h-[36px]" />
						<MintButton
							tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]"
							onClick={confirm}>
							Confirm
						</MintButton>
						<div tw="h-[66px]" />
					</div>
				</div>
			</div>
		</>
	);
}
