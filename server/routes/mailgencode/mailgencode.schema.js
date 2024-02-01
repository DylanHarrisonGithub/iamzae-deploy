"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = require("../../services/validation/validation.service");
const mailGenCodeSchema = {
    email: {
        type: validation_service_1.COMMON_REGEXES.EMAIL,
        attributes: { required: true, strLength: { minLength: 5, maxLength: 30 } }
    }
};
exports.default = mailGenCodeSchema;
