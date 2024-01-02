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
    var _a;
    const { afterID, numrows, search, id } = Object.assign(Object.assign({}, request.params), { search: (_a = request.params.search) === null || _a === void 0 ? void 0 : _a.replace(/'/g, `''`) });
    const dbRes = id ?
        yield db_service_1.default.row.read('contact', { id: id })
        :
            search ?
                yield db_service_1.default.row.query(`SELECT * FROM "contact" WHERE search ILIKE '%${search}%' AND id > ${afterID} ORDER BY id ASC LIMIT ${numrows};`)
                :
                    yield db_service_1.default.row.stream('contact', afterID, numrows);
    if (dbRes.success) {
        const contacts = dbRes.body;
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - CONTACTSTREAM - Contacts streamed.`
                ].concat(dbRes.messages),
                body: contacts
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - CONTACTSTREAM - Contacts could not be streamed.`
                ].concat(dbRes.messages),
                body: request.params
            }
        }));
    }
});
