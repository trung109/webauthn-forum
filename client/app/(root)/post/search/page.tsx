'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '@/helper/components/cards/PostCard';
import NoResult from '@/helper/components/shared/NoResult';

const SearchPost = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState({ posts: [] });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const requestBody = { query };
          const response = await fetch('/api/post/searchPosts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            cache: 'no-store'
          });

          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error(
              'Error fetching search results:',
              response.statusText
            );
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">
        Search Results for: {query}
      </h1>
      {results.posts.length > 0 ? (
        results.posts
          .filter((post: any) => post.state === 'approved')
          .map((post: any) => (
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
  );
};

export default SearchPost;
