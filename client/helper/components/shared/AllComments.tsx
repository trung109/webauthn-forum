import React from 'react';
import { User } from '@/helper/models/models';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/helper/lib/utils';
import { get } from 'http';
interface Props {
  postId: string;
  author: User;
  totalComments: number;
}
import { useState, useEffect } from 'react';
import { MdPreview } from 'md-editor-rt';

const AllComments = ({ postId, author, totalComments }: Props) => {
  const [id] = useState('preview-only');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `/api/post/getPostComments?postId=${postId}`,
        {}
      );
      if (response.ok) {
        const { comments } = await response.json();
        setComments(comments);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{comments.length} Comments</h3>
      </div>

      <div>
        {comments.map((comment) => (
          <article key={comment.id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/user?userId=${comment.author}`}
                  className="flex flex-1 items-center gap-1 sm:items-center"
                >
                  <Image
                    src={`/assets/images/default-avatar.jpg`}
                    width={18}
                    height={18}
                    alt="profile picture"
                    className="rounded-full object-cover max-sm:mt-05"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      @{comment.author}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-0.5">
                      {' '}
                      commented {getTimestamp(new Date(comment.createdAt))}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <MdPreview
              editorId={id}
              modelValue={comment.content}
              className="bg-inherit"
              language="en-US"
            />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllComments;
