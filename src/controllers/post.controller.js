export class PostController {
    constructor(client) {
        this.client = client;
    }

    async createPost(data) {
        return this.client.post('/posts', data);
    }

    async updatePost(postId, data) {
        return this.client.put(`/posts/${postId}`, data);
    }
}
