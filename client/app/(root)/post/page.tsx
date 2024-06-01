'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Metric from '@/helper/components/shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/helper/lib/utils';
import { useEffect, useState } from 'react';
import { Post } from '@/helper/models/models';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const Page = () => {
  const [post, setPost] = useState<Post | null>(null);
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  useEffect(() => {
    const fetchPost = async () => {
      console.log(123);
      const response = await fetch(`/api/post/getPost?postId=${postId}`, {});
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    };
    fetchPost();
  }, [postId]);
  return (
    <div>
      {post?.id ? (
        <>
          <div className="flex-start w-full flex-col">
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/user?userId=${post.author.id}`}
                className="flex items-center justify-start gap-1"
              >
                <Image
                  src={post.author.photoUrl}
                  className="rounded-full"
                  width={22}
                  height={22}
                  alt="profile-pic"
                ></Image>
                <p className="paragraph-semibold text-dark300_light700">
                  @{post.author.username}
                </p>
              </Link>
            </div>
            <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
              {post.title}
            </h2>
          </div>
          <div className="mb-8 mt-5 flex flex-wrap gap-4">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt="clock icon"
              value={` Posted ${getTimestamp(new Date(post.createdAt))}`}
              title=""
              textStyles="small-medium text-dark400_light800"
            ></Metric>
            <Metric
              imgUrl="/assets/icons/message.svg"
              alt="Comments"
              value={formatAndDivideNumber(post.commentsCount)}
              title=" Comments"
              textStyles="small-medium text-dark400_light800"
            ></Metric>
            <Metric
              imgUrl="/assets/icons/eye.svg"
              alt="Views"
              value={formatAndDivideNumber(post.views)}
              title=" Views"
              textStyles="small-medium text-dark400_light800"
            ></Metric>
          </div>
          <div className="markdown-content">
            <ReactMarkDown>{post.content}</ReactMarkDown>
          </div>
        </>
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
};

export default Page;
