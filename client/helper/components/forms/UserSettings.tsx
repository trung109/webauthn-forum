'use client';
import React from 'react';
import { User } from '@/helper/models/models';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '@/helper/lib/validations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Params {
  userId: string | undefined;
  user: User | null;
}
const UserSettings = ({ userId, user }: Params) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    }
  });
  function onSubmit(values: z.infer<typeof settingsSchema>) {
    setIsSubmitting(true);
    try {
      // update password

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 flex w-full gap-2 flex-col"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Enter your current password"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
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
            <FormItem>
              <FormControl>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Re-enter your new password"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
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

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Changing...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserSettings;
