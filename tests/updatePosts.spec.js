import { controllersProvider } from '../src/lib/controllersProvider.js';
import { loadYamlSchema, validateSchema } from '../src/utils/schemaValidator.js';
import { POST_SCHEMA_PATH } from '../src/config/globals.js';

const POST_ID = 1;

describe('@Task1 — PUT /posts/{id}', () => {
    let postController;

    beforeAll(() => {
        postController = controllersProvider.getPostController();
    });

    test('should update a post with valid data', async () => {
        const payload = {
            title: 'Updated Post Title',
            body: 'Updated post body',
            userId: 1,
            id: POST_ID,
        };
        const response = await postController.updatePost(POST_ID, payload);
        const schema = loadYamlSchema(POST_SCHEMA_PATH);
        const validation = validateSchema(schema, response.data);

        expect(response.status).toBe(200);
        expect(response.data.title).toBe(payload.title);
        expect(response.data.body).toBe(payload.body);
        expect(response.data.id).toBe(POST_ID);

        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    test('should update only title field', async () => {
        // Arrange
        const payload = {
            title: 'Only Title Updated',
            id: POST_ID,
            userId: 1,
        };

        // Act
        const response = await postController.updatePost(POST_ID, payload);

        // Assert
        expect(response.status).toBe(200);
        expect(response.data.title).toBe(payload.title);
    });

    test('should return 500 when updating a non-existent post', async () => {
        const payload = {
            title: 'Update Invalid ID',
            body: 'Test body',
            userId: 1,
            id: 999999,
        };
        const response = await postController.updatePost(999999, payload);

        expect(response.status).toBe(500);
    });

    test('should return 500 for invalid ID data type (string)', async () => {
        const invalidPostId = 'one';
        const payload = {
            title: 'Invalid ID type update',
            body: 'Invalid ID type test body',
            userId: 1,
            id: invalidPostId,
        };

        const response = await postController.updatePost(invalidPostId, payload);

        expect(response.status).toBe(500);
    });

    test('should be idempotent: multiple identical requests yield the same state', async () => {
        const payload = {
            title: 'Post Title',
            body: 'Post body',
            userId: 1,
            id: POST_ID,
        };

        const response1 = await postController.updatePost(POST_ID, payload);
        const response2 = await postController.updatePost(POST_ID, payload);

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data).toEqual(response2.data);
    });
});
