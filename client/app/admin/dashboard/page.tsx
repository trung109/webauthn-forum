'use client';
import React, { useEffect, useState } from 'react';
import PostCard from '@/helper/components/cards/PostCard';
import NoResult from '@/helper/components/shared/NoResult';
import { Button } from '@/helper/components/ui/button';
import { Checkbox } from '@/helper/components/ui/checkbox';
const page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch('http://localhost:8080/post/0', {
          cache: 'no-store'
        });
        const { posts } = await res.json();
        setPosts(posts);
      } catch (err) {}
    };
    getPost();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-10 flex w-full flex-col gap-6">
          {posts.length > 0 ? (
            posts.map((post: any) =>
              post.state === 'pending' ? (
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
              ) : (
                <div></div>
              )
            )
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
      </div>
    </>
  );
};

export default page;
