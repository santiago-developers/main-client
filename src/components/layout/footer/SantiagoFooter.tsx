import LogoSvg from "@public/images/logo.svg";
import tw from "twin.macro";
import type { PropsWithChildren } from "react";

const SantiagoFooter: React.FunctionComponent<PropsWithChildren> = () => {
	return (
		<>
			<footer tw="w-full h-[126px] flex justify-center items-center bg-[#FAFAFA] text-gray-800">
				<div tw="text-[11px] text-center font-medium">
					<div>
						<a href="">산티아고 이용약관</a> |{" "}
						<a href="">개인정보처리방침</a>
					</div>
					<div>
						공식 이메일 : {""}
						<a href="mailto:santiagohelp@gmail.com">
							santiagohelp@gmail.com
						</a>
						<a href="">인스타그램</a> | <a href="">틱톡</a>
					</div>
					<p>Copyright © 2023 - Santiago</p>
					<LogoSvg tw="w-[80px] mt-4 mx-auto" />
				</div>
			</footer>
		</>
	);
};

export default SantiagoFooter;
