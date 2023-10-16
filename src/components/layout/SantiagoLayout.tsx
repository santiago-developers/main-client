import LogoSvg from "@public/images/logo.svg";
import DefautUserSvg from "@public/images/defaultUser.svg";
import tw from "twin.macro";

const SantiagoLayout = ({ children }) => {
	return (
		<>
			<header tw="w-[1280px] bg-[#FAFAFA] h-[98px] flex items-center justify-between px-16">
				<LogoSvg tw="w-[131px]" />
				<div tw="flex gap-8">
					<button>Post</button>
					<DefautUserSvg />
				</div>
			</header>
			<div className="wrap">
				{children}
				<footer tw="w-full h-[126px] mt-[130px] flex justify-center items-center bg-[#FAFAFA] text-gray-800 mx-auto">
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
