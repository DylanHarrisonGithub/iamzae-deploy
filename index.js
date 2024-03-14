"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const exec = __importStar(require("child_process"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const server_1 = __importDefault(require("./server/server"));
const db_service_1 = __importDefault(require("./server/services/db/db.service"));
const config_1 = __importDefault(require("./server/config/config"));
const file_service_1 = __importDefault(require("./server/services/file/file.service"));
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
app.get('/*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, './client', 'index.html')));
app.listen(config_1.default.PORT || 3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${config_1.default.APPNAME} listening on port ${config_1.default.PORT || 3000}`);
    // full db delete
    // for (const key of Object.keys(server.models)) {
    //   console.log((await db.table.delete(key)).messages);
    // }
    // //!!!! uncomment before deploying !!!!
    for (const key of Object.keys(server_1.default.models)) {
        console.log((yield db_service_1.default.table.create(key, server_1.default.models[key])).messages);
    }
    if (config_1.default.REPOSITORY.URL) {
        try {
            const res = exec.execSync(`sudo git remote set-url origin https://${config_1.default.REPOSITORY.PAT ? config_1.default.REPOSITORY.PAT + '@' : ''}${config_1.default.REPOSITORY.URL}`);
        }
        catch (e) {
            console.log(['failed to set git remote url', e]);
        }
    }
    console.log('root dir: ', config_1.default.ROOT_DIR);
    console.log('root size: ', yield file_service_1.default.getDirectorySize(''));
    console.log('db connection string: ' + config_1.default.DATABASE_URL);
    console.log('host: ' + os_1.default.hostname());
}));
