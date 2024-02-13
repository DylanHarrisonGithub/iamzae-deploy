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
const email_service_1 = __importDefault(require("../../services/email/email.service"));
const models_1 = require("../../models/models");
const event_template_1 = __importDefault(require("../../email-templates/event.template"));
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
    const _a = request.params, { ['id']: dropped, ['media']: media } = _a, event = __rest(_a, ['id', 'media']);
    event['media'] = (media === null || media === void 0 ? void 0 : media.join(',')) || ''; // annoying
    event.timestamp = Date.now();
    let periodicDates = '';
    if (event.period !== 'Once') {
        if (event.period === 'Monthly') {
            let d = new Date(event.year, months.indexOf(event.month));
            const dayNum = (new Date(event.year, months.indexOf(event.month), event.day)).getDay();
            const weekday = weekdays[dayNum];
            const dayCount = Math.floor((event.day - 1) / 7) + 1;
            let eDay;
            while (d.getFullYear() === event.year) {
                eDay = getNthDayInMonth(dayCount, weekday, months[d.getMonth()], event.year);
                periodicDates += `${months[d.getMonth()]}/${eDay.getDate().toString().padStart(2, '0')}/${d.getFullYear()}${months[d.getMonth()]}/${event.year}`;
                d = new Date(event.year, d.getMonth() + 1);
            }
        }
        else {
            let d = new Date(event.year, months.indexOf(event.month), event.day);
            while (d.getFullYear() === event.year) {
                periodicDates += `${months[d.getMonth()]}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}${months[d.getMonth()]}/${d.getFullYear()}`;
                d.setDate(d.getDate() + {
                    "Daily": 1,
                    "Weekly": 7,
                    "BiWeekly": 14
                }[event.period]);
            }
        }
    }
    else {
        periodicDates = `${event.month}/${event.day}/${event.year}${event.month}/${event.year}`;
    }
    const dbRes = yield db_service_1.default.row.create('event', Object.assign(Object.assign({}, event), { search: `${periodicDates}${event.time}${toRegularTime(event.time)}${event.location}${event.description}${event.period}${event.website}` }));
    if (dbRes.success) {
        db_service_1.default.row.read('mail', { verified: 'true' }).then(mailres => {
            if (mailres.success && mailres.body) {
                const template = (0, event_template_1.default)(`https://iamzae.com/events?search=${months.indexOf(event.month) + 1}%2F${event.day}%2F${event.year}`, {
                    day: event.day,
                    month: event.month,
                    year: event.year,
                    time: event.time,
                    period: event.period,
                    addressLine1: event.addressa,
                    addressLine2: event.addressb,
                    venueName: event.location,
                    description: event.description,
                    venueWebsite: event.website
                });
                mailres.body.forEach(m => {
                    if (m.verified === 'true') {
                        (0, email_service_1.default)(m.email, 'iamzae.com new event scheduled', undefined, template);
                    }
                });
            }
            else {
                console.log(mailres.messages);
            }
        }).catch(err => console.log(err));
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
