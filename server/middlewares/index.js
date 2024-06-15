import jwt, { decode } from 'jsonwebtoken'
import { checkCSRF, jwtSign } from '../helpers/secure.js';


export const requireSignIn = async (req, res, next) => {
    const { token, csrf, ...rest } = req.body

    if (!checkCSRF(csrf, token)) {
        res.status(404).send('Bad csrf')
    } else {

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: 'HS256',
                issuer: 'All-for-one-gate',
                maxAge: '3h'
            })
            const newToken = signJWT({id: decodedToken.id, username: decodedToken.username, role: decodedToken.role, csrf: genCSRF()})
            req.body = JSON.stringify({ ...rest, decodedToken, newToken })
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
    if (!checkCSRF(csrf, token)) {
        return res.status(400).send('Bad csrf')
    } else {
    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: 'HS256',
            issuer: 'All-for-one-gate',
            maxAge: '3h'
        })
        if (decodedToken.role === 'admin') {
            const newToken = signJWT({id: decodedToken.id, username: decodedToken.username, role: decodedToken.role, csrf: genCSRF()})
            req.body = JSON.stringify({ newToken, decodedToken, ...rest })
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
