"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteMediaSchema = {
    filename: { type: 'string', attributes: { required: true, range: { min: 0, max: 255 } } },
};
exports.default = deleteMediaSchema;
