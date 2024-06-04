import { genRandHex, genChallenge } from "../helpers/secure.js";
import WebauthnChallenge from "../models/webauthnChallenge.js";
import { server } from '@passwordless-id/webauthn'
import Credentials from "../models/credentials.js";
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import crypto from 'crypto'
import * as s from '../helpers/secure.js'
import dotenv from 'dotenv'


dotenv.config()

export const getRegisterChallenge = async (req, res) => {
    if (req.body === "{}") {
        res.status(404).send('Auth failed.')
    }

    const { decodedToken } = JSON.parse(req.body)

    const challenge = new WebauthnChallenge({
        id: genRandHex(16),
        username: decodedToken.username,
        value: genChallenge(),
        type: 'register',
        issueat: Date.now(),
        expire: Date.now() + 5 * 60 * 1000
    });

    try {
        await challenge.save();

        res.json({ challenge_id: challenge.id, challenge: challenge.value });
    } catch (err) {
        res.status(404).send("Something went wrong.");
    }
}

export const getLoginChallenge = async (req, res) => {
    const { username } = req.body
    const challenge = new WebauthnChallenge({
        id: genRandHex(16),
        username,
        value: genChallenge(),
        type: 'login',
        issueat: Date.now(),
        expire: Date.now() + 5 * 60 * 1000
    });

    const availableCreds = await Credentials.find({ username:  s.filterInput(username, s.printableRegex) })
    const credIds = availableCreds.map(cred => cred.credential.id)

    try {
        await challenge.save();

        res.json({ challenge_id: challenge.id, challenge: challenge.value, credIds });
    } catch (err) {
        res.status(404).send("Something went wrong.");
    }
}

export const registerWebAuthn = async (req, res) => {
    if (req.body === "{}") {
        res.status(404).send('Auth failed.')
    }

    const { decodedToken: { username }, registration, challenge_id } = JSON.parse(req.body)
    const queryParams = {
        id: s.filterInput(challenge_id, s.hexRegex),
        issueat: { $lte: Date.now() },
        expire: { $gte: Date.now() },
        type: 'register'
    }
    const { value: challenge } = await WebauthnChallenge.findOne(queryParams)
    const expected = {
        challenge,
        origin: process.env.DOMAIN,

    }


    try {
        const registrationParsed = await server.verifyRegistration(registration, expected)
        const { credential } = registrationParsed
        const credentials = new Credentials({
            username,
            credential
        })
        await credentials.save()
        console.log('New credentials saved:', credentials);
        res.status(200).send("Registration successfully!")
    } catch (err) {
        console.log(err)
        res.status(404).send("Registration failed!")
    }

}

export const loginWebAuthn = async (req, res) => {
    if (req.body === "{}") {
        res.status(404).send('Auth failed.')
    }
    const { authentication, username, challenge_id } = req.body
    const queryParams = {
        id: s.filterInput(challenge_id, s.hexRegex),
        issueat: { $lte: Date.now() },
        expire: { $gte: Date.now() },
        type: 'login'
    }
    const { value: challenge, username: challengeUsername } = await WebauthnChallenge.findOne(queryParams)
    if (username !== challengeUsername) {
        res.status(404).send('Login failed, wrong username!')
    }
    const { username: authUsername, credential: credentialKey } = await Credentials.findOne({ 'credential.id': s.filterInput(authentication.credentialId, s.base64UrlRegex) })

    if (username !== authUsername) {
        res.status(404).send('Login failed, wrong username!')
    }
    const expected = {
        challenge,
        origin: process.env.DOMAIN,
        userVerified: true,
    }
    try {
        const authenticationParsed = await server.verifyAuthentication(authentication, credentialKey, expected)
        const user = await User.findOne({ username: s.filterInput(username, s.printableRegex) })
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '3h',
                issuer: 'All-for-one-gate'
            })

        // user.password = undefined


        //ANTI _CSRF
        const message = s.genUUID() + "!" + s.genRandomBase64(32);
        const hmac = crypto.createHmac("sha256", process.env.HMAC_SECRET).update(message).digest('hex');
        const csrf = `${hmac}.${message}`;

        res.status(200).json({
            token,
            user: {
                username: user.username,
                email: "",
                id: user.id,
                photoUrl: user.photoUrl,
                role: user.role,
                status: ""
            }, csrf
        })
    } catch (err) {
        console.log(err)
        res.status(404).send('Login failed')
    }

}
