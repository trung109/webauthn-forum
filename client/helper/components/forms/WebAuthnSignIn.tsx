"use client";
import { webAuthnSignInFormSchema } from "@/helper/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/helper/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/helper/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/helper/components/ui/form";
import { Input } from "@/helper/components/ui/input";
import { client, server } from '@passwordless-id/webauthn'


export const WebAuthnSignInForm = () => {

  const router = useRouter();

  const sample_credentials = {
    username: "trung109",
    credential: {
      id: "PnxQBUnzrf507G_EWqw1vC16y0jxs01r9kNwR8pnlLc",
      publicKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoEfTMKSHQTocTyd-iN99UsfVvzsSM5UZ6Kn0ZH49hiCTDDHGiaPqfEHMrVCq8_F_zmEUVFPr73xxVgjf7XXZhQ==",
      algorithm: "ES256"
    },
    authenticatorData: "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NFAAAAAAiYcFjK3EuBtuEw3lDcvpYAID58UAVJ863-dOxvxFqsNbwtestI8bNNa_ZDcEfKZ5S3pQECAyYgASFYIKBH0zCkh0E6HE8nfojffVLH1b87EjOVGeip9GR-PYYgIlggkwwxxomj6nxBzK1QqvPxf85hFFRT6-98cVYI3-112YU=",
    clientData: "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiNTY1MzViMTMtNWQ5My00MTk0LWEyODItZjIzNGMxYzI0NTAwIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ==",
    attestationData: "o2NmbXRjdHBtZ2F0dFN0bXSmY2FsZzn__mNzaWdZAQDK5r9bTiDRtG__WT_9JcWymc--VzYSoJNROzynW2sxymNd-yL2Y8YLmzqESaIcs_YJ7NVF9HdNkmAm49tMnbfiJzDksilpjk0rR9NSgTpfdFKfOxfYdyA2Ss_aeRkpVwXod-pSJ49GwMzvJe9nC4gwnPB_8TqW_lZev2fCiSU5bLUWCIRrXMEDLDtFeiGPsDA2sPfryy1-f49XjNpPJ75Y5RFbRAhmQRx3pW6yju3ycAY88jQBG8NVr0YAqsOVU0TfVnVMkZPFk8R6JvvNZO_mWot-pn2D4KQ9Te1d9ep4tr0xnujkajOWRRpTQxLbmTXyzO_hGrq3xFAaJzyRrhQ3Y3ZlcmMyLjBjeDVjglkFvTCCBbkwggOhoAMCAQICECowosn_fEKQi71pJO8JxTEwDQYJKoZIhvcNAQELBQAwQjFAMD4GA1UEAxM3TkNVLUlOVEMtS0VZSUQtQjA2NkQ5Njk3RjVEM0EwN0I0MjVDMTBGNTg3Q0NFRUNGMTZGRkU1ODAeFw0yNDA1MzExOTQ3MTZaFw0yNzA2MDMxNzUxMjNaMAAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDR8D1bHx1UKVaCb7ghXX_qIoYcil5WauGt7twesaPb5Ss6GhlrBAuWhYkb9run78WUAuqOGIFqULH5V3IshXeEunFOD44q9TiJKjFPurr2XR1sKSnTi3V2or3D3Od2qBHrm6Jr63O1GYENHjxkqlURaht9q4KL35mUv_A4tFbAZxXoI13VDON6wOdLugM7BcN9M-zHCIvf-9GLit3J4TqSUgsa6A_nTn09onmSOOyhCqLpNS74tmSiPxArT-OFleXDcNavhMiyQX1dakX07IQfOud0ooLzKgzYQU3DmYP1-RoHwrlupki3oaK-BAcM7GD1Z4CnUrD3YX5gW-ge-MgBAgMBAAGjggHrMIIB5zAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH_BAIwADBtBgNVHSABAf8EYzBhMF8GCSsGAQQBgjcVHzBSMFAGCCsGAQUFBwICMEQeQgBUAEMAUABBACAAIABUAHIAdQBzAHQAZQBkACAAIABQAGwAYQB0AGYAbwByAG0AIAAgAEkAZABlAG4AdABpAHQAeTAQBgNVHSUECTAHBgVngQUIAzBQBgNVHREBAf8ERjBEpEIwQDEWMBQGBWeBBQIBDAtpZDo0OTRFNTQ0MzEOMAwGBWeBBQICDANUR0wxFjAUBgVngQUCAwwLaWQ6MDI1ODAwMDcwHwYDVR0jBBgwFoAUfUUUJCfhkCfy3Pfb_X-udDmwumQwHQYDVR0OBBYEFBJwp4f_kM2o7OtRpC94gb2GyoNbMIGzBggrBgEFBQcBAQSBpjCBozCBoAYIKwYBBQUHMAKGgZNodHRwOi8vYXpjc3Byb2RuY3VhaWtwdWJsaXNoLmJsb2IuY29yZS53aW5kb3dzLm5ldC9uY3UtaW50Yy1rZXlpZC1iMDY2ZDk2OTdmNWQzYTA3YjQyNWMxMGY1ODdjY2VlY2YxNmZmZTU4L2FhZjczMDA4LTkwMWYtNDdlNy05Zjc3LTJkYmZiYTAwN2UzOS5jZXIwDQYJKoZIhvcNAQELBQADggIBAHJS7HutDWm7P-7Bxo5qZduPjOcc_9TPOzr1dLLBim2qkc1IoLggSMGOPpGDGWyMp3DguhGoQW0emcCApBI1YevX9wpqamkm01A3Nc9OeWNmYknn6pF0HF0mU3ZjG-og1h2RWZBovtDSKc9NRvwM95alMLHQrhZfMZLGEnonuOBUZIMphduQuBCxW_1IzZNgyg1LeSArjmB9izlGrSIATun4v4b3Cwt-IWG22XxPXA6SRBEYtmHD6NdsGpOZBcXq_nCdNgo9Is_Lw_gXOAkB7CCKsXt9FYeClNr2D5coMZ3JDvUA4nFtPFqgXXP_ci0as6IhUA3PqfkP8IDTtycbK74JVE-mu9jiMfVYrrMjCxKJzZfF-chSUOcglygxG19kHBokvWi3JiWf3IP_bqtNQFa4AkCErjWdtexMA1g1EaUl2VdAzWWE2-VwburJJ4OyRomivdFolH9VjGcxhs9RiLhIJrjJjGdEFuOmIJcxpg5DqRO8kG416ZHpAHiJjswo_IeiBMWT4vnjQ2BNZVHC-HDfNwG5gxxj65sYz4flKCn-7kpT2xwP4ulspYlHXmGig9gzKC3EcVgC3bHZSBHCwvHAZvbdI4wPEcu-jNB2CX-LwNT4ofYYR2E9gDjnvBrB-heVDUVNVYRdyaBUQXDvqA846o6NUc3oDXf85JUwYMPdWQbwMIIG7DCCBNSgAwIBAgITMwAAA-zE5HW1x4H1QgAAAAAD7DANBgkqhkiG9w0BAQsFADCBjDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjE2MDQGA1UEAxMtTWljcm9zb2Z0IFRQTSBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDE0MB4XDTIxMDYwMzE3NTEyM1oXDTI3MDYwMzE3NTEyM1owQjFAMD4GA1UEAxM3TkNVLUlOVEMtS0VZSUQtQjA2NkQ5Njk3RjVEM0EwN0I0MjVDMTBGNTg3Q0NFRUNGMTZGRkU1ODCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKfbbweViX75zVk2FXgTJDUfCsSpcYg-JyZl0Mm1-U6Itoh0iyehAXXg8oZqu-T2XZJv24Rfgoj_sqiKcYBtOiWhbwc9zIX_Dyoq2TxU2rUmRKZIkDzE2kqQoTqH3Y3z8QwCX2lxFEQb4HfJ4KgM53vZsH3e_orkDZEaBEFoVKiS9j2dPHr7u8eyxs-SEliejLw2CEub15iBgk5XHMLN-vYJvIPqsJMIOvl06rdroHMl9Ptyp3e-LrCxnVHIwr4caXcbo894f30mHsFrSXGA9thecJUKhxPA4HzOzCcOKpOmh-WSfhUVUP973Q8geTjloZspuV6dIOiQxzxiHOGXkVIkp-xzLZnL5DAnkH3GZhliCQKhkDd3vkwweiR9YYyJiSiKRqii7EUndigJ4sCO_dSRthlBHGnsdwnk72MrHLxNMwK4Yw8wbsNjGtTA-yD8UOQ4wjDR0HCz-3avGnMNKj2AFiwyTDUglplT39OjWxNyJCq0EPRDXPBKlURYHViLH5-06ohWco28CTxtHHm8nWPMAdGb19F2w3fN7zJylL8ZkT1wTHOXhpKZtz5psoVn6pWi2rfEmIV5waaTGax5vLG8ruRtXOtF0HOVwS51E0kEvienVDVFSJaNA9g8Rl4D_OFKJq7nJyhtXL4QEuPW76uUApUCzbGX5N8b-vk4Yh-HAgMBAAGjggGOMIIBijAOBgNVHQ8BAf8EBAMCAoQwGwYDVR0lBBQwEgYJKwYBBAGCNxUkBgVngQUIAzAWBgNVHSAEDzANMAsGCSsGAQQBgjcVHzASBgNVHRMBAf8ECDAGAQH_AgEAMB0GA1UdDgQWBBR9RRQkJ-GQJ_Lc99v9f650ObC6ZDAfBgNVHSMEGDAWgBR6jArOL0hiF-KU0a5VwVLscXSkVjBwBgNVHR8EaTBnMGWgY6Bhhl9odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUUE0lMjBSb290JTIwQ2VydGlmaWNhdGUlMjBBdXRob3JpdHklMjAyMDE0LmNybDB9BggrBgEFBQcBAQRxMG8wbQYIKwYBBQUHMAKGYWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVFBNJTIwUm9vdCUyMENlcnRpZmljYXRlJTIwQXV0aG9yaXR5JTIwMjAxNC5jcnQwDQYJKoZIhvcNAQELBQADggIBADTgNEoBFZrQva_nA_0cVqGtYiq4rZI0CUGmDW-Z0QG5-MFFUFkW62YgkX1YdzQ4OFuSvhO1_eJ5w82j23_NT8l2pBsiibyBmRIBPMDKAdCSVTrefHBAyxQ9yKgS_5E6sYt-96nL3ycLYToW0PaDNQT9p2VthGlHYRod8djSrVM_BUEidzK0e8ib0Uw8vWpW1uM_kkOk9nNlZItvVFKGcGrvtezEsEtFxmEhbDgPnre5YxNUqx-YCwqD6tDsKTwGVNAbZdJJ-nPVe7nUkQN14MntskHLTw-iNUC8jG3gcxe3JUMgTdBqobtfRyCj01-uJY1J9ZVSL0w0MeCkT2K1-1dlyV4ph_ZEGfDd2RPdw3nNSCAocqu8bglQUQVinAWBJvIPC7r3nJ8L6E2QWFR_PgNDXaG9DKwVaDkbpv1LKV50cszn9wjfjgxrl3oF9MuGRKh3TLzJc00zPbVoQNo-5HWWo5AlHr_S-NphvGt9oeVaLo_ztG9PasgD0Rdeho0-xEX4K1rywe-jOQk8Uw-RFFQh93vBb281Rs8wwfLP2F3OuiuLJ9cdrOTo_bEcrPIJHtIGuSi00uIYq7EAT734pUZsWtOJSmo4nktZZeDfiG4y0kvw3YIV2unTyXgAI7r23T_2q5SSXRQ8nFskJouNgaqNSqE2USw_hW9tuptuElQ4Z3B1YkFyZWFYdgAjAAsABAByACCd_8vzbDg65pn7mGjcbcuJ1xU4hL4oA5IsEkFYv60irgAQABAAAwAQACCgR9MwpIdBOhxPJ36I331Sx9W_OxIzlRnoqfRkfj2GIAAgkwwxxomj6nxBzK1QqvPxf85hFFRT6-98cVYI3-112YVoY2VydEluZm9Yof9UQ0eAFwAiAAt3B_J5pDg9JtgKheVABedx1O5NVS9qR1A-5I6sac9xJQAUpx0vtH4OgBCvPIFOe7fEeD3RADUAAAACRgiz2e0R6oiGjrBkAbRUfwzgsT8OACIAC44HatDS97XcS6bmjyT3YQE3iXER18RFIXI_YQCQhFR9ACIAC29avElNv7fq47BBkMBQpMH0_AJD5_gIm5nIyDZ-j7s9aGF1dGhEYXRhWKRJlg3liA6MaHQ0Fw9kdmBbj-SuuaKGMseZXPO6gx2XY0UAAAAACJhwWMrcS4G24TDeUNy-lgAgPnxQBUnzrf507G_EWqw1vC16y0jxs01r9kNwR8pnlLelAQIDJiABIVggoEfTMKSHQTocTyd-iN99UsfVvzsSM5UZ6Kn0ZH49hiAiWCCTDDHGiaPqfEHMrVCq8_F_zmEUVFPr73xxVgjf7XXZhQ=="
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof webAuthnSignInFormSchema>>({
    resolver: zodResolver(webAuthnSignInFormSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof webAuthnSignInFormSchema>) {
    const challenge = "56535b13-5d93-4194-a282-f234c1c24500"

    const authentication = await client.authenticate([sample_credentials.credential.id], challenge, {
      "authenticatorType": "auto",
      "userVerification": "required",
      "timeout": 60000
    })

    const credentialKey  = sample_credentials.credential
    const expected = {
        challenge, // whatever was randomly generated by the server.
        origin: "http://localhost:3000",
        userVerified: true, // should be set if `userVerification` was set to `required` in the authentication options (default)
        // counter: 123 // Optional. For device-bound credentials, you should verify the authenticator "usage" counter increased since last time.
    }

    // TODO: this should implement on server to resend JWT token if verifed successfully

    const authenticationParsed = await server.verifyAuthentication(authentication, credentialKey, expected)
    console.log(authenticationParsed)
    // const requestBody = {
    //   username: values.username,
    // }

    // // TODO: Send request webauthn
    // const response = await fetch('/api/webauthn',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    // if (response.ok) {
    //   // TODO - got JWT, now need to set it as a cookie
    //   const data = await response.json();
    //   // Cookies.set('jwt', token);
    //   // alert('cookies recieved');
    //   // const { jwtToken, user } = data;
    //   router.push('/home');
    // } else {
    //   alert('Something went wrong');
    // }
  }

  return (
    <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription className="pt-5">
          Enter your username to login with WebAuthn.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-[-1.5rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold">Username</FormLabel>
                  <FormControl className="mt-2 mb-3">
                    <Input
                      type="username"
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white p-2"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="paragraph-semibold mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebAuthnSignInForm;
