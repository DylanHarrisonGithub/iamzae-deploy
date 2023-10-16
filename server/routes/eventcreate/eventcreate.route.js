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
const toRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(':').map(t => parseInt(t));
    return `${(hours > 12) ? (hours - 12).toString().padStart(2, '0') : hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${(hours >= 12) ? 'PM' : 'AM'}`;
};
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.params, { ['id']: dropped, ['media']: media } = _a, event = __rest(_a, ['id', 'media']);
    event['media'] = media === null || media === void 0 ? void 0 : media.join(','); // annoying
    event.timestamp = Date.now();
    const dbRes = yield db_service_1.default.row.create('event', Object.assign(Object.assign({}, event), { search: `${event.month}/${event.day}/${event.year}${event.month}-${event.day}-${event.year}${models_1.timeData.months.indexOf(event.month) + 1}/${event.day}/${event.year}${models_1.timeData.months.indexOf(event.month) + 1}-${event.day}-${event.year}${event.month}/${event.day.toString().padStart(2, '0')}/${event.year}${event.month}-${event.day.toString().padStart(2, '0')}-${event.year}${(models_1.timeData.months.indexOf(event.month) + 1).toString().padStart(2, '0')}/${event.day.toString().padStart(2, '0')}/${event.year}${(models_1.timeData.months.indexOf(event.month) + 1).toString().padStart(2, '0')}-${event.day.toString().padStart(2, '0')}-${event.year}${event.time}${toRegularTime(event.time)}${event.location}${event.description}${event.period}${event.website}` }));
    if (dbRes.success) {
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - EVENTCREATE - New event ${dbRes.body.id} created.`
                ].concat(dbRes.messages),
                body: { event: dbRes.body }
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - EVENTCREATE - New event could not be created.`
                ].concat(dbRes.messages),
                body: { event: request.params }
            }
        }));
    }
});
