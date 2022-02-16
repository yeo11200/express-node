import express from 'express';

const router = express.Router();

const User = require('../controller/User');

router.use('/members', User);

module.exports = router;