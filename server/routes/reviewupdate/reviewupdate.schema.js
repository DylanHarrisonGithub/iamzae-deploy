"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewUpdateSchema = {
    id: { type: 'string | number', attributes: { required: true, range: { min: 0 } } },
    update: {
        type: {
            approved: { type: 'boolean', attributes: { required: true } }
        },
        attributes: { required: true }
    }
};
exports.default = reviewUpdateSchema;
