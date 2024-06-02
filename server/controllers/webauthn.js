import { genRandHex, genRandomBase64 } from "../helpers/secure.js";
import WebauthnChallenge from "../models/webauthnChallenge.js";

export const getChallenge = async (req, res) => {
    if(req.body === "{}") {
        res.status(404).send('Auth failed.')
    }
    
    const { decodedToken, ...rest } = JSON.parse(req.body)

    const challenge = new WebauthnChallenge({
        id: genRandHex(16),
        username: decodedToken.username,
        value: genRandomBase64(32),
        issueat: Date.now(),
        expire: Date.now() + 5 * 60 * 1000 
    });

    try{
        await challenge.save();

        res.json({challenge_id: challenge.id, challenge: challenge.value});
    } catch (err){
        console.log(err)
        res.status(404).send("Something went wrong.");
    }
}