import { controllersProvider } from '../src/lib/controllersProvider.js';
import { loadYamlSchema, validateSchema } from '../src/utils/schemaValidator.js';
import { USER_SCHEMA_PATH, USERS_LIST_SCHEMA_PATH } from '../src/config/globals.js';

describe('@Task2 - GET /users', () => {
    let userController;

    beforeAll(() => {
        userController = controllersProvider.getUserController();
    });

    test('should retrieve list of users with default pagination and validate schema', async () => {
        const response = await userController.getUsers();
        const schema = loadYamlSchema(USERS_LIST_SCHEMA_PATH);
        const validation = validateSchema(schema, response.data);

        expect(response.status).toBe(200);
        expect(response.data.users).toBeInstanceOf(Array);
        expect(response.data.users.length).toBeGreaterThan(0);
        expect(response.data.limit).toBe(30); // A default
        expect(response.data.skip).toBeDefined();
        expect(response.data.total).toBeGreaterThan(0);
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    test('should respect pagination limit parameter', async () => {
        const limit = 5;
        const response = await userController.getUsers({ limit });

        expect(response.status).toBe(200);
        expect(response.data.users).toHaveLength(limit);
        expect(response.data.limit).toBe(limit);
    });

    test('should respect skip parameter for pagination', async () => {
        const skip = 10;
        const response = await userController.getUsers({ skip });

        expect(response.status).toBe(200);
        expect(response.data.skip).toBe(skip);
        expect(response.data.users).toBeInstanceOf(Array);
    });

    // I'd treat it as bug with comment: Fails due to bug #TC_123 - get users should not expose password
    test.failing('should validate user object structure against schema', async () => {
        const response = await userController.getUsers({ limit: 1 });
        const user = response.data.users[0];
        const schema = loadYamlSchema(USER_SCHEMA_PATH);
        const validation = validateSchema(schema, user);

        expect(response.status).toBe(200);
        expect(user).toBeDefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('firstName');
        expect(user).toHaveProperty('email');
        expect(user).not.toHaveProperty('password');
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    test('should return empty array when skip exceeds total', async () => {
        const response = await userController.getUsers({ skip: 999999 });

        expect(response.status).toBe(200);
        expect(response.data.users).toEqual([]);
    });
});
