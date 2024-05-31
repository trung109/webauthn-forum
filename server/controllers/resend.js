import User from '../models/user.js';
import ActivateToken from "../models/activate.js";
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { hashPassword } from '../helpers/helper.js';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const activateAccount = async (req, res) => {
  const username = req.query.user;
  const tokenVal = await hashPassword(username).to;
  const resetLink = `${process.env.DOMAIN}/?user=${username}&token=${tokenVal};`;
  const emailContent = `
      <html>
        <body>
          <p>Dear ${username},</p>
          <p>We noticed that you haven't activated your account yet. To complete your registration and start using your account, please activate it by clicking the link below:</p>
          <p><a href="${resetLink}">Activate My Account</a></p>
          <p>If you did not sign up for this account, please disregard this email. <strong>Note that the link is expired after 10 minutes</strong> </p>
          <p>Thank you for choosing All-for-one-gate as your login service provider! We look forward to having you with us.</p>
          <br>
          <p>Best regards,</p>
          <p>All-for-one-gate</p>
          <p>trungnqvcs@whoareyou.ccp</p>
        </body>
      </html>
    `;

  const token = new ActivateToken({
    username: username,
    token: tokenVal,
    issueat: Date.now(),
    expire: Date.now() + 10 * 60 * 1000 // set expire time of token to 10 min
  });


  // If a token is already existed -> update new tokenVal and expiry time
  try {
    const oldToken = await ActivateToken.findOne({username});
    if(!oldToken){
      await token.save()
    } else {
      ActivateToken.updateOne({username}, token);
    }
  }
  catch {
    res.status(404).send("Something went wrong");
  }


  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).send("Something went wrong");
  } else {
    try {

      const data = await resend.emails.send({
        from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
        to: "gray.red.ncsc420@gmail.com",
        subject: 'Account Activation',
        html: emailContent,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  }

};

export const resetPassword = async (req, res) => {
  const username = req.query.user;
  const emailContent = `
      <html>
        <body>
          <p>Dear ${username},</p>
          <p>We noticed that you've requested for a password reset. Here is your new password. Please change it immidiately:</p>
          <p>${randomPassword}</p>
        </body>
      </html>
    `;
  try {
    const data = await resend.emails.send({
      from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
      to: ['quyanhh10@gmail.com'],
      subject: 'Account Activation',
      html: emailContent,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};