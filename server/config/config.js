"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const secret = crypto_1.default.randomBytes(64).toString('hex');
const env = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'DEVELOPMENT';
const config = {
    SERVER_SECRET: env === 'DEVELOPMENT' ? 'abcdefg' : process.env.IAMZAE_SERVER_SECRET || secret,
    DATABASE_URL: process.env.IAMZAE_DATABASE_URL || '',
    APPNAME: 'iamzae',
    ENVIRONMENT: ((_b = process.env.NODE_ENV) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || 'DEVELOPMENT',
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
    ],
    ACCEPTED_MEDIA_EXTENSIONS: {
        audio: ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac', '.wma', '.alac', '.aiff'],
        video: ['.mp4', '.mov', '.wmv', '.avi', '.mkv', '.flv', '.webm', '.avchd'],
        image: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg', '.webp'],
        font: ['.ttf', '.otf', '.woff', '.woff2', '.eot'],
        document: ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.xls', '.pptx', '.ppt'],
        style: ['.css', '.scss', '.sass', '.less'],
        // archive: ['.zip', '.rar', '.tar', '.gz'],
        // code: ['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.json'],
        // other: ['.md', '.yaml', '.xml', '.csv', '.log']
    }
};
exports.default = config;
