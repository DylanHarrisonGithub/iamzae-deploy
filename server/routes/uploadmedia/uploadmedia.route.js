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
const config_1 = __importDefault(require("../../config/config"));
const acceptedMediaExtensions = {
    font: ['.woff2', '.woff', '.ttf', '.otf'],
    image: ['.gif', '.jpg', '.jpeg', '.png', '.heic'],
    video: ['.mov', '.mp4', '.mpeg', '.webm', '.ogg'],
    audio: ['.mp3', '.wav', '.ogg']
};
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('path received:', request.params.path);
    let destPath = request.params.path === undefined ? '' : request.params.path;
    destPath = destPath.replace(/^\/+/, '');
    if (destPath.length)
        destPath = destPath.endsWith('/') ? destPath : destPath + '/';
    console.log('destPath:', destPath);
    const filename = Object.keys(request.files)[0];
    if (!filename) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    "SERVER - ROUTES - UPLOADMEDIA - Failed to upload file.",
                    "SERVER - ROUTES - UPLOADMEDIA - No file was received."
                ]
            }
        }));
    }
    if (!(acceptedMediaExtensions.font.filter(accepted => filename.toLowerCase().endsWith(accepted)).length ||
        acceptedMediaExtensions.image.filter(accepted => filename.toLowerCase().endsWith(accepted)).length ||
        acceptedMediaExtensions.video.filter(accepted => filename.toLowerCase().endsWith(accepted)).length ||
        acceptedMediaExtensions.audio.filter(accepted => filename.toLowerCase().endsWith(accepted)).length)) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    "SERVER - ROUTES - UPLOADMEDIA - Failed to upload file.",
                    "SERVER - ROUTES - UPLOADMEDIA - File type not allowed.",
                    //`SERVER - ROUTES - UPLOADMEDIA - Allowed file extensions: ${acceptedMediaExtensions.image + ", " + acceptedMediaExtensions.video}.`,
                ]
            }
        }));
    }
    const dest = destPath ? 'public/' + destPath : 'public/';
    yield file_service_1.default.createDirectory(dest);
    const uploadRes = yield (new Promise((uRes) => {
        request.files[Object.keys(request.files)[0]].mv(path_1.default.normalize(config_1.default.ROOT_DIR + dest) + Object.keys(request.files)[0], (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                uRes({
                    success: false,
                    messages: ["SERVER - ROUTES - UPLOADMEDIA - Failed to upload file."].concat(err.toString())
                });
            }
            else {
                uRes({
                    success: true,
                    messages: ["SERVER - ROUTES - UPLOADMEDIA - File uploaded successfully."]
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
    const fRead = yield file_service_1.default.readDirectory(dest);
    if (!fRead.success) {
        return new Promise(res => res({
            code: 207,
            json: {
                success: true,
                messages: [
                    "SERVER - ROUTES - UPLOADMEDIA - Media successfully uploaded!",
                    `Server - Routes - UPLOADMEDIA - Failed to load media list.`,
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
                "SERVER - ROUTES - UPLOADMEDIA - Media successfully uploaded!",
                "SERVER - ROUTES - UPLOADMEDIA - Successfully loaded media list!"
            ],
            body: fRead.body
        }
    }));
});
