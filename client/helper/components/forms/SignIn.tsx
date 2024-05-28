"use client";
import { signInFormSchema } from "@/helper/lib/validations";
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

const SignInForm = () => {

  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {

    const requestBody = {
      username: values.username,
      password: values.password
    }

    const response = await fetch('/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

    if (response.ok) {
      // TODO - got JWT, now need to set it as a cookie
      const data = await response.json();
      // Cookies.set('jwt', token);
      alert('cookies recieved');
      const { jwtToken, user } = data;

      // router.push('/home');
    } else {
      alert('Something went wrong');
    }
  }

  return (
    <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription className="pt-5">
          Enter your username and password below to login to your account.
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold">Password</FormLabel>
                  <FormControl className="mt-2 mb-3">
                    <Input
                      type={isShowPassword ? "text" : "password"}
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white p-2"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div style={{ position: 'relative', top: '-65px', left: '180px', height: '0' }}>
              <Button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="text-dark300_light700 w-full justify-end text-sm underline"
              >
                {isShowPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="mt-2 mb-3 w-full text-[16px]">
          Sign In with WebAuthn
        </Button>
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

export default SignInForm;
