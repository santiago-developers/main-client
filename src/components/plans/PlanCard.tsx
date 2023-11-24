import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import tw from "twin.macro";

interface Props {
	title: string;
	price: string;
	langCount: string;
	planId: string;
}

export default function PlanCard({
	title,
	price,
	langCount,
	planId,
}: Props) {
	const [message, setMessage] = useState('');
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
						<PayPalScriptProvider options={initialOptions}>
							<PayPalButtons tw="absolute bottom-[18px]"
							style={{
								shape: "pill",
							  }}
							  createSubscription={async () => {
								try {
								  const response = await fetch("/payments/create-subscription", {
									method: "POST",
									headers: {
									  "Content-Type": "application/json",
									},
									body: JSON.stringify({ planId, userAction: "SUBSCRIBE_NOW" }),
								  });
								  const data = await response.json();
								  if (data?.id) {
									setMessage(`Successful subscription...`);
									return data.id;
								  } else {
									console.error(
									  { callback: "createSubscription", serverResponse: data },
									  JSON.stringify(data, null, 2),
									);
									// (Optional) The following hides the button container and shows a message about why checkout can't be initiated
									const errorDetail = data?.details?.[0];
									setMessage(
									  `Could not initiate PayPal Subscription...<br><br>${
										errorDetail?.issue || ""
									  } ${errorDetail?.description || data?.message || ""} ` +
										(data?.debug_id ? `(${data.debug_id})` : ""),
									);
								  }
								} catch (error) {
								  console.error(error);
								  setMessage(`Could not initiate PayPal Subscription...${error}`);
								}
							  }}
							  onApprove={async (data, actions) => {
								/*
								  No need to activate manually since SUBSCRIBE_NOW is being used.
								  Learn how to handle other user actions from our docs:
								  https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
								*/
								if (data.orderID) {
								  setMessage(
									`You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`,
								  );
								} else {
								  setMessage(
									`Failed to activate the subscription: ${data.subscriptionID}`,
								  );
								}
							  }}/>
							{/**
							 * <button
								tw="p-2 bg-[#0085FF] text-[#FFFFFF] text-[10px] font-semibold rounded-full absolute bottom-[18px]"
								onClick={subscribePlan}>
								Subscribe this Plan
							</button>
							 */}
						</PayPalScriptProvider>
					</div>
				</div>
			</div>
		</>
	);
}
