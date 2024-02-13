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
const review_template_1 = __importDefault(require("../../email-templates/review.template"));
const models_1 = require("../../models/models");
const config_1 = __importDefault(require("../../config/config"));
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let dateObj = new Date();
    let month = dateObj.toLocaleString('default', { month: 'long' });
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    const review = {
        event: request.params.event,
        timestamp: Date.now(),
        approved: false,
        name: request.params.name,
        stars: parseInt(request.params.stars.toString()),
        text: request.params.text,
        search: `${month}/${day}/${year}${month}-${day}-${year}${models_1.timeData.months.indexOf(month) + 1}/${day}/${year}${models_1.timeData.months.indexOf(month) + 1}-${day}-${year}${month}/${day.toString().padStart(2, '0')}/${year}${month}-${day.toString().padStart(2, '0')}-${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}${(models_1.timeData.months.indexOf(month) + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}${request.params.stars}${request.params.name}${request.params.text}`
    };
    const dbRes = yield db_service_1.default.row.create('review', review);
    if (dbRes.success) {
        const emailRes = yield (0, email_service_1.default)(config_1.default.ADMIN_EMAIL || config_1.default.NODEMAILER.EMAIL, `Review from ${review.name} needs approval`, undefined, 
        // `
        //   <table>
        //     <tr>
        //       <td>Review ID:</td>
        //       <td>${dbRes.body?.id || 'no id'}</td>
        //     </tr>
        //     <tr>
        //       <td>Event ID:</td>
        //       <td>${review.event}</td>
        //     </tr>
        //     <tr>
        //       <td>Review date:</td>
        //       <td>${month}/${day}/${year}</td>
        //     </tr>
        //     <tr>
        //       <td>Reviewer name:</td>
        //       <td>${review.name}</td>
        //     </tr>
        //     <tr>
        //       <td>Rating:</td>
        //       <td>${review.stars}</td>
        //     </tr>
        //     <tr>
        //       <td>Review:</td>
        //       <td>${review.text}</td>
        //     </tr>
        //   </table>
        //   <p>Pleave visit <a href="${
        //     config.ENVIRONMENT === 'DEVELOPMENT' ? 
        //       `http://localhost:4200` 
        //     : 
        //       `https://${request.host}`
        //     }/admin/reviews/${dbRes.body?.id || ''
        //   }">here</a> to approve or reject this review.</p>
        // `
        (0, review_template_1.default)(`${config_1.default.ENVIRONMENT === 'DEVELOPMENT' ?
            `http://localhost:4200`
            :
                `https://${request.host}`}/admin/reviews/${((_a = dbRes.body) === null || _a === void 0 ? void 0 : _a.id) || ''}`, {
            id: ((_b = dbRes.body) === null || _b === void 0 ? void 0 : _b.id.toString()) || 'no id',
            eventId: review.event.toString(),
            month: month, day: day, year: year,
            name: review.name,
            stars: review.stars,
            reviewBody: review.text
        }));
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - REVIEWCREATE - New review ${dbRes.body.id} created.`
                ].concat(dbRes.messages).concat(emailRes.messages),
                body: { review: dbRes.body }
            }
        }));
    }
    else {
        return new Promise(res => res({
            code: 500,
            json: {
                success: false,
                messages: [
                    `SERVER - ROUTES - REVIEWCREATE - New review could not be created.`
                ].concat(dbRes.messages),
                body: { review: request.params }
            }
        }));
    }
});
