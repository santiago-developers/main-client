export class CreateSubscriptionReqDto {
    orderId: string;
	planId: string;
	userId: string;

    constructor(orderId: string, planId: string, userId: string) {
        this.orderId = orderId;
        this.planId = planId;
        this.userId = userId;
    }
}