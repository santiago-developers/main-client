import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreateSubscriptionReqDto } from "lib/dto/plan/CreateSubscriptionReqDto";
import { CreateSubscriptionResDto } from "lib/dto/plan/CreateSubscriptionResDto";
import { SantiagoPost } from "lib/fetchData";
import myInfoStore from "store/myInfoStore";
import tw from "twin.macro";

interface Props {
	title: string;
	price: string;
	langCount: string;
	planId: string;
	allowedLanguageCount: number;
}

export default function PlanCard({
	title,
	price,
	langCount,
	planId,
	allowedLanguageCount,
}: Props) {
	const { id: userId, setAllowedLanguageCount } = myInfoStore();
	const initialOptions = {
		clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
		"enable-funding": "",
		"disable-funding": "paylater,card",
		"data-sdk-integration-source": "integrationbuilder_sc",
		vault: "true",
		intent: "subscription",
	};

	return (
		<>
			<div tw="w-[250px] h-[280px] rounded-lg shadow-xl  relative  hover:cursor-default">
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
				{allowedLanguageCount === Number(langCount) ? (
					<div tw="absolute top-0 right-0 w-[70px] h-[15px] bg-[#0085FF] text-[#FFFFFF] text-[8px] grid place-items-center font-semibold">
						My current plan
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
					{allowedLanguageCount == Number(langCount) ? null : (
						<div>
							<PayPalScriptProvider options={initialOptions}>
								<PayPalButtons
									tw="absolute bottom-[18px]"
									style={{
										shape: "pill",
										label: "subscribe",
									}}
									createSubscription={async (
										data,
										actions,
									) => {
										return actions.subscription
											.create({
												plan_id: planId,
											})
											.then(async (orderId) => {
												// Your code here after create the order

												return orderId;
											});
									}}
									onApprove={async (order) => {
										const response = await SantiagoPost<
											CreateSubscriptionReqDto,
											CreateSubscriptionResDto
										>(
											"payments/create-subscription",
											new CreateSubscriptionReqDto(
												order.subscriptionID as string,
												planId,
												userId,
											),
										);
										setAllowedLanguageCount(
											response.allowedLanguageCount,
										);
										alert(
											"Your subscription payment was successful.",
										);
										location.reload();
									}}
								/>
							</PayPalScriptProvider>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
