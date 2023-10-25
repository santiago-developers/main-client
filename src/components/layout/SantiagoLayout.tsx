import LogoSvg from "@public/images/logo.svg";
import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";
import Link from "next/link";
import { StrictPropsWithChildren } from "types/global";

const SantiagoLayout:React.FunctionComponent<StrictPropsWithChildren> = ({ children }) => {
	return (
		<>
			<header tw="w-[1280px] h-[98px] flex items-center justify-between px-16">
				<Link href="/">
					<LogoSvg tw="w-[131px]" />
				</Link>
				<div tw="flex gap-8">
					<button>Post</button>
					<DefautUserSvg tw="w-[30px] h-[30px]"/>
				</div>
			</header>
			<div className="wrap">
				{children}
				<footer tw="w-full h-[126px] flex justify-center items-center bg-[#FAFAFA] text-gray-800 mx-auto">
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
			</div>
		</>
	);
};
export default SantiagoLayout;
