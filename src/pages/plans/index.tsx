import LanguageSelection from "@components/plans/LanguageSelection";
import PlanCard from "@components/plans/PlanCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import myInfoStore from "store/myInfoStore";
import tw from "twin.macro";

export interface LanguageDto {
	id: string;
	name: string;
}

export default function Plan() {
	const [languages, setLanguages] = useState<LanguageDto[]>([]);
	const [isNeedToUpdate, SetIsNeedToUpdate] = useState(true);
	const { allowedLanguageCount, languagesSubcribed } = myInfoStore();
	const router = useRouter();

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if(!userId) {
			router.push("/auth/sign-in");
		}
		setLanguages(languagesSubcribed);
		SetIsNeedToUpdate(
			!(allowedLanguageCount === languagesSubcribed.length),
		);
	}, []);
	return (
		<>
			<div tw="w-full grid place-items-center">
				<div tw="text-[32px] font-semibold">Language Pack</div>
				<div tw="h-3" />
				<div tw="flex">
					<div tw="font-light">
						Currently, you are subscribed as&nbsp;
					</div>
					<div tw="font-semibold">
						{allowedLanguageCount === 4 ? <>Pro</> : allowedLanguageCount === 6 ? <>Expert</> : allowedLanguageCount === 8 ? <>Master</> : <>Basic</>}{" "}
						
					</div>
					<div tw="font-light">&nbsp;plan.</div>
				</div>
				<div tw="h-12" />
				<div>
					{" "}
					<LanguageSelection
						languages={languages}
						allowedCount={allowedLanguageCount}
						isNeedToUpdate={isNeedToUpdate}
						setIsNeedToUpdate={SetIsNeedToUpdate}
					/>
				</div>
				<div tw="h-8" />
				<div tw="flex font-light text-[14px] text-[#79747E]">
					<div>To&nbsp;</div>
					<div tw="font-semibold text-darkGray">Change</div>
					<div>
						&nbsp;the language from your plan, You have to&nbsp;
					</div>
					<div tw="text-[#0085FF]">
						<u>pay an additional 1 USD.</u>
					</div>
				</div>
				<div tw="h-14" />
				<div tw="flex">
					<PlanCard
						title="Pro Plan"
						price="5.49 USD"
						langCount="4"
						planId="P-1RP04957X7097191DMVS5IRQ"
						allowedLanguageCount={allowedLanguageCount}
					/>
					<div tw="w-[56px]" />
					<PlanCard
						title="Expert Plan"
						price="8.99 USD"
						langCount="6"
						planId="P-1RP04957X7097191DMVS5IRQ"
						allowedLanguageCount={allowedLanguageCount}
					/>
					<div tw="w-[56px]" />
					<PlanCard
						title="Master Plan"
						price="12.49 USD"
						langCount="8"
						planId="P-1RP04957X7097191DMVS5IRQ"
						allowedLanguageCount={allowedLanguageCount}
					/>
				</div>
				<div tw="h-14" />
			</div>
		</>
	);
}
