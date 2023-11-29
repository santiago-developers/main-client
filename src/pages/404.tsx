import tw from "twin.macro";
import Custom404Emogi from "@public/images/404.svg";

export default function Custom404() {
	return (
		<div tw="w-full grid place-items-center">
            <div tw="h-16"/>
			<Custom404Emogi />
            <div tw="h-16"/>
		</div>
	);
}
