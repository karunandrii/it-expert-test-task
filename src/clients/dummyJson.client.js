import { ClientBuilder } from '../lib/request.js';
import { env } from '../config/env.js';

export class DummyJsonClient {
    constructor() {
        this.client = new ClientBuilder()
            .url(env.dummyJsonUrl)
            .validateStatus(() => true)
            .build();
    }

    async get(endpoint, params = {}) {
        return this.client.get(endpoint, params);
    }

    async post(endpoint, data) {
        return this.client.post(endpoint, data);
    }

    async put(endpoint, data) {
        return this.client.put(endpoint, data);
    }

    async delete(endpoint) {
        return this.client.delete(endpoint);
    }
}
