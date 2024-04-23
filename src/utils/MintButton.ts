import { styled } from "twin.macro";

export const MintButton = styled.button`
	border: 1px solid var(--secondary);
	border-radius: 9999px;
	color: var(--secondary);
	font-size: sm;
	padding: 4px 25px;
	cursor: pointer;
	width: max-content;
	background-color: white;
`;

export const MintButtonFilled = styled.button`
	border: 1px solid var(--secondary);
	border-radius: 9999px;
	color: white;
	font-size: sm;
	padding: 4px 25px;
	cursor: pointer;
	width: max-content;
	background-color: var(--secondary);
`;

export const MintButtonFilledForHeader = styled.button`
	position: fixed;
	top: 0;
	right: 224px;
	margin: 40px;
	z-index: 99999;
	border: 1px solid var(--secondary);
	border-radius: 9999px;
	color: white;
	font-size: sm;
	padding: 4px 25px;
	cursor: pointer;
	width: max-content;
	background-color: var(--secondary);
`;
