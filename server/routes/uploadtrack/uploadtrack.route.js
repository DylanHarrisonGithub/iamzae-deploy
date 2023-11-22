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
const acceptedMedia = ['mp3', 'wav', 'ogg'];
exports.default = (request) => new Promise(res => {
    request.files[Object.keys(request.files)[0]].mv('public/tracks/' + Object.keys(request.files)[0], (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res({ code: 200, json: { success: false, messages: ["SERVER - ROUTES - UPLOADTRACK - Failed to upload file."].concat(err.toString()) } });
        }
        else {
            file_service_1.default.readDirectory(`public/tracks`).then(sr => {
                res({
                    code: 200,
                    json: {
                        success: sr.success,
                        messages: [
                            sr.success ?
                                "SERVER - ROUTES - UPLOADTRACK - Successfully loaded track list!"
                                :
                                    `Server - Routes - UPLOADTRACK - Failed to load track list.`,
                            ...sr.messages,
                            "SERVER - ROUTES - UPLOADTRACK - Track successfully uploaded!"
                        ],
                        body: sr.body
                    }
                });
            });
        }
    }));
});
