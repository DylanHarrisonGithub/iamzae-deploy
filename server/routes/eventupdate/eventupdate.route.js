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
const toRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(':').map(t => parseInt(t));
    return `${(hours > 12) ? (hours - 12).toString().padStart(2, '0') : hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${(hours >= 12) ? 'PM' : 'AM'}`;
};
function getNthDayInMonth(nth, day, month, year) {
    // Create new date for 1st of month
    let d = new Date(year, months.indexOf(month));
    // Move to first instance of day in month and 
    // add (n - 1) weeks
    d.setDate(1 + (7 - d.getDay() + weekdays.indexOf(day)) % 7 + (nth - 1) * 7);
    return d;
}
;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = request.params;
    let _c = request.params.update, { ['id']: dropped, ['media']: dropped2 } = _c, event = __rest(_c, ['id', 'media']);
    const oldRes = yield db_service_1.default.row.read('event', { id: id });
    if (!oldRes.success && oldRes.body && oldRes.body.length) {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - EVENTUPDATE - Event ${id} could not be updated.`
                ].concat(oldRes.messages),
                body: { event: request.params }
            }
        }));
    }
    event['media'] = ((_a = request.params.update.media) === null || _a === void 0 ? void 0 : _a.join(',')) || oldRes.body[0].media; // annoying
    const oldE = Object.assign(Object.assign({}, (((_b = oldRes.body) === null || _b === void 0 ? void 0 : _b[0]) || {})), event);
    let periodicDates = '';
    if (oldE.period !== 'Once') {
        if (oldE.period === 'Monthly') {
            let d = new Date(oldE.year, months.indexOf(oldE.month));
            const dayNum = (new Date(oldE.year, months.indexOf(oldE.month), oldE.day)).getDay();
            const weekday = weekdays[dayNum];
            const dayCount = Math.floor((oldE.day - 1) / 7) + 1;
            let eDay;
            while (d.getFullYear() === oldE.year) {
                eDay = getNthDayInMonth(dayCount, weekday, months[d.getMonth()], oldE.year);
                periodicDates += `${months[d.getMonth()]}/${eDay.getDate().toString().padStart(2, '0')}/${d.getFullYear()}${months[d.getMonth()]}/${oldE.year}`;
                d = new Date(oldE.year, d.getMonth() + 1);
            }
        }
        else {
            let d = new Date(oldE.year, months.indexOf(oldE.month), oldE.day);
            while (d.getFullYear() === oldE.year) {
                periodicDates += `${months[d.getMonth()]}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}${months[d.getMonth()]}/${d.getFullYear()}`;
                d.setDate(d.getDate() + {
                    "Daily": 1,
                    "Weekly": 7,
                    "BiWeekly": 14
                }[oldE.period]);
            }
        }
    }
    else {
        periodicDates = `${oldE.month}/${oldE.day}/${oldE.year}${oldE.month}/${oldE.year}`;
    }
    const dbRes = (oldRes.success && oldRes.body && oldRes.body.length) ?
        yield db_service_1.default.row.update('event', Object.assign(Object.assign({}, event), { search: `${periodicDates}${oldE.time}${toRegularTime(oldE.time)}${oldE.location}${oldE.description}${oldE.period}${oldE.website}` }), { id: id })
        :
            yield db_service_1.default.row.update('event', Object.assign({}, event), { id: id }); // why did i do this ???
    if (dbRes.success) {
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - EVENTUPDATE - Event ${id} updated.`
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
                    `SERVER - ROUTES - EVENTUPDATE - Event ${id} could not be updated.`
                ].concat(dbRes.messages),
                body: { event: request.params }
            }
        }));
    }
});
