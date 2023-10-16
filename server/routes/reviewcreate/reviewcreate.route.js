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
const models_1 = require("../../models/models");
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
exports.default = (request) => __awaiter(void 0, void 0, void 0, function* () {
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
        return new Promise(res => res({
            code: 200,
            json: {
                success: true,
                messages: [
                    `SERVER - ROUTES - REVIEWCREATE - New review ${dbRes.body.id} created.`
                ].concat(dbRes.messages),
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
