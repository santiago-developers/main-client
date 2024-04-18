import Link from "next/link";
import tw from "twin.macro";

const cloudError = () => {
	return (
		<div tw="text-center">
			This service is not working right now becasue of the error of the
			Cloud Company. <br />
			<Link href="/auth/sign-in">
				<span tw="text-blue-700 underline cursor-pointer">GO BACK</span>
			</Link>
		</div>
	);
};

export default cloudError;
