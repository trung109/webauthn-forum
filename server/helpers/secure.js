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

export const sleepRandomTime = async () => {
  const minDelay = 500; // Minimum delay in milliseconds (.5 second)
  const maxDelay = 1000; // Maximum delay in milliseconds (1 seconds)
  const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  return new Promise(resolve => {
    setTimeout(resolve, randomDelay);
  });
}