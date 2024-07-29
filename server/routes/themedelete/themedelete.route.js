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
    const deleteRes = yield db_service_1.default.row.query(`DELETE FROM theme WHERE id = (SELECT MAX(id) FROM theme);`);
    const res = yield db_service_1.default.row.read('theme');
    return new Promise(resolve => {
        var _a;
        return resolve({
            code: 200,
            json: {
                success: res.success,
                messages: res.messages,
                body: ((_a = res.body) === null || _a === void 0 ? void 0 : _a.length) ? res.body.sort((a, b) => b.id - a.id)[0] : models_1.defaultTheme
            }
        });
    });
});
