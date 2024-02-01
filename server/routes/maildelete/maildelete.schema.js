"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailDeleteSchema = {
    id: {
        type: 'string',
        attributes: { required: true, strLength: { maxLength: 30 } }
    }
};
exports.default = mailDeleteSchema;
