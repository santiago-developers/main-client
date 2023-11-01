import tw from "twin.macro";
import { TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import { ArrowRight } from "@mui/icons-material";

export default function FindPassword1() {
	return (
		<>
			<div tw="w-[336px] m-auto h-[75vh] grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px]">Find Password</div>
					<div tw="h-[36px]" />
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
						<div tw="h-[36px]" />
						<MintButton tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]">
							Confirm
						</MintButton>
						<div tw="h-[66px]" />
					</div>
				</div>
			</div>
		</>
	);
}
