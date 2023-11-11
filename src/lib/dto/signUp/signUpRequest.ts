export class SignUpRequest {
    constructor(email: string | null, password: string | null, firebaseId: string | null, marketingTerm: boolean, regionId: string) {
        this.email = email;
        this.password = password;
        this.firebaseId = firebaseId;
        this.marketingTerm = marketingTerm;
        this.regionId = regionId;
    }
    email: string | null;
    password: string | null;
    firebaseId: string | null;
    marketingTerm: boolean;
    regionId: string;
}