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
            required: true,
            strLength: { minLength: 8 }
        }
    },
    avatar: {
        type: 'string',
        attributes: {
            required: false,
        }
    },
    email: {
        type: 'string',
        attributes: {
            required: false
        }
    }
};
exports.default = registerSchema;
