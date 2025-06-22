"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDirectorySchema = {
    folderName: {
        type: /^\/(?:[a-zA-Z0-9_-]+\/?)*$/,
        attributes: {
            required: true,
            strLength: { minLength: 1, maxLength: 56 }
        }
    }
};
exports.default = createDirectorySchema;
