"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const secret = crypto_1.default.randomBytes(64).toString('hex');
const config = {
    SERVER_SECRET: process.env.IAMZAE_SERVER_SECRET || secret,
    DATABASE_URL: process.env.IAMZAE_DATABASE_URL || '',
    APPNAME: 'iamzae',
    ENVIRONMENT: ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'DEVELOPMENT',
    SOCKET_CONNECT_PRIVELEGE: ['guest', 'user', 'admin'],
    ROOT_DIR: path_1.default.normalize(__dirname + `/../../`),
    PORT: process.env.IAMZAE_PORT || 3000,
    ROOT_URL: '/',
    ERROR_URL: '/error',
    NODEMAILER: {
        EMAIL: process.env.IAMZAE_NODEMAILER_EMAIL || '',
        PASSWORD: process.env.IAMZAE_NODEMAILER_PASSWORD || ''
    },
    ADMIN_EMAIL: process.env.IAMZAE_ADMIN_EMAIL || '',
    MAX_HD_SIZE_GB: process.env.IAMZAE_MAX_HD_SIZE_GB || 20,
    REPOSITORY: {
        URL: process.env.IAMZAE_REPO_URL,
        BRANCH: process.env.IAMZAE_REPO_BRANCH || 'main',
        PAT: process.env.IAMZAE_REPO_PAT
    },
    PROTECTED_FOLDERS: [
        'public',
        'public/media',
        'public/tracks',
        'public/static',
    ]
};
exports.default = config;
