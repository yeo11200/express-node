"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locals_1 = require("../middleware/locals");
const router = express_1.default.Router();
router.get('/info', (req, res, next) => {
    console.log('info start');
    (0, locals_1.messageState)('test');
    res.status(500).json({ status: 400, message: 'aaaa' });
});
module.exports = router;
