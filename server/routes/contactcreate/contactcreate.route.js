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
const models_1 = require("../../models/models");
const config_1 = __importDefault(require("../../config/config"));
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let dateObj = new Date();
    let month = dateObj.toLocaleString('default', { month: 'long' });
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    const contact = {
        email: request.params.email,
        subject: request.params.subject || '',
        message: request.params.message,
        timestamp: Date.now(),
        search: `${month}/${day}/${year}${month}-${day}-${year}${models_1.timeData.months.indexOf(month) + 1}/${day}/${year}${models_1.timeData.months.indexOf(month) + 1}-${day}-${year}${month}/${day.toString().padStart(2, '0')}/${year}${month}-${day.toString().padStart(2, '0')}-${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}${request.params.email}${request.params.subject}${request.params.message}`
    };
    const dbRes = yield db_service_1.default.row.create('contact', contact);
    if (dbRes.success) {
        const emailRes = yield (0, email_service_1.default)(config_1.default.ADMIN_EMAIL || config_1.default.NODEMAILER.EMAIL, `New contact from ${contact.email}`, undefined, `
        <table>
          <tr>
            <td>Contact ID:</td>
            <td>${((_a = dbRes.body) === null || _a === void 0 ? void 0 : _a.id) || 'no id'}</td>
          </tr>
          <tr>
            <td>From: </td>
            <td>${contact.email}</td>
          </tr>
          <tr>
            <td>Contact date:</td>
            <td>${month}/${day}/${year}</td>
          </tr>
          <tr>
            <td>Subject:</td>
            <td>${contact.subject}</td>
          </tr>
          <tr>
            <td>Message:</td>
            <td>${contact.message}</td>
          </tr>
        </table>
        <p>Pleave visit <a href="${config_1.default.ENVIRONMENT === 'DEVELOPMENT' ?
            `http://localhost:4200`
            :
                `https://${request.host}`}/admin/contacts/${((_b = dbRes.body) === null || _b === void 0 ? void 0 : _b.id) || ''}">here</a> to view or delete this contact message.</p>
      `);
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - CONTACTCREATE - New contact ${dbRes.body.id} created.`
                ].concat(dbRes.messages).concat(emailRes.messages),
                body: { contact: dbRes.body }
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - CONTACTCREATE - New contact could not be created.`
                ].concat(dbRes.messages),
                body: { contact: request.params }
            }
        }));
    }
});
