"use client";
import { signinFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignInForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signinFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.email);
    console.log(values.password);
  }

  return (
    <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold">Email</FormLabel>
                  <FormControl className="mt-5">
                    <Input
                      type="email"
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white"
                      placeholder="email@example.com"
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
                  <FormControl className="mt-5">
                    <Input
                      type={isShowPassword ? "text" : "password"}
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="text-dark300_light700 w-full justify-end text-sm underline"
            >
              {isShowPassword ? "Hide" : "Show"}
            </Button>
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="mt-5 w-full text-[16px]">
          Sign In with WebAuthn
        </Button>
        <div className="paragraph-semibold mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
