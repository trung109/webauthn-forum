import {client} from '@passwordless-id/webauthn'

export const register = async (username, challenge, id) => { 
    const registration = await client.register(username, challenge, {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
      attestation: true,
      userHandle: "id",
      debug: true
    })
    return registration
}