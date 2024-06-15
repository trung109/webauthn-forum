'use client';
import PostCard from '@/helper/components/cards/PostCard';
import NoResult from '@/helper/components/shared/NoResult';
import { Button } from '@/helper/components/ui/button';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import Verified from '@/helper/components/shared/Verified';
import { useUser } from '@/app/context/UserContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch('/api/post/getPosts', {
          cache: 'no-store'
        });
        const { posts } = await res.json();

        // Temporary hack to fix await problem when parsing json
        console.log();
        setPosts(posts);
      } catch (err) {}
    };
    getPost();
  }, []);

  const canCreatePost = user.username ? '/create-post' : '/auth/login';

  return (
    <>
      <Verified status={user.status} />

      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Posts</h1>
        <Link href={canCreatePost} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Create a post
          </Button>
        </Link>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard
              key={post._id}
              _id={post.id}
              title={post.title}
              tags={post.tags.map((tag: any) => ({ name: tag, _id: tag }))}
              author={post.author}
              upvotes={post.upvotes}
              commentsCount={post.commentsCount}
              views={post.views}
              createdAt={new Date(post.createdAt)}
              state={post.state}
            />
          ))
        ) : (
          <NoResult
            title="There's no post to show"
            description="Be the first to break the silence! Create a Post and kickstart the
        discussion. Our query could be the next big thing others learn from. Get
        involved!"
            link="/create-post"
            linkTitle="Create a post"
          />
        )}
      </div>
    </>
  );
}
