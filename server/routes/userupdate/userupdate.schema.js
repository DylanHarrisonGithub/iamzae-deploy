"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//{ username?: string, avatar?: string, privilege?: string } 
const userUpdateSchema = {
    id: {
        type: 'number',
        attributes: {
            required: true
        }
    },
    update: {
        type: {
            username: {
                type: 'string',
                attributes: {
                    required: false,
                    strLength: { minLength: 6 }
                }
            },
            avatar: {
                type: 'string',
                attributes: {
                    required: false
                }
            },
            privilege: {
                type: ['guest', 'user', 'admin'],
                attributes: {
                    required: false
                }
            }
        },
        attributes: {
            required: false
        }
    }
};
exports.default = userUpdateSchema;
