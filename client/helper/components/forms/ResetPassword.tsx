'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '../ui/button';
import { resetPasswordFormSchema } from '@/helper/lib/validations';
const ResetPassword = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {}

  return (
    <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription className="pt-5">
          Enter your email address associated with your account below and we
          will send an email with a new temporary password.
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold">Email</FormLabel>
                  <FormControl className="mt-2 mb-3">
                    <Input
                      type="email"
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white p-2"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900 mt-[20px]"
            >
              Reset Password
            </Button>
          </form>
        </Form>
        <div className="paragraph-semibold mt-4 text-center text-sm mt-[50px]">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
        <div className="paragraph-semibold mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
