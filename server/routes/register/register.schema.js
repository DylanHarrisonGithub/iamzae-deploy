"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../../services/validation/validation.service");
const registerSchema = {
    username: {
        type: 'string',
        attributes: {
            required: true,
            strLength: { minLength: 6 }
        }
    },
    password: {
        type: validation_service_1.COMMON_REGEXES.PASSWORD_STRONGEST,
        attributes: {
            required: false,
            strLength: { minLength: 8 }
        }
    },
    dummy: {
        type: 'string'
    }
};
exports.default = registerSchema;
