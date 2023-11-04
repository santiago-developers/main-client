export class SendVerificationNumberResponse {
    constructor(isSuccess: boolean) {
        this.isSuccess = isSuccess;
    }

    isSuccess: boolean;
}