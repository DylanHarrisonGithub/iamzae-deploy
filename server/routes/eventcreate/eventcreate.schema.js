"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models/models");
const { periods, weekdays, months, daysPerMonth, years, dates, times } = models_1.timeData;
const eventCreateSchema = {
    day: { type: 'string | number', attributes: { required: true, range: { min: 1, max: 31 } } },
    month: { type: [...months], attributes: { required: true } },
    year: { type: 'string | number', attributes: { required: true, range: { min: 2020, max: 2120 } } },
    time: { type: [...times], attributes: { required: true } },
    location: { type: 'string', attributes: { required: true } },
    thumbnail: { type: 'string', attributes: { required: false } },
    description: { type: 'string', attributes: { required: true, strLength: { minLength: 5 } } },
    website: { type: 'string', attributes: { required: false } },
    period: { type: [...periods], attributes: { required: true } },
    media: { type: 'string', attributes: { required: false, array: { minLength: 0 } } }
};
exports.default = eventCreateSchema;
