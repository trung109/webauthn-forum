import crypto from 'crypto'

export const genRandHex = nbytes => {
    return crypto.randomBytes(nbytes).toString('hex')
}

