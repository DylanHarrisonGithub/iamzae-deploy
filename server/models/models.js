"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeData = exports.acceptedMediaExtensions = void 0;
exports.acceptedMediaExtensions = {
    image: ['gif', 'jpg', 'jpeg', 'png', 'heic'],
    video: ['mov', 'mp4', 'mpeg', 'webm', 'ogg'],
    audio: ['mp3', 'wav', 'ogg']
};
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
    times: [...[...Array(24).keys()].reduce((a, h) => [
            ...a,
            `${(h % 12 || 12).toString().padStart(2, '0')}:00${h < 12 ? 'am' : 'pm'}`,
            `${(h % 12 || 12).toString().padStart(2, '0')}:15${h < 12 ? 'am' : 'pm'}`,
            `${(h % 12 || 12).toString().padStart(2, '0')}:30${h < 12 ? 'am' : 'pm'}`,
            `${(h % 12 || 12).toString().padStart(2, '0')}:45${h < 12 ? 'am' : 'pm'}`,
        ], [])]
};
const { periods, weekdays, months, daysPerMonth, years, dates, times } = exports.timeData;
const models = {
    user: {
        id: `SERIAL`,
        username: 'TEXT',
        email: `TEXT`,
        password: 'TEXT',
        salt: 'TEXT',
        privilege: `TEXT`,
        avatar: `TEXT`,
        reset: `TEXT`,
        resetstamp: `TEXT`,
        tries: `NUMERIC`,
        PRIMARY: 'KEY (username)'
    },
    update: {
        id: `SERIAL`,
        timestamp: `NUMERIC`,
        subject: `TEXT`,
        date: `TEXT`,
        update: `TEXT`,
        search: `TEXT`,
        PRIMARY: `KEY (id)`
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
        day: `NUMERIC`,
        month: 'TEXT',
        year: `NUMERIC`,
        time: 'TEXT',
        timestamp: 'NUMERIC',
        period: 'TEXT',
        location: 'TEXT',
        addressa: 'TEXT',
        addressb: 'TEXT',
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
    },
    mail: {
        id: `SERIAL`,
        email: `TEXT`,
        code: `TEXT`,
        salt: `TEXT`,
        verified: `TEXT`,
        PRIMARY: `KEY (id)`
    }
};
exports.default = models;
