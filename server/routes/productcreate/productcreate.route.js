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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = __importDefault(require("../../services/db/db.service"));
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.params, { id } = _a, rest = __rest(_a, ["id"]);
    const prod = Object.assign({}, rest); // why does this work?
    var queryResult = yield db_service_1.default.row.create('product', prod);
    return new Promise(res => {
        var _a;
        return res({
            code: 200,
            json: {
                success: queryResult.success,
                messages: [
                    queryResult.success ?
                        `SERVER - ROUTES - PRODUCTCREATE - Successfully created product ${(_a = queryResult.body) === null || _a === void 0 ? void 0 : _a.id}.`
                        :
                            `SERVER - ROUTES - PRODUCTCREATE - Failed to create product ${request.params.name}.`,
                    ...queryResult.messages
                ],
                body: queryResult.body
            }
        });
    });
});
