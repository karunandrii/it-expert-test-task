import { controllersProvider } from '../src/lib/controllersProvider.js';
import { loadYamlSchema, validateSchema } from '../src/utils/schemaValidator.js';
import { POST_SCHEMA_PATH } from '../src/config/globals.js';

describe('@Task1 — POST /posts', () => {
    let postController;

    beforeAll(() => {
        postController = controllersProvider.getPostController();
    });

    test('should create a post with valid payload', async () => {
        // requires title, body, and userId fields
        const payload = {
            title: 'Test Post Title',
            body: 'Test Post Body',
            userId: 1,
        };
        const response = await postController.createPost(payload);
        const schema = loadYamlSchema(POST_SCHEMA_PATH);
        const validation = validateSchema(schema, response.data);

        const { id, title, body } = response.data;

        expect(response.status).toBe(201);
        expect(id).toBeDefined();
        expect(title).toBe(payload.title);
        expect(body).toBe(payload.body);
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    test('should preserve all fields in created post', async () => {
        const payload = {
            title: 'Complete Post Data',
            body: 'This is a test post body',
            userId: 1,
        };
        const response = await postController.createPost(payload);

        expect(response.status).toBe(201);
        expect(response.data.title).toBe(payload.title);
        expect(response.data.body).toBe(payload.body);
        expect(response.data.userId).toBe(payload.userId);
    });

    test('should ignore unexpected additional fields', async () => {
        const payload = {
            title: 'Post with extra fields',
            body: 'Body',
            userId: 1,
            unexpectedField: 'ignore me',
            debug: { traceId: 'abc-123' },
        };
        const response = await postController.createPost(payload);

        expect(response.status).toBe(201);
        expect(response.data.id).toBeDefined();
        expect(response.data.title).toBe(payload.title);
    });

    test('should handle invalid data types (userId as string)', async () => {
        const payload = {
            title: 'Invalid type payload',
            body: 'Body',
            userId: '1',
        };
        const response = await postController.createPost(payload);

        // JSONPlaceholder may still accept and echo the payload, so assert response shape.
        expect(response.status).toBeDefined();
        expect(response.data).toBeDefined();
        expect(response.data.title).toBe(payload.title);
    });

    test('should handle edge case with very long title', async () => {
        const longTitle = 'A'.repeat(500);
        const payload = { title: longTitle, body: 'Test', userId: 1 };
        const response = await postController.createPost(payload);

        expect(response.status).toBe(201);
        expect(response.data.id).toBeDefined();
    });
});
