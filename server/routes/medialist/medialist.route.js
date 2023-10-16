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
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const mList = yield file_service_1.default.readDirectory('/public/media');
    return new Promise(res => res({
        code: 200,
        json: {
            success: mList.success,
            messages: [
                mList.success ?
                    "SERVER - ROUTES - MEDIALIST - Successfully loaded media list!"
                    :
                        `Server - Routes - MEDIALIST - Failed to load media list.`,
                ...mList.messages
            ],
            body: mList.body
        }
    }));
});
