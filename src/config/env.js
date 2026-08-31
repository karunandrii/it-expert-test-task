import dotenv from 'dotenv';

dotenv.config({ quiet: process.env.NODE_ENV === 'test' });

export const env = {
    dummyJsonUrl: process.env.DUMMYJSON_API_URL || 'https://dummyjson.com',
    jsonPlaceholderUrl: process.env.JSONPLACEHOLDER_API_URL || 'https://jsonplaceholder.typicode.com',
};
