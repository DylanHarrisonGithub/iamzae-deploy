"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeSchema = exports.defaultTheme = exports.timeData = exports.acceptedMediaExtensions = void 0;
exports.acceptedMediaExtensions = {
    image: ['.gif', '.jpg', '.jpeg', '.png', '.heic'],
    video: ['.mov', '.mp4', '.mpeg', '.webm', '.ogg'],
    audio: ['.mp3', '.wav', '.ogg']
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
exports.defaultTheme = {
    id: -1,
    herotext: `Get ready for ZAE – the driving force behind unforgettable house music moments. With an unparalleled ability to fuse tradition and innovation, ZAE commands dancefloors, creating a rhythmic unity that transcends. From underground vibes to festival stages, experience the pulse of ZAE's curated sonic journey that redefines house music, one set at a time.`,
    herovideo: `IMG_0358.mp4`,
    heroimage: `IMG_0360_100.jpg`,
    threecard1title: `Great Atmosphere`,
    threecard1image: `IMG_4329.JPG`,
    threecard1text: `ZAE, a master of house music, skillfully crafts mesmerizing atmospheres in any venue. Through seamless track blending and flawless transitions, ZAE turns ordinary spaces into pulsating realms of sonic bliss. With an intuitive grasp of the crowd's energy, ZAE curates a musical journey that elevates the atmosphere, transforming the dance floor into a unique celebration of rhythm and sound.`,
    threecard2title: `Great Music`,
    threecard2image: `IMG_4315.JPG`,
    threecard2text: `Renowned for their expertise in house music, ZAE showcases a remarkable talent for curating unforgettable atmospheres through an expertly crafted playlist. Each track is thoughtfully selected, creating a seamless blend that transforms any venue into a pulsating realm of sonic bliss. With an intuitive understanding of the crowd's vibe, ZAE's curated musical journey elevates the atmosphere, turning the dance floor into a distinctive celebration of rhythm and sound.`,
    threecard3title: `Great Crowds`,
    threecard3image: `crowd2.jpg`,
    threecard3text: `ZAE's magnetic music draws a sizable, energetic crowd to the dance floor, creating an inclusive atmosphere where attendees feel intimately connected to the beats. The lively tapestry of movement unfolds as ZAE skillfully engages the crowd, turning each event into a dynamic celebration where the music acts as a unifying force, transcending boundaries and inviting everyone to revel in the collective joy of the moment.`,
    about: `    In the heart of Milwaukee's vibrant music scene, I found my calling and passion as a house music DJ. Growing up surrounded by the rhythm of the city, I was captivated by the pulsating beats that echoed through the streets. From the moment I first stepped into a dimly lit nightclub and felt the music reverberate through my soul, I knew I had discovered my truest form of expression.
    My journey into the world of DJing started in the most unexpected way. As a teenager, I would spend hours exploring record stores, searching for that perfect beat that would ignite the dance floor. With each vinyl I collected, I honed my skills, learning the art of blending tracks seamlessly. The turntables became an extension of myself, allowing me to communicate my emotions and energy to the crowd.
    Milwaukee, with its diverse and passionate music lovers, became my canvas. I would spin at local clubs, from the underground gems to the mainstream venues, infusing every set with my unique style. My mixes were more than just a collection of tracks; they were a narrative, a journey that took the listeners on a sonic adventure. The city responded with open arms, embracing the fusion of classic house beats and innovative sounds that became my signature.
    Being a female DJ in a male-dominated industry had its challenges, but it only fueled my determination. I wanted to break barriers, challenge stereotypes, and show the world that music knows no gender. Milwaukee became the backdrop for my story of resilience and passion. With every beat I dropped, I hoped to inspire others to follow their dreams fearlessly, regardless of societal expectations.
    As the city's nightlife pulsed around me, I felt a deep connection to the community. Milwaukee wasn't just a city; it was a family of music enthusiasts, artists, and dreamers. Together, we created moments of pure euphoria on the dance floor, where the worries of the world faded, and all that remained was the music and the energy we shared. In those moments, I found my purpose – not just as a DJ, but as a storyteller, weaving narratives through melodies and rhythms, leaving a lasting impact on the souls that tuned into my beats.`,
    card1color: `bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200`,
    card2color: `bg-gradient-to-br from-indigo-200 via-purple-300 to-indigo-200`,
    font: `../public//fonts/Vogue.ttf`,
};
exports.themeSchema = {
    id: { type: 'string | number', attributes: { required: false } },
    herovideo: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    heroimage: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    herotext: { type: 'string', attributes: { required: true, strLength: { maxLength: 2048 } } },
    threecard1title: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard1image: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard1text: { type: 'string', attributes: { required: true, strLength: { maxLength: 2048 } } },
    threecard2title: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard2image: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard2text: { type: 'string', attributes: { required: true, strLength: { maxLength: 2048 } } },
    threecard3title: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard3image: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    threecard3text: { type: 'string', attributes: { required: true, strLength: { maxLength: 2048 } } },
    about: { type: 'string', attributes: { required: true, strLength: { maxLength: 4096 } } },
    card1color: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    card2color: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
    font: { type: 'string', attributes: { required: true, strLength: { minLength: 1, maxLength: 256 } } },
};
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
    },
    theme: {
        id: `SERIAL`,
        herovideo: `TEXT`,
        herotext: `TEXT`,
        heroimage: `TEXT`,
        threecard1title: `TEXT`,
        threecard1image: `TEXT`,
        threecard1text: `TEXT`,
        threecard2title: `TEXT`,
        threecard2image: `TEXT`,
        threecard2text: `TEXT`,
        threecard3title: `TEXT`,
        threecard3image: `TEXT`,
        threecard3text: `TEXT`,
        about: `TEXT`,
        card1color: `TEXT`,
        card2color: `TEXT`,
        font: `TEXT`,
        PRIMARY: `KEY (id)`,
    }
};
exports.default = models;
