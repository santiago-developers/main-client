export class VerifyVerificationNumberRequest {
    constructor(email: string, verificationNumber: string) {
        this.email = email;
        this.verificationNumber = verificationNumber;
    }
    email: string;
    verificationNumber: string;
}