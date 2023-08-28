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
const db_service_1 = __importDefault(require("../../services/db/db.service"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var queryResult;
    if (request.params.id) {
        if (request.params.numrows) {
            queryResult = yield db_service_1.default.row.stream('user', request.params.id, request.params.numrows);
        }
        else {
            queryResult = yield db_service_1.default.row.read('user', { id: request.params.id });
        }
    }
    else {
        queryResult = yield db_service_1.default.row.read('user');
    }
    return new Promise(res => {
        var _a;
        return res({
            code: 200,
            json: {
                success: queryResult.success,
                messages: queryResult.messages,
                body: (_a = queryResult.body) === null || _a === void 0 ? void 0 : _a.map(({ id, email, avatar, privilege }) => ({ id: id, email: email, avatar: avatar, privilege: privilege }))
            }
        });
    });
});
