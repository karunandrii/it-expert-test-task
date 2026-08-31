import axios from 'axios';

export class Request {
    constructor(config = {}) {
        this.baseURL = config.baseURL;
        this.headers = config.headers || { 'Content-Type': 'application/json' };
        this.timeout = config.timeout || 15000;
        this.validateStatus = config.validateStatus || (() => true);
        this.client = this._createClient();
    }

    _createClient() {
        return axios.create({
            baseURL: this.baseURL,
            headers: this.headers,
            timeout: this.timeout,
            validateStatus: this.validateStatus,
        });
    }

    async get(endpoint, params = {}) {
        return this.client.get(endpoint, { params });
    }

    async post(endpoint, data, config = {}) {
        return this.client.post(endpoint, data, config);
    }

    async put(endpoint, data, config = {}) {
        return this.client.put(endpoint, data, config);
    }

    async patch(endpoint, data, config = {}) {
        return this.client.patch(endpoint, data, config);
    }

    async delete(endpoint, config = {}) {
        return this.client.delete(endpoint, config);
    }
}

export class ClientBuilder {
    constructor() {
        this.config = {
            headers: { 'Content-Type': 'application/json' },
            validateStatus: () => true,
        };
    }

    url(baseURL) {
        this.config.baseURL = baseURL;
        return this;
    }

    headers(headers) {
        this.config.headers = { ...this.config.headers, ...headers };
        return this;
    }

    timeout(timeout) {
        this.config.timeout = timeout;
        return this;
    }

    validateStatus(validateStatus) {
        this.config.validateStatus = validateStatus;
        return this;
    }

    build() {
        return new Request(this.config);
    }
}
