'use client';
import { signInFormSchema } from '@/helper/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/helper/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/helper/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/helper/components/ui/form';
import { Input } from '@/helper/components/ui/input';

const SignInForm = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const requestBody = {
      username: values.username,
      password: values.password
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const data = await response.json();
      router.push('/home');
    } else {
      alert('Login service error, please try again');
    }
  }

  return (
    <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription className="pt-5">
          Enter your username and password below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-[0.5rem]">
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
                      type={isShowPassword ? 'text' : 'password'}
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white p-2"
                      placeholder="Enter your password"
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
              {isShowPassword ? 'Hide Password' : 'Show Password'}
            </Button>

            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <Link href="/webauthn">
          <Button variant="outline" className="mt-2 mb-3 w-full text-[16px]">
            Sign In with WebAuthn
          </Button>
        </Link>
        <div className="paragraph-semibold mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
        <div className="paragraph-semibold mt-4 text-center text-sm">
          Forgot your password?{' '}
          <Link href="/auth/reset-password" className="underline">
            Reset password
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
