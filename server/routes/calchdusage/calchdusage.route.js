"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_1 = __importDefault(require("../../services/file/file.service"));
const config_1 = __importDefault(require("../../config/config"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const rootSize = yield file_service_1.default.getDirectorySize('');
    const mediaSize = yield file_service_1.default.getDirectorySize('public/media');
    const tracksSize = yield file_service_1.default.getDirectorySize('public/tracks');
    //&& rootSize.body  && mediaSize.body  && tracksSize.body
    if (!(rootSize.success && mediaSize.success && tracksSize.success)) {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - CALCHDUSAGE - Error calculating hd usage.`,
                    ...rootSize.messages,
                    ...mediaSize.messages,
                    ...tracksSize.messages
                ]
            }
        }));
    }
    return new Promise(res => res({
        code: 200,
        json: {
            success: true,
            messages: [
                `SERVER - ROUTES - CALCHDUSAGE - HD usage successfully calculated.`,
                ...rootSize.messages,
                ...mediaSize.messages,
                ...tracksSize.messages
            ],
            body: {
                rootSizeBytes: rootSize.body,
                mediaSizeBytes: mediaSize.body,
                tracksSizeBytes: tracksSize.body,
                maxSizeGB: config_1.default.MAX_HD_SIZE_GB
            }
        }
    }));
});
