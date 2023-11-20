"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateUpdateSchema = {
    id: {
        type: 'number',
        attributes: {
            required: true
        }
    },
    update: {
        type: {
            subject: { type: 'string', attributes: { required: false, strLength: { maxLength: 48, minLength: 0 } } },
            date: { type: 'string', attributes: { required: false, strLength: { maxLength: 48, minLength: 0 } } },
            update: { type: 'string', attributes: { required: false, strLength: { minLength: 0 } } }
        },
        attributes: {
            required: false
        }
    }
};
exports.default = updateUpdateSchema;
