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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const server_1 = __importDefault(require("./server/server"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let parsedRequest = yield server_1.default.services.requestParser(request);
    if (parsedRequest.success && parsedRequest.body) {
        let routerResponse = yield server_1.default.services.router(parsedRequest.body);
        let res = routerResponse.body;
        Object.keys(res.headers || {}).forEach(key => response.setHeader(key, res.headers[key]));
        console.log([
            `ip: ${parsedRequest.body.ip}`,
            `timestamp: ${parsedRequest.body.timestamp}`,
            `route: ${parsedRequest.body.route}`,
            ...parsedRequest.messages,
            ...(((_a = res.json) === null || _a === void 0 ? void 0 : _a.messages) || routerResponse.messages)
        ]);
        if (res.json) {
            //res.json.messages = [...res.json.messages, ... parsedRequest.messages];
            response.status(res.code).json(res.json);
        }
        else if (res.html) {
            response.status(res.code).send(res.html);
        }
        else if (res.filename) {
            response.status(res.code).sendFile(res.filename);
        }
        else if (res.redirect) {
            response.redirect(res.redirect);
        }
        else {
            response.sendStatus(res.code);
        }
    }
    else {
        console.log(parsedRequest.messages);
        response.status(400).json({
            success: false,
            messages: [...parsedRequest.messages]
        });
    }
}));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'client')));
app.listen(process.env.PORT || 3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`CrudStore listening on port ${process.env.PORT || 3000}`);
    // full db delete
    // for (const key of Object.keys(server.models)) {
    //   console.log((await db.table.delete(key)).messages);
    // }
    // console.log(await db.table.delete('contact'));
    // //!!!! uncomment before deploying !!!!
    // for (const key of Object.keys(server.models)) {
    //   console.log((await db.table.create(key, (<any>server.models)[key])).messages);
    // }
    // console.log(await db.row.stream('user', 5, 3));
    console.log(os_1.default.hostname());
}));
