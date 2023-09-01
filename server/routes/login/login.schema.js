"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginSchema = {
    email: {
        type: 'string',
        attributes: {
            required: true
        }
    },
    password: {
        type: 'string',
        attributes: {
            required: true
        }
    }
};
exports.default = loginSchema;
