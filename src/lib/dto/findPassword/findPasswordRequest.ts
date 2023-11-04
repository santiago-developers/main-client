export class FindPasswordRequest {
    constructor(email: string) {
        this.email = email;
    }

    email: string | null;
}