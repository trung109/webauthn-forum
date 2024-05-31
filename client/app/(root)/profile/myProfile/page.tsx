"use client";
import NoResult from "@/helper/components/shared/NoResult";
import ProfileLink from "@/helper/components/shared/ProfileLink";
import Stats from "@/helper/components/shared/Stats";
import { Button } from "@/helper/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/helper/components/ui/tabs";
import { User } from "@/helper/models/models";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  console.log("Current user id: ", userId);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("/api/user/me");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className="flex w-full flex-col-reverse items-start justify-between sm:flex-row">
            <div className="flex flex-col items-start gap-4 lg:flex-row">
              <Image
                src={user.photoUrl}
                alt="Profile picture"
                width={140}
                height={140}
                className="rounded-full object-cover"
              />

              <div className="mt-3">
                <h2 className="h2-bold text-dark100_light900">Full name</h2>
                <p className="paragraph-regular text-dark200_light800">
                  @{user.username}
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
              <Link href="/profile/user/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <Stats totalPosts={10} totalComments={10} />
          <div className="mt-10 flex gap-10">
            <Tabs defaultValue="account" className="flex-1">
              <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                <TabsTrigger
                  defaultValue="top-posts"
                  className="tab"
                  value="top-posts"
                >
                  Top Posts
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
      ) : (
        <>
          <NoResult
            title="There's nothing to show"
            description="Please sign in before accessing your profile"
            link="/auth/login"
            linkTitle="Sign In"
          />
        </>
      )}
    </>
  );
};

export default Page;
