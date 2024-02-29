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
const path_1 = __importDefault(require("path"));
const file_service_1 = __importDefault(require("../../services/file/file.service"));
const models_1 = require("../../models/models");
const config_1 = __importDefault(require("../../config/config"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = Object.keys(request.files)[0];
    if (!filename) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    "SERVER - ROUTES - UPLOADTRACK - Failed to upload file.",
                    "SERVER - ROUTES - UPLOADTRACK - No file was received."
                ]
            }
        }));
    }
    if (!(models_1.acceptedMediaExtensions.audio.filter(accepted => filename.toLowerCase().endsWith(accepted)).length)) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    "SERVER - ROUTES - UPLOADTRACK - Failed to upload file.",
                    "SERVER - ROUTES - UPLOADTRACK - File type not allowed.",
                    `SERVER - ROUTES - UPLOADTRACK - Allowed file extensions: ${models_1.acceptedMediaExtensions.image + ", " + models_1.acceptedMediaExtensions.video}.`,
                ]
            }
        }));
    }
    const uploadRes = yield (new Promise((uRes) => {
        request.files[Object.keys(request.files)[0]].mv(path_1.default.normalize(config_1.default.ROOT_DIR + '/public/tracks/') + Object.keys(request.files)[0], (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                uRes({
                    success: false,
                    messages: ["SERVER - ROUTES - UPLOADTRACK - Failed to upload file."].concat(err.toString())
                });
            }
            else {
                uRes({
                    success: true,
                    messages: ["SERVER - ROUTES - UPLOADTRACK - File uploaded successfully."]
                });
            }
        }));
    }));
    if (!uploadRes.success) {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: uploadRes.messages
            }
        }));
    }
    const fRead = yield file_service_1.default.readDirectory('public/track');
    if (!fRead.success) {
        return new Promise(res => res({
            code: 207,
            json: {
                success: true,
                messages: [
                    "SERVER - ROUTES - UPLOADTRACK - Track successfully uploaded!",
                    `Server - Routes - UPLOADTRACK - Failed to load track list.`,
                    ...fRead.messages
                ],
                body: []
            }
        }));
    }
    return new Promise(res => res({
        code: 200,
        json: {
            success: true,
            messages: [
                "SERVER - ROUTES - UPLOADTRACK - Track successfully uploaded!",
                "SERVER - ROUTES - UPLOADTRACK - Successfully loaded track list!"
            ],
            body: fRead.body
        }
    }));
});
