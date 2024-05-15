import express from 'express';
import db from "../db/conn.mjs";
import { rateLimit } from "express-rate-limit";
import { generateToken, generateHash } from "../core/security.mjs";

var rate_limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes timeout
    max: 5,
    message: 'Too many failed attempts',
    skipSuccessfulRequests: true
});

var router = express.Router();

router.get('/profile', (req, res, next) => {
    res.send('Sample profile');
});

router.post('/comment', (req, res) => {
    res.send('Sample comment');
    res.redirect(`/post?id=${id}`);
});


router.post('/login', rate_limiter, async (req, res) => {
    const { username, password } = req.body;
    const collection = db.collection("user");

    //find user by username
    const user = await collection.findOne({ username: username });

    const password_hash = generateHash(password + process.env.HASH_NONCE);

    // CHECK USER AND PASSWORD
    if (user?.password_hash === password_hash) {
        const user_nonce = user.password_hash.slice(0, 32);
        const token = generateToken(user.username, user_nonce, user.role);
        res.status(200).json({
            token
        });
    } else {
        // RANDOM DELAY INTERVAL TO PREVENT TIME-BASED BRUTE FORCE
        setTimeout(
            () => res.status(302).send("CAYON > PENITS"),
            Math.max(500, Math.floor(Math.random() * 1000))
        );

    }
});


router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const collection = db.collection("user");
    const password_hash = generateHash(password);
    try {
        var result = await collection.insertOne({
            username: username,
            password_hash: password_hash,
            email: email,
            role: "user",
            verified: true
        });
        res.status(200);
    } catch {
        res.status(302).render('somethingwentwrong');
    }
    //add new user to db

});

export default router;