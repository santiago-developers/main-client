import React from "react";
import tw, { styled } from "twin.macro";
import RingLoader from "react-spinners/RingLoader";

type Props = {
	setLoadingModal(item: boolean): void;
};

const LoadingModal = ({ setLoadingModal }: Props) => {
	const Wrapper = styled.div`
		position: fixed;
		top: 98px;
		left: 0;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(5px);
		z-index: 9999999999;
	`;
	const Box = styled.div`
		box-shadow: 0px 0px 7px 0px #50505040;
		width: 480px;
		height: 260px;
		display: flex;
		gap: 22px;
		position: absolute;
		top: calc(50% - 98px);
		left: 50%;
		transform: translate(-50%, -50%);
		flex-direction: column;
		text-align: center;
		align-items: center;
		background-color: white;
		padding: 20px 25px;
		h1 {
			font-weight: 600;
			font-size: 20px;
		}
		button {
			width: 5.9375rem;
			height: 2.6875rem;
			flex-shrink: 0;
			border-radius: 1.25rem;
			border: 1px solid #848181;
			color: #848181;
			cursor: pointer;
		}
		p {
			color: #a3a3a3;
		}
	`;
	return (
		<Wrapper>
			<Box>
				<h1>Translating to the language you selected </h1>
				<RingLoader color="#05C3B6" size={50} />
				<p>This might take a minute or two</p>
				<button onClick={() => setLoadingModal(false)}>Cancel</button>
			</Box>
		</Wrapper>
	);
};

export default LoadingModal;
