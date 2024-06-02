import jwt, { decode } from 'jsonwebtoken'
import { checkCSRF } from '../helpers/secure.js';


export const requireSignIn = async (req, res, next) => {
    const { token, csrf, ...rest } = req.body

    if (!checkCSRF(csrf)) {
        res.status(404).send('Bad csrf')
    } else {

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: 'HS256',
                issuer: 'All-for-one-gate',
                maxAge: '3h'
            })
            req.body = JSON.stringify({ ...rest, decodedToken })
            // console.log(req.body)
            next()
        } catch {
            req.body = JSON.stringify({})
            res.status(404).send('Auth failed')
        }
    }

};

export const requireAdmin = async (req, res, next) => {
    const { token, csrf, ...rest } = req.body
    if (!checkCSRF(csrf)) {
        res.status(404).send('Bad csrf')
    } else {
    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: 'HS256',
            issuer: 'All-for-one-gate',
            maxAge: '3h'
        })
        if (decodedToken.role === 'admin') {

            req.body = JSON.stringify({ decodedToken, ...rest })
            // console.log(req.body)

        } else {
            req.body = JSON.stringify({})
        }
    } catch {
        req.body = JSON.stringify({})
    }
    next()
}

};
