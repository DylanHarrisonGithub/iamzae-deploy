"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const themedelete_route_1 = __importDefault(require("./themedelete/themedelete.route"));
const themedelete_schema_1 = __importDefault(require("./themedelete/themedelete.schema"));
const themecreate_route_1 = __importDefault(require("./themecreate/themecreate.route"));
const themecreate_schema_1 = __importDefault(require("./themecreate/themecreate.schema"));
const theme_route_1 = __importDefault(require("./theme/theme.route"));
const theme_schema_1 = __importDefault(require("./theme/theme.schema"));
const userdelete_route_1 = __importDefault(require("./userdelete/userdelete.route"));
const userdelete_schema_1 = __importDefault(require("./userdelete/userdelete.schema"));
const update_route_1 = __importDefault(require("./update/update.route"));
const update_schema_1 = __importDefault(require("./update/update.schema"));
const shutdown_route_1 = __importDefault(require("./shutdown/shutdown.route"));
const shutdown_schema_1 = __importDefault(require("./shutdown/shutdown.schema"));
const maildelete_route_1 = __importDefault(require("./maildelete/maildelete.route"));
const maildelete_schema_1 = __importDefault(require("./maildelete/maildelete.schema"));
const maillist_route_1 = __importDefault(require("./maillist/maillist.route"));
const maillist_schema_1 = __importDefault(require("./maillist/maillist.schema"));
const calchdusage_route_1 = __importDefault(require("./calchdusage/calchdusage.route"));
const calchdusage_schema_1 = __importDefault(require("./calchdusage/calchdusage.schema"));
const mailopt_route_1 = __importDefault(require("./mailopt/mailopt.route"));
const mailopt_schema_1 = __importDefault(require("./mailopt/mailopt.schema"));
const mailgencode_route_1 = __importDefault(require("./mailgencode/mailgencode.route"));
const mailgencode_schema_1 = __importDefault(require("./mailgencode/mailgencode.schema"));
const userpwdreset_route_1 = __importDefault(require("./userpwdreset/userpwdreset.route"));
const userpwdreset_schema_1 = __importDefault(require("./userpwdreset/userpwdreset.schema"));
const usergencode_route_1 = __importDefault(require("./usergencode/usergencode.route"));
const usergencode_schema_1 = __importDefault(require("./usergencode/usergencode.schema"));
const deletetrack_route_1 = __importDefault(require("./deletetrack/deletetrack.route"));
const deletetrack_schema_1 = __importDefault(require("./deletetrack/deletetrack.schema"));
const tracklist_route_1 = __importDefault(require("./tracklist/tracklist.route"));
const tracklist_schema_1 = __importDefault(require("./tracklist/tracklist.schema"));
const uploadtrack_route_1 = __importDefault(require("./uploadtrack/uploadtrack.route"));
const uploadtrack_schema_1 = __importDefault(require("./uploadtrack/uploadtrack.schema"));
const updateupdate_route_1 = __importDefault(require("./updateupdate/updateupdate.route"));
const updateupdate_schema_1 = __importDefault(require("./updateupdate/updateupdate.schema"));
const updatecreate_route_1 = __importDefault(require("./updatecreate/updatecreate.route"));
const updatecreate_schema_1 = __importDefault(require("./updatecreate/updatecreate.schema"));
const updatedelete_route_1 = __importDefault(require("./updatedelete/updatedelete.route"));
const updatedelete_schema_1 = __importDefault(require("./updatedelete/updatedelete.schema"));
const updatestream_route_1 = __importDefault(require("./updatestream/updatestream.route"));
const updatestream_schema_1 = __importDefault(require("./updatestream/updatestream.schema"));
const approvedreviewstream_route_1 = __importDefault(require("./approvedreviewstream/approvedreviewstream.route"));
const approvedreviewstream_schema_1 = __importDefault(require("./approvedreviewstream/approvedreviewstream.schema"));
const contactstream_route_1 = __importDefault(require("./contactstream/contactstream.route"));
const contactstream_schema_1 = __importDefault(require("./contactstream/contactstream.schema"));
const contactdelete_route_1 = __importDefault(require("./contactdelete/contactdelete.route"));
const contactdelete_schema_1 = __importDefault(require("./contactdelete/contactdelete.schema"));
const contactcreate_route_1 = __importDefault(require("./contactcreate/contactcreate.route"));
const contactcreate_schema_1 = __importDefault(require("./contactcreate/contactcreate.schema"));
const reviewstream_route_1 = __importDefault(require("./reviewstream/reviewstream.route"));
const reviewstream_schema_1 = __importDefault(require("./reviewstream/reviewstream.schema"));
const reviewdelete_route_1 = __importDefault(require("./reviewdelete/reviewdelete.route"));
const reviewdelete_schema_1 = __importDefault(require("./reviewdelete/reviewdelete.schema"));
const reviewupdate_route_1 = __importDefault(require("./reviewupdate/reviewupdate.route"));
const reviewupdate_schema_1 = __importDefault(require("./reviewupdate/reviewupdate.schema"));
const reviewcreate_route_1 = __importDefault(require("./reviewcreate/reviewcreate.route"));
const reviewcreate_schema_1 = __importDefault(require("./reviewcreate/reviewcreate.schema"));
const eventupdate_route_1 = __importDefault(require("./eventupdate/eventupdate.route"));
const eventupdate_schema_1 = __importDefault(require("./eventupdate/eventupdate.schema"));
const eventdelete_route_1 = __importDefault(require("./eventdelete/eventdelete.route"));
const eventdelete_schema_1 = __importDefault(require("./eventdelete/eventdelete.schema"));
const eventstream_route_1 = __importDefault(require("./eventstream/eventstream.route"));
const eventstream_schema_1 = __importDefault(require("./eventstream/eventstream.schema"));
const eventcreate_route_1 = __importDefault(require("./eventcreate/eventcreate.route"));
const eventcreate_schema_1 = __importDefault(require("./eventcreate/eventcreate.schema"));
const userupdate_route_1 = __importDefault(require("./userupdate/userupdate.route"));
const userupdate_schema_1 = __importDefault(require("./userupdate/userupdate.schema"));
const userlist_route_1 = __importDefault(require("./userlist/userlist.route"));
const userlist_schema_1 = __importDefault(require("./userlist/userlist.schema"));
const deletemedia_route_1 = __importDefault(require("./deletemedia/deletemedia.route"));
const deletemedia_schema_1 = __importDefault(require("./deletemedia/deletemedia.schema"));
const uploadmedia_route_1 = __importDefault(require("./uploadmedia/uploadmedia.route"));
const uploadmedia_schema_1 = __importDefault(require("./uploadmedia/uploadmedia.schema"));
const medialist_route_1 = __importDefault(require("./medialist/medialist.route"));
const medialist_schema_1 = __importDefault(require("./medialist/medialist.schema"));
const login_route_1 = __importDefault(require("./login/login.route"));
const login_schema_1 = __importDefault(require("./login/login.schema"));
const register_route_1 = __importDefault(require("./register/register.route"));
const register_schema_1 = __importDefault(require("./register/register.schema"));
const config_1 = __importDefault(require("../config/config"));
const routes = {
    themedelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: themedelete_schema_1.default,
        route: themedelete_route_1.default
    },
    themecreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: themecreate_schema_1.default,
        route: themecreate_route_1.default
    },
    theme: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: theme_schema_1.default,
        route: theme_route_1.default
    },
    userdelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: userdelete_schema_1.default,
        route: userdelete_route_1.default
    },
    update: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: update_schema_1.default,
        route: update_route_1.default
    },
    shutdown: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: shutdown_schema_1.default,
        route: shutdown_route_1.default
    },
    maildelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: maildelete_schema_1.default,
        route: maildelete_route_1.default
    },
    maillist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['user'],
        schema: maillist_schema_1.default,
        route: maillist_route_1.default
    },
    calchdusage: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['user'],
        schema: calchdusage_schema_1.default,
        route: calchdusage_route_1.default
    },
    mailopt: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: mailopt_schema_1.default,
        route: mailopt_route_1.default
    },
    mailgencode: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: mailgencode_schema_1.default,
        route: mailgencode_route_1.default
    },
    userpwdreset: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: userpwdreset_schema_1.default,
        route: userpwdreset_route_1.default
    },
    usergencode: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: usergencode_schema_1.default,
        route: usergencode_route_1.default
    },
    deletetrack: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: deletetrack_schema_1.default,
        route: deletetrack_route_1.default
    },
    tracklist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: tracklist_schema_1.default,
        route: tracklist_route_1.default
    },
    uploadtrack: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: uploadtrack_schema_1.default,
        route: uploadtrack_route_1.default
    },
    updateupdate: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['user'],
        schema: updateupdate_schema_1.default,
        route: updateupdate_route_1.default
    },
    updatecreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: updatecreate_schema_1.default,
        route: updatecreate_route_1.default
    },
    updatedelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: updatedelete_schema_1.default,
        route: updatedelete_route_1.default
    },
    updatestream: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: updatestream_schema_1.default,
        route: updatestream_route_1.default
    },
    approvedreviewstream: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: approvedreviewstream_schema_1.default,
        route: approvedreviewstream_route_1.default
    },
    contactstream: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['user'],
        schema: contactstream_schema_1.default,
        route: contactstream_route_1.default
    },
    contactdelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: contactdelete_schema_1.default,
        route: contactdelete_route_1.default
    },
    contactcreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: contactcreate_schema_1.default,
        route: contactcreate_route_1.default
    },
    reviewstream: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['user'],
        schema: reviewstream_schema_1.default,
        route: reviewstream_route_1.default
    },
    reviewdelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: reviewdelete_schema_1.default,
        route: reviewdelete_route_1.default
    },
    reviewupdate: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['user'],
        schema: reviewupdate_schema_1.default,
        route: reviewupdate_route_1.default
    },
    reviewcreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: reviewcreate_schema_1.default,
        route: reviewcreate_route_1.default
    },
    eventupdate: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['user'],
        schema: eventupdate_schema_1.default,
        route: eventupdate_route_1.default
    },
    eventdelete: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: eventdelete_schema_1.default,
        route: eventdelete_route_1.default
    },
    eventstream: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: eventstream_schema_1.default,
        route: eventstream_route_1.default
    },
    eventcreate: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: eventcreate_schema_1.default,
        route: eventcreate_route_1.default
    },
    userupdate: {
        method: ['PATCH'],
        contentType: "application/json",
        privilege: ['user'],
        schema: userupdate_schema_1.default,
        route: userupdate_route_1.default
    },
    userlist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['user'],
        schema: userlist_schema_1.default,
        route: userlist_route_1.default
    },
    deletemedia: {
        method: ['DELETE'],
        contentType: "application/json",
        privilege: ['user'],
        schema: deletemedia_schema_1.default,
        route: deletemedia_route_1.default
    },
    uploadmedia: {
        method: ['POST'],
        contentType: "application/json",
        privilege: ['user'],
        schema: uploadmedia_schema_1.default,
        route: uploadmedia_route_1.default
    },
    medialist: {
        method: ['GET'],
        contentType: "application/json",
        privilege: ['guest'],
        schema: medialist_schema_1.default,
        route: medialist_route_1.default
    },
    login: {
        method: ["POST"],
        contentType: "application/json",
        privilege: ['guest'],
        schema: login_schema_1.default,
        route: login_route_1.default
    },
    register: {
        method: ["POST"],
        contentType: "application/json",
        privilege: (config_1.default.ENVIRONMENT === 'DEVELOPMENT') ? ['guest', 'user'] : ['user'],
        schema: register_schema_1.default,
        route: register_route_1.default
    },
};
exports.default = routes;
