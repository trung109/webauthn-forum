import dotenv from 'dotenv'

import { Resend } from 'resend';
import express, { Request, Response } from 'express';

const router = express.Router()

const resend = new Resend('re_123456789');
const app = express();

router.post('/verify-account', checkToken, async (req: Request, res: Response) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <allforoneteam@osprey.id.vn>',
      to: ['gray.red.ncsc420@gmail.com'],
      subject: 'Hello World',
      html: '<strong>it works!</strong>',
    });

    res.status(200).json(data);
  } catch(error) {
    res.status(400).json(error);
  }
})
