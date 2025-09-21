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
// const acceptedMediaExtensions = {
//   font: ['.woff2', '.woff', '.ttf', '.otf'],
//   image: ['.gif', '.jpg', '.jpeg', '.png', '.heic'],
//   video: ['.mov', '.mp4', '.mpeg', '.webm', '.ogg'],
//   audio: ['.mp3', '.wav', '.ogg'],
//   document: ['.pdf', '.docx', '.txt', '.xlsx', '.pptx'],
//   style: ['.css'],
//   // archive: ['.zip', '.rar', '.tar', '.gz'],
//   // code: ['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.json'],
//   // other: ['.md', '.yaml', '.xml', '.csv', '.log']
// };
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('path received:', request.params.path);
    let destPath = request.params.path === undefined ? '' : request.params.path;
    destPath = destPath.replace(/^\/+/, '');
    if (destPath.length)
        destPath = destPath.endsWith('/') ? destPath : destPath + '/';
    // console.log('destPath:', destPath);
    // const filename = Object.keys(request.files)[0];
    const dest = destPath ? 'public/' + destPath : 'public/';
    // console.log('files to upload:', request.files);
    if (!Object.keys(request.files || {}).length) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    "SERVER - ROUTES - UPLOADMEDIA - Failed to upload file(s).",
                    "SERVER - ROUTES - UPLOADMEDIA - No files were received."
                ]
            }
        }));
    }
    yield file_service_1.default.createDirectory(dest);
    let success = true;
    let messages = [];
    for (const fKey of Object.keys(request.files)) {
        const fileItem = request.files[fKey];
        if (!Object.values(config_1.default.ACCEPTED_MEDIA_EXTENSIONS).flatMap(ext => ext).some(accepted => fKey.toLowerCase().endsWith(accepted))) {
            success = false;
            messages.push(`SERVER - ROUTES - UPLOADMEDIA - Failed to upload file ${fKey}. file type prohibited.`);
            continue;
        }
        const uploadRes = yield (new Promise((uRes) => {
            fileItem.mv(path_1.default.normalize(config_1.default.ROOT_DIR + dest) + fKey, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    uRes({
                        success: false,
                        messages: [`SERVER - ROUTES - UPLOADMEDIA - Failed to upload file ${fKey}.`].concat(err.toString())
                    });
                }
                else {
                    uRes({
                        success: true,
                        messages: [`SERVER - ROUTES - UPLOADMEDIA - File ${fKey} uploaded successfully.`]
                    });
                }
            }));
        }));
        if (!uploadRes.success) {
            success = false;
        }
        messages = messages.concat(uploadRes.messages);
    }
    const fRead = yield file_service_1.default.readDirectory(dest);
    success = success && fRead.success;
    messages = messages.concat(fRead.messages);
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        return res({
            code: success ? 200 : 500,
            json: {
                success: success,
                messages: [
                    "SERVER - ROUTES - UPLOADMEDIA - File(s) upload process completed.",
                    ...messages
                ],
                body: fRead.body || []
            }
        });
    }));
});
