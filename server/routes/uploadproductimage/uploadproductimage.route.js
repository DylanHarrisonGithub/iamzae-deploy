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
exports.default = (request) => new Promise(res => {
    request.files[Object.keys(request.files)[0]].mv('public/products/' + Object.keys(request.files)[0], (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res({ code: 200, json: { success: false, messages: ["SERVER - ROUTES - UPLOADPRODUCTIMAGE - Failed to upload file."] } });
        }
        else {
            file_service_1.default.readDirectory('public/products').then(sr => {
                res({
                    code: 200,
                    json: {
                        success: sr.success,
                        messages: [
                            sr.success ?
                                "SERVER - ROUTES - UPLOADPRODUCTIMAGE - Successfully loaded product image list!"
                                :
                                    `Server - Routes - UPLOADPRODUCTIMAGE - Failed to load product image list.`,
                            ...sr.messages,
                            "SERVER - ROUTES - UPLOADPRODUCTIMAGE - Product image successfully uploaded!"
                        ],
                        body: sr.body
                    }
                });
            });
        }
    }));
});
