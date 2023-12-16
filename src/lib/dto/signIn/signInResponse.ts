export class SignInResponse {
    constructor(userId: string, accessToken: string, refreshToken: string) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    userId: string;
    accessToken : string;
    refreshToken : string;
}