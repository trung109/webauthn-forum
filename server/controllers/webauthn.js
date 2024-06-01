import {
    generateRegistrationOptions,
    verifyRegistrationResponse,
} from '@simplewebauthn/server';


export const registerRequest = async (req, res) => {
    const username = decodedToken.username;
    try {
        const userPasskeys = await Passkey.findOne({ username }) || [];
        const params = [-7, -257];
        for (let param of params) {
            pubKeyCredParams.push({ type: 'public-key', alg: param });
        }

        const options = await generateRegistrationOptions(
            {
                rpName,
                rpID,
                userName: username,
                attestationType: 'none',
                excludeCredentials: userPasskeys.map(passkey => ({
                    id: passkey.id
                })),

                authenticatorSelection: {
                    residentKey: 'preferred',
                    userVerification: 'preferred',
                    authenticatorAttachment: 'platform'
                },
            }
        );

        // Temporary hack until SimpleWebAuthn supports `pubKeyCredParams`
        options.pubKeyCredParams = [];
        for (let param of params) {
            options.pubKeyCredParams.push({ type: 'public-key', alg: param });
        }

        return res.json(options);
    } catch {
        res.status(404).send("Something went wrong");
    }
}

export const verifyResponse = async (req, res) => {
    const username = decodedToken.username;
}