import { faker } from '@faker-js/faker';

export function generateDummyJsonValidUser(overrides = {}) {
    const validUsers = [{ username: 'john', password: 'johnpass' }];

    const base = faker.helpers.arrayElement(validUsers);

    return {
        ...base,
        ...overrides,
    };
}
