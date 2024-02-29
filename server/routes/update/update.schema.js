"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateSchema = {
    username: {
        type: 'string',
        attributes: {
            required: true
        }
    },
    code: {
        type: 'string',
        attributes: { required: true }
    }
};
exports.default = updateSchema;
