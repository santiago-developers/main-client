import tw from "twin.macro";
import Link from "next/link";
import myInfoStore from "store/myInfoStore";
import { useRouter } from "next/router";

type Props = {
	id: string;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const HeaderDropdown = ({ id, isOpen, setIsOpen }: Props) => {
	const { reset } = myInfoStore();
	const router = useRouter();
	const handleLogout = () => {
		reset();
		localStorage.setItem("userId", "");
		localStorage.setItem("accessToken", "");
		localStorage.setItem("refreshToken", "");
		alert("로그아웃되었습니다.");
		router.push("/auth/sign-in");
	};

	return (
		<div
			tw="absolute top-full right-0 z-10 mt-2 bg-white border border-gray-200 shadow-lg rounded-md"
			onClick={() => setIsOpen(!isOpen)}>
			<Link href={`/profile/${id}`}>
				<div tw="py-2 px-4 cursor-pointer hover:bg-gray-100">
					Profile
				</div>
			</Link>
			<div
				tw="py-2 px-4 cursor-pointer hover:bg-gray-100"
				onClick={handleLogout}>
				Logout
			</div>
		</div>
	);
};

export default HeaderDropdown;
