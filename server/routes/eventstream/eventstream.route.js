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
    const { afterID, numrows, search, id } = request.params;
    const dbRes = id ?
        yield db_service_1.default.row.read('event', { id: id })
        :
            search ?
                yield db_service_1.default.row.query(`SELECT * FROM "event" WHERE search ILIKE '%${search}%' AND id > ${afterID} ORDER BY id ASC LIMIT ${numrows};`) //DB.row.stream<any[]>('event', afterID, numrows)
                :
                    yield db_service_1.default.row.stream('event', afterID, numrows);
    if (dbRes.success) {
        const events = (_a = dbRes.body) === null || _a === void 0 ? void 0 : _a.map(e => { var _a; return (Object.assign(Object.assign({}, e), { media: ((_a = e.media) === null || _a === void 0 ? void 0 : _a.length) ? e.media.split(',') : [] })); });
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - EVENTSTREAM - Events streamed.`
                ].concat(dbRes.messages),
                body: events
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - EVENTSTREAM - Events could not be streamed.`
                ].concat(dbRes.messages),
                body: request.params
            }
        }));
    }
    return new Promise(res => res({ code: 200, json: { success: true, message: ["eventstream route works!"] } }));
});
