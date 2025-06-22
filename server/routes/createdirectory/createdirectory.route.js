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
    const { folderName } = request.params;
    const folderPath = Path.normalize(`public/` + folderName);
    try {
        const cdRes = yield file_service_1.default.createDirectory(folderPath);
        if (cdRes.success) {
            return new Promise(res => res({
                code: 200,
                json: {
                    success: true,
                    messages: [
                        `SERVER - ROUTES - CREATEDIRECTORY - Directory ${folderName} created successfully.`,
                        ...cdRes.messages
                    ]
                }
            }));
        }
        else {
            return new Promise(res => res({
                code: 400,
                json: {
                    success: false,
                    messages: [
                        `SERVER - ROUTES - CREATEDIRECTORY - Directory ${folderName} could not be created.`,
                        ...cdRes.messages
                    ]
                }
            }));
        }
    }
    catch (e) {
        return new Promise(res => res({
            code: 400,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - CREATEDIRECTORY - Directory ${folderName} could not be created.`,
                    e.toString()
                ]
            }
        }));
    }
});
