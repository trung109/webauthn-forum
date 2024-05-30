import jwt, { decode }  from 'jsonwebtoken'


// export const requireSignIn = expressjwt({ 
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
// });

export const requireSignIn = async (req, res, next) => { 
    const { token } = req.body
    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: "HS256",
            // issuer: "All-for-one-gate",
        })
        req.body = JSON.stringify(decodedToken)
    }   catch {
        req.body = JSON.stringify({})
    }
    next()
    
};