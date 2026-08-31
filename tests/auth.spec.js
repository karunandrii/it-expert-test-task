import { controllersProvider } from '../src/lib/controllersProvider.js';
import { loadYamlSchema, validateSchema } from '../src/utils/schemaValidator.js';
import { AUTH_SCHEMA_PATH } from '../src/config/globals.js';

describe('@Task2 - POST /auth/login', () => {
    let authController;

    const VALID_USER = {
        username: 'emilys',
        password: 'emilyspass'
    };

    beforeAll(() => {
        authController = controllersProvider.getAuthController();
    });

    test('should login successfully and return accessToken', async () => {
        const response = await authController.login(VALID_USER);
        const schema = loadYamlSchema(AUTH_SCHEMA_PATH);
        const validation = validateSchema(schema, response.data);

        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
        expect(response.data.username).toBe(VALID_USER.username);
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    test('should return 400 for invalid password', async () => {
        const response = await authController.login({
            username: VALID_USER.username,
            password: 'wrongpassword',
        });

        expect(response.status).toBe(400);
        expect(response.data.message).toBeDefined();
    });

    test('should return 400 for non-existent username', async () => {
        const response = await authController.login({
            username: 'nonexistentuser12345',
            password: VALID_USER.password,
        });

        expect(response.status).toBe(400);
        expect(response.data.message).toBeDefined();
    });

    test('should return 400 when required fields are missing', async () => {
        const response = await authController.login({
            username: 'testuser',
            // password missing
        });

        expect(response.status).toBe(400);
        expect(response.data.message).toBeDefined();
    });

    test('should return 400 when payload is entirely empty', async () => {
        const response = await authController.login({});
        expect(response.status).toBe(400);
        expect(response.data.message).toMatch(/required/i);
    });
});
