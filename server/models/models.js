"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeData = void 0;
exports.timeData = {
    periods: ['Once', 'Daily', 'Weekly', 'BiWeekly', 'Monthly'],
    weekdays: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    daysPerMonth: [
        31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    years: [...[...Array(40).keys()].map(y => y + 2020)],
    dates: [...Array(32).keys()],
    times: [...[...Array(23).keys()].reduce((a, h) => [
            ...a,
            `${h.toString().padStart(2, '0')}:00`,
            `${h.toString().padStart(2, '0')}:15`,
            `${h.toString().padStart(2, '0')}:30`,
            `${h.toString().padStart(2, '0')}:45`,
        ], [])]
};
const { periods, weekdays, months, daysPerMonth, years, dates, times } = exports.timeData;
const models = {
    user: {
        id: `SERIAL`,
        username: 'TEXT',
        password: 'TEXT',
        salt: 'TEXT',
        privilege: `TEXT`,
        avatar: `TEXT`,
        PRIMARY: 'KEY (username)'
    },
    update: {
        id: `SERIAL`,
        userID: `NUMERIC`,
        timestamp: `NUMERIC`,
        body: `TEXT`,
        search: `TEXT`
    },
    contact: {
        id: `SERIAL`,
        timestamp: `NUMERIC`,
        email: `TEXT`,
        subject: `TEXT`,
        message: `TEXT`,
        search: `TEXT`,
        PRIMARY: `KEY (id)`
    },
    event: {
        id: `SERIAL`,
        day: 'TEXT',
        month: 'TEXT',
        year: `NUMERIC`,
        time: 'TEXT',
        timestamp: 'NUMERIC',
        period: 'TEXT',
        location: 'TEXT',
        thumbnail: 'TEXT',
        description: 'TEXT',
        website: 'TEXT',
        media: 'TEXT',
        search: 'TEXT',
        PRIMARY: 'KEY (id)'
    },
    review: {
        id: `SERIAL`,
        event: 'NUMERIC',
        timestamp: 'NUMERIC',
        approved: 'TEXT',
        name: 'TEXT',
        stars: `NUMERIC`,
        text: `TEXT`,
        search: 'TEXT',
        PRIMARY: `KEY (id)`
    }
};
exports.default = models;
