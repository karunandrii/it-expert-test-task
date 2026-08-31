export class AuthController {
    constructor(client) {
        this.client = client;
    }

    async login(credentials) {
        return this.client.post('/auth/login', credentials);
    }
}
