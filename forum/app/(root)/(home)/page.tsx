import PostCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getPosts } from "@/lib/actions/post.action";
import Link from "next/link";

export default async function Home() {
  const result = await getPosts({});
  console.log(result.posts);

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
        {result.posts.length > 0 ? (
          result.posts.map((post) => (
            <PostCard
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
