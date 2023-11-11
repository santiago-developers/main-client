export class SendVerificationNumberRequest {
    constructor(email: string) {
        this.email = email;
    }

    email: string | null;
}