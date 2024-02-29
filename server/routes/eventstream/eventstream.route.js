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
const models_1 = require("../../models/models");
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { afterID, numrows, search, id } = Object.assign(Object.assign({}, request.params), { search: (_a = request.params.search) === null || _a === void 0 ? void 0 : _a.replace(/'/g, `''`) });
    // attempt format date and date-like searches to standard [monthname]/[dd]/[yyyy] or [monthname]/[yyyy]
    let mappedSearch = search;
    if (mappedSearch) {
        mappedSearch = mappedSearch.trim().replace(/\s+/g, '/').replace(/-/g, '/');
        const searchSplit = mappedSearch.split('/');
        if (searchSplit.length === 3) {
            let timestamp = Date.parse(mappedSearch);
            if (!isNaN(timestamp)) {
                let d = new Date(timestamp);
                mappedSearch = `${months[d.getMonth()]}/${d.getDate()}/${d.getFullYear()}`;
            }
            else {
                mappedSearch = search; // give up
            }
        }
        else if (searchSplit.length === 2 && searchSplit[0].length) {
            if (isNaN(searchSplit[0])) {
                searchSplit[0] = searchSplit[0].charAt(0).toUpperCase() + searchSplit[0].slice(1).toLowerCase();
                if (months.includes(searchSplit[0])) {
                    mappedSearch = mappedSearch = `${searchSplit[0]}/${searchSplit[1].padStart(4, '20')}`;
                }
                else {
                    mappedSearch = search;
                }
            }
            else {
                let m = parseInt(searchSplit[0]);
                if (m >= 1 && m <= 12) {
                    mappedSearch = mappedSearch = `${months[m - 1]}/${searchSplit[1].padStart(4, '20')}`;
                }
                else {
                    mappedSearch = search;
                }
            }
        }
        else {
            mappedSearch = search; // give up
        }
    }
    const dbRes = id ?
        yield db_service_1.default.row.read('event', { id: id })
        :
            mappedSearch ?
                yield db_service_1.default.row.query(`SELECT * FROM "event" WHERE search ILIKE '%${mappedSearch}%' AND id < ${afterID} ORDER BY id DESC LIMIT ${numrows};`)
                :
                    yield db_service_1.default.row.query(`SELECT * FROM "event" WHERE id < ${afterID} ORDER BY id DESC LIMIT ${numrows};`);
    if (dbRes.success) {
        const events = (_b = dbRes.body) === null || _b === void 0 ? void 0 : _b.map(e => { var _a; return (Object.assign(Object.assign({}, e), { media: ((_a = e.media) === null || _a === void 0 ? void 0 : _a.length) ? e.media.split(',') : [] })); });
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - EVENTSTREAM - Events streamed.`
                ].concat(dbRes.messages),
                body: events.map(e => { const { search } = e, filteredE = __rest(e, ["search"]); return filteredE; })
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
