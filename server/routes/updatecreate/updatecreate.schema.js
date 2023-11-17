"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateCreateSchema = {
    subject: { type: 'string', attributes: { required: true, strLength: { maxLength: 48, minLength: 0 } } },
    date: { type: 'string', attributes: { required: true, strLength: { maxLength: 48, minLength: 0 } } },
    update: { type: 'string', attributes: { required: true, strLength: { minLength: 0 } } }
};
exports.default = updateCreateSchema;
