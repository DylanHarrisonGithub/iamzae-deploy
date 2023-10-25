"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewStreamSchema = {
    afterID: { type: 'string | number', attributes: { required: true, range: { min: 0 } } },
    numrows: { type: 'string | number', attributes: { required: true, range: { min: 0, max: 50 } } },
    search: { type: 'string', attributes: { required: false } },
    event: { type: 'string | number', attributes: { required: false } },
    id: { type: 'string', attributes: { required: false } }
};
exports.default = reviewStreamSchema;
