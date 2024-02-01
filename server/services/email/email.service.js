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
const nodemailer_1 = __importDefault(require("nodemailer"));
const validation_service_1 = require("../validation/validation.service");
const config_1 = __importDefault(require("../../config/config"));
const email = (() => {
    const service = (recipient, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(config_1.default.NODEMAILER.EMAIL && config_1.default.NODEMAILER.PASSWORD)) {
            return new Promise(res => res({
                success: false,
                messages: [`SERVER - Services - EmailService - Email not configured.`]
            }));
        }
        if (!validation_service_1.COMMON_REGEXES.EMAIL.test(recipient)) {
            return new Promise(res => res({
                success: false,
                messages: [`SERVER - Services - EmailService - Recipient email "${recipient}" is not a valid email address.`]
            }));
        }
        let mailOptions = {
            from: config_1.default.APPNAME,
            to: recipient,
            subject: subject ? subject : "no subject"
        };
        if (text) {
            mailOptions['text'] = text;
        }
        else if (!text && html) {
            mailOptions['html'] = html;
        }
        const result = yield (nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.default.NODEMAILER.EMAIL,
                pass: config_1.default.NODEMAILER.PASSWORD
            }
        }).sendMail(mailOptions));
        if (result.rejected.length) {
            return new Promise(resolve => resolve({
                success: false,
                messages: [`SERVER - Services - EmailService - Email rejected.`],
                body: result
            }));
        }
        return new Promise(resolve => resolve({
            success: true,
            messages: [`SERVER - Services - EmailService - Email sent successfully.`],
            body: result
        }));
    });
    return service;
})();
exports.default = email;
