import crypto from 'crypto'

export const genRandHex = nbytes => {
    return crypto.randomBytes(nbytes).toString('hex')
}

export const genRandomPassword = () => {
    return crypto.randomBytes(32).toString('base64').slice(0,20)
}

function sleepRandomTime() {
    const minDelay = 500; // Minimum delay in milliseconds (1 second)
    const maxDelay = 1000; // Maximum delay in milliseconds (5 seconds)
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    
    return new Promise(resolve => {
      setTimeout(resolve, randomDelay);
    });
  }