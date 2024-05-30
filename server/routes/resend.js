import dotenv from 'dotenv'

import { Resend } from 'resend';
import express from 'express';

dotenv.config();

const router = express.Router()

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/get-activate-link', async (req, res) => {
  const username= req.query.user;
  const emailContent = `
    <html>
      <body>
        <p>Dear ${username},</p>
        <p>We noticed that you haven't activated your account yet. To complete your registration and start using your account, please activate it by clicking the link below:</p>
        <p><a href="youtube.com">Activate My Account</a></p>
        <p>If you did not sign up for this account, please disregard this email.</p>
        <p>Thank you for choosing [Your Company Name]! We look forward to having you with us.</p>
        <br>
        <p>Best regards,</p>
        <p>[Your Name]</p>
        <p>[Your Position]</p>
        <p>[Your Company Name]</p>
        <p>[Contact Information]</p>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
      to: ['gray.red.ncsc420@gmail.com'],
      subject: 'Account Activation',
      html: emailContent,
    });

    res.status(200).json(data);
  } catch(error) {
    res.status(400).json(error);
  }
})

export default router;