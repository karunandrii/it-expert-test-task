import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemasDir = path.join(__dirname, '../schemas');

export const AUTH_SCHEMA_PATH = path.join(schemasDir, 'auth.schema.yaml');
export const POST_SCHEMA_PATH = path.join(schemasDir, 'post.schema.yaml');
export const USER_SCHEMA_PATH = path.join(schemasDir, 'getUser.schema.yaml');
export const USERS_LIST_SCHEMA_PATH = path.join(schemasDir, 'users-list.schema.yaml');
