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
        return new Promise(res => res({ code: 400, json: { success: false, messages: ["SERVER - ROUTES - DELETEPRODUCTIMAGE - Filename not provided."] } }));
    }
    try {
        const res = yield file_service_1.default.delete(`public/products/` + request.params.filename);
        return new Promise(res => res({ code: 200, json: { success: true, messages: [`SERVER - ROUTES - DELETEPRODUCTIMAGE - Product image ${request.params.filename} successfully deleted.`] } }));
    }
    catch (err) {
        return new Promise(res => res({ code: 404, json: { success: false, messages: [
                    `SERVER - ROUTES - DELETEPRODUCTIMAGE - Product image ${request.params.filename} could not be deleted.`,
                    err.toString()
                ] } }));
    }
});
