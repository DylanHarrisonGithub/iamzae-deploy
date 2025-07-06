"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Path = __importStar(require("path"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // filenames are passed as stringified array because arrays can not be passed in delete request as url search params
    const { filename, filenames } = request.params;
    if (!(filename || filenames)) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: ["SERVER - ROUTES - DELETEMEDIA - Filename not provided."],
            }
        }));
    }
    try {
        if (filenames) {
            const fns = JSON.parse(filenames);
            let msgs = [];
            let success = true;
            for (const fn of fns) {
                // hardcode prevent deletion of public directory
                if (!(!fn.length || fn === '/' || /^\s*$/.test(fn))) {
                    const delRes = yield file_service_1.default.delete(Path.normalize(`public/` + fn));
                    msgs = [...msgs, `SERVER - ROUTES - DELETEMEDIA - Media file ${fn} could not be deleted.`, ...delRes.messages];
                    if (!delRes.success) {
                        success = false;
                    }
                }
                else {
                    msgs = [...msgs, `SERVER - ROUTES - DELETEMEDIA - Media file ${fn} could not be deleted. Invalid filename.`];
                    success = false;
                }
            }
            return new Promise(res => res({
                code: success ? 200 : 400,
                json: {
                    success: success,
                    messages: [
                        success ?
                            `SERVER - ROUTES - DELETEMEDIA - Files successfully deleted.`
                            :
                                `SERVER - ROUTES - DELETEMEDIA - Error encountered attempting to delete files.`,
                        ...msgs
                    ]
                }
            }));
        }
        else {
        }
        // hardcode prevent deletion of /public directory
        if (!(!((_a = request.params.filename) === null || _a === void 0 ? void 0 : _a.length) || request.params.filename === '/' || /^\s*$/.test(request.params.filename || ' '))) {
            const delres = yield file_service_1.default.delete(Path.normalize(`public/` + request.params.filename));
            if (!delres.success) {
                return new Promise(res => res({ code: 400, json: { success: false, messages: [
                            `SERVER - ROUTES - DELETEMEDIA - Media file ${request.params.filename} could not be deleted.`,
                            ...delres.messages
                        ] } }));
            }
            return new Promise(res => res({ code: 200, json: { success: true, messages: [`SERVER - ROUTES - DELETEMEDIA - Media file ${request.params.filename} successfully deleted.`] } }));
        }
        return new Promise(res => res({ code: 400, json: { success: false, messages: [
                    `SERVER - ROUTES - DELETEMEDIA - Media file(s) could not be deleted.`,
                ] } }));
    }
    catch (err) {
        return new Promise(res => res({ code: 404, json: { success: false, messages: [
                    `SERVER - ROUTES - DELETEMEDIA - Media file(s) could not be deleted.`,
                    err.toString()
                ] } }));
    }
});
