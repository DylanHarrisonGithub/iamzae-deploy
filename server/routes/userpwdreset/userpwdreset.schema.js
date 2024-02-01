"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../../services/validation/validation.service");
//{ username?: string, avatar?: string, privilege?: string } 
const userPwdResetSchema = {
    username: {
        type: 'string',
        attributes: {
            required: true
        }
    },
    code: {
        type: 'string',
        attributes: {
            required: true
        }
    },
    password: {
        type: validation_service_1.COMMON_REGEXES.PASSWORD_STRONGEST,
        attributes: {
            required: false
        }
    }
};
exports.default = userPwdResetSchema;
