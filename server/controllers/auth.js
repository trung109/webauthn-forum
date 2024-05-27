import * as h from "../helpers/helper.js"
import * as s from "../helpers/secure.js"
import user from "../models/user.js"
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    // const {username, email, password, confirmPassword} = req.body
    const { username, email, password } = req.body
    if (!username || !h.isValidUsername(username)) return res.status(400).send('Username must have at least length of 2 and does not contain @.')
    if (!email) return res.status(400).send('Email required.')
    if (!h.isValidPassword(password)) return res.status(400).send('Password must have at least length of 8, 1 number, 1 alphabetic character, 1 special character.')
    // if(password !== confirmPassword) return res.status(400).send('Confirm password does not match.')
    // TODO: Sanitize the input
    const existEmail = await User.findOne({ email })
    const existUsername = await User.findOne({ username })
    if (existEmail) {
        return res.status(400).send('Email existed.')
    } else if (existUsername) {
        return res.status(400).send('Username existed.')
    }

    const hashed = await h.hashPassword(password)
    const user = new User({
        id: s.genRandHex(16),
        username,
        email,
        password: hashed,
        role: 'user',
        status: 'active'
    })

    try {
        await user.save()
        console.log('User registered: ', user)
        return res.json({ ok: true })
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error, try again.")
    }
}


export const login = async (req, res) => {
    try {

        const { username, password } = req.body
        if (!username || !h.isValidUsername(username)) return res.status(400).send('Invalid username.')
        if (!h.isValidPassword(password)) return res.status(400).send('Invalid password.')
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).send('Username does not exist.')
        }
        const isPasswordMatch = await h.comparePassword(password, user.password)
        if (!isPasswordMatch) return res.status(400).send('Incorrect password.')

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            })

        user.password = undefined

        res.json({
            token,
            user
        })

    } catch (err) {
        console.log('Error login user: ', user)
    }
}             
                
            










