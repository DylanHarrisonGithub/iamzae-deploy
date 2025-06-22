"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDirectorySchema = {
    path: { type: /^\/(?:[a-zA-Z0-9_-]+\/?)*$/, attributes: { required: true, strLength: { minLength: 1, maxLength: 255 } } },
};
exports.default = getDirectorySchema;
