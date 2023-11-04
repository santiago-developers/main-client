import tw from "twin.macro";
import { TextField } from "@mui/material";
import { MintButton } from "@utils/MintButton";
import { useState } from "react";
import { UpdatePasswordRequest } from "lib/dto/findPassword/updatePasswordRequest";
import { SantiagoPut } from "lib/fetchData";
import { FindPasswordResponse } from "lib/dto/findPassword/findPasswordResponse";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function FindPassword2() {
	const regexPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
	const query = useSearchParams();
	const email = query.get("email");
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [passwordToConfirm, setPasswordToConfirm] = useState("");

	const confirm = () => {
		if(regexPw.test(password) && password == passwordToConfirm) {
			const dto = new UpdatePasswordRequest(email as string, password);
			SantiagoPut<UpdatePasswordRequest, undefined>("auth/passwords", dto)
			.then(() => {
					alert("Your password has been successfully updated.")
					router.push("/auth/sign-in");
			})
			
		} else {
			alert("Please make sure you entered correctly formed password.");
		}
		
	}
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
							type="password"
							onChange={(event)=>setPassword(event.target.value)}
						/>
                        <div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							{regexPw.test(password) ? <div>Properly formed password </div>: <div tw="text-[#EB4335]">Badly formed password </div>}
						</div>
						<div tw="h-[8px]" />
						<TextField
							id="confirm-password"
							variant="outlined"
							placeholder="Please enter your password again"
							fullWidth
							type="password"
							onChange={(event) => setPasswordToConfirm(event.target.value)}
						/>
						<div tw="text-sm text-[#49454F] px-[16px] pt-[4px]  hover:cursor-default">
							{password == passwordToConfirm ? <div>The password matches</div> : <div tw="text-[#EB4335]">The password doesn't match</div>}
						</div>
					</div>
                    <div tw="h-[36px]" />
                    <MintButton tw="w-full h-[40px] font-medium hover:text-white hover:bg-[#05C3B6]" onClick={confirm}>
							Confirm
						</MintButton>
						<div tw="h-[66px]" />
				</div>
			</div>
		</>
	);
}
