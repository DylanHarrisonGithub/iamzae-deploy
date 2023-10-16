"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../../services/validation/validation.service");
const reviewCreateSchema = {
    event: { type: 'number', attributes: { required: true, range: { min: 0 } } },
    name: { type: validation_service_1.COMMON_REGEXES.ALPHA_NUMERIC_SPACES, attributes: { required: true, strLength: { minLength: 3, maxLength: 32 } } },
    stars: { type: [0, 1, 2, 3, 4, 5, '0', '1', '2', '3', '4', '5'], attributes: { required: true } },
    text: { type: validation_service_1.COMMON_REGEXES.COMMON_WRITING, attributes: { required: true, strLength: { minLength: 4, maxLength: 512 } } }
};
exports.default = reviewCreateSchema;
