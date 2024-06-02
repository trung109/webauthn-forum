'use client';
import React, { useEffect, useState } from 'react';
import PostCard from '@/helper/components/cards/PostCard';
import NoResult from '@/helper/components/shared/NoResult';
import { Button } from '@/helper/components/ui/button';
import { Checkbox } from '@/helper/components/ui/checkbox';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/helper/components/ui/tabs';
import UserHorizontalCard from '@/helper/components/cards/UserHorizontalCard';
import { useUser } from '@/app/context/UserContext';
const page = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch('http://localhost:8080/post/pending', {
          method: 'POST',
          cache: 'no-store'
        });
        const { posts } = await res.json();
        setPosts(posts);
      } catch (err) {}
    };
    getPost();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch('/api/user/allUsers');
        const { users } = await res.json();
        setUsers(users);
      } catch (err) {}
    };
    getUsers();
  }, []);

  return (
    <>
      {user.role === 'admin' ? (
        <>
          <h1 className="h1-bold text-dark100_light900">Admin Dashboard</h1>

          <div className="mt-10 flex gap-10">
            <Tabs defaultValue="pending-posts" className="flex-1">
              <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                <TabsTrigger
                  defaultValue="pending-posts"
                  className="tab"
                  value="pending-posts"
                >
                  Pending Posts
                </TabsTrigger>
                <TabsTrigger defaultValue="users" className="tab" value="users">
                  Manage Users
                </TabsTrigger>
              </TabsList>
              <TabsContent defaultValue="pending-posts" value="pending-posts">
                <div className="flex flex-col">
                  <div className="mt-10 flex w-full flex-col gap-6">
                    {posts.length > 0 ? (
                      posts.map((post: any) =>
                        post.state === 'pending' ? (
                          <PostCard
                            key={post._id}
                            _id={post.id}
                            title={post.title}
                            tags={post.tags.map((tag: any) => ({
                              name: tag,
                              _id: tag
                            }))}
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
              </TabsContent>
              <TabsContent defaultValue="users" value="users">
                <div className="flex flex-col">
                  <div className="mt-10 flex w-full flex-col gap-6">
                    {users.length > 0 ? (
                      users.map((user: any) => (
                        <UserHorizontalCard
                          key={user.id}
                          id={user.id}
                          username={user.username}
                          email={user.email}
                          photoUrl={user.photoUrl}
                          role={user.role}
                          status={user.status}
                        />
                      ))
                    ) : (
                      <NoResult
                        title="There's no user to show"
                        description="Spread the word! Invite your friends to join the community and get the discussion started."
                        link="/auth/register"
                        linkTitle="Register"
                      />
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <NoResult
          title="There's nothing to show here"
          description="You don't have the permission to access this page. If you think this is a mistake, please contact the administrator."
          link="/home"
          linkTitle="Back to Home"
        />
      )}
    </>
  );
};

export default page;
