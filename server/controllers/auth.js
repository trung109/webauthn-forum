import * as h from "../helpers/helper.js"
import * as s from "../helpers/secure.js"
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);


export const register = async (req, res) => {
    // const {username, email, password, confirmPassword} = req.body
    const { username, email, password } = req.body

    if (!username || !h.isValidUsername(username)) res.status(400).send('Username must have at least length of 2 and does not contain .@{}$.')
    if (!email) res.status(400).send('Email required.')
    if (!h.isValidPassword(password)) return res.status(400).send('Password must have at least length of 8, 1 number, 1 alphabetic character, 1 special character and does not contain .@{}$.')
    // if(password !== confirmPassword) return res.status(400).send('Confirm password does not match.')
    // TODO: Sanitize the input
    const existEmail = await User.findOne({ email: s.filterInput(email, s.emailRegex) })
    const existUsername = await User.findOne({ usernames: s.filterInput(username, s.printableRegex) })
    if (existEmail) {
        res.status(400).send('Email existed.')
    } else if (existUsername) {
        res.status(400).send('Username existed.')
    }

    const hashed = await h.hashPassword(password)
    const user = new User({
        id: s.genRandHex(16), 
        username,
        email,
        password: hashed,
        role: 'user',
        status: 'unverified'
    });

    try {
        // console.log(user)
        await user.save()
        await h.getActivationLink(username);
        res.send('User registered');
    } catch (err) {
        console.log(err)
        res.status(400).send("Error, try again.")
    }

}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        // if (!username || !h.isValidUsername(username)) return res.status(400).send('Invalid username.')
        // if (!h.isValidPassword(password)) return res.status(400).send('Invalid password.')
        const user = await User.findOne({ username: s.filterInput(username, s.printableRegex) })
        if (!user) {
            return res.status(404).send('Something went wrong')
        }
        // TODO - IMPLEMENT RANDOM DELAY TO PREVENT TIME BASED BRUTE-FORCE ATTEMPT
        // console.log('password: ', h.hashPassword)
        // console.log('db password:', user.password)
        const isPasswordMatch = await h.comparePassword(password, user.password)

        if (!isPasswordMatch) res.status(404).send('Something went wrong')

        // if (user.status === 'unverified') res.status(400).send('Unverified');

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '3h',
                issuer: 'All-for-one-gate'
            })

        // user.password = undefined
        
        // ANTI - CSRF
        const message = s.genUUID() + "!" + s.genRandomBase64(32);
        const hmac = crypto.createHmac("sha256", process.env.HMAC_SECRET).update(message).digest('hex');
        const csrf = `${hmac}.${message}`;

        res.json({
            token,
            user: {
                username: user.username,
                email: "",
                id: user.id,
                photoUrl: user.photoUrl,
                role: user.role,
                status: ""
            },csrf
        } )

    } catch (err) {
        console.log(err)
        // res.status(404).send("Something went wrong");
    }
}

export const resetPassword = async (req, res) => {

    const { email } = req.body;
    
    const user = await User.findOne({ email: s.filterInput(username, s.email) });
    const randomPassword = s.genRandomPassword(20)
    // console.log('username', user.username)
    const emailContent = `
      <html>
        <body>
          <p>Dear ${user.username},</p>
          <p>We noticed that you've requested for a password reset. Here is your new password. Please change it immidiately after you've logged in:</p>
          <p>${randomPassword}</p>
        </body>
      </html>
    `;
    try {
        const hashed = await h.hashPassword(randomPassword);
        const data = await resend.emails.send({
            from: 'All-for-one-team <allforoneteam@osprey.id.vn>',
            to: `${email}`,
            subject: 'Password Reset',
            html: emailContent,
        });
        // console.log(hashed)
        await User.updateOne({ email: s.filterInput(email, s.emailRegex) }, { password: hashed });
        res.status(200).send('Reset success');
    } catch (error) {
        res.status(404).send('Something went wrong');
    }

}











