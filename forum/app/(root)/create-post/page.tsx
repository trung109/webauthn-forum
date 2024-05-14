import Post from "@/components/forms/Post";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const CreatePost = async () => {
  // const { userId } = auth();
  const userId = "123456";
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Create a post</h1>
      <div className="mt-9">
        <Post mongoUserId={JSON.stringify(mongoUser._id)}></Post>
      </div>
    </div>
  );
};

export default CreatePost;
