'use client';
import { profileSchema } from '@/helper/lib/validations';
import { User } from '@/helper/models/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface Params {
  userId: string | undefined;
  user: User | null;
}
const Profile = ({ userId, user }: Params) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || undefined,
      bio: ''
    }
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || '',
        bio: ''
      });
    }
  }, [form, user]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const requestBody = {
      username: values.username,
      bio: values.bio
    };
    try {
      // update user
      const response = await fetch('/api/updateBio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full gap-9 flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-y-3.5">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-y-3.5">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's special about you"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end text-white">
          <Button type="submit" className="primary-gradient w-fit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
