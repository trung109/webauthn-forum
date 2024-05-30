import Image from "next/image";
import Link from "next/link";
import RenderTag from "../../shared/RenderTag";

const RightSideBar = () => {
  const hostPosts = [
    {
      _id: "1",
      title: "How to build a website",
    },
    {
      _id: "2",
      title: "How to make a cake",
    },
    {
      _id: "3",
      title: "How to create an account on Github",
    },
    {
      _id: "4",
      title: "Get started with NextJS",
    },
    {
      _id: "5",
      title: "Make use of free hosting Vercel",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "javascript",
      totalPosts: 5,
    },
    {
      _id: "2",
      name: "react",
      totalPosts: 5,
    },
    {
      _id: "3",
      name: "next",
      totalPosts: 5,
    },
    {
      _id: "4",
      name: "vuejs",
      totalPosts: 2,
    },
    {
      _id: "5s",
      name: "redux",
      totalPosts: 10,
    },
  ];
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar no-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top posts</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hostPosts.map((post) => (
            <Link
              href={`/post/${post._id}`}
              key={post._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{post.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="chevron-right"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalPosts={tag.totalPosts}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
