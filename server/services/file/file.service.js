"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const fs_1 = require("fs");
const Path = __importStar(require("path"));
// import { drive_v3, google, sheets_v4 } from 'googleapis';
const config_1 = __importDefault(require("../../config/config"));
const parseErrorMessage = (fnName, e) => [
    `Server - Services - File - ${fnName}: ${e.toString() || `Error: ${e.name || ``} ${e.message || `Unknown error.`}`}`
];
const file = (() => {
    const service = {
        exists: (filepath) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(config_1.default.ROOT_DIR + filepath, fs_1.promises.constants.F_OK);
                return {
                    success: true,
                    messages: [
                        `Server - Services - File - Exists: Successfully ${filepath} verified to exist.`,
                    ]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Exists: Error looking for ${filepath}`,
                        ...parseErrorMessage(`Exist`, e)
                    ]
                };
            }
        }),
        create: (filepath, content) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.writeFile(config_1.default.ROOT_DIR + filepath, content);
                return {
                    success: true,
                    messages: [`Server - Services - File - Create: Successfully created ${filepath}`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Create: Error creating ${filepath}`,
                        ...parseErrorMessage(`Create`, e)
                    ]
                };
            }
        }),
        read: (filepath) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const contents = yield fs_1.promises.readFile(config_1.default.ROOT_DIR + filepath, "utf8");
                return {
                    success: true,
                    messages: [`Server - Services - File - Read: Successfully read ${filepath}`,],
                    body: contents
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Read: Error reading ${filepath}`,
                        ...parseErrorMessage(`Read`, e)
                    ]
                };
            }
        }),
        update: (filepath, content) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.appendFile(config_1.default.ROOT_DIR + filepath, content);
                return {
                    success: true,
                    messages: [`Server - Services - File - Update: Successfully updated ${filepath}.`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Update: Error updating ${filepath}`,
                        ...parseErrorMessage(`Update`, e)
                    ]
                };
            }
        }),
        delete: (filepath) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // await fs.unlink(config.ROOT_DIR + filepath);
                yield fs_1.promises.rm(Path.normalize(config_1.default.ROOT_DIR + filepath), { recursive: true, force: true });
                return {
                    success: true,
                    messages: [`Server - Services - File - Delete: Successfully deleted ${filepath}.`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Delete: Error deleting ${filepath}.`,
                        ...parseErrorMessage(`Delete`, e)
                    ]
                };
            }
        }),
        move: (srcpath, destpath) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.rename(config_1.default.ROOT_DIR + srcpath, config_1.default.ROOT_DIR + destpath);
                return {
                    success: true,
                    messages: [`Server - Services - File - Move: Successfully moved ${srcpath} to ${destpath}.`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - Move: Error moving ${srcpath} to ${destpath}.`,
                        ...parseErrorMessage(`Move`, e)
                    ]
                };
            }
        }),
        readDirectory: (path) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const files = yield fs_1.promises.readdir(config_1.default.ROOT_DIR + path);
                return {
                    success: true,
                    messages: [`Server - Services - File - ReadDirectory: Successfully read directory ${path}.`,],
                    body: files
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - ReadDirectory: Error reading directory ${path}.`,
                        ...parseErrorMessage(`ReadDirectory`, e)
                    ]
                };
            }
        }),
        readFullDirectory: (path) => __awaiter(void 0, void 0, void 0, function* () {
            const _getDirectory = (root) => __awaiter(void 0, void 0, void 0, function* () {
                const rootPath = Path.join(config_1.default.ROOT_DIR, root);
                // console.log(rootPath);
                const result = {
                    size: (yield file.getDirectorySize(root)).body, // this is not efficient. could collate directory size after recursing over file and subdirectory sizes
                    timestamp: (yield fs_1.promises.stat(rootPath)).birthtimeMs,
                    files: {},
                    subDirectories: {}
                };
                const items = yield fs_1.promises.readdir(rootPath);
                for (const i of items) {
                    const itemPath = Path.join(root, i);
                    const stats = yield fs_1.promises.stat(Path.join(rootPath, i));
                    if (stats.isDirectory()) {
                        result.subDirectories[i] = yield _getDirectory(itemPath);
                    }
                    else {
                        result.files[i] = {
                            size: stats.size,
                            timestamp: stats.birthtimeMs
                        };
                    }
                }
                return result;
            });
            try {
                if (!(yield fs_1.promises.stat(Path.join(config_1.default.ROOT_DIR, path))).isDirectory()) {
                    return {
                        success: false,
                        messages: [
                            `Server - Services - File - ReadFullDirectory - Provided path ' ${path}' is not a valid directory.`
                        ]
                    };
                }
                const dir = yield _getDirectory(path);
                return {
                    success: true,
                    messages: [`Server - Services - File - ReadFullDirectory - Path ' ${path}' retrieved successfully.`],
                    body: dir
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - ReadFullDirectory: Error reading directory ${path}.`,
                        ...parseErrorMessage(`ReadFullDirectory`, e)
                    ]
                };
            }
        }),
        createDirectory: (path) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.mkdir(config_1.default.ROOT_DIR + path, { recursive: true });
                return {
                    success: true,
                    messages: [`Server - Services - File - CreateDirectory: Successfully created directory ${path}.`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - CreateDirectory: Error creating directory ${path}.`,
                        ...parseErrorMessage(`CreateDirectory`, e)
                    ]
                };
            }
        }),
        deleteDirectory: (path) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.promises.rmdir(config_1.default.ROOT_DIR + path, { recursive: true });
                return {
                    success: true,
                    messages: [`Server - Services - File - DeleteDirectory: Successfully deleted directory ${path}.`,]
                };
            }
            catch (e) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - DeleteDirectory: Error deleting directory ${path}.`,
                        ...parseErrorMessage(`DeleteDirectory`, e)
                    ]
                };
            }
        }),
        getDirectorySize: (path) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const stats = yield fs_1.promises.stat(config_1.default.ROOT_DIR + path);
                if (!stats.isDirectory()) {
                    return {
                        success: false,
                        messages: [
                            `Server - Services - File - GETDIRECTORYSIZE: ${path} is not a directory.`,
                        ]
                    };
                }
            }
            catch (_a) {
                return {
                    success: false,
                    messages: [
                        `Server - Services - File - GETDIRECTORYSIZE: ${config_1.default.ROOT_DIR + path} does not exist or is inaccessable.`,
                    ]
                };
            }
            let totalSize = 0;
            function calculateSize(filePath) {
                return __awaiter(this, void 0, void 0, function* () {
                    const stats = yield fs_1.promises.stat(filePath);
                    if (stats.isFile()) {
                        totalSize += stats.size;
                    }
                    else if (stats.isDirectory()) {
                        const subFiles = yield fs_1.promises.readdir(filePath);
                        for (const subFile of subFiles) {
                            yield calculateSize(Path.join(filePath, subFile));
                        }
                    }
                });
            }
            yield calculateSize(config_1.default.ROOT_DIR + path);
            return {
                success: true,
                messages: [
                    `Server - Services - File - GETDIRECTORYSIZE: ${path} size calculated successfully.`,
                ],
                body: totalSize
            };
        }),
        // readFullGoogleDriveDirectory: async (folderID: string): ServicePromise<Directory> => {
        //   if (!config.GOOGLE_API_KEY) {
        //     return {
        //       success: false,
        //       messages: [
        //         `Server - Services - File - READFULLGOOGLEDRIVEDIRECTORY: GOOGLE DRIVE API key not configured.`
        //       ]
        //     }
        //   }
        //   const _getGoogleDirectory: (folderID: string) => Promise<Directory> = async (folderID) => {
        //     const drive = google.drive({ version: 'v3', auth: config.GOOGLE_API_KEY });
        //     const errorsmsgs = [];
        //     let pageToken = undefined;
        //     let files: drive_v3.Schema$File[] = [];
        //     let res;
        //     do {
        //       res = await drive.files.list({
        //         q: `'${folderID}' in parents`,  // Query for files and folders inside a specific folder
        //         fields: 'files(id, name, mimeType, size, createdTime, imageMediaMetadata, videoMediaMetadata), nextPageToken',  // Retrieve specific file/folder metadata
        //         pageToken: pageToken
        //       })
        //       files = [ ...files, ...(res.data.files || [])];
        //       pageToken = res.data.nextPageToken;
        //     } while (pageToken);
        //     const thisDir: Directory = {
        //       googleId: folderID,
        //       size: 0,
        //       timestamp: -1,
        //       files: {},
        //       subDirectories: {}
        //     };
        //     for (const gfile of files) {
        //       if (gfile.id) {
        //         if (gfile.mimeType === `application/vnd.google-apps.folder`) {
        //           thisDir.subDirectories[gfile.name || gfile.id] = await _getGoogleDirectory(gfile.id);
        //           (thisDir.subDirectories[gfile.name || gfile.id].googleId)! = gfile.id,
        //           (thisDir.subDirectories[gfile.name || gfile.id].timestamp)! = parseInt(gfile.createdTime || '0');
        //           thisDir.size = thisDir.size! + (thisDir.subDirectories[gfile.name || gfile.id].size)!;
        //         } else {
        //           thisDir.files[gfile.name || gfile.id] = {
        //             googleId: gfile.id,
        //             size: parseInt(gfile.size || '0'),
        //             timestamp: parseInt(gfile.createdTime || '0'),
        //             metaData: { mimeType: gfile.mimeType, ...gfile.imageMediaMetadata, ...gfile.videoMediaMetadata }
        //           }
        //           thisDir.size = thisDir.size! + parseInt(gfile.size || '0');
        //         }
        //       }
        //     };
        //     return thisDir;
        //   }
        //   try {
        //     const dir: Directory = await _getGoogleDirectory(folderID);
        //     return {
        //       success: true,
        //       messages: [`Server - Services - File - ReadFullGoogleDirectory - Path ' ${folderID}' retrieved successfully.`],
        //       body: dir
        //     }
        //   } catch (e) {
        //     return {
        //       success: false,
        //       messages: [
        //         `Server - Services - File - ReadFullGoogleDirectory: Error reading directory ${folderID}.`,
        //         ...parseErrorMessage(`ReadFullGoogleDirectory`, e)
        //       ]
        //     }
        //   }
        // },
        // readGoogleDriveDirectory: async (folderID: string): ServicePromise<drive_v3.Schema$File[]> => {
        //   if (!config.GOOGLE_API_KEY) {
        //     return {
        //       success: false,
        //       messages: [
        //         `Server - Services - File - READFULLGOOGLEDRIVEDIRECTORY: GOOGLE DRIVE API key not configured.`
        //       ]
        //     }
        //   }
        //   const drive = google.drive({ version: 'v3', auth: config.GOOGLE_API_KEY });
        //   try {
        //     let pageToken = undefined;
        //     let files: drive_v3.Schema$File[] = [];
        //     let res;
        //     do {
        //       res = await drive.files.list({
        //         q: `'${folderID}' in parents`,  // Query for files and folders inside a specific folder
        //         fields: 'files(id, name, mimeType, size, createdTime, imageMediaMetadata, videoMediaMetadata), nextPageToken',  // Retrieve specific file/folder metadata
        //         pageToken: pageToken
        //       })
        //       files = [ ...files, ...(res.data.files || [])];
        //       pageToken = res.data.nextPageToken;
        //     } while (pageToken);
        //     return {
        //       success: true,
        //       messages: [
        //         `Server - Services - File - READFULLGOOGLEDRIVEDIRECTORY: GOOGLE DRIVE folder read successfully.`
        //       ],
        //       body: files
        //     }
        //   } catch (error) {
        //     return {
        //       success: false,
        //       messages: [
        //         `Server - Services - File - READFULLGOOGLEDRIVEDIRECTORY: error occured reading google drive directory ${folderID}.`,
        //         (error as Object).toString()            
        //       ]
        //     }
        //   }
        // },
        // readGoogleSpreadsheet: async (spreadSheetID: string): ServicePromise<{ [key: string]: string[][] }> => {
        //   const sheets = google.sheets({ version: 'v4', auth: config.GOOGLE_API_KEY });
        //   try {
        //     const response = await sheets.spreadsheets.get({
        //       spreadsheetId: spreadSheetID
        //     });
        //     let sheet: any = {};
        //     let data;
        //     const titles = response.data.sheets?.map(s => s.properties?.title) || [];
        //     for (const title of titles) {
        //       data = await sheets.spreadsheets.values.get({
        //         spreadsheetId: spreadSheetID,
        //         range: `${title}`
        //       });
        //       sheet[title as string] = data.data.values; 
        //     }
        //     return {
        //       success: true,
        //       messages: [
        //         `Server - Services - File - READGOOGLESPREADSHEET: GOOGLE spreadsheet read successfully.`
        //       ],
        //       body: sheet
        //     }
        //   } catch (error) {
        //     return {
        //       success: false,
        //       messages: [
        //         `Server - Services - File - READGOOGLESPREADSHEET: error occured reading google spreadsheet.`,
        //         (error as Object).toString()            
        //       ]
        //     }
        //   }
        // }
    };
    return service;
})();
exports.default = file;
