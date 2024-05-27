import Post from "@/components/forms/Post";
<<<<<<< Updated upstream
=======
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const CreatePost = async () => {
  // const { userId } = auth();
  const userId = "123456";
  if (!userId) redirect("/auth/login");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);
>>>>>>> Stashed changes

const CreatePost = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Create a post</h1>
      <div className="mt-9">
        <Post></Post>
      </div>
    </div>
  );
};

export default CreatePost;
