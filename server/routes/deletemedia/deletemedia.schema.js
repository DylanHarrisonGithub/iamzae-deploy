"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// filenames are passed as stringified array because arrays can not be passed in delete request as url search params
const deleteMediaSchema = {
    filename: {
        type: /^\/?(?:[\w\-\.\s\[\]\(\)]+\/)*[\w\-\.\s\[\]\(\]]+$/,
        attributes: {
            required: false,
            strLength: { minLength: 1, maxLength: 255 }
        }
    },
    filenames: {
        type: /^\["(?:[^"\\]|\\.)*"(?:,\s*"([^"\\]|\\.)*")*\]$/,
        attributes: { required: false }
    }
};
exports.default = deleteMediaSchema;
