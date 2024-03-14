"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userdeleteSchema = {
    id: { type: 'string | number', attributes: { required: true, range: { min: 0 } } },
    admin: {
        type: 'string',
        attributes: {
            required: true,
            strLength: { minLength: 6 }
        }
    },
    code: {
        type: 'string',
        attributes: {
            required: true,
            strLength: { minLength: 0, maxLength: 128 }
        }
    }
};
exports.default = userdeleteSchema;
