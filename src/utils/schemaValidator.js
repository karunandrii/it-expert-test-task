import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { load as loadYaml } from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    return {
        valid,
        errors: validate.errors || [],
    };
}

export function loadYamlSchema(schemaPath) {
    const absolutePath = path.resolve(schemaPath);
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    return loadYaml(fileContent);
}
