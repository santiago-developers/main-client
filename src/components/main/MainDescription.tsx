import tw from "twin.macro";
import { useRouter } from "next/router";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";

const MainDescription = () => {
	const router = useRouter();

	return (
		<div tw="text-white absolute top-20 left-auto z-1 font-serif text-center pt-20">
			<div tw="flex flex-col font-light text-[28px]">
				<p>
					Share your story with people all around the world from
					Santiago.
				</p>
				<p>
					Santiago will translate your writing into various languages
					and distribute it worldwide
				</p>
				<p>Let your words spread a cross the globe</p>
			</div>
			<div tw="pt-8 text-[36px]">Expand your reputation worldwide.</div>
			<div
				tw="m-auto max-w-max mt-40 [text-shadow:_0px_0px_1px_#D4D4D4] cursor-pointer"
				onClick={() => router.push("/plans")}>
				Find out how to earn money with Santiago!
				<ArrowCircleRightTwoToneIcon tw="ml-2" />
			</div>
		</div>
	);
};

export default MainDescription;
