"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateDeleteSchema = {
    id: { type: 'string | number', attributes: { required: true, range: { min: 0 } } },
};
exports.default = updateDeleteSchema;
