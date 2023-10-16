"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewDeleteSchema = {
    id: { type: 'string | number', attributes: { required: true, range: { min: 0 } } },
};
exports.default = reviewDeleteSchema;
