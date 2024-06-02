import User from '../models/user.js';
import ActivateToken from "../models/activate.js";
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { genRandHex, genRandomPassword } from '../helpers/secure.js';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const activateAccount = async (req, res) => {
  const {decodedToken} = JSON.parse(req.body);
  const username = decodedToken.username;

  const tokenVal = genRandHex(8);
  const resetLink = `${process.env.DOMAIN}/api/auth/activate/?token=${tokenVal}`;
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
        </body>
      </html>
    `;

  const token = new ActivateToken({
    username: username,
    token: tokenVal,
    issueat: Date.now(),
    expire: Date.now() + 10 * 60 * 1000 // set expire time of token to 10 min
  });

  // console.log(username);
  // If a token is already existed -> update new tokenVal and expiry time
  try {
    const oldToken = await ActivateToken.findOne({username});
    if(!oldToken){
      // console.log("We add new token here-")
      await token.save()
    } else {
      // console.log("We update new token here-")
      await ActivateToken.updateOne({username}, {token: tokenVal, issueat: token.issueat, expire: token.expire});
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
        to: `${user.email}`,
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
  const email = req.query.email;
  const username = await User.findOne({email}).username;
  const randomPassword = genRandomPassword(20)
  
  const emailContent = `
      <html>
        <body>
          <p>Dear ${username},</p>
          <p>We noticed that you've requested for a password reset. Here is your new password. Please change it immidiately after you've logged in:</p>
          <p>${randomPassword}</p>
        </body>
      </html>
    `;
  try {
    const data = await resend.emails.send({
      from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
      to: [`${email}`],
      subject: 'Account Activation',
      html: emailContent,
    });
  } catch (error) {
    res.status(400).json(error);
  }

  await User.updateOne({ username: username}, {password: randomPassword});

  res.status(200).json(data);
};