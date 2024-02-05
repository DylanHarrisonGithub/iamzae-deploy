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
    if (!(request.params.filename)) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: ["SERVER - ROUTES - DELETETRACK - Filename not provided."],
            }
        }));
    }
    try {
        const delres = yield file_service_1.default.delete(`public/tracks/` + request.params.filename);
        if (!delres.success) {
            return new Promise(res => res({ code: 400, json: { success: true, messages: [
                        `SERVER - ROUTES - DELETETRACK - Media file ${request.params.filename} could not be deleted.`,
                        ...delres.messages
                    ] } }));
        }
        return new Promise(res => res({ code: 200, json: { success: true, messages: [
                    `SERVER - ROUTES - DELETETRACK - Media file ${request.params.filename} successfully deleted.`,
                    ...delres.messages
                ] } }));
    }
    catch (err) {
        return new Promise(res => res({ code: 404, json: { success: false, messages: [
                    `SERVER - ROUTES - DELETETRACK - Media file ${request.params.filename} could not be deleted.`,
                    err.toString()
                ] } }));
    }
});
