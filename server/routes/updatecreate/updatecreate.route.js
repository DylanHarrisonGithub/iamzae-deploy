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
const email_service_1 = __importDefault(require("../../services/email/email.service"));
const update_template_1 = __importDefault(require("../../email-templates/update.template"));
const models_1 = require("../../models/models");
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, date, update } = request.params;
    let dateObj = new Date(date);
    let month = dateObj.toLocaleString('default', { month: 'long' });
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    const newUpdate = {
        subject: subject,
        date: date,
        update: update,
        timestamp: Date.now(),
        search: `${subject} ${update} ${month}/${day}/${year}${month}-${day}-${year}${models_1.timeData.months.indexOf(month) + 1}/${day}/${year}${models_1.timeData.months.indexOf(month) + 1}-${day}-${year}${month}/${day.toString().padStart(2, '0')}/${year}${month}-${day.toString().padStart(2, '0')}-${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`
    };
    const dbRes = yield db_service_1.default.row.create('update', newUpdate);
    if (dbRes.success) {
        db_service_1.default.row.read('mail', { verified: 'true' }).then(mailres => {
            if (mailres.success && mailres.body) {
                const template = (0, update_template_1.default)('https://iamzae.com/news', {
                    subject: newUpdate.subject,
                    month: month, day: day, year: year,
                    body: newUpdate.update
                });
                mailres.body.forEach(m => {
                    if (m.verified === 'true') {
                        (0, email_service_1.default)(m.email, 'iamzae.com update', undefined, template);
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
                    `SERVER - ROUTES - UPDATECREATE - New update ${dbRes.body.id} created.`
                ].concat(dbRes.messages),
                body: { update: dbRes.body }
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - UPDATECREATE - New update could not be created.`
                ].concat(dbRes.messages),
                body: { update: request.params }
            }
        }));
    }
});
