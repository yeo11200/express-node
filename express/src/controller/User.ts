import express, { NextFunction, Request, Response } from "express";
import { messageState } from "../middleware/locals";

const router = express.Router();

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
  console.log('info start');

  messageState('test');

  res.status(500).json({ status : 400, message : 'aaaa'})
});

module.exports = router;