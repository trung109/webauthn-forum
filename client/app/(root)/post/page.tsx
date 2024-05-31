"use client"
import React from 'react'
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Metric from '@/helper/components/shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/helper/lib/utils';
const page = async () => {

    const sample_post = {
        id: "2",
        title: "Sample Post",
        tags: ["sample", "post"],
        author: {
            username: "dumbled00r",
            id: "4c7fd306f0698de645335e5346fb9805",
            email: "kazuu.promotion@gmail.com",
            photoUrl: "/assets/images/default-avatar.jpg",
            role: "user",
            status: "active"
        },
        upvotes: 10,
        views: 100,
        commentsCount: 10,
        comments: ["comment1", "comment2"],
        createdAt: new Date(),
    }
    const searchParams = useSearchParams();
    const postId = searchParams.get("postId");
  return (
    <div>
      {sample_post.id === postId ? (
        <>
        <div className='flex-start w-full flex-col'>
            <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link href={`/profile/user?userId=${sample_post.author.id}`} className='flex items-center justify-start gap-1'>
                <Image
                src={sample_post.author.photoUrl}
                className='rounded-full'
                width={22}
                height={22}
                alt="profile-pic"></Image>
                <p className='paragraph-semibold text-dark300_light700'>@{sample_post.author.username}</p></Link>
                <div className='flex justify-end'>
                    VOTING
                </div>
            </div>
            <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
                {sample_post.title}
            </h2>
        </div>
        <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={` posted ${getTimestamp(sample_post.createdAt)}`}
            title=" Posted"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Comments"
            value={formatAndDivideNumber(sample_post.commentsCount)}
            title=" Comments"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Views"
            value={formatAndDivideNumber(sample_post.views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
        </div>
        </>
):
(
<div>
    Post not found
    </div>)}
    </div>
  )
}

export default page
