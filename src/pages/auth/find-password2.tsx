import tw from "twin.macro";
import { TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";

export default function FindPassword2() {
	return (
		<>
			<div tw="w-[336px] m-auto h-[75vh] grid place-items-center">
				<div tw="w-full m-auto px-[8px]">
					<div tw="text-center text-[30px]">Find Password</div>
					<div tw="h-[36px]" />
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
                    <MintButton tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]">
							Confirm
						</MintButton>
						<div tw="h-[66px]" />
				</div>
			</div>
		</>
	);
}
