import tw from "twin.macro";

interface Props {
	title: string;
	price: string;
	langCount: string;
	productId: string;
}

export default function PlanCard({
	title,
	price,
	langCount,
	productId,
}: Props) {
	return (
		<>
			<div tw="w-[250px] h-[350px] rounded-lg shadow-xl  relative  hover:cursor-default">
				{title === "Pro Plan" ? (
					<div tw="w-full h-[45px] bg-[#FBBC05] grid place-items-center rounded-t-lg">
						<div tw="text-[25px] font-medium">{title}</div>
					</div>
				) : null}
				{title === "Expert Plan" ? (
					<div tw="w-full h-[45px] bg-[#E84033] grid place-items-center rounded-t-lg">
						<div tw="text-[25px] font-medium text-[#FFFFFF]">
							{title}
						</div>
					</div>
				) : null}
				{title === "Master Plan" ? (
					<div tw="w-full h-[45px] bg-[#000000] grid place-items-center rounded-t-lg">
						<div tw="text-[25px] font-medium text-[#FFFFFF]">
							{title}
						</div>
					</div>
				) : null}

				<div tw="py-[18px] px-[30px]">
					<div tw="flex items-end">
						<div tw="text-[25px] font-semibold">{price}</div>
						<div>
							<div tw="text-[#79747E] text-[15px] font-light">
								/month
							</div>
							<div tw="h-1" />
						</div>
					</div>
					<div tw="h-[12px]" />
					<div tw="text-[#79747E] text-[11px]">
						<div>You can translate your magazine into</div>
						<div tw="flex items-end">
							<div tw="text-[#525252] text-[20px] font-semibold">
								{langCount}
							</div>
							<div>
								&nbsp;languages
								<div tw="h-1" />
							</div>
						</div>
					</div>
					<div tw="h-[36px]" />
					<div>
						<button tw="p-2 bg-[#0085FF] text-[#FFFFFF] text-[10px] font-semibold rounded-full absolute bottom-[18px]">
							Subscribe this Plan
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
