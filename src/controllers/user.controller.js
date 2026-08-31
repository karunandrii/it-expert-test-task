export class UserController {
    constructor(client) {
        this.client = client;
    }

    async getUsers(params = {}) {
        return this.client.get('/users', params);
    }
}
