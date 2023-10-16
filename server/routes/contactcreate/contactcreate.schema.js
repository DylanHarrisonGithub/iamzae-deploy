"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../../services/validation/validation.service");
const contactCreateSchema = {
    email: { type: validation_service_1.COMMON_REGEXES.EMAIL, attributes: { required: true, strLength: { minLength: 5, maxLength: 64 } } },
    subject: { type: validation_service_1.COMMON_REGEXES.COMMON_WRITING, attributes: { required: false, strLength: { maxLength: 128 } } },
    message: { type: validation_service_1.COMMON_REGEXES.COMMON_WRITING, attributes: { required: true, strLength: { minLength: 4, maxLength: 1024 } } }
};
exports.default = contactCreateSchema;
