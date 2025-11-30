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
const models_1 = require("../../models/models");
const db_service_1 = __importDefault(require("../../services/db/db.service"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    // precaution to filter any additional params that were provided with request
    const filteredTheme = Object.fromEntries(Object.entries(request.params).filter(([key]) => key in models_1.defaultTheme));
    // flatten nested objects if any (e.g. fonts)
    const flattenedFilteredTheme = Object.keys(filteredTheme).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: JSON.stringify(filteredTheme[key]) })), {});
    const dbres = yield db_service_1.default.row.create('theme', flattenedFilteredTheme);
    return new Promise(resolve => resolve({
        code: dbres.success ? 200 : 400,
        json: {
            success: dbres.success,
            messages: dbres.messages
        }
    }));
});
