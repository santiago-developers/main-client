export class SignInRequest {
    constructor(email: string | null, password: string | null, firebaseId: string | null) {
        this.email = email;
        this.password = password;
        this.firebaseId = firebaseId;
    }
    
    email: string | null;
    password: string | null;
    firebaseId: string | null;
}