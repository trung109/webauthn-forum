'use client';
import ProfileLink from '@/helper/components/shared/ProfileLink';
import Stats from '@/helper/components/shared/Stats';
import { Button } from '@/helper/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/helper/components/ui/tabs';
import { UserModel } from '@/helper/models/models';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';
import Verfied from '@/helper/components/shared/Verfied';
import { User } from '@/helper/models/models';
const Page = () => {
  const { user, setUser } = useUser();
  const [requestedUser, setRequestedUser] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  useEffect(() => {
    const getRequestedUser = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/user?userId=${userId}`);
        const requestedUser = await res.json();
        setRequestedUser(requestedUser);
      } catch (err) {
        console.error(err);
      }
    };
    getRequestedUser();
  }, [userId]);
  return (
    <>
      <Verfied status={user.status} />;
      <div className="flex w-full flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={requestedUser?.photoUrl ?? ''}
            alt="Profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              @{requestedUser?.username}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              {requestedUser?.bio ? requestedUser?.bio : 'This user has no bio'}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title="Joined at: May 2024"
              ></ProfileLink>
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {user &&
            (user.id === userId ? (
              <div className="flex flex-col justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 gap-3">
                <Link href="/profile/edit">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] px-4 py-3">
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/profile/settings">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] px-4 py-3">
                    Change my password
                  </Button>
                </Link>
              </div>
            ) : (
              <></>
            ))}
        </div>
      </div>
      <Stats totalPosts={0} totalComments={0} />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="account" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger
              defaultValue="top-posts"
              className="tab"
              value="top-posts"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              defaultValue="comments"
              className="tab"
              value="comments"
            >
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent defaultValue="top-posts" value="top-posts">
            POSTS
          </TabsContent>
          <TabsContent defaultValue="comments" value="comments">
            COMMENTS
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
