import { client } from '@passwordless-id/webauthn'
import * as utils from '@/helper/webauthn/utils'

export async function authenticate(credentialIds: string[], challenge: string, options?: AuthenticateOptions): Promise<AuthenticationEncoded> {
    options = options ?? {}

    if (!utils.isBase64url(challenge))
        throw new Error('Provided challenge is not properly encoded in Base64url')
    const local: AuthenticatorTransport[] = ['internal']

    // 'hybrid' was added mid-2022 in the specs and currently not yet available in the official dom types
    // @ts-ignore
    const roaming: AuthenticatorTransport[] = ['hybrid', 'usb', 'ble', 'nfc']
    const transports = [...local, ...roaming];

    let authOptions: PublicKeyCredentialRequestOptions = {
        challenge: utils.parseBase64url(challenge),
        rpId: window.location.hostname,
        allowCredentials: credentialIds.map(id => {
            return {
                id: utils.parseBase64url(id),
                type: 'public-key',
                transports: transports,
            }
        }),
        userVerification: options.userVerification ?? "required",
        timeout: options.timeout ?? 60000,
    }

    if (options.debug)
        console.debug(authOptions)

    let auth = await navigator.credentials.get({ publicKey: authOptions, mediation: options.mediation }) as PublicKeyCredential

    if (options.debug)
        console.debug(auth)

    const response = auth.response as AuthenticatorAssertionResponse

    const authentication: AuthenticationEncoded = {
        credentialId: auth.id,
        authenticatorData: utils.toBase64url(response.authenticatorData),
        clientData: utils.toBase64url(response.clientDataJSON),
        signature: utils.toBase64url(response.signature),
        userHandle: response.userHandle ? utils.toBase64url(response.userHandle) : undefined // may not be returned by every authenticator
    }

    return authentication
}



