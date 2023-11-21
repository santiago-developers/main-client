import PlanCard from "@components/plans/PlanCard";
import tw from "twin.macro";

export default function Plan() {
	const languages = [
		{ id: "Korean", name: "Korean", isSelected: true },
		{ id: "English", name: "English", isSelected: true },
		{ id: "Japanese", name: "Japanese", isSelected: true },
		{ id: "Chinese", name: "Chinese", isSelected: true },
		{ id: "Spanish", name: "Spanish", isSelected: false },
		{ id: "French", name: "French", isSelected: false },
		{ id: "German", name: "German", isSelected: false },
		{ id: "Italian", name: "Italian", isSelected: false },
	];
	return (
		<>
			<div tw="w-full grid place-items-center">
				<div tw="text-[32px] font-semibold">Language Pack</div>
				<div tw="h-3" />
				<div tw="flex">
					<div tw="font-light">
						Currently, you are subscribed as&nbsp;
					</div>
					<div tw="font-semibold">Master</div>
					<div tw="font-light">&nbsp;plan.</div>
				</div>
				<div tw="h-12" />
				<div tw="flex hover:cursor-default"> {/*선택 가능하게 만들 것 */}
					{languages.map((language) =>
						language.isSelected ? (
							<>
								<div tw="py-[8px] px-[6.5px] bg-[#000000] text-[#FFFFFF] rounded-xl mx-2">
									{language.name}
								</div>
							</>
						) : (
							<>
								<div tw="py-[8px] px-[6.5px] bg-[#F5F5F5] rounded-xl mx-2">
									{language.name}
								</div>
							</>
						),
					)}
				</div>
				<div tw="h-8" />
				<div tw="flex font-light text-[14px] text-[#79747E]">
					<div>To&nbsp;</div>
					<div tw="font-semibold text-[#525252]">Change</div>
					<div>&nbsp;the language from your plan, You have to&nbsp;</div>
					<div tw="text-[#0085FF]"><u>pay an additional 1 USD.</u></div>
				</div>
                <div tw="h-14"/>
                <div tw="flex">
                    <PlanCard title="Pro Plan" price="5.49 USD" langCount="4" productId="pro_plan"/>
					<div tw="w-[56px]"/>
                    <PlanCard title="Expert Plan" price="8.99 USD" langCount="6" productId="pro_plan"/>
					<div tw="w-[56px]"/>
                    <PlanCard title="Master Plan" price="12.49 USD" langCount="8" productId="pro_plan"/>
                </div>
                <div tw="h-14"/>

			</div>
		</>
	);
}
