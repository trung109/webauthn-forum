import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.post('/register/start', (req, res) => {
    let username = req.body.username;
    let challenge = getNewChallenge();
    challenges[username] = convertChallenge(challenge);
    const pubKey = {
        challenge: challenge,
        rp: { id: rpId, name: 'webauthn-app' },
        user: { id: username, name: username, displayName: username },
        pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 },
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
            residentKey: 'preferred',
            requireResidentKey: false,
        }
    };
    res.json(pubKey);
});

router.post('/register/finish', async (req, res) => {
    const username = req.body.username;
    // Verify the attestation response
    let verification;
    try {
        verification = await SimpleWebAuthnServer.verifyRegistrationResponse({
            response: req.body.data,
            expectedChallenge: challenges[username],
            expectedOrigin
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }
    const { verified, registrationInfo } = verification;
    if (verified) {
        users[username] = getRegistrationInfo(registrationInfo);
        return res.status(200).send(true);
    }
    res.status(500).send(false);
});

router.post('/login/start', (req, res) => {
    let username = req.body.username;
    if (!users[username]) {
        res.status(404).send(false);
    }
    let challenge = getNewChallenge();
    challenges[username] = convertChallenge(challenge);
    res.json({
        challenge,
        rpId,
        allowCredentials: [{
            type: 'public-key',
            id: users[username].credentialID,
            transports: ['internal'],
        }],
        userVerification: 'discouraged',
    });
});

router.post('/login/finish', async (req, res) => {
    let username = req.body.username;
    if (!users[username]) {
        res.status(404).send(false);
    }
    let verification;
    try {
        const user = users[username];
        verification = await SimpleWebAuthnServer.verifyAuthenticationResponse({
            expectedChallenge: challenges[username],
            response: req.body.data,
            authenticator: getSavedAuthenticatorData(user),
            expectedRPID: rpId,
            expectedOrigin
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }

    const { verified } = verification;
    if (verified) {
        return res.status(200).send(true);
    }
    return res.status(400).send(false);
});

const rpId = 'localhost';
const expectedOrigin = 'http://localhost:3000';

export default router;