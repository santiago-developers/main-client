import tw from "twin.macro";
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
	return (
		<div tw="w-full h-screen flex justify-center items-center">
			<RingLoader color="#05C3B6" size={50} />
		</div>
	);
};

export default Loading;
