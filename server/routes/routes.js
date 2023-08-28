"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_route_1 = __importDefault(require("./products/products.route"));
const products_schema_1 = __importDefault(require("./products/products.schema"));
const productcreate_route_1 = __importDefault(require("./productcreate/productcreate.route"));
const productcreate_schema_1 = __importDefault(require("./productcreate/productcreate.schema"));
const userdelete_route_1 = __importDefault(require("./userdelete/userdelete.route"));
const userdelete_schema_1 = __importDefault(require("./userdelete/userdelete.schema"));
const userupdate_route_1 = __importDefault(require("./userupdate/userupdate.route"));
const userupdate_schema_1 = __importDefault(require("./userupdate/userupdate.schema"));
const userlist_route_1 = __importDefault(require("./userlist/userlist.route"));
const userlist_schema_1 = __importDefault(require("./userlist/userlist.schema"));
const uploadproductimage_route_1 = __importDefault(require("./uploadproductimage/uploadproductimage.route"));
const uploadproductimage_schema_1 = __importDefault(require("./uploadproductimage/uploadproductimage.schema"));
const deleteproductimage_route_1 = __importDefault(require("./deleteproductimage/deleteproductimage.route"));
const deleteproductimage_schema_1 = __importDefault(require("./deleteproductimage/deleteproductimage.schema"));
const productimagelist_route_1 = __importDefault(require("./productimagelist/productimagelist.route"));
const productimagelist_schema_1 = __importDefault(require("./productimagelist/productimagelist.schema"));
const deleteavatar_route_1 = __importDefault(require("./deleteavatar/deleteavatar.route"));
const deleteavatar_schema_1 = __importDefault(require("./deleteavatar/deleteavatar.schema"));
const uploadavatar_route_1 = __importDefault(require("./uploadavatar/uploadavatar.route"));
const uploadavatar_schema_1 = __importDefault(require("./uploadavatar/uploadavatar.schema"));
const avatarlist_route_1 = __importDefault(require("./avatarlist/avatarlist.route"));
const avatarlist_schema_1 = __importDefault(require("./avatarlist/avatarlist.schema"));
const login_route_1 = __importDefault(require("./login/login.route"));
const register_route_1 = __importDefault(require("./register/register.route"));
const register_schema_1 = __importDefault(require("./register/register.schema"));
const routes = {
    products: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: products_schema_1.default,
        route: products_route_1.default
    },
    productcreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: productcreate_schema_1.default,
        route: productcreate_route_1.default
    },
    userdelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: userdelete_schema_1.default,
        route: userdelete_route_1.default
    },
    userupdate: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: userupdate_schema_1.default,
        route: userupdate_route_1.default
    },
    userlist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: userlist_schema_1.default,
        route: userlist_route_1.default
    },
    uploadproductimage: {
        method: ["POST"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: uploadproductimage_schema_1.default,
        route: uploadproductimage_route_1.default
    },
    deleteproductimage: {
        method: ["DELETE"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: deleteproductimage_schema_1.default,
        route: deleteproductimage_route_1.default
    },
    productimagelist: {
        method: ["GET"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: productimagelist_schema_1.default,
        route: productimagelist_route_1.default
    },
    deleteavatar: {
        method: ["DELETE"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: deleteavatar_schema_1.default,
        route: deleteavatar_route_1.default
    },
    uploadavatar: {
        method: ["POST"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: uploadavatar_schema_1.default,
        route: uploadavatar_route_1.default
    },
    avatarlist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: avatarlist_schema_1.default,
        route: avatarlist_route_1.default
    },
    login: {
        method: ["POST"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: {},
        route: login_route_1.default
    },
    register: {
        method: ["POST"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: register_schema_1.default,
        route: register_route_1.default
    },
};
exports.default = routes;
