import { ArrowRight } from "@mui/icons-material";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import tw from "twin.macro";

export default function SignUp() {
	return (
		<>
			<div tw="w-[336px] h-full m-auto">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px]">Sign up</div>
					<div tw="h-[56px]" />
					<div tw="m-auto">
						<TextField
							id="email"
							variant="outlined"
							placeholder="Please enter your email"
							fullWidth
						/>
						<div tw="flex justify-between items-center px-[16px] pt-[4px]">
							<div tw="text-sm text-[#05C3B6] hover:cursor-default">
								Click to get a verification number{" "}
								<ArrowRight />
							</div>
							<button tw="text-sm text-[#FFFFFF] bg-[#05C3B6] px-[8px] rounded-md">
								send
							</button>
						</div>
						<div tw="h-[8px]" />
						<TextField
							id="verification-number"
							variant="outlined"
							placeholder="Please enter a verification number"
							fullWidth
						/>
						<div tw="flex justify-between items-center px-[16px] pt-[4px]">
							<div tw="text-sm text-[#49454F] hover:cursor-default">
								Verification completed
							</div>
							<button tw="text-sm text-[#FFFFFF] bg-[#05C3B6] px-[6px] rounded-md">
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
						/>
						<div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							Badly formed password
						</div>
						<div tw="h-[8px]" />
						<TextField
							id="confirm-password"
							variant="outlined"
							placeholder="Please enter your password again"
							fullWidth
						/>
						<div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							The password matches
						</div>
					</div>
					<div tw="h-[36px]" />
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
					<MintButton tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]">
						Confirm
					</MintButton>
					<div tw="h-[66px]" />
				</div>
			</div>
		</>
	);
}
