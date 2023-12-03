import { SantiagoPost } from "lib/fetchData";
import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const RePortModal = ({ setOpenModal, openModal }) => {
	const Wrapper = styled.div`
		background-color: white;
		width: 100%;
		height: 100%;
	`;
	const Box = styled.div`
		box-shadow: 0px 0px 7px 0px #50505040;
		width: 650px;
		height: 500px;
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		flex-direction: column;
		text-align: center;
		align-items: center;
		background-color: white;
		h1 {
			font-weight: 700;
			font-size: 25px;
			margin-top: 50px;
			margin-bottom: 55px;
		}
		button {
			width: 5.9375rem;
			height: 2.6875rem;
			flex-shrink: 0;
			border-radius: 1.25rem;
			border: 1px solid #000;
		}
	`;

	const reportType = ["Harassment", "Rules Violation", "Spam"];
	const [onCheckedItem, setOnCheckedItem] = useState("");

	const handleReport = async () => {
		// const fetchData = await SantiagoPost(
		// 	"magazines/{magazineId}/replies/{replyId/report",
		// 	{ content: onCheckedItem },
		// );
		alert("Thank you for your opinion");
		history.back();
	};

	return (
		<Wrapper>
			<Box>
				<h1>Report</h1>
				<div tw="w-[380px] flex flex-col gap-10">
					{reportType.map((item, index) => (
						<div tw="flex items-center gap-10" key={index}>
							<input
								id={item}
								name="report"
								type="radio"
								value={item}
								onChange={(e) => {
									setOnCheckedItem(e.target.value);
								}}
								tw="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
							/>
							<label
								htmlFor="harassment-radio"
								tw="ms-2 text-[18px] text-gray-900 dark:text-gray-300">
								{item}
							</label>
						</div>
					))}
				</div>
				<div tw="flex gap-4 mt-20">
					<button onClick={() => history.back()}>
						Cancel
					</button>
					<button
						tw="bg-[#D75E4E]"
						onClick={(e) => {
							e.preventDefault();
							handleReport();
						}}>
						Report
					</button>
				</div>
			</Box>
		</Wrapper>
	);
};

export default RePortModal;
