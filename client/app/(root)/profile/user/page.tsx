"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { UserModel } from '@/helper/models/models';
import Link from 'next/link';
import { Button } from '@/helper/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/helper/components/ui/tabs"
import ProfileLink from '@/helper/components/shared/ProfileLink';
import Stats from '@/helper/components/shared/Stats';

const Page = () => {
  const [user, setUser] = useState(UserModel);

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const sample_user = {
    username: "dumbled00r",
    id: userId || "",
    email: "",
    photoUrl: "/assets/images/default-avatar.jpg",
    role: "",
    status: ""
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch('/api/user');
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      }
    }
    fetchUserDetails();
  }, []);



  return (
    <>
      <div className="flex w-full flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Image
            src={sample_user.photoUrl}
            alt="Profile picture"
            width={140}
            height={140}
            className='rounded-full object-cover'/>

            <div className='mt-3'>
                <h2 className='h2-bold text-dark100_light900'>Full name</h2>
                <p className='paragraph-regular text-dark200_light800'>@{sample_user.username}</p>


                <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                    <ProfileLink
                    imgUrl='/assets/icons/calendar.svg' title='Joined at: May 2024'></ProfileLink>
                </div>
            </div>

        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
            {user && (
                user.id === sample_user.id ? (
                    <Link href='/profile/user/edit'>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] px-4 py-3">Edit Profile</Button>
                    </Link>
                ) : (
                    <></>
                )
            )
            }
        </div>
      </div>

      <Stats
      totalPosts={10}
      totalComments={10} />
      <div className="mt-10 flex gap-10">
      <Tabs defaultValue="account" className="flex-1">
        <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value="top-posts" className='tab'>Top Posts</TabsTrigger>
            <TabsTrigger value="comments" className='tab'>Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="top-posts">POSTS</TabsContent>
        <TabsContent value="comments">COMMENTS</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
