import bcrypt from 'bcrypt'
import { genRandHex } from './secure.js';
import ActivateToken from '../models/activate.js';
import User from '../models/user.js';

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hashed) => {
                if (err) {
                    reject(err);
                }
                resolve(hashed)
            })
        })
    })
}

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

export const isValidPassword = (password) => {
    return (password.length >= 8
        && /\d/.test(password)
        && /[a-zA-Z]/.test(password)
        && /[!@#$%^&*(),.?":{}|<>]/.test(password))
}

export const isValidUsername = (username) => {
    return !username.includes('@') && username.length >= 2
}

export const getActivationLink = async (username) => {
    const tokenVal = genRandHex(8);
    const resetLink = `${process.env.DOMAIN}/api/auth/activate?token=${tokenVal}`;
    const emailContent = `
      <html>
        <body>
          <p>Dear ${username},</p>
          <p>We noticed that you haven't activated your account yet. To complete your registration and start using your account, please activate it by clicking the link below:</p>
          <p><a href="${resetLink}">Activate My Account</a></p>
          <p><a href="https://youtu.be/dQw4w9WgXcQ?si=jCwxJoPE6JMPeQw1">Click here to find out about discounts on the platform</a></p>
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


    // If a token is already existed -> update new tokenVal and expiry time
    try {
        const oldToken = await ActivateToken.findOne({ username });
        if (!oldToken) {
            await token.save()
        } else {
            await ActivateToken.updateOne({ username }, {token: tokenVal, issueat: token.issueat, expire: token.expire});
        }
    }
    catch {
        // res.status(404).send("Something went wrong");
    }


    const user = await User.findOne({ username: username });

    try {

        const data = await resend.emails.send({
            from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
            to: `${user.email}`,
            subject: 'Account Activation',
            html: emailContent,
        });

        // res.status(200).json(data);
    } catch (error) {
        // res.status(400).json(error);
    }

}
