'use client';
import { useUser } from '@/app/context/UserContext';
import Post from '@/helper/components/forms/Post';
import Verfied from '@/helper/components/shared/Verfied';

const CreatePost = () => {
  const { user } = useUser();
  return (
    <>
      <Verfied status={user.status} />;
      <div>
        <h1 className="h1-bold text-dark100_light900">Create a post</h1>
        <div className="mt-9">
          <Post></Post>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
