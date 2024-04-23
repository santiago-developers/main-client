import { MintButton, MintButtonFilled } from "@utils/MintButton";
import { Wrapper } from "@utils/ModalWrapper";
import Link from "next/link";

function Error({ statusCode }) {
	return (
		<Wrapper>
			<div tw="h-full pb-[98px] flex flex-col gap-4 justify-center items-center">
				<p>
					{statusCode
						? `An error ${statusCode} occurred on server`
						: "An error occurred on client"}
				</p>
				<p>Sorry, the service is temporarily unavailable.</p>
				<p>Please try refreshing the page.</p>
				<div tw="flex gap-4">
					<MintButton onClick={() => window.location.reload()}>
						Refresh Page
					</MintButton>
					<Link href="/main">
						<MintButtonFilled>Home</MintButtonFilled>
					</Link>
				</div>
			</div>
		</Wrapper>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
