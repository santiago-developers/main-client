import { ArrowRight } from "@mui/icons-material";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import tw from "twin.macro";

export default function SimpleSignUp() {
    return (
        <>
            <div tw="w-[336px] m-auto h-[75vh] grid place-items-center">
                <div tw="w-full m-auto px-[8px]">
                    <div tw="text-center text-[30px]">Sign up</div>
                    <div tw="h-[56px]" />
                    <div tw="m-auto">
						<div tw="flex justify-between items-center">
							<FormControlLabel
								control={<Checkbox size="medium" sx={{'&.Mui-checked': {
                                    color: '#05C3B6',
                                  },}}/>}
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
								control={<Checkbox size="medium" sx={{'&.Mui-checked': {
                                    color: '#05C3B6',
                                  },}}/>}
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
								control={<Checkbox size="medium" sx={{'&.Mui-checked': {
                                    color: '#05C3B6',
                                  },}}/>}
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
    )
}