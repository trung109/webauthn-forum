import crypto from 'crypto'

export const genRandHex = nbytes => {
  return crypto.randomBytes(nbytes).toString('hex')
}

export const genRandomPassword = (nbytes) => {
  return crypto.randomBytes(nbytes).toString('base64').slice(0, 20)
}

export const genRandomBase64 = (nbytes) => {
  return crypto.randomBytes(nbytes).toString('base64url')
}

export const genChallenge = () => {
  return crypto.randomUUID().toString('base64url')
  // return crypto.randomUUID()
}

export const signJWT = (payload) => {
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '3h',
      issuer: 'All-for-one-gate'
    });
}

export const genCSRF = () => {
  return crypto.randomUUID().toString('base64url')
}

export const checkCSRF = (csrf, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: 'HS256',
      issuer: 'All-for-one-gate',
      maxAge: '3h'
    })
    if(csrf === decodedToken.csrf){
        return true;
    } else{
      return false;
    }
  } catch{
    return false;
  }
}



export const hexRegex = /^[a-f0-9]+$/;
export const numRegex = /^[0-9]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const printableRegex = /^[\x20-\x7E]*$/;
export const stringRegex = /^[A-Za-z]+$/
export const base64UrlRegex = /^[A-Za-z0-9-_]+$/
export const filterInput = (str, regex) => {

  const notNoSQLRegex = /[{}.$]/
  if (notNoSQLRegex.test(str)) {
    return ""
  }
  return regex.test(str) ? str.toString() : ""
}


