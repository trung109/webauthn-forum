'use client';
import { useUser } from '@/app/context/UserContext';
import Post from '@/helper/components/forms/Post';
import LoggedOut from '@/helper/components/shared/LoggedOut';
import Verified from '@/helper/components/shared/Verified';

const CreatePost = () => {
  const { user } = useUser();
  return (
    <>
      <Verified status={user.status} />
      {user.username ? (
        <div>
          <h1 className="h1-bold text-dark100_light900">Create a post</h1>
          <div className="mt-9">
            <Post></Post>
          </div>
        </div>
      ) : (
        <LoggedOut
          title="You are not signed in"
          description="Please sign in to create a post."
          link="/auth/login"
          linkTitle="Sign in"
        />
      )}
    </>
  );
};

export default CreatePost;
