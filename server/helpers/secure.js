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

export const genUUID = () => {
  return crypto.randomUUID().toString('base64url')
  // return crypto.randomUUID()
}

export const checkCSRF = (csrf) => {
  try {
    const [hmac, message] = csrf.split('.')
    const check = crypto.createHmac("sha256", process.env.HMAC_SECRET).update(message).digest('hex');
    if (hmac === check) {
      return true;
    }
    return false;
  } catch {
    return false
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


