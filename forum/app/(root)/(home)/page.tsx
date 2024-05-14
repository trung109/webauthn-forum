import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to create a new post?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "next.js" },
    ],
    author: {
      _id: "1",
      name: "Jane Doe",
      picture: "/assets/images/logo.png",
    },
    upvotes: 10,
    views: 10031231,
    comments: [],
    createdAt: new Date("2021-09-01T12:00:00.000z"),
  },
  {
    _id: "2",
    title: "Get Started with Python Database",
    tags: [
      { _id: "3", name: "python" },
      { _id: "4", name: "sql" },
    ],
    author: {
      _id: "2",
      name: "John Doe",
      picture: "/assets/images/logo.png",
    },
    upvotes: 1221312,
    views: 1123131,
    comments: [],
    createdAt: new Date("2021-09-01T12:00:00.000z"),
  },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Posts</h1>
        <Link href="/create-post" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Create a post
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for posts"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((post) => (
            <QuestionCard
              key={post._id}
              _id={post._id}
              title={post.title}
              tags={post.tags}
              author={post.author}
              upvotes={post.upvotes}
              comments={post.comments}
              views={post.views}
              createdAt={post.createdAt}
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
