"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MSG = exports.ERROR_CODE = void 0;
const locals_1 = require("../middleware/locals");
exports.ERROR_CODE = {
    BAD_REQUEST: 500,
    ACCESSTOKENEXPIRED: 401,
    ACCESSTOKENINVALID: 419,
    REFRESHTOKENEXPIRED: 402,
    REFRESHTOKENINVALID: 420,
};
exports.ERROR_MSG = {
    BAD_REQUEST: (0, locals_1.messageState)('common.request.msg01'),
    ACCESSTOKENEXPIRED: (0, locals_1.messageState)('common.request.msg02'),
    ACCESSTOKENINVALID: (0, locals_1.messageState)('common.request.msg03'),
    REFRESHTOKENEXPIRED: (0, locals_1.messageState)('common.request.msg04'),
    REFRESHTOKENINVALID: (0, locals_1.messageState)('common.request.msg05'),
};
